import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { requireAuth } from "@/lib/auth-utils";
import { executeQuery } from "@/lib/db";
import { enrollInCourse } from "@/lib/actions/enrollment";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CheckoutComponent from "@/components/academy/CheckoutComponent";
import { StripeWrapper } from "@/components/StripeProvider";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

interface CheckoutPageProps {
  params: {
    slug: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  // Require authentication
  const user = await requireAuth(
    "/auth/signin?callbackUrl=/academy/courses/" + params.slug + "/checkout"
  );
  const slug = params.slug;

  // Get the course
  const courses = await executeQuery(
    `
    SELECT id, title, price, image, instructor, instructor_image
    FROM courses
    WHERE slug = $1
    LIMIT 1
  `,
    [params.slug]
  );

  if (!courses || courses.length === 0) {
    notFound();
  }

  const course = courses[0];

  // Check if user is already enrolled
  const enrollments = await executeQuery(
    `
    SELECT id
    FROM enrollments
    WHERE user_id = $1 AND course_id = $2
    LIMIT 1
  `,
    [user.id, course.id]
  );

  if (enrollments && enrollments.length > 0) {
    redirect(`/academy/courses/${params.slug}/learn`);
  }

  // Handle enrollment
  async function handleEnrollment(formData: FormData) {
    "use server";
    // process payment using stripe

    // In a real app, you would process the payment here

    // For now, we'll just enroll the user
    const result = await enrollInCourse(course.id, "pi_mock_payment_intent_id");

    if (result.success) {
      redirect(`/academy/courses/${params.slug}/success`);
    } else {
      // Handle error
      console.error("Enrollment failed:", result);
      redirect(
        `/academy/courses/${params.slug}/checkout?error=enrollment_failed`
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href={`/academy/courses/${params.slug}`}
              className="text-purple-700 hover:underline"
            >
              &larr; Back to course
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Purchase</CardTitle>
                  <CardDescription>
                    Enter your payment details to enroll in this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StripeWrapper amount={convertToSubcurrency(course.price)}>
                    <CheckoutComponent
                      param={slug}
                      course={course}
                      user={user}
                    />
                  </StripeWrapper>
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
                      <p className="text-sm text-gray-500">
                        By {course.instructor}
                      </p>
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
  );
}
