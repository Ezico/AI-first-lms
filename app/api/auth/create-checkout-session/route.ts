import { stripe } from "@/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { course, user } = req.body;

  console.log(course, user);
  // try {
  //   // 1. Create a Stripe customer
  //   const customer = await stripe.customers.create({
  //     email: user.email,
  //     name: user.name,
  //     metadata: {
  //       userId: user.id,
  //     },
  //   });

  //   // 2. Create the Stripe Checkout Session
  //   const session = await stripe.checkout.sessions.create({
  //     mode: "payment",
  //     customer: customer.id,
  //     line_items: [
  //       {
  //         price_data: {
  //           currency: "usd",
  //           product_data: {
  //             name: course.title,
  //             description: course.description,
  //           },
  //           unit_amount: course.price * 100,
  //         },
  //         quantity: 1,
  //       },
  //     ],
  //     metadata: {
  //       courseId: course.id,
  //       userId: user.id,
  //     },
  //     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/academy/success`,
  //     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/academy/failure`,
  //   });

  //   res.status(200).json({ url: session.url });
  // } catch (err) {
  //   console.error("Stripe checkout session error:", err);
  //   res.status(500).json({ error: "Something went wrong" });
  // }
}
