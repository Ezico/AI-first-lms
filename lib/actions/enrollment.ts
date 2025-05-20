"use server"

import { getServerUser, requireAuth } from "@/lib/auth-utils"
import { executeQuery } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Helper function to extract numeric ID from string IDs like "lesson-1-1"
function extractNumericId(id: string): number {
  // If the id is already a number, return it
  if (!isNaN(Number(id))) {
    return Number(id)
  }

  // Try to extract a numeric ID from strings like "lesson-1-1"
  const matches = id.match(/\d+/g)
  if (matches && matches.length > 0) {
    // Use the last number in the string as the ID
    return Number.parseInt(matches[matches.length - 1], 10)
  }

  // Default fallback
  return 0
}

export async function isUserEnrolled(userId: number, courseId: number) {
  try {
    const result = await sql`
      SELECT COUNT(*) as count
      FROM enrollments
      WHERE user_id = ${userId} AND course_id = ${courseId}
    `
    return result[0].count > 0
  } catch (error) {
    console.error(`Failed to check enrollment for user ${userId} and course ${courseId}:`, error)
    return false
  }
}

export async function enrollUserInCourse(userId: number, courseId: number) {
  try {
    // Check if already enrolled
    const isEnrolled = await isUserEnrolled(userId, courseId)
    if (isEnrolled) {
      return { success: true, message: "Already enrolled in this course" }
    }

    // Enroll the user
    await sql`
      INSERT INTO enrollments (user_id, course_id)
      VALUES (${userId}, ${courseId})
    `
    return { success: true, message: "Successfully enrolled in course" }
  } catch (error) {
    console.error(`Failed to enroll user ${userId} in course ${courseId}:`, error)
    return { success: false, message: "Failed to enroll in course" }
  }
}

export async function enrollInCourse(courseId: number, paymentIntentId?: string) {
  const user = requireAuth()

  try {
    // Check if user is already enrolled
    const existingEnrollment = await executeQuery(
      `
      SELECT id FROM enrollments
      WHERE user_id = $1 AND course_id = $2
    `,
      [user.id, courseId],
    )

    if (existingEnrollment && existingEnrollment.length > 0) {
      return { success: true, message: "Already enrolled", enrollmentId: existingEnrollment[0].id }
    }

    // Create new enrollment
    const enrollment = await executeQuery(
      `
      INSERT INTO enrollments (user_id, course_id, enrolled_at)
      VALUES ($1, $2, NOW())
      RETURNING id
    `,
      [user.id, courseId],
    )

    if (!enrollment || enrollment.length === 0) {
      throw new Error("Failed to create enrollment")
    }

    // Get all lessons for this course
    const lessons = await executeQuery(
      `
      SELECT l.id
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      WHERE m.course_id = $1
      ORDER BY m.order, l.order
    `,
      [courseId],
    )

    // Create initial progress records for all lessons
    if (lessons && lessons.length > 0) {
      for (const lesson of lessons) {
        await executeQuery(
          `
          INSERT INTO progress (enrollment_id, lesson_id, completed, progress, last_accessed)
          VALUES ($1, $2, false, 0, NOW())
        `,
          [enrollment[0].id, lesson.id],
        )
      }
    }

    // If payment intent provided, save it (in a real app)
    if (paymentIntentId) {
      // In a real app, you would save the payment intent ID
      console.log(`Payment intent ${paymentIntentId} for enrollment ${enrollment[0].id}`)
    }

    revalidatePath("/academy/dashboard")
    return { success: true, enrollmentId: enrollment[0].id }
  } catch (error) {
    console.error("Enrollment error:", error)
    throw new Error("Failed to enroll in course")
  }
}

