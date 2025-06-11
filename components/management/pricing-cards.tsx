import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingCards() {
  const plans = [
    {
      name: "Standard",
      price: "$499",
      description: "Everything you need to get started with AI project management",
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
      price: "$899",
      description: "Advanced features and personalized support for serious learners",
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
  ]

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
            <Card key={index} className={`relative bg-white ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-2">one-time payment</span>
                </div>
                <CardDescription className="mt-2 text-gray-600">{plan.description}</CardDescription>
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
                <Button
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary text-white" : "bg-primary hover:bg-primary text-white"}`}
                >
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
