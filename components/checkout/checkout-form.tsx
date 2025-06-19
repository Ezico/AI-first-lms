"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CreditCard } from "lucide-react";

interface CheckoutFormProps {
  course: {
    id: number;
    title: string;
    price: string;
    instructor: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
  };
  onCheckout: () => Promise<void>;
}

export function CheckoutForm({ course, user, onCheckout }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ").slice(1).join(" ") || "",
    email: user?.email,
    country: "US",
    postalCode: "",
  });

  // console.log(user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      await onCheckout();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing your payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Billing Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={billingInfo.firstName}
              onChange={(e) =>
                setBillingInfo((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={billingInfo.lastName}
              onChange={(e) =>
                setBillingInfo((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={billingInfo.email}
              onChange={(e) =>
                setBillingInfo((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              value={billingInfo.country}
              onChange={(e) =>
                setBillingInfo((prev) => ({ ...prev, country: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={billingInfo.postalCode}
              onChange={(e) =>
                setBillingInfo((prev) => ({
                  ...prev,
                  postalCode: e.target.value,
                }))
              }
              placeholder="12345"
            />
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
        />
        <div className="text-sm">
          <Label htmlFor="terms" className="cursor-pointer">
            I agree to the{" "}
            <a
              href="/terms"
              target="_blank"
              className="text-purple-700 hover:underline"
              rel="noreferrer"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              target="_blank"
              className="text-purple-700 hover:underline"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
          </Label>
        </div>
      </div>

      {/* Payment Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading || !agreedToTerms}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 text-lg font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Complete Purchase - ${Number.parseFloat(course.price).toFixed(2)}
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-3">
          You will be redirected to Stripe's secure checkout to complete your
          payment
        </p>
      </div>
    </form>
  );
}
