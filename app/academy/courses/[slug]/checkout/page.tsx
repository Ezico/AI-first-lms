import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { requireAuth } from "@/lib/auth-utils"
import { executeQuery } from "@/lib/db"
import { enrollInCourse } from "@/lib/actions/enrollment"

interface CheckoutPageProps {
  params: {
    slug: string
  }
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  // Require authentication
  const user = requireAuth("/auth/signin?callbackUrl=/academy/courses/" + params.slug + "/checkout")

  // Get the course
  const courses = await executeQuery(
    `
    SELECT id, title, price, image, instructor, instructor_image
    FROM courses
    WHERE slug = $1
    LIMIT 1
  `,
    [params.slug],
  )

  if (!courses || courses.length === 0) {
    notFound()
  }

  const course = courses[0]

  // Check if user is already enrolled
  const enrollments = await executeQuery(
    `
    SELECT id
    FROM enrollments
    WHERE user_id = $1 AND course_id = $2
    LIMIT 1
  `,
    [user.id, course.id],
  )

  if (enrollments && enrollments.length > 0) {
    redirect(`/academy/courses/${params.slug}/learn`)
  }

  // Handle enrollment
  async function handleEnrollment(formData: FormData) {
    "use server"

    // In a real app, you would process the payment here
    // For now, we'll just enroll the user
    const result = await enrollInCourse(course.id, "pi_mock_payment_intent_id")

    if (result.success) {
      redirect(`/academy/courses/${params.slug}/success`)
    } else {
      // Handle error
      console.error("Enrollment failed:", result)
      redirect(`/academy/courses/${params.slug}/checkout?error=enrollment_failed`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href={`/academy/courses/${params.slug}`} className="text-purple-700 hover:underline">
              &larr; Back to course
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Purchase</CardTitle>
                  <CardDescription>Enter your payment details to enroll in this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={handleEnrollment}>
                    <div className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" defaultValue={user.name.split(" ")[0]} required />
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" defaultValue={user.name.split(" ").slice(1).join(" ")} required />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} required />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Payment Information */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">Payment Information</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="4242 4242 4242 4242" required />
                            <p className="text-xs text-gray-500 mt-1">
                              For testing, use 4242 4242 4242 4242 with any future date and any CVC
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                              <Label htmlFor="expiry-month">Month</Label>
                              <Input id="expiry-month" placeholder="MM" required />
                            </div>
                            <div className="col-span-1">
                              <Label htmlFor="expiry-year">Year</Label>
                              <Input id="expiry-year" placeholder="YY" required />
                            </div>
                            <div className="col-span-1">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" required />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center space-x-2 mb-1">
                            <Image src="/visa-logo.png" alt="Visa" width={32} height={10} />
                            <Image src="/mastercard-logo.png" alt="Mastercard" width={32} height={20} />
                            <Image src="/amex-logo.png" alt="American Express" width={32} height={20} />
                            <Image src="/paypal-logo.png" alt="PayPal" width={32} height={20} />
                          </div>
                          <p>Your payment information is secure</p>
                        </div>
                        <Button type="submit" className="bg-purple-700 hover:bg-purple-800">
                          Complete Purchase
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-500">By {course.instructor}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Original Price</span>
                      <span>${Number.parseFloat(course.price).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${Number.parseFloat(course.price).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 text-xs text-gray-500 flex flex-col items-start">
                  <p className="mb-1">30-Day Money-Back Guarantee</p>
                  <p>Full Lifetime Access</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
