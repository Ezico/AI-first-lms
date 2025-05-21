import { requireAuth } from "@/lib/auth-utils";
import DashboardClient from "@/components/academy/dashboard-client";
import { getUserEnrollments } from "@/lib/actions/enrollment";
import { executeQuery } from "@/lib/db";

export default async function DashboardPage() {
  // Use our custom auth system instead of NextAuth
  const user = await requireAuth("/auth/signin");

  // Get user enrollments
  const enrollments = await getUserEnrollments();

  // Get recommended courses (courses user is not enrolled in)
  const recommendedCourses = await executeQuery(
    `
    SELECT 
      c.id,
      c.title,
      c.slug,
      c.description,
      c.image,
      c.price,
      c.level,
      c.duration
    FROM courses c
    WHERE c.id NOT IN (
      SELECT course_id FROM enrollments WHERE user_id = $1
    )
    AND c.published = true
    ORDER BY c.featured DESC, RANDOM()
    LIMIT 2
  `,
    [user.id]
  );

  return (
    <DashboardClient
      user={user}
      enrollments={enrollments}
      recommendedCourses={recommendedCourses || []}
    />
  );
}
