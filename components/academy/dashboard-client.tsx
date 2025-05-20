"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  Award,
  BarChart,
  Calendar,
  CheckCircle,
  ChevronRight,
  Download,
  FileText,
  Play,
  Settings,
  LucideUser,
} from "lucide-react"
import MainNavigation from "@/components/main-navigation"
import MainFooter from "@/components/main-footer"
import type { User } from "@/lib/auth-context"

interface DashboardClientProps {
  user: User
  enrollments: any[]
  recommendedCourses: any[]
}

export default function DashboardClient({ user, enrollments, recommendedCourses }: DashboardClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("my-courses")

  // Calculate overall progress across all courses
  const totalLessons = enrollments.reduce((acc, course) => acc + course.totalLessons, 0)
  const completedLessons = enrollments.reduce((acc, course) => acc + course.completedLessons, 0)
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      <div className="flex-1 bg-gray-50">
        {/* Dashboard Header */}
        <div className="bg-purple-700 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white mr-4">
                  <Image
                    src={
                      user.image ||
                      `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(user.name.charAt(0))}`
                    }
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
                  <p className="text-purple-100">{user.email}</p>
                </div>
              </div>
              <div>
                <Link href="/profile">
                  <Button variant="outline" className="bg-white text-purple-700 hover:bg-purple-50">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="my-courses" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="my-courses">My Courses</TabsTrigger>
                  <TabsTrigger value="certificates">Certificates</TabsTrigger>
                  <TabsTrigger value="notes">My Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="my-courses">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">My Courses</h2>

                    {enrollments.length > 0 ? (
                      <div className="space-y-4">
                        {enrollments.map((course) => (
                          <div
                            key={course.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4 relative h-48 md:h-auto">
                                <Image
                                  src={course.image || "/placeholder.svg"}
                                  alt={course.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-6 md:w-3/4">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                                <div className="flex items-center text-sm text-gray-600 mb-4">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {course.duration}
                                </div>
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">
                                      {course.completedLessons} of {course.totalLessons} lessons completed
                                    </span>
                                    <span className="font-medium text-gray-900">
                                      {Math.round((course.completedLessons / course.totalLessons) * 100)}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={Math.round((course.completedLessons / course.totalLessons) * 100)}
                                    className="h-2"
                                  />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                  <Link href={`/academy/courses/${course.slug}/learn`}>
                                    <Button className="bg-purple-700 hover:bg-purple-800">
                                      {course.completedLessons > 0 ? "Continue Learning" : "Start Learning"}
                                    </Button>
                                  </Link>
                                  <Link href={`/academy/courses/${course.slug}`}>
                                    <Button variant="outline" className="border-purple-700 text-purple-700">
                                      Course Details
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <div className="mb-4">
                          <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                        <p className="text-gray-600 mb-6">
                          You haven't enrolled in any courses yet. Browse our catalog to find courses that interest you.
                        </p>
                        <Link href="/academy">
                          <Button className="bg-purple-700 hover:bg-purple-800">Browse Courses</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="certificates">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">My Certificates</h2>

                    {enrollments.some((course) => course.completedAt) ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {enrollments
                          .filter((course) => course.completedAt)
                          .map((course) => (
                            <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                              <div className="relative h-40 mb-4 bg-gray-100 rounded-md overflow-hidden">
                                <Image src="/formal-certificate.png" alt="Certificate" fill className="object-cover" />
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                              <p className="text-sm text-gray-600 mb-4">
                                Completed on {new Date(course.completedAt).toLocaleDateString()}
                              </p>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-purple-700 text-purple-700">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                                  <FileText className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <div className="mb-4">
                          <Award className="h-12 w-12 text-gray-400 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
                        <p className="text-gray-600 mb-6">
                          Complete a course to earn a certificate. Certificates can be downloaded or shared online.
                        </p>
                        {enrollments.length > 0 ? (
                          <Link href={`/academy/courses/${enrollments[0].slug}/learn`}>
                            <Button className="bg-purple-700 hover:bg-purple-800">Continue Learning</Button>
                          </Link>
                        ) : (
                          <Link href="/academy">
                            <Button className="bg-purple-700 hover:bg-purple-800">Browse Courses</Button>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="notes">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">My Notes</h2>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="mb-6">
                        <label htmlFor="course-filter" className="block text-sm font-medium text-gray-700 mb-1">
                          Filter by Course
                        </label>
                        <select
                          id="course-filter"
                          className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                          <option value="">All Courses</option>
                          {enrollments.map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {enrollments.length > 0 ? (
                        <div className="space-y-4">
                          <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-gray-900">AI Leadership Fundamentals</h3>
                                <p className="text-sm text-gray-600">Lesson: Key Concepts and Terminology</p>
                              </div>
                              <span className="text-xs text-gray-500">2 days ago</span>
                            </div>
                            <p className="text-gray-700 mb-3">
                              Important to remember the difference between narrow AI and general AI. Narrow AI is
                              designed for specific tasks while general AI would have broader capabilities across
                              domains.
                            </p>
                            <div className="flex justify-end">
                              <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                                Edit
                              </Button>
                            </div>
                          </div>

                          <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-gray-900">AI for Business Strategy</h3>
                                <p className="text-sm text-gray-600">Lesson: Identifying AI Opportunities</p>
                              </div>
                              <span className="text-xs text-gray-500">1 week ago</span>
                            </div>
                            <p className="text-gray-700 mb-3">
                              Three key areas to look for AI opportunities: processes with repetitive tasks, areas with
                              large amounts of data, and decision points that would benefit from prediction.
                            </p>
                            <div className="flex justify-end">
                              <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
                          <p className="text-gray-600">
                            You haven't taken any notes yet. Notes can be added while watching lessons.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                    <Image
                      src={
                        user.image ||
                        `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(user.name.charAt(0))}`
                      }
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 mt-1">{user.role === "admin" ? "Administrator" : "Student"}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full border-purple-700 text-purple-700">
                      <LucideUser className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h2>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Overall Completion</span>
                    <span className="font-medium text-gray-900">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-gray-700">Courses Enrolled</span>
                    </div>
                    <span className="font-medium">{enrollments.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-gray-700">Lessons Completed</span>
                    </div>
                    <span className="font-medium">
                      {completedLessons} / {totalLessons}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-gray-700">Certificates Earned</span>
                    </div>
                    <span className="font-medium">{enrollments.filter((course) => course.completedAt).length}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended for You</h2>
                <div className="space-y-4">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="flex items-start">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{course.title}</h3>
                        <div className="flex items-center text-xs text-gray-600 mt-1 mb-2">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{course.duration}</span>
                        </div>
                        <Link href={`/academy/courses/${course.slug}`}>
                          <Button variant="link" size="sm" className="h-auto p-0 text-purple-700">
                            View Course
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link href="/academy">
                    <Button variant="outline" className="w-full border-purple-700 text-purple-700">
                      Browse All Courses
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Learning Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Learning Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-gray-700">This Week</span>
                    </div>
                    <span className="font-medium">3h 45m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-gray-700">Learning Streak</span>
                    </div>
                    <span className="font-medium">5 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Play className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-gray-700">Last Session</span>
                    </div>
                    <span className="font-medium">Today</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button variant="link" className="w-full justify-center text-purple-700 p-0">
                    View Detailed Stats
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  )
}
