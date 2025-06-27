import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  GraduationCap,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import CourseCard from "@/components/course-card";
import { Badge } from "@/components/ui/badge";
import CourseFilters from "@/components/course-filters";
import {
  getAllCourses,
  getFeaturedCourses,
} from "@/lib/actions/course-actions";

export default async function AcademyPage() {
  // Fetch courses from the database
  const allCourses = await getAllCourses();

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Hero Section */}
      <section className=" relative overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <Reveal>
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  AI First Academy
                </h1>
                <p className="mt-3 text-xl text-purple-100 md:mt-5">
                  Comprehensive training programs to develop AI literacy and
                  implementation skills for your entire organization.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-6 w-6 text-purple-300 flex-shrink-0 mt-0.5" />
                    <p className="text-purple-100">
                      Executive-focused AI leadership programs
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-6 w-6 text-purple-300 flex-shrink-0 mt-0.5" />
                    <p className="text-purple-100">
                      Practical implementation frameworks and tools
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-6 w-6 text-purple-300 flex-shrink-0 mt-0.5" />
                    <p className="text-purple-100">
                      Customized training for your organization's needs
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="bg-white text-purple-800 hover:bg-purple-50 px-6 py-6 rounded-lg transition-all hover:scale-105 shadow-lg">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Explore Programs
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative h-[400px] w-full">
                <Image
                  src="/ai-training-executives.png"
                  alt="AI First Academy Training"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {/* <section className="container bg-white py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Our most popular courses designed to build AI capabilities at
              every level of your organization.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.length > 0 ? (
              featuredCourses.map((course, index) => (
                <Reveal key={course.id} delay={index * 0.1}>
                  <CourseCard course={course} />
                </Reveal>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">
                  No featured courses available at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="#course-catalog">
              <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4">
                View All Courses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Course Catalog */}
      <section id="course-catalog" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Course Catalog
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Browse our comprehensive catalog of AI courses for every skill
              level and role.
            </p>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            {/* <div className="lg:w-1/4">
              <CourseFilters />
            </div> */}

            {/* Course grid */}
            <div className="lg:w-full">
              {/* Search bar */}
              {/* <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="block w-full p-4 pl-10 text-sm border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Search courses..."
                />
              </div> */}

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allCourses.length > 0 ? (
                  allCourses.map((course) => (
                    <CourseCard key={course.id} course={course} compact />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8">
                    <p className="text-gray-500">
                      No courses available at the moment. Check back soon!
                    </p>
                  </div>
                )}

                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative h-48 w-full">
                    <Image
                      src={
                        "https://cdn.shopify.com/s/files/1/0779/1745/4639/files/ai-power.png"
                      }
                      alt={""}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-700 hover:bg-purple-800">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                        Beginner
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />8 weeks
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Launch Your Project Management Career with AI
                    </h3>

                    <div className="flex items-center mb-4">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                        <Image
                          src={"/placeholder.svg"}
                          alt={""}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        Davies Bamigboye
                      </span>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(5)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill={i < Math.floor(5) ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">5.0</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />0 students
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-gray-900">
                        $1950
                      </div>
                      <Link href={`/academy/ai-powered-project-delivery`}>
                        <Button
                          variant={"outline"}
                          className={
                            "border-purple-700 text-purple-700 hover:bg-purple-50"
                          }
                        >
                          <span className="flex items-center">
                            Details <ChevronRight className="ml-1 h-4 w-4" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative h-48 w-full">
                    <Image
                      src={"/images/delivery.png"}
                      alt={""}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-700 hover:bg-purple-800">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                        Beginner
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />8 weeks
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Deliver Smarter Projects with AI
                    </h3>

                    <div className="flex items-center mb-4">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                        <Image
                          src={"/placeholder.svg"}
                          alt={""}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        Davies Bamigboye
                      </span>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(5)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill={i < Math.floor(5) ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">5.0</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />0 students
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-xl font-bold text-gray-900">
                        From $799 to $2,499
                      </div>
                      <Link href={`/academy/deliver-smarter-project-with-ai`}>
                        <Button
                          variant={"outline"}
                          className={
                            "border-purple-700 text-purple-700 hover:bg-purple-50"
                          }
                        >
                          <span className="flex items-center">
                            Details <ChevronRight className="ml-1 h-4 w-4" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Pagination */}
              {/* <div className="flex justify-center mt-12">
                <nav className="inline-flex rounded-md shadow">
                  <a
                    href="#"
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 text-sm font-medium text-purple-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300 hover:bg-gray-50"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300 hover:bg-gray-50"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                  >
                    Next
                  </a>
                </nav>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build AI Capabilities in Your Organization?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Contact us to discuss your organization's training needs and how
              we can help you develop the AI skills needed for success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-6">
                  Request Information
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
