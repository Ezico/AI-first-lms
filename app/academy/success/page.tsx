"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Download,
  Mail,
  ArrowRight,
  Package,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const searchParams = useSearchParams();
  const cohortDate = searchParams.get("cohortDate");
  const slug = searchParams.get("slug");

  // for slug, replace - with space
  const formattedSlug = slug ? slug.replace(/-/g, " ") : "Course";
  // console.log("Cohort Date:", cohortDate);
  // console.log("Slug:", slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 transition-all duration-700 ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1
            className={`text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            Payment Successful!
          </h1>
          <p
            className={`text-xl text-gray-600 transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details Card
        <Card
          className={`mb-8 transition-all duration-700 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Order Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">#ORD-2024-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">$99.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">•••• 4242</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Delivery Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">john@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-medium">Instant</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Action Cards */}
        {/* <div
          className={`grid md:grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Download className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-sm text-gray-600 mb-4">
                Access your digital products
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Download Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Receipt</h3>
              <p className="text-sm text-gray-600 mb-4">
                Confirmation sent to your inbox
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Email
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Track Order</h3>
              <p className="text-sm text-gray-600 mb-4">
                Monitor your order status
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Track Now
              </Button>
            </CardContent>
          </Card>
        </div> */}

        {/* Next Steps */}
        <Card
          className={`mb-8 transition-all duration-700 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              What happens next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">Email Notification</p>
                  <p className="text-sm text-gray-600">
                    you will recieve an email remainder for your selected cohort
                    date, <br /> you selected on <b>{cohortDate}</b> for the
                    course <b>{formattedSlug}</b>
                  </p>
                </div>
              </div>
              {/* <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">Email Confirmation</p>
                  <p className="text-sm text-gray-600">
                    Receipt and order details sent to your email
                  </p>
                </div>
              </div> */}
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">Customer Support</p>
                  <p className="text-sm text-gray-600">
                    Need help? Our team is here to assist you 24/7
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/academy/dashboard" className="flex items-center">
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/academy">Continue Shopping</Link>
          </Button>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-8 transition-all duration-700 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <p className="text-sm text-gray-500">
            Questions about your order?{" "}
            <Link
              href="/contact"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
