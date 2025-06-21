"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function PricingCards() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const cohortDates = [
    { value: "2023-07-08", label: "July 8, 2023" },
    { value: "2023-09-02", label: "September 2, 2023" },
    { value: "2023-11-04", label: "November 4, 2023" },
  ];

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  const plans = [
    {
      name: "Standard",
      price: 499,
      slug: "launch-your-project-management-career-with-ai-standard-",
      description:
        "Everything you need to get started with AI project management",
      features: [
        "8-week course access",
        "Basic AI tools integration",
        "Community forum access",
        "Digital certificate",
        "2 practice projects",
      ],
    },
    {
      name: "Premium",
      price: 899,
      slug: "launch-your-project-management-career-with-ai-premium-",
      description:
        "Advanced features and personalized support for serious learners",
      features: [
        "Everything in Standard",
        "1-on-1 mentorship sessions",
        "Advanced AI tools access",
        "Job placement assistance",
        "Lifetime course updates",
        "4 portfolio-ready projects",
      ],
      popular: true,
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for your career goals and budget.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white ${plan.popular ? "border-primary shadow-lg" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">one-time payment</span>
                </div>
                <CardDescription className="mt-2 text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <div className="container px-4 md:px-6">
                  <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div>
                      <label
                        htmlFor="cohort-date"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Select Cohort Start Date
                      </label>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                        <Select onValueChange={handleDateChange}>
                          <SelectTrigger className="w-full border-gray-200 focus:border-gray-500">
                            <SelectValue placeholder="Choose a date" />
                          </SelectTrigger>
                          <SelectContent>
                            {cohortDates.map((date) => (
                              <SelectItem key={date.value} value={date.value}>
                                {date.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Link
                        href={`/academy/courses/simple/${plan.slug}/checkout?cohortDate=${selectedDate}`}
                      >
                        <Button
                          className={`w-full mt-5 ${plan.popular ? " bg-primary hover:bg-primary text-white" : "bg-primary hover:bg-primary text-white"}`}
                        >
                          {loading ? "Processing..." : "Enroll Now"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
