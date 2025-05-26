import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getCourseById } from "@/lib/actions/course-actions";
import CourseEditForm from "@/components/admin/course-edit-form";
import { use, useEffect } from "react";

export default async function EditCoursePage({
  params,
}: {
  params: { id: string };
}) {
  const courseId = Number.parseInt(params.id);
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/courses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Edit Course: {course.title}</h1>
      </div>

      <CourseEditForm course={course} />
    </div>
  );
}
