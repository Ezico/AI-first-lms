"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import {
  CheckCircle,
  Users,
  Calendar,
  Zap,
  Brain,
  Target,
  ArrowRight,
  Bot,
  Lightbulb,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import QuickViewModal from "@/components/WaitlistModal";

interface CourseDate {
  id: string;
  date: string;
  availability: "available" | "limited" | "waitlist";
  seatsLeft?: number;
}

const courseDates: CourseDate[] = [
  { id: "aug5", date: "August 5, 2024", availability: "limited", seatsLeft: 4 },
  { id: "oct7", date: "October 7, 2024", availability: "available" },
  { id: "jan6", date: "January 6, 2025", availability: "waitlist" },
];

const benefits = [
  {
    icon: <Brain className="h-8 w-8 text-blue-600" />,
    title: "AI-Powered Planning",
    description:
      "Master AI tools to create project plans 10x faster with intelligent automation and predictive insights.",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-600" />,
    title: "Streamlined Delivery",
    description:
      "Eliminate bottlenecks and reduce project timelines by 40% using AI-driven workflow optimization.",
  },
  {
    icon: <Target className="h-8 w-8 text-green-600" />,
    title: "Predictive Analytics",
    description:
      "Anticipate risks and opportunities before they happen with AI-powered project forecasting.",
  },
  {
    icon: <Users className="h-8 w-8 text-orange-600" />,
    title: "Team Collaboration",
    description:
      "Enhance team productivity with AI assistants that facilitate better communication and coordination.",
  },
  {
    icon: <Rocket className="h-8 w-8 text-red-600" />,
    title: "Competitive Advantage",
    description:
      "Stay ahead of the curve by implementing cutting-edge AI project management methodologies.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-yellow-600" />,
    title: "Innovation Mindset",
    description:
      "Develop the strategic thinking needed to identify and implement AI solutions in any project context.",
  },
];

const tools = [
  {
    name: "ChatGPT",
    description:
      "Advanced prompt engineering for project planning and stakeholder communication",
    logo: "🤖",
  },
  {
    name: "Notion AI",
    description: "Intelligent documentation and knowledge management systems",
    logo: "📝",
  },
  {
    name: "Zapier",
    description:
      "Automated workflows connecting your entire project management stack",
    logo: "⚡",
  },
];

const pricingTiers = [
  {
    name: "Standard",
    price: 799,
    slug: "deliver-smarter-projects-with-ai",
    features: [
      "8-week core curriculum",
      "AI tools training",
      "Basic capstone project",
      "Community access",
      "Certificate of completion",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 1299,
    slug: "deliver-smarter-projects-with-ai-pro",
    features: [
      "Everything in Standard",
      "1-on-1 mentoring sessions",
      "Advanced AI assistant build",
      "Industry case studies",
      "Job placement support",
      "Lifetime community access",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: 2499,
    slug: "deliver-smarter-projects-with-ai-premium",
    features: [
      "Everything in Pro",
      "Custom AI solution development",
      "Executive coaching sessions",
      "Company implementation support",
      "Speaking opportunity prep",
      "Alumni network access",
    ],
    popular: false,
  },
];

export default function AIProjectManagerFoundations() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <MainNavigation />
      {/* Hero Section */}
      <QuickViewModal
        courseName={"Deliver Smarter Projects with AI"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-600 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Deliver Smarter Projects with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Learn AI tools, streamline delivery, and build your own AI
              assistant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="#enroll">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
                >
                  Enroll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                variant="ghost"
                className="bg-primary text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Join Waitlist
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transform Your Project Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the AI tools and methodologies that are reshaping how
              successful projects are delivered
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Master Industry-Leading AI Tools
            </h2>
            <p className="text-xl text-gray-600">
              Get hands-on experience with the tools that are transforming
              project management
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="text-6xl mb-4">{tool.logo}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You'll Build
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your Capstone Project: A Custom AI Project Assistant
            </p>
          </div>
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-8">
                <Bot className="h-16 w-16" />
              </div>
              <h3 className="text-3xl font-bold text-center mb-6">
                Your Personal AI Project Assistant
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Core Features:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                      Automated project planning
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                      Risk assessment & mitigation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                      Stakeholder communication
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                      Progress tracking & reporting
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">
                    Advanced Capabilities:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                      Predictive analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                      Resource optimization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                      Meeting summarization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                      Custom workflow automation
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" id="enroll">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600">
              Select the tier that matches your career goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${tier.popular ? "ring-2 ring-blue-500 scale-105" : ""}`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {tier.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-blue-600 mt-4">
                    ${tier.price.toLocaleString()}
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/academy/courses/simple/${tier.slug}/checkout`}>
                    <Button
                      className={`w-full mt-8 ${tier.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-900"}`}
                      onClick={() => setSelectedTier(tier.name.toLowerCase())}
                    >
                      Select {tier.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
