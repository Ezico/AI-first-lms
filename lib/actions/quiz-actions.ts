"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

const sql = neon(process.env.DATABASE_URL!)

export type QuizQuestion = {
  id: number
  lesson_id: number
  question_text: string
  explanation?: string
  order: number
  answers?: QuizAnswer[]
  created_at?: string
  updated_at?: string
}

export type QuizAnswer = {
  id: number
  question_id: number
  answer_text: string
  is_correct: boolean
  order: number
  created_at?: string
  updated_at?: string
}

export async function getQuizQuestions(lessonId: number) {
  try {
    const questions = await sql<QuizQuestion[]>`
      SELECT * FROM quiz_questions
      WHERE lesson_id = ${lessonId}
      ORDER BY "order" ASC
    `

    // Get answers for each question
    for (const question of questions) {
      const answers = await sql<QuizAnswer[]>`
        SELECT * FROM quiz_answers
        WHERE question_id = ${question.id}
        ORDER BY "order" ASC
      `
      question.answers = answers
    }

    return questions
  } catch (error) {
    console.error(`Failed to fetch quiz questions for lesson ${lessonId}:`, error)
    return []
  }
}

export async function createQuizQuestion(formData: FormData) {
  try {
    const lessonId = Number.parseInt(formData.get("lessonId") as string)
    const questionText = formData.get("questionText") as string
    const explanation = (formData.get("explanation") as string) || null
    const courseId = Number.parseInt(formData.get("courseId") as string)

    // Get the highest order value for this lesson's questions
    const orderResult = await sql`
      SELECT COALESCE(MAX("order"), 0) as max_order
      FROM quiz_questions
      WHERE lesson_id = ${lessonId}
    `
    const order = Number.parseInt(orderResult[0].max_order) + 1

    // Insert the question
    const result = await sql`
      INSERT INTO quiz_questions (
        lesson_id, question_text, explanation, "order", created_at, updated_at
      ) VALUES (
        ${lessonId}, ${questionText}, ${explanation}, ${order}, NOW(), NOW()
      ) RETURNING id
    `

    const questionId = result[0].id

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true, questionId }
  } catch (error) {
    console.error("Failed to create quiz question:", error)
    return { success: false, error: error.message }
  }
}

export async function updateQuizQuestion(questionId: number, formData: FormData) {
  try {
    const questionText = formData.get("questionText") as string
    const explanation = (formData.get("explanation") as string) || null
    const courseId = Number.parseInt(formData.get("courseId") as string)

    await sql`
      UPDATE quiz_questions SET
        question_text = ${questionText},
        explanation = ${explanation},
        updated_at = NOW()
      WHERE id = ${questionId}
    `

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error(`Failed to update quiz question with id ${questionId}:`, error)
    return { success: false, error: error.message }
  }
}

export async function deleteQuizQuestion(questionId: number, courseId: number) {
  try {
    // Delete the question (answers will be deleted via CASCADE)
    await sql`
      DELETE FROM quiz_questions
      WHERE id = ${questionId}
    `

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete quiz question with id ${questionId}:`, error)
    return { success: false, error: error.message }
  }
}

export async function createQuizAnswer(formData: FormData) {
  try {
    const questionId = Number.parseInt(formData.get("questionId") as string)
    const answerText = formData.get("answerText") as string
    const isCorrect = formData.get("isCorrect") === "true"
    const courseId = Number.parseInt(formData.get("courseId") as string)

    // Get the highest order value for this question's answers
    const orderResult = await sql`
      SELECT COALESCE(MAX("order"), 0) as max_order
      FROM quiz_answers
      WHERE question_id = ${questionId}
    `
    const order = Number.parseInt(orderResult[0].max_order) + 1

    // Insert the answer
    const result = await sql`
      INSERT INTO quiz_answers (
        question_id, answer_text, is_correct, "order", created_at, updated_at
      ) VALUES (
        ${questionId}, ${answerText}, ${isCorrect}, ${order}, NOW(), NOW()
      ) RETURNING id
    `

    const answerId = result[0].id

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true, answerId }
  } catch (error) {
    console.error("Failed to create quiz answer:", error)
    return { success: false, error: error.message }
  }
}

export async function updateQuizAnswer(answerId: number, formData: FormData) {
  try {
    const answerText = formData.get("answerText") as string
    const isCorrect = formData.get("isCorrect") === "true"
    const courseId = Number.parseInt(formData.get("courseId") as string)

    await sql`
      UPDATE quiz_answers SET
        answer_text = ${answerText},
        is_correct = ${isCorrect},
        updated_at = NOW()
      WHERE id = ${answerId}
    `

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error(`Failed to update quiz answer with id ${answerId}:`, error)
    return { success: false, error: error.message }
  }
}

export async function deleteQuizAnswer(answerId: number, courseId: number) {
  try {
    await sql`
      DELETE FROM quiz_answers
      WHERE id = ${answerId}
    `

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete quiz answer with id ${answerId}:`, error)
    return { success: false, error: error.message }
  }
}
