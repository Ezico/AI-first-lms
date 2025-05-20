"use server"

import { redirect } from "next/navigation"
import Stripe from "stripe"

// In a real implementation, this would be stored securely in environment variables
// and never exposed in client-side code
const stripe = new Stripe(
  "sk_test_51Gziy4Ej7vgoVuIzXLb3JtNoyDh1tsTZhvLMAWTFjXNztFpQoPAhghCjgxtqLapGHbV79SOUSC9DwMtjJFZ274D100cwZgy2Q7",
  {
    apiVersion: "2023-10-16",
  },
)

export async function createCheckoutSession(formData: FormData) {
  const courseId = formData.get("courseId") as string
  const courseSlug = formData.get("courseSlug") as string
  const courseTitle = formData.get("courseTitle") as string
  const coursePrice = Number(formData.get("coursePrice"))
  const email = formData.get("email") as string

  try {
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: courseTitle,
              description: `Enrollment in ${courseTitle}`,
            },
            unit_amount: coursePrice * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/academy/courses/${courseSlug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/academy/courses/${courseSlug}`,
      customer_email: email,
      metadata: {
        courseId,
      },
    })

    // Redirect to Stripe Checkout
    if (session.url) {
      redirect(session.url)
    }

    return { success: true, sessionId: session.id }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return { success: false, error: "Failed to create checkout session" }
  }
}

export async function createPaymentIntent(formData: FormData) {
  const amount = Number(formData.get("amount"))
  const courseId = formData.get("courseId") as string

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: "usd",
      metadata: {
        courseId,
      },
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return {
      success: false,
      error: "Failed to create payment intent",
    }
  }
}
