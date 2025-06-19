import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { executeQuery } from "@/lib/db";
import type { SuccessPageProps } from "@/types";
import { verifyCheckoutSession } from "@/lib/actions/stripe-checkout-actions";
import { requireAuth } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";

export default async function SuccessPage({
  params,
  searchParams,
}: SuccessPageProps) {
  const user = requireAuth();

  // Verify the Stripe checkout session
  let verificationResult = null;
  if (searchParams.session_id) {
    verificationResult = await verifyCheckoutSession(searchParams.session_id);
  }

  // Get course details
  const courses = await executeQuery(
    `SELECT id, title, description, image, instructor FROM courses WHERE slug = $1 LIMIT 1`,
    [params.slug]
  );

  if (!courses || courses.length === 0) {
    notFound();
  }

  const course = courses[0];

  // Check enrollment status
  const enrollments = await executeQuery(
    `SELECT id, enrolled_at FROM enrollments WHERE user_id = $1 AND course_id = $2 LIMIT 1`,
    [user.id, course.id]
  );

  const isEnrolled = enrollments && enrollments.length > 0;

  // Rest of the component remains the same, but add payment verification status
  const paymentVerified =
    verificationResult?.success && verificationResult?.paymentStatus === "paid";

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
      {paymentVerified && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Payment Confirmed</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            Your payment has been processed successfully and your enrollment is
            now active.
          </p>
        </div>
      )}
      <p className="mb-4">
        You have successfully enrolled in the course:{" "}
        <span className="font-medium">{course.title}</span>.
      </p>

      <p className="text-sm text-gray-500">Enrollment processing...</p>
      <Button>Go to Dashboard</Button>
    </div>
  );
}