export async function getUserEnrollments() {
  // Use our custom auth system instead of NextAuth
  const user = getServerUser()

  if (!user) {
    return []
  }

  try {
    // Fetch user enrollments from the database
    const enrollments = await executeQuery(
      `
      SELECT 
        e.id,
        c.id as course_id,
        c.title,
        c.slug,
        c.description,
        c.duration,
        c.image,
        (SELECT COUNT(*) FROM lessons l JOIN modules m ON l.module_id = m.id WHERE m.course_id = c.id) as total_lessons,
        (SELECT COUNT(*) FROM progress p WHERE p.enrollment_id = e.id AND p.completed = true) as completed_lessons,
        e.completed_at,
        e.enrolled_at
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = $1
      ORDER BY e.enrolled_at DESC
    `,
      [user.id],
    )

    return enrollments || []
  } catch (error) {
    console.error("Get user enrollments error:", error)
    return []
  }
}

export async function updateLessonProgress(lessonId: string, progress: number, completed: boolean) {
  // Use our custom auth system instead of NextAuth
  const user = requireAuth()

  // Extract numeric lesson ID
  const numericLessonId = extractNumericId(lessonId)

  try {
    // First, check if the user is enrolled in the course that contains this lesson
    const enrollmentCheck = await executeQuery(
      `
      SELECT e.id 
      FROM enrollments e
      JOIN modules m ON m.course_id = e.course_id
      JOIN lessons l ON l.module_id = m.id
      WHERE l.id = $1 AND e.user_id = $2
      LIMIT 1
    `,
      [numericLessonId, user.id],
    )

    if (!enrollmentCheck || enrollmentCheck.length === 0) {
      throw new Error("User is not enrolled in this course")
    }

    const enrollmentId = enrollmentCheck[0].id

    // Check if progress record exists
    const progressCheck = await executeQuery(
      `
      SELECT id FROM progress 
      WHERE enrollment_id = $1 AND lesson_id = $2
      LIMIT 1
    `,
      [enrollmentId, numericLessonId],
    )

    if (progressCheck && progressCheck.length > 0) {
      // Update existing progress
      await executeQuery(
        `
        UPDATE progress 
        SET progress = $1, completed = $2, last_accessed = NOW()
        WHERE enrollment_id = $3 AND lesson_id = $4
      `,
        [progress, completed, enrollmentId, numericLessonId],
      )
    } else {
      // Create new progress record
      await executeQuery(
        `
        INSERT INTO progress (enrollment_id, lesson_id, progress, completed, last_accessed)
        VALUES ($1, $2, $3, $4, NOW())
      `,
        [enrollmentId, numericLessonId, progress, completed],
      )
    }

    // If the lesson is completed, check if all lessons in the course are completed
    if (completed) {
      const courseCompletionCheck = await executeQuery(
        `
        SELECT 
          (SELECT COUNT(*) FROM lessons l JOIN modules m ON l.module_id = m.id WHERE m.course_id = e.course_id) as total_lessons,
          (SELECT COUNT(*) FROM progress p WHERE p.enrollment_id = e.id AND p.completed = true) as completed_lessons
        FROM enrollments e
        WHERE e.id = $1
      `,
        [enrollmentId],
      )

      if (courseCompletionCheck && courseCompletionCheck.length > 0) {
        const { total_lessons, completed_lessons } = courseCompletionCheck[0]

        // If all lessons are completed, mark the enrollment as completed
        if (Number.parseInt(total_lessons) === Number.parseInt(completed_lessons)) {
          await executeQuery(
            `
            UPDATE enrollments
            SET completed_at = NOW()
            WHERE id = $1
          `,
            [enrollmentId],
          )
        }
      }
    }

    revalidatePath(`/academy/courses/[slug]/learn`)
    return { success: true }
  } catch (error) {
    console.error("Update lesson progress error:", error)
    throw new Error("Failed to update lesson progress")
  }
}

