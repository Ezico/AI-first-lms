import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Users, CheckCircle, BookOpen, Award } from "lucide-react";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import { Reveal } from "@/components/reveal";
import { getCourseBySlug, getAllCourses } from "@/lib/actions/course-actions";
import { getModulesForCourse } from "@/lib/actions/module-actions";
import { isUserEnrolled } from "@/lib/actions/enrollment";
import getServerUser from "@/lib/actions/getUserFunction";
import truncate from "html-truncate";
interface CoursePageProps {
  params: {
    slug: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  // Use our custom auth system instead of NextAuth
  const user = await getServerUser();

  // Find the course by slug from the database
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  // Parse JSON strings to arrays (if they're strings)
  const categories =
    typeof course.category === "string"
      ? course.category.startsWith("[")
        ? JSON.parse(course.category)
        : [course.category]
      : course.category
        ? [course.category]
        : [];

  const topics =
    typeof course.topics === "string"
      ? course.topics.startsWith("[")
        ? JSON.parse(course.topics)
        : [course.topics]
      : course.topics
        ? [course.topics]
        : [];

  // Check if user is enrolled
  const isEnrolled = user ? await isUserEnrolled(user.id, course.id) : false;

  // Get course modules
  const modules = await getModulesForCourse(course.id);

  // Get related courses (same category, excluding current course)
  const allCourses = await getAllCourses();
  const snippet = truncate(course?.description, 250);
  const relatedCourses = allCourses
    .filter(
      (c) =>
        c.id !== course.id &&
        c.published &&
        categories.some((cat) => c.category.includes(cat))
    )
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Course Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <Reveal>
                <div className="flex items-center gap-2 mb-4">
                  {categories.map((cat: string) => (
                    <Badge
                      key={cat}
                      className="bg-purple-800 hover:bg-purple-900"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {course.title}
                </h1>

                <div
                  className="text-lg text-purple-100 mb-6"
                  dangerouslySetInnerHTML={{
                    __html: snippet,
                  }}
                />

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill={i < 4 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    {/* <span className="ml-2">
                      4.7 ({course.enrolled || 500} students)
                    </span> */}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    {course.enrolled || 500} enrolled
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src={
                        course.instructor_image || "/professional-headshot.png"
                      }
                      alt={course.instructor}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Created by</p>
                    <p className="text-purple-200">
                      {course.instructor} <br />{" "}
                      <em>{course.instructor_title}</em>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {isEnrolled ? (
                    <Link href={`/academy/courses/${course.slug}/learn`}>
                      <Button
                        size="lg"
                        className="bg-white text-purple-700 hover:bg-gray-100"
                      >
                        Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/academy/courses/${course.slug}/checkout`}>
                      <Button
                        size="lg"
                        className="bg-white text-purple-700 hover:bg-gray-100"
                      >
                        Enroll Now - $
                        {typeof course.price === "number"
                          ? course.price.toFixed(2)
                          : Number.parseFloat(String(course.price)).toFixed(2)}
                      </Button>
                    </Link>
                  )}
                  {/* <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-purple-800"
                  >
                    Watch Preview
                  </Button> */}
                </div>
              </Reveal>
            </div>
            <div className="md:w-1/3">
              <Reveal delay={0.2}>
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-white bg-opacity-80 h-16 w-16 hover:bg-opacity-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-8 h-8 text-purple-700"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        $
                        {typeof course.price === "number"
                          ? course.price.toFixed(2)
                          : Number.parseFloat(String(course.price)).toFixed(2)}
                      </div>
                      {course.original_price && (
                        <div className="text-lg text-gray-500 line-through">
                          $
                          {typeof course.original_price === "number"
                            ? course.original_price.toFixed(2)
                            : Number.parseFloat(
                                String(course.original_price)
                              ).toFixed(2)}
                        </div>
                      )}
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-5 w-5 mr-3 text-purple-600" />
                        <span>{course.duration} of content</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <BookOpen className="h-5 w-5 mr-3 text-purple-600" />
                        <span>
                          {modules.length} modules,{" "}
                          {modules.reduce(
                            (acc, module) =>
                              acc + Number.parseInt(module.lesson_count),
                            0
                          )}{" "}
                          lessons
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Award className="h-5 w-5 mr-3 text-purple-600" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <CheckCircle className="h-5 w-5 mr-3 text-purple-600" />
                        <span>Lifetime access</span>
                      </div>
                    </div>
                    {isEnrolled ? (
                      <Link
                        href={`/academy/courses/${course.slug}/learn`}
                        className="w-full"
                      >
                        <Button className="w-full bg-purple-700 hover:bg-purple-800">
                          Continue Learning
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        href={`/academy/courses/${course.slug}/checkout`}
                        className="w-full"
                      >
                        <Button className="w-full bg-purple-700 hover:bg-purple-800">
                          Enroll Now
                        </Button>
                      </Link>
                    )}
                    <p className="text-center text-sm text-gray-500 mt-4">
                      30-day money-back guarantee
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {topics.map((topic: string, index: number) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Course Content
            </h2>

            <div className="border border-gray-200 rounded-lg mb-12">
              <div className="p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <span className="font-medium">
                  {modules.length} modules •{" "}
                  {modules.reduce(
                    (acc, module) => acc + Number.parseInt(module.lesson_count),
                    0
                  )}{" "}
                  lessons • {course.duration} total
                </span>
                <Button variant="link" className="text-purple-700">
                  Expand All
                </Button>
              </div>

              {/* Display actual modules from database */}
              <div className="divide-y divide-gray-200">
                {modules.map((module, index) => (
                  <div key={module.id} className="p-7">
                    <div className="flex justify-between items-center cursor-pointer">
                      <h3 className="font-medium">
                        {index + 1}. {module.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {module.lesson_count} lessons •{" "}
                        {module.duration || "45 min"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Requirements
            </h2>
            <ul className="list-disc pl-5 mb-12 space-y-2">
              <li>Basic understanding of business strategy</li>
              <li>No technical background required</li>
              <li>Interest in applying AI to business challenges</li>
              <li>Leadership role or aspiration</li>
            </ul> */}

            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Description
            </h2>
            <div className="prose big-titles max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: course?.description }} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Your Instructor
            </h2>
            <div className="flex items-start mb-12">
              <div className="relative h-20 w-20 rounded-full overflow-hidden mr-4">
                <Image
                  src={course.instructor_image || "/professional-headshot.png"}
                  alt={course.instructor}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{course.instructor}</h3>
                <p className="text-purple-700 mb-2">
                  {course.instructor_title}
                </p>
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 5 ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  {/* <span className="ml-2 text-sm text-gray-600">
                    4.9 Instructor Rating
                  </span> */}
                </div>
                {/* <p className="text-sm text-gray-600 mb-2">
                  {Math.floor(Math.random() * 50) + 20} Courses •{" "}
                  {Math.floor(Math.random() * 100000) + 50000} Students
                </p> */}
                <p className="text-gray-700">
                  {course.instructor}, {course.instructor_title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Related Courses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedCourses.length > 0 ? (
              relatedCourses.map((relatedCourse) => (
                <div
                  key={relatedCourse.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={relatedCourse.image || "/placeholder.svg"}
                      alt={relatedCourse.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">
                      {relatedCourse.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedCourse?.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 4 ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill={i < 4 ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">4.7</span>
                      </div>
                      <span className="font-bold">
                        $
                        {typeof relatedCourse.price === "number"
                          ? relatedCourse.price.toFixed(2)
                          : Number.parseFloat(
                              String(relatedCourse.price)
                            ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">
                  No related courses available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
