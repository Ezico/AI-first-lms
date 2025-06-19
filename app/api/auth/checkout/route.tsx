import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  const { courseId, userId, amount, email } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: convertToSubcurrency(amount), // convert to cents
    currency: "usd",
    metadata: {
      courseId,
      userId,
    },
    receipt_email: email,
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
