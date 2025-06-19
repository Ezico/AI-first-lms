import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProductCourseForm from "@/components/admin/product-course-form";

export default function NewProductCoursePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/product-courses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create New Product Course</h1>
      </div>

      <ProductCourseForm />
    </div>
  );
}
