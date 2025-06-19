import { sql } from "@/lib/db";
import { stripe } from "@/lib/stripe"; // make sure this is your stripe SDK setup
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { slug, user } = await req.json();

  const course = await sql`
    SELECT * FROM "SimpleCourse" WHERE "slug" = ${slug} LIMIT 1;
  `;

  if (!course.length) {
    return new NextResponse("Course not found", { status: 404 });
  }

  const selected = course[0];

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: {
      userId: user.id,
      courseId: selected.id,
      courseSlug: selected.slug,
      type: "modular",
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(Number(selected.price) * 100), // convert dollars to cents
          product_data: {
            name: selected.title,
            description: selected.description,
            images: [selected.imageUrl],
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      courseId: selected.id,
      slug: selected.slug,
      type: "simple",
      userId: user.id,
      email: user.email,
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/academy/success?${selected.slug}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/academy/failure`,
  });

  return NextResponse.json({ url: session.url });
}