export async function saveNote(lessonId: string, content: string) {
  // Use our custom auth system instead of NextAuth
  const user = requireAuth()

  // Extract numeric lesson ID
  const numericLessonId = extractNumericId(lessonId)

  try {
    // Check if note exists
    const noteCheck = await executeQuery(
      `
      SELECT id FROM notes
      WHERE user_id = $1 AND lesson_id = $2
      LIMIT 1
    `,
      [user.id, numericLessonId],
    )

    if (noteCheck && noteCheck.length > 0) {
      // Update existing note
      await executeQuery(
        `
        UPDATE notes
        SET content = $1, updated_at = NOW()
        WHERE user_id = $2 AND lesson_id = $3
      `,
        [content, user.id, numericLessonId],
      )
    } else {
      // Create new note
      await executeQuery(
        `
        INSERT INTO notes (content, user_id, lesson_id, created_at, updated_at)
        VALUES ($1, $2, $3, NOW(), NOW())
      `,
        [content, user.id, numericLessonId],
      )
    }

    revalidatePath(`/academy/courses/[slug]/learn`)
    return { success: true }
  } catch (error) {
    console.error("Save note error:", error)
    throw new Error("Failed to save note")
  }
}

export async function getNote(lessonId: string) {
  // Use our custom auth system instead of NextAuth
  const user = getServerUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  // Extract numeric lesson ID
  const numericLessonId = extractNumericId(lessonId)

  try {
    // Fetch note from database
    const notes = await executeQuery(
      `
      SELECT id, content, user_id, lesson_id
      FROM notes
      WHERE user_id = $1 AND lesson_id = $2
      LIMIT 1
    `,
      [user.id, numericLessonId],
    )

    if (notes && notes.length > 0) {
      return notes[0]
    }

    return null
  } catch (error) {
    console.error("Get note error:", error)
    return null
  }
}

export async function submitQuiz(lessonId: string, answers: Record<string, string>) {
  const user = requireAuth()

  // Extract numeric lesson ID
  const numericLessonId = extractNumericId(lessonId)

  try {
    // In a real app, you would validate the answers against correct answers
    // For now, we'll just calculate a mock score
    const totalQuestions = Object.keys(answers).length
    const correctAnswers = Math.floor(Math.random() * (totalQuestions + 1)) // Random score for demo
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    // Check if response exists
    const responseCheck = await executeQuery(
      `
      SELECT id FROM quiz_responses
      WHERE user_id = $1 AND lesson_id = $2
      LIMIT 1
    `,
      [user.id, numericLessonId],
    )

    if (responseCheck && responseCheck.length > 0) {
      // Update existing response
      await executeQuery(
        `
        UPDATE quiz_responses
        SET answers = $1, score = $2, completed = true, updated_at = NOW()
        WHERE user_id = $3 AND lesson_id = $4
      `,
        [JSON.stringify(answers), score, user.id, numericLessonId],
      )
    } else {
      // Create new response
      await executeQuery(
        `
        INSERT INTO quiz_responses (user_id, lesson_id, answers, score, completed, created_at, updated_at)
        VALUES ($1, $2, $3, $4, true, NOW(), NOW())
      `,
        [user.id, numericLessonId, JSON.stringify(answers), score],
      )
    }

    // Mark the lesson as completed
    await updateLessonProgress(lessonId, 100, true)

    return { success: true, score }
  } catch (error) {
    console.error("Submit quiz error:", error)
    throw new Error("Failed to submit quiz")
  }
}

export async function getQuizResponse(lessonId: string) {
  const user = getServerUser()

  if (!user) {
    throw new Error("Not authenticated")
  }

  // Extract numeric lesson ID
  const numericLessonId = extractNumericId(lessonId)

  try {
    // Fetch quiz response from database
    const responses = await executeQuery(
      `
      SELECT id, answers, score, completed
      FROM quiz_responses
      WHERE user_id = $1 AND lesson_id = $2
      LIMIT 1
    `,
      [user.id, numericLessonId],
    )

    if (responses && responses.length > 0) {
      return {
        ...responses[0],
        answers: JSON.parse(responses[0].answers),
      }
    }

    return null
  } catch (error) {
    console.error("Get quiz response error:", error)
    return null
  }
}
