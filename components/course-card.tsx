"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/actions/course-actions";

interface CourseCardProps {
  course: Course;
  compact?: boolean;
}

export default function CourseCard({
  course,
  compact = false,
}: CourseCardProps) {
  // Default values for rating and enrolled if they're undefined
  const rating = course.rating || 4.5;
  const enrolled = course.enrolled || 0;
  console.log(course);
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover"
        />
        {course.featured && !compact && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-purple-700 hover:bg-purple-800">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
            {course.level}
          </span>
          <span className="text-sm text-gray-500 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        {!compact && <p className="text-gray-600 mb-4">{course.description}</p>}

        <div className="flex items-center mb-4">
          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
            <Image
              src={course.instructor_image || "/placeholder.svg"}
              alt={course.instructor}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-700">{course.instructor}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              {rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            {enrolled.toLocaleString()} students
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">
            $
            {typeof course.price === "number"
              ? course.price.toFixed(2)
              : Number.parseFloat(String(course.price)).toFixed(2)}
          </div>
          <Link href={`/academy/courses/${course.slug}`}>
            <Button
              variant={compact ? "outline" : "default"}
              className={
                compact
                  ? "border-purple-700 text-purple-700 hover:bg-purple-50"
                  : "bg-purple-700 hover:bg-purple-800"
              }
            >
              {compact ? (
                <span className="flex items-center">
                  Details <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              ) : (
                "View Course"
              )}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
