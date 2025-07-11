import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { requireAuth } from "@/lib/auth-utils";
import { executeQuery } from "@/lib/db";
import { createCourseCheckoutSession } from "@/lib/actions/stripe-checkout-actions";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Suspense } from "react";
import { AlertCircle, CreditCard, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    canceled?: string;
    error?: string;
  };
}

export default async function CheckoutPage({
  params,
  searchParams,
}: CheckoutPageProps) {
  // Require authentication
  const user = await requireAuth(
    "/auth/signin?callbackUrl=/academy/courses/" + params.slug + "/checkout"
  );

  // Get the course
  const courses = await executeQuery(
    `SELECT id, title, price, image, instructor, instructor_image, description, duration
     FROM courses WHERE slug = $1 LIMIT 1`,
    [params.slug]
  );

  if (!courses || courses.length === 0) {
    notFound();
  }

  const course = courses[0];

  // Check if user is already enrolled
  const enrollments = await executeQuery(
    `SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2 LIMIT 1`,
    [user.id, course.id]
  );

  if (enrollments && enrollments.length > 0) {
    redirect(`/academy/courses/${params.slug}/learn`);
  }

  // Handle checkout session creation
  // async function handleCheckout() {
  //   "use server";

  //   const result = await createCourseCheckoutSession(
  //     user,
  //     course.id,
  //     params.slug
  //   );

  //   if (result.success && result.sessionUrl) {
  //     redirect(result.sessionUrl);
  //   } else {
  //     redirect(
  //       `/academy/courses/${params.slug}/checkout?error=${encodeURIComponent(result.error || "Payment failed")}`
  //     );
  //   }
  // }

  async function handleCheckout() {
    "use server";
    console.log("clicked");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, course }),
      }
    );

    const data = await res.json();
    if (data.url) {
      redirect(data.url);
    } else {
      alert("Something went wrong!");
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

          {/* Error Alert */}
          {searchParams.error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {decodeURIComponent(searchParams.error)}
              </AlertDescription>
            </Alert>
          )}

          {/* Canceled Alert */}
          {searchParams.canceled && (
            <Alert className="mb-6 border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Payment was canceled. You can try again when you're ready.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Checkout Information */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Secure Checkout
                  </CardTitle>
                  <CardDescription>
                    Complete your purchase to get instant access to this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Security Features */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-green-900">
                            Secure Payment
                          </h3>
                          <p className="text-sm text-green-700 mt-1">
                            Your payment information is encrypted and processed
                            securely by Stripe. We never store your credit card
                            details.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Course Access Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-blue-900">
                            Instant Access
                          </h3>
                          <p className="text-sm text-blue-700 mt-1">
                            Get immediate access to all course materials after
                            successful payment. Start learning right away!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Accepted Payment Methods
                      </h3>
                      <div className="flex items-center space-x-4 mb-4">
                        <Image
                          src="/visa-logo.png"
                          alt="Visa"
                          width={40}
                          height={25}
                          className="opacity-70"
                        />
                        <Image
                          src="/mastercard-logo.png"
                          alt="Mastercard"
                          width={40}
                          height={25}
                          className="opacity-70"
                        />
                        <Image
                          src="/amex-logo.png"
                          alt="American Express"
                          width={40}
                          height={25}
                          className="opacity-70"
                        />
                        <div className="text-sm text-gray-600">Apple Pay</div>
                        <div className="text-sm text-gray-600">Google Pay</div>
                      </div>
                      <p className="text-sm text-gray-500">
                        All payments are processed securely through Stripe
                      </p>
                    </div>

                    <Separator />

                    {/* Checkout Form */}
                    <Suspense fallback={<div>Loading checkout...</div>}>
                      <CheckoutForm
                        course={course}
                        user={user}
                        onCheckout={handleCheckout}
                      />
                    </Suspense>
                  </div>
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
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        By {course.instructor}
                      </p>
                      {course.duration && (
                        <p className="text-xs text-gray-400 mt-1">
                          {course.duration}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Course Price</span>
                      <span>${Number.parseFloat(course.price).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>$0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${Number.parseFloat(course.price).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 text-xs text-gray-500 flex flex-col items-start space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Full Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3" />
                    <span>Secure Payment Processing</span>
                  </div>
                </CardFooter>
              </Card>

              {/* Trust Indicators */}
              <div className="mt-6 text-center">
                <div className="flex justify-center items-center space-x-2 text-xs text-gray-500 mb-2">
                  <Shield className="h-4 w-4" />
                  <span>SSL Encrypted</span>
                </div>
                <p className="text-xs text-gray-400">
                  Your personal and payment information is always safe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
