import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronRight } from "lucide-react"
import MainNavigation from "@/components/main-navigation"
import MainFooter from "@/components/main-footer"
import { allCourses } from "@/data/courses"

interface SuccessPageProps {
  params: {
    slug: string
  }
}

export default function SuccessPage({ params }: SuccessPageProps) {
  const course = allCourses.find((c) => c.slug === params.slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      <div className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase Successful!</h1>
              <p className="text-lg text-gray-600">
                Thank you for enrolling in <span className="font-medium">{course.title}</span>
              </p>
            </div>

            <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-lg mb-8">
              <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900 mb-1">{course.title}</h2>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Instructor:</span> {course.instructor}
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Check Your Email</h3>
                  <p className="text-gray-600">
                    We've sent a confirmation email with your receipt and course access details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Access Your Dashboard</h3>
                  <p className="text-gray-600">
                    Visit your student dashboard to access your course materials and track your progress.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Start Learning</h3>
                  <p className="text-gray-600">
                    Begin your learning journey and take the first step toward mastering AI implementation.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/academy/dashboard">
                <Button className="bg-purple-700 hover:bg-purple-800 px-8 py-6">
                  Go to My Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/academy/courses/${course.slug}/learn`}>
                <Button variant="outline" className="border-purple-700 text-purple-700 hover:bg-purple-50 px-8 py-6">
                  Start Learning Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <MainFooter />
    </div>
  )
}
