"use client";

import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { enrollInCourse } from "@/lib/actions/enrollment";
import { redirect, useParams } from "next/navigation";

export default function CheckoutForm({ course, user, slug}: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
const param = useParams()
  // console.log(param.slug)
  useEffect(() => {
    // Create PaymentIntent
    const createIntent = async () => {
      const res = await fetch("/api/auth/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          userId: user.id,
          email: user.email,
          amount: convertToSubcurrency(course.price),
        }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    createIntent();
  }, [course, user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          email: user.email,
        },
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent?.status === "succeeded") {
      const enroll = await enrollInCourse(course.id, result.paymentIntent?.id);
       if (enroll.success) {
            redirect(`/academy/courses/${param.slug}/success`);
          } else {
            // Handle error
            console.error("Enrollment failed:", result);
            redirect(
              `/academy/courses/${param.slug}/checkout?error=enrollment_failed`
            );
      // Redirect or unlock course access
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <CardElement className="p-4 border rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Pay ${course.price}
      </button>
    </form>
  );
}
