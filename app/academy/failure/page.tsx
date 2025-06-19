"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  XCircle,
  CreditCard,
  RefreshCw,
  MessageCircle,
  AlertTriangle,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Error Animation */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6 transition-all duration-700 ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          >
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1
            className={`text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            Payment Failed
          </h1>
          <p
            className={`text-xl text-gray-600 transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {
              "We couldn't process your payment. Don't worry, no charges were made."
            }
          </p>
        </div>

        {/* Error Details Card */}
        {/* <Card
          className={`mb-8 border-red-200 transition-all duration-700 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Payment Error Details
                </h3>
                <p className="text-gray-600 mb-4">
                  Your card was declined. This could be due to insufficient
                  funds, an expired card, or your bank blocking the transaction
                  for security reasons.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Error Code:</span>
                      <span className="font-medium ml-2">CARD_DECLINED</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-medium ml-2">
                        #TXN-2024-ERR-001
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium ml-2">$99.00</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Card:</span>
                      <span className="font-medium ml-2">•••• 4242</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Quick Actions */}
        <div
          className={`grid md:grid-cols-2 gap-4 mb-8 transition-all duration-700 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Try Again</h3>
                  <p className="text-sm text-gray-600">
                    Retry with the same payment method
                  </p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Retry Payment
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Different Card</h3>
                  <p className="text-sm text-gray-600">
                    Use another payment method
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-green-300 text-green-700 hover:bg-green-50"
              >
                Change Payment Method
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Common Solutions */}
        <Card
          className={`mb-8 transition-all duration-700 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Common Solutions
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">Check your card details</p>
                  <p className="text-sm text-gray-600">
                    Verify card number, expiry date, and CVV are correct
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">Ensure sufficient funds</p>
                  <p className="text-sm text-gray-600">
                    Check your account balance or available credit limit
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">Contact your bank</p>
                  <p className="text-sm text-gray-600">
                    Your bank may have blocked the transaction for security
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-sm">
                    Try a different payment method
                  </p>
                  <p className="text-sm text-gray-600">
                    Use another card, PayPal, or alternative payment option
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Payment Methods */}
        <Card
          className={`mb-8 transition-all duration-700 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Alternative Payment Methods
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-1"
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs">Credit Card</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-1"
              >
                <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  P
                </div>
                <span className="text-xs">PayPal</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-1"
              >
                <div className="w-5 h-5 bg-black rounded text-white text-xs flex items-center justify-center font-bold">
                  A
                </div>
                <span className="text-xs">Apple Pay</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-1"
              >
                <div className="w-5 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  G
                </div>
                <span className="text-xs">Google Pay</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Options */}
        {/* <Card
          className={`mb-8 transition-all duration-700 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Need Help?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Call Support</p>
                  <p className="text-sm text-gray-600">1-800-123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Email Support</p>
                  <p className="text-sm text-gray-600">support@company.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Action Buttons */}
        {/* <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-900 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Payment Again
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/checkout">Update Payment Method</Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link href="/">Return to Store</Link>
          </Button>
        </div> */}

        {/* Footer */}
        {/* <div
          className={`text-center mt-8 transition-all duration-700 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <p className="text-sm text-gray-500">
            Your cart items are saved.{" "}
            <Link
              href="/cart"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View Cart
            </Link>{" "}
            or{" "}
            <Link
              href="/support"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}
