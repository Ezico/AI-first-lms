"use client";

import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SimpleCheckoutButton({
  slug,
  user,
  price,
}: {
  slug: string;
  user: any;
  price: any;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/simple-course", {
        method: "POST",
        body: JSON.stringify({ slug, user }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Error processing payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 text-lg font-medium"
    >
      <CreditCard className="mr-2 h-5 w-5" />

      {loading
        ? "Processing..."
        : `Complete Purchase - ${Number.parseFloat(price).toFixed(2)}`}
    </Button>
  );
}
