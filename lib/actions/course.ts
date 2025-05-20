"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/auth-utils"
import { executeQuery } from "@/lib/db"

// Helper function to check if a slug is already in use
async function isSlugInUse(slug: string, excludeCourseId?: string): Promise<boolean> {
  try {
    let query = `SELECT id FROM courses WHERE slug = $1`
    const params = [slug]

    // If we're updating a course, exclude it from the check
    if (excludeCourseId) {
      query += ` AND id != $2`
      params.push(excludeCourseId)
    }

    const result = await executeQuery(query, params)
    return result && result.length > 0
  } catch (error) {
    console.error("Error checking slug:", error)
    return false
  }
}

// Helper function to generate a unique slug
async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug
  let counter = 1

  while (await isSlugInUse(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}

// Create a new course
export async function createCourse(formData: FormData) {
  // Ensure user is admin
  requireAdmin()

  // Process form data
  const title = formData.get("title") as string
  const requestedSlug = formData.get("slug") as string
  const description = formData.get("description") as string
  const level = formData.get("level") as string
  const duration = formData.get("duration") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const instructor = formData.get("instructor") as string
  const instructorTitle = formData.get("instructorTitle") as string
  const instructorImage = (formData.get("instructorImage") as string) || null
  const image = (formData.get("image") as string) || null
  const category = formData.get("category") as string
  const topics = formData.get("topics") as string
  const featured = formData.has("featured")
  const published = formData.has("published")

  try {
    // Check if the slug is already in use
    const slug = (await isSlugInUse(requestedSlug)) ? await generateUniqueSlug(requestedSlug) : requestedSlug

    // Insert the course into the database
    await executeQuery(
      `INSERT INTO courses (
        title, slug, description, level, duration, price, 
        instructor, instructor_title, instructor_image, image, 
        category, topics, featured, published, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())`,
      [
        title,
        slug,
        description,
        level,
        duration,
        price,
        instructor,
        instructorTitle,
        instructorImage,
        image,
        category,
        topics,
        featured,
        published,
      ],
    )

    // Revalidate the courses page
    revalidatePath("/admin/courses")
    revalidatePath("/academy")
  } catch (error) {
    console.error("Create course error:", error)
    throw new Error(`Failed to create course: ${error.message}`)
  }

  // Redirect outside of try/catch
  redirect("/admin/courses")
}

// Update an existing course
export async function updateCourse(courseId: string, formData: FormData) {
  // Ensure user is admin
  requireAdmin()

  // Process form data
  const title = formData.get("title") as string
  let requestedSlug = formData.get("slug") as string
  const description = formData.get("description") as string
  const level = formData.get("level") as string
  const duration = formData.get("duration") as string
  const price = Number.parseFloat(formData.get("price") as string) || 0
  const instructor = formData.get("instructor") as string
  const instructorTitle = formData.get("instructorTitle") as string
  const instructorImage = (formData.get("instructorImage") as string) || null
  const image = (formData.get("image") as string) || null
  const category = formData.get("category") as string
  const topics = formData.get("topics") as string
  const featured = formData.has("featured")
  const published = formData.has("published")

  try {
    // First check if the course exists
    const courseCheck = await executeQuery(`SELECT id, slug FROM courses WHERE id = $1 LIMIT 1`, [courseId])
    const courseExists = courseCheck && courseCheck.length > 0

    // Check if the requested slug is already in use by another course
    const slugInUse = await isSlugInUse(requestedSlug, courseId)

    if (slugInUse) {
      // Generate a unique slug if the requested one is already in use
      const uniqueSlug = await generateUniqueSlug(requestedSlug)
      console.log(`Slug "${requestedSlug}" already in use. Using "${uniqueSlug}" instead.`)

      // Use the unique slug instead
      requestedSlug = uniqueSlug
    }

    if (!courseExists) {
      console.log(`Course with ID ${courseId} not found. Creating new course.`)

      // If the course doesn't exist, create it instead of updating
      await executeQuery(
        `INSERT INTO courses (
          id, title, slug, description, level, duration, price, 
          instructor, instructor_title, instructor_image, image, 
          category, topics, featured, published, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW())`,
        [
          courseId, // Use the provided ID
          title,
          requestedSlug,
          description,
          level,
          duration,
          price,
          instructor,
          instructorTitle,
          instructorImage,
          image,
          category,
          topics,
          featured,
          published,
        ],
      )
    } else {
      // Update the course in the database
      await executeQuery(
        `UPDATE courses SET
          title = $1, 
          slug = $2, 
          description = $3, 
          level = $4, 
          duration = $5, 
          price = $6,
          instructor = $7, 
          instructor_title = $8, 
          instructor_image = $9, 
          image = $10,
          category = $11, 
          topics = $12, 
          featured = $13, 
          published = $14, 
          updated_at = NOW()
        WHERE id = $15`,
        [
          title,
          requestedSlug,
          description,
          level,
          duration,
          price,
          instructor,
          instructorTitle,
          instructorImage,
          image,
          category,
          topics,
          featured,
          published,
          courseId,
        ],
      )
    }

    // Revalidate the courses page
    revalidatePath("/admin/courses")
    revalidatePath("/academy")
    revalidatePath(`/academy/courses/${requestedSlug}`)
  } catch (error) {
    console.error("Update course error:", error)
    throw new Error(`Failed to update course: ${error.message}`)
  }

  // Redirect outside of try/catch
  redirect("/admin/courses")
}

// Delete a course
export async function deleteCourse(courseId: string) {
  // Ensure user is admin
  requireAdmin()

  try {
    // Check if the course exists
    const courseCheck = await executeQuery(`SELECT id FROM courses WHERE id = $1 LIMIT 1`, [courseId])

    if (!courseCheck || courseCheck.length === 0) {
      console.log(`Course with ID ${courseId} not found. Nothing to delete.`)
    } else {
      // Delete the course from the database
      await executeQuery(`DELETE FROM courses WHERE id = $1`, [courseId])
    }

    // Revalidate the courses page
    revalidatePath("/admin/courses")
    revalidatePath("/academy")
  } catch (error) {
    console.error("Delete course error:", error)
    throw new Error(`Failed to delete course: ${error.message}`)
  }

  // Redirect outside of try/catch
  redirect("/admin/courses")
}

// Add a module to a course
export async function addModule(courseId: string, formData: FormData) {
  // Ensure user is admin
  requireAdmin()

  try {
    // Check if the course exists
    const courseCheck = await executeQuery(`SELECT id FROM courses WHERE id = $1 LIMIT 1`, [courseId])

    if (!courseCheck || courseCheck.length === 0) {
      console.log(`Course with ID ${courseId} not found. Cannot add module.`)
      throw new Error(`Course with ID ${courseId} not found`)
    }

    const title = formData.get("title") as string
    const order = Number.parseInt(formData.get("order") as string) || 1

    // Insert the module into the database
    await executeQuery(
      `INSERT INTO modules (title, "order", course_id, created_at, updated_at)
       VALUES ($1, $2, $3, NOW(), NOW())`,
      [title, order, courseId],
    )

    // Get the course slug
    const courseResult = await executeQuery(`SELECT slug FROM courses WHERE id = $1 LIMIT 1`, [courseId])
    const course = courseResult[0]

    // Revalidate the course page
    revalidatePath(`/admin/courses/${courseId}`)
    if (course && course.slug) {
      revalidatePath(`/academy/courses/${course.slug}`)
    }
  } catch (error) {
    console.error("Add module error:", error)
    throw new Error(`Failed to add module: ${error.message}`)
  }

  // Redirect outside of try/catch
  redirect(`/admin/courses/${courseId}`)
}

// Add a lesson to a module
export async function addLesson(moduleId: string, formData: FormData) {
  // Ensure user is admin
  requireAdmin()

  let courseId = null

  try {
    // Check if the module exists
    const moduleCheck = await executeQuery(`SELECT id, course_id FROM modules WHERE id = $1 LIMIT 1`, [moduleId])

    if (!moduleCheck || moduleCheck.length === 0) {
      console.log(`Module with ID ${moduleId} not found. Cannot add lesson.`)
      throw new Error(`Module with ID ${moduleId} not found`)
    }

    const title = formData.get("title") as string
    const type = formData.get("type") as string
    const content = formData.get("content") as string
    const duration = formData.get("duration") as string
    const order = Number.parseInt(formData.get("order") as string) || 1

    // Insert the lesson into the database
    await executeQuery(
      `INSERT INTO lessons (title, type, content, duration, "order", module_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
      [title, type, content, duration, order, moduleId],
    )

    const module = moduleCheck[0]
    courseId = module.course_id

    if (module && module.course_id) {
      // Revalidate the course page
      revalidatePath(`/admin/courses/${module.course_id}`)

      // Get the course slug
      const courseResult = await executeQuery(`SELECT slug FROM courses WHERE id = $1 LIMIT 1`, [module.course_id])
      const course = courseResult[0]

      if (course && course.slug) {
        revalidatePath(`/academy/courses/${course.slug}`)
      }
    }
  } catch (error) {
    console.error("Add lesson error:", error)
    throw new Error(`Failed to add lesson: ${error.message}`)
  }

  // Redirect outside of try/catch
  if (courseId) {
    redirect(`/admin/courses/${courseId}`)
  } else {
    redirect("/admin/courses")
  }
}
