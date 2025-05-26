"use server";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = neon(process.env.DATABASE_URL!);

export type Course = {
  id: number;
  title: string;
  slug: string;
  description: string;
  level: string;
  duration: string;
  price: number | string;
  instructor: string;
  instructor_title: string;
  instructor_image: string;
  image: string;
  category: string;
  topics: string;
  featured: boolean;
  published: boolean;
  rating?: number;
  enrolled?: number;
  created_at?: string;
  updated_at?: string;
};

export async function getAllCourses() {
  try {
    const courses = await sql<Course[]>`
      SELECT * FROM courses 
      WHERE published = true
      ORDER BY created_at DESC
    `;

    // Add default values for rating and enrolled if they don't exist
    return courses.map((course) => ({
      ...course,
      rating: course.rating || 4.5,
      enrolled: course.enrolled || Math.floor(Math.random() * 50) + 10,
      topics: course.topics || "[]",
    }));
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}

export async function getFeaturedCourses() {
  try {
    const courses = await sql<Course[]>`
      SELECT * FROM courses 
      WHERE featured = true AND published = true
      ORDER BY created_at DESC
    `;

    // Add default values for rating and enrolled if they don't exist
    return courses.map((course) => ({
      ...course,
      rating: course.rating || 4.5,
      enrolled: course.enrolled || Math.floor(Math.random() * 500) + 100,
      topics: course.topics || "[]",
    }));
  } catch (error) {
    console.error("Failed to fetch featured courses:", error);
    return [];
  }
}

export async function getCourseBySlug(slug: string) {
  try {
    const courses = await sql<Course[]>`
      SELECT * FROM courses 
      WHERE slug = ${slug}
      LIMIT 1
    `;

    if (courses.length === 0) {
      return null;
    }

    const course = courses[0];

    // Add default values for rating and enrolled if they don't exist
    return {
      ...course,
      rating: course.rating || 4.5,
      enrolled: course.enrolled || Math.floor(Math.random() * 500) + 100,
      topics: course.topics || "[]",
    };
  } catch (error) {
    console.error(`Failed to fetch course with slug ${slug}:`, error);
    return null;
  }
}

export async function getCourseById(id: number) {
  try {
    const courses = await sql<Course[]>`
      SELECT * FROM courses 
      WHERE id = ${id}
      LIMIT 1
    `;

    if (courses.length === 0) {
      return null;
    }

    return courses[0];
  } catch (error) {
    console.error(`Failed to fetch course with id ${id}:`, error);
    return null;
  }
}

export async function getAllCoursesAdmin() {
  try {
    const courses = await sql<Course[]>`
      SELECT * FROM courses 
      ORDER BY created_at DESC
    `;
    return courses;
  } catch (error) {
    console.error("Failed to fetch courses for admin:", error);
    return [];
  }
}

export async function createCourse(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as string;
    const duration = formData.get("duration") as string;
    const price = Number.parseFloat(formData.get("price") as string);
    const instructor = formData.get("instructor") as string;
    const instructor_title = formData.get("instructor_title") as string;
    const instructor_image =
      (formData.get("instructor_image") as string) ||
      "/professional-headshot.png";
    const image =
      (formData.get("image") as string) || "/ai-leadership-course.png";
    const category = formData.get("category") as string;
    const topics = formData.get("topics") as string;
    const featured = formData.get("featured") === "on";
    const published = formData.get("published") === "on";

    const result = await sql`
      INSERT INTO courses (
        title, slug, description, level, duration, price,
        instructor, instructor_title, instructor_image, image,
        category, topics, featured, published, created_at, updated_at
      ) VALUES (
        ${title}, ${slug}, ${description}, ${level}, ${duration}, ${price},
        ${instructor}, ${instructor_title}, ${instructor_image}, ${image},
        ${category}, ${topics}, ${featured}, ${published}, NOW(), NOW()
      ) RETURNING id
    `;

    const courseId = result[0].id;

    revalidatePath("/admin/courses");
    revalidatePath("/academy");

    redirect("/admin/courses");
  } catch (error) {
    console.error("Failed to create course:", error);
    throw new Error(`Failed to create course: ${error.message}`);
  }
}

export async function updateCourse(courseId: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as string;
    const duration = formData.get("duration") as string;
    const price = Number.parseFloat(formData.get("price") as string);
    const instructor = formData.get("instructor") as string;
    const instructor_title = formData.get("instructor_title") as string;
    const instructor_image = formData.get("instructor_image") as string;
    const image = formData.get("image") as string;
    const category = formData.get("category") as string;
    const topics = formData.get("topics") as string;
    const featured = formData.get("featured") === "on";
    const published = formData.get("published") === "on";

    await sql`
      UPDATE courses SET
        title = ${title},
        slug = ${slug},
        description = ${description},
        level = ${level},
        duration = ${duration},
        price = ${price},
        instructor = ${instructor},
        instructor_title = ${instructor_title},
        instructor_image = ${instructor_image},
        image = ${image},
        category = ${category},
        topics = ${topics},
        featured = ${featured},
        published = ${published},
        updated_at = NOW()
      WHERE id = ${courseId}
    `;

    revalidatePath("/admin/courses");
    revalidatePath("/academy");
    revalidatePath(`/academy/courses/${slug}`);

    return { success: true };
  } catch (error) {
    console.error(`Failed to update course with id ${courseId}:`, error);
    return { success: false, error: error.message };
  }
}

export async function deleteCourse(courseId: number) {
  try {
    // First delete all lessons associated with this course's modules
    await sql`
      DELETE FROM lessons
      WHERE module_id IN (
        SELECT id FROM modules WHERE course_id = ${courseId}
      )
    `;

    // Then delete all modules associated with this course
    await sql`
      DELETE FROM modules
      WHERE course_id = ${courseId}
    `;

    // Finally delete the course
    await sql`
      DELETE FROM courses
      WHERE id = ${courseId}
    `;

    revalidatePath("/admin/courses");
    revalidatePath("/academy");

    return { success: true };
  } catch (error) {
    console.error(`Failed to delete course with id ${courseId}:`, error);
    return { success: false, error: error.message };
  }
}
