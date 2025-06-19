// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.json();
  const { user, course } = body;
  try {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: {
        userId: user.id,
        courseId: course.id,
        courseSlug: course.slug,
        type: "modular",
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              // description: course.description,
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        courseId: course.id,
        courseSlug: course.slug,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/academy/success?${course.slug}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/academy/failure`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Stripe session creation failed" },
      { status: 500 }
    );
  }
}
