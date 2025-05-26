import { notFound, redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth-utils";
import LearningInterface from "@/components/academy/learning-interface";
import { executeQuery } from "@/lib/db";

interface LearnPageProps {
  params: {
    slug: string;
  };
}

export default async function LearnPage({ params }: LearnPageProps) {
  // Use our custom auth system instead of NextAuth
  const user = await requireAuth("/auth/signin");

  // Get the course
  const courses = await executeQuery(
    `
    SELECT id, title, slug, description, duration
    FROM courses
    WHERE slug = $1
    LIMIT 1
  `,
    [params.slug]
  );

  if (!courses || courses.length === 0) {
    notFound();
  }

  const course = courses[0];

  // Check if user is enrolled
  const enrollments = await executeQuery(
    `
    SELECT id
    FROM enrollments
    WHERE user_id = $1 AND course_id = $2
    LIMIT 1
  `,
    [user.id, course.id]
  );

  if (!enrollments || enrollments.length === 0) {
    // Redirect to course page if not enrolled
    return redirect(`/academy/courses/${params.slug}`);
  }

  const enrollmentId = enrollments[0].id;

  // Get course modules and lessons
  const modules = await executeQuery(
    `
    SELECT id, title, "order"
    FROM modules
    WHERE course_id = $1
    ORDER BY "order"
  `,
    [course.id]
  );

  const courseModules = [];

  for (const module of modules) {
    // Get lessons for this module
    const lessons = await executeQuery(
      `
      SELECT 
        l.id, 
        l.title, 
        l.type, 
        l.content,
        l.duration, 
        l."order",
        p.completed,
        p.progress
      FROM lessons l
      LEFT JOIN progress p ON p.lesson_id = l.id AND p.enrollment_id = $1
      WHERE l.module_id = $2
      ORDER BY l."order"
    `,
      [enrollmentId, module.id]
    );

    courseModules.push({
      ...module,
      lessons: lessons || [],
    });
  }

  // Calculate overall course progress
  const progressData = await executeQuery(
    `
    SELECT 
      (SELECT COUNT(*) FROM lessons l JOIN modules m ON l.module_id = m.id WHERE m.course_id = $1) as total_lessons,
      (SELECT COUNT(*) FROM progress p WHERE p.enrollment_id = $2 AND p.completed = true) as completed_lessons
    LIMIT 1
  `,
    [course.id, enrollmentId]
  );

  const totalLessons = Number.parseInt(progressData[0]?.total_lessons || "0");
  const completedLessons = Number.parseInt(
    progressData[0]?.completed_lessons || "0"
  );
  const overallProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Get the first lesson if available
  const firstModule = courseModules[0];
  const firstLesson = firstModule?.lessons[0];

  return (
    <LearningInterface
      course={course}
      courseModules={courseModules}
      initialLessonId={firstLesson?.id || null}
      initialModuleIndex={0}
      initialLessonIndex={0}
      overallProgress={overallProgress}
      userId={user.id}
    />
  );
}
