"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export function StripeWrapper({
  children,
  amount,
}: {
  children: React.ReactNode;
}) {
  return (
    <Elements
      options={{
        mode: "payment",
        amount: amount,
        currency: "usd",
      }}
      stripe={stripePromise}
    >
      {children}
    </Elements>
  );
}
