"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createProductCheckoutSession } from "@/lib/actions/product-purchase-actions";

interface ProductPurchaseFormProps {
  productId: number;
  productSlug: string;
}

export default function ProductPurchaseForm({
  productId,
  productSlug,
}: ProductPurchaseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.set("productId", productId.toString());
      formData.set("email", email);

      const result = await createProductCheckoutSession(formData);

      if (result.success && result.sessionUrl) {
        // Redirect to Stripe Checkout
        window.location.href = result.sessionUrl;
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create checkout session",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePurchase} className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Course materials will be sent to this email
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-purple-700 hover:bg-purple-800"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Purchase Now"}
      </Button>
    </form>
  );
}
