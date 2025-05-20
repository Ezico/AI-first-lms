"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award } from "lucide-react"
import type { User } from "@/lib/auth-utils"

// Mock enrolled courses data
const enrolledCourses = [
  {
    id: "ai-leadership-fundamentals",
    title: "AI Leadership Fundamentals",
    slug: "ai-leadership-fundamentals",
    description: "Learn the fundamentals of AI leadership and how to implement AI in your organization.",
    image: "/ai-leadership-course.png",
    progress: 65,
    nextLesson: "Module 3: Implementation Planning",
    lastAccessed: "2 days ago",
    duration: "6 weeks",
    completedLessons: 8,
    totalLessons: 12,
  },
  {
    id: "ai-ethics-governance",
    title: "AI Ethics & Governance",
    slug: "ai-ethics-governance",
    description: "Understand the ethical implications of AI and how to govern AI systems responsibly.",
    image: "/ai-ethics-course.png",
    progress: 25,
    nextLesson: "Module 1: Ethical AI Principles",
    lastAccessed: "1 week ago",
    duration: "4 weeks",
    completedLessons: 3,
    totalLessons: 12,
  },
]

// Mock recommended courses
const recommendedCourses = [
  {
    id: "ai-strategy-business",
    title: "AI Strategy for Business",
    slug: "ai-strategy-business",
    description: "Develop a comprehensive AI strategy for your business.",
    image: "/ai-strategy-course.png",
    instructor: "Dr. Sarah Johnson",
  },
  {
    id: "ai-implementation",
    title: "AI Implementation",
    slug: "ai-implementation",
    description: "Learn how to implement AI solutions in your organization.",
    image: "/ai-business-course.png",
    instructor: "Michael Chen",
  },
]

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  return (
    <div className="flex-grow bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6 bg-purple-700 text-white">
                <div className="flex items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white mr-4">
                    <Image
                      src={user.image || "/professional-headshot.png"}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-purple-200">{user.role === "admin" ? "Administrator" : "Student"}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <nav className="space-y-1">
                  <button className="w-full flex items-center px-4 py-3 rounded-md bg-purple-50 text-purple-700">
                    <BookOpen className="h-5 w-5 mr-3" />
                    My Courses
                  </button>
                  <button className="w-full flex items-center px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <Award className="h-5 w-5 mr-3" />
                    Certificates
                  </button>
                </nav>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Learning Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Courses Completed</span>
                    <span className="font-medium text-gray-900">0/2</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Average Progress</span>
                    <span className="font-medium text-gray-900">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Certificates Earned</span>
                    <span className="font-medium text-gray-900">0</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div>
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">My Enrolled Courses</h2>
                <div className="space-y-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6 flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <Clock className="h-4 w-4 mr-1" />
                            Last accessed {course.lastAccessed}
                          </div>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <p className="text-gray-700 mb-4">
                            <span className="font-medium">Next up:</span> {course.nextLesson}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Link href={`/academy/courses/${course.slug}/learn`}>
                              <Button className="bg-purple-700 hover:bg-purple-800">Continue Learning</Button>
                            </Link>
                            <Link href={`/academy/courses/${course.slug}`}>
                              <Button
                                variant="outline"
                                className="border-purple-700 text-purple-700 hover:bg-purple-50"
                              >
                                Course Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recommended Courses</h2>
                  <Link href="/academy">
                    <Button variant="link" className="text-purple-700 p-0">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative h-40 w-full">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
                        <Link href={`/academy/courses/${course.slug}`}>
                          <Button
                            variant="outline"
                            className="w-full border-purple-700 text-purple-700 hover:bg-purple-50"
                          >
                            View Course
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
