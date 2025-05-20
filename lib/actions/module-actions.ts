"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

const sql = neon(process.env.DATABASE_URL!)

export type Module = {
  id: number
  title: string
  order: number
  course_id: number
  lesson_count?: number
  created_at?: string
  updated_at?: string
}

export type Lesson = {
  id: number
  title: string
  type: string
  content: string
  duration: string
  order: number
  module_id: number
  created_at?: string
  updated_at?: string
}

export async function getModulesForCourse(courseId: number) {
  try {
    const modules = await sql<Module[]>`
      SELECT 
        m.id, 
        m.title, 
        m."order", 
        m.course_id,
        COUNT(l.id) as lesson_count
      FROM 
        modules m
      LEFT JOIN 
        lessons l ON m.id = l.module_id
      WHERE 
        m.course_id = ${courseId}
      GROUP BY 
        m.id, m.title, m."order", m.course_id
      ORDER BY 
        m."order" ASC
    `
    return modules
  } catch (error) {
    console.error(`Failed to fetch modules for course ${courseId}:`, error)
    return []
  }
}

export async function getLessonsForModule(moduleId: number) {
  try {
    const lessons = await sql<Lesson[]>`
      SELECT * FROM lessons
      WHERE module_id = ${moduleId}
      ORDER BY "order" ASC
    `
    return lessons
  } catch (error) {
    console.error(`Failed to fetch lessons for module ${moduleId}:`, error)
    return []
  }
}

export async function createModule(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const order = Number.parseInt(formData.get("order") as string)
    const courseId = Number.parseInt(formData.get("courseId") as string)

    const result = await sql`
      INSERT INTO modules (
        title, "order", course_id, created_at, updated_at
      ) VALUES (
        ${title}, ${order}, ${courseId}, NOW(), NOW()
      ) RETURNING id
    `

    const moduleId = result[0].id

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true, moduleId }
  } catch (error) {
    console.error("Failed to create module:", error)
    return { success: false, error: error.message }
  }
}

export async function updateModule(moduleId: number, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const order = Number.parseInt(formData.get("order") as string)
    const courseId = Number.parseInt(formData.get("courseId") as string)

    await sql`
      UPDATE modules SET
        title = ${title},
        "order" = ${order},
        updated_at = NOW()
      WHERE id = ${moduleId}
    `

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error(`Failed to update module with id ${moduleId}:`, error)
    return { success: false, error: error.message }
  }
}

export async function deleteModule(moduleId: number, courseId: number) {
  try {
    // First delete all lessons associated with this module
    await sql`
      DELETE FROM lessons
      WHERE module_id = ${moduleId}
    `

    // Then delete the module
    await sql`
      DELETE FROM modules
      WHERE id = ${moduleId}
    `

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete module with id ${moduleId}:`, error)
    return { success: false, error: error.message }
  }
}

export async function createLesson(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const type = formData.get("type") as string
    const content = (formData.get("content") as string) || ""
    const duration = formData.get("duration") as string
    const order = Number.parseInt(formData.get("order") as string)
    const moduleId = Number.parseInt(formData.get("moduleId") as string)
    const courseId = Number.parseInt(formData.get("courseId") as string)

    const result = await sql`
      INSERT INTO lessons (
        title, type, content, duration, "order", module_id, created_at, updated_at
      ) VALUES (
        ${title}, ${type}, ${content}, ${duration}, ${order}, ${moduleId}, NOW(), NOW()
      ) RETURNING id
    `

    const lessonId = result[0].id

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true, lessonId }
  } catch (error) {
    console.error("Failed to create lesson:", error)
    return { success: false, error: error.message }
  }
}

export async function updateLesson(lessonId: number, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const type = formData.get("type") as string
    const content = (formData.get("content") as string) || ""
    const duration = formData.get("duration") as string
    const order = Number.parseInt(formData.get("order") as string)
    const courseId = Number.parseInt(formData.get("courseId") as string)

    await sql`
      UPDATE lessons SET
        title = ${title},
        type = ${type},
        content = ${content},
        duration = ${duration},
        "order" = ${order},
        updated_at = NOW()
      WHERE id = ${lessonId}
    `

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error(`Failed to update lesson with id ${lessonId}:`, error)
    return { success: false, error: error.message }
  }
}

export async function deleteLesson(lessonId: number, courseId: number) {
  try {
    await sql`
      DELETE FROM lessons
      WHERE id = ${lessonId}
    `

    revalidatePath(`/admin/courses/${courseId}`)

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete lesson with id ${lessonId}:`, error)
    return { success: false, error: error.message }
  }
}
