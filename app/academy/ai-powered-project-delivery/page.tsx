import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  Users,
  Trophy,
  Zap,
  BookOpen,
  Target,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";

export default function CourseSalesPage() {
  const weeks = [
    {
      week: 1,
      title: "Foundations of AI Project Management",
      description:
        "Overview of Traditional ML and Generative AI lifecycles, PM roles in AI/ML vs. software projects",
      tools: "ChatGPT, Notion AI for planning",
      exercise: "AI-supported project scope draft",
    },
    {
      week: 2,
      title: "Scoping & Stakeholder Strategy",
      description:
        "Framing AI use cases and success metrics, stakeholder mapping and alignment",
      tools: "RACI matrix, AI-assisted charter drafting",
      exercise: "Stakeholder map + project charter",
    },
    {
      week: 3,
      title: "Planning AI Projects",
      description:
        "Building WBS for AI/GenAI projects, Agile AI: CRISP-DM, sprint estimation",
      tools: "Notion AI, planning templates",
      exercise: "AI-assisted sprint backlog + WBS",
    },
    {
      week: 4,
      title: "Data Readiness & Tech Dependencies",
      description:
        "Data sourcing, cleaning, and labeling considerations, technical feasibility scoring",
      tools: "Data checklist, risk register",
      exercise: "Data plan + risk register",
    },
    {
      week: 5,
      title: "Risk, Ethics & Forecasting",
      description:
        "Ethical AI principles, fairness, bias mitigation, and risk forecasting",
      tools: "ClickUp, Zapier, ChatGPT for risk planning",
      exercise: "Risk mitigation strategy",
    },
    {
      week: 6,
      title: "AI Workflow Automation",
      description:
        "Automating reports, reminders, and task handoffs with end-to-end automation",
      tools: "AI-powered automation stack",
      exercise: "Build and test one AI automation",
    },
    {
      week: 7,
      title: "Building Your AI PM Assistant",
      description:
        "Create no-code chatbot for standups, status reports, and team Q&A",
      tools: "Voiceflow, prompt packs",
      exercise: "MVP deployment of your assistant",
    },
    {
      week: 8,
      title: "Capstone Demo Day",
      description:
        "Presentation of dual-track capstone project with peer and instructor feedback",
      tools: "Final presentations + networking",
      exercise: "Portfolio showcase",
    },
  ];

  const benefits = [
    "Master AI project management methodologies",
    "Build automation workflows that save hours weekly",
    "Create your own AI PM assistant",
    "Develop portfolio-ready capstone projects",
    "Network with AI-focused project managers",
    "Get mentorship from industry experts",
    "Access to exclusive AI PM tools and templates",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <MainNavigation />
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Zap className="w-4 h-4 mr-2" />
              Starting September 6th, 2024
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Project Delivery
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Master the art of managing AI projects with cutting-edge tools,
              proven methodologies, and hands-on experience in an 8-week
              intensive cohort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href={"#pricing"}>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />8 Weeks • Sept 6 - Oct 25
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Live Sessions + Peer Collaboration
              </div>
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Comprehensive Capstone
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Program Overview
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive 8-week journey combining strategy, tooling,
            mentorship, and real-world application
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Live Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Weekly live sessions with expert instructors, interactive
                workshops, and real-time Q&A
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>Peer Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Work alongside fellow AI project managers, share insights, and
                build lasting professional connections
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Practical Application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Build real AI automation tools and complete portfolio-ready
                capstone projects
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What You'll Gain */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What You'll Gain
            </h2>
            <p className="text-lg text-gray-600">
              Transform your project management skills with AI-powered
              capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Curriculum */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              8-Week Curriculum
            </h2>
            <p className="text-lg text-gray-600">
              A structured journey from foundations to advanced AI project
              management
            </p>
          </div>

          <div className="grid gap-6">
            {weeks.map((week) => (
              <Card
                key={week.week}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Week {week.week}
                      </Badge>
                      <CardTitle className="text-xl">{week.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {week.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Tools & Technologies
                      </h4>
                      <p className="text-sm text-gray-600">{week.tools}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">
                        Hands-on Exercise
                      </h4>
                      <p className="text-sm text-gray-600">{week.exercise}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Capstone */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Capstone Project
            </h2>
            <p className="text-lg text-gray-600">
              Every participant completes the full spectrum of AI project
              management deliverables
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-2 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-700">
                Complete AI Project Management Portfolio
              </CardTitle>
              <CardDescription className="text-lg">
                Build both strategic planning and practical tooling capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 text-blue-500 mr-2" />
                    Strategic Deliverables
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      Use Case Charter & Success Metrics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      AI-Specific WBS & Project Roadmap
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      Data Plan & Risk Register
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      KPI Dashboard & Launch Plan
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-purple-500 mr-2" />
                    Practical Tools & Automation
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                      AI-Powered Risk Automation System
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                      Custom Workflow via ClickUp/Zapier
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                      Personal AI PM Assistant (Voiceflow/OpenAI)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                      Portfolio Showcase & Demo Video
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <p className="text-center text-gray-700 font-medium">
                  🎯 <strong>Outcome:</strong> Graduate with a complete AI
                  project delivery plan, functional automation suite, and
                  portfolio-ready showcase for hiring managers or enterprise
                  deployment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" id="pricing">
              Investment in Your AI PM Future
            </h2>
            <p className="text-lg text-gray-600">
              Complete 8-week program with everything you need to excel in AI
              project management
            </p>
          </div>

          <Card className="max-w-2xl mx-auto border-2 border-blue-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-purple-700"></div>
            <CardHeader className="text-center pt-8">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
                Full Cohort Experience
              </Badge>
              <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
                $1,950
              </CardTitle>
              <CardDescription className="text-lg">
                Complete 8-week program
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>8 weeks of live sessions & workshops</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Expert mentorship & feedback</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Comprehensive capstone project</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>AI tools & automation templates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Peer network & collaboration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Portfolio-ready deliverables</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Demo Day presentation opportunity</span>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Link
                  href={
                    "/academy/courses/simple/ai-powered-project-delivery/checkout?cohortDate=2025-08-06"
                  }
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white py-3 text-lg">
                    <Rocket className="w-5 h-5 mr-2" />
                    Enroll Now - $1,950
                  </Button>
                </Link>
                <p className="text-center text-sm text-gray-500 mt-3">
                  💳 Payment plans available • 30-day money-back guarantee
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Project Management Career?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join our comprehensive AI project management cohort. Limited spots
            available for our September cohort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white/10 px-8 py-3"
              >
                Schedule a Call
              </Button>
            </Link>
          </div>
          <p className="text-sm text-blue-200">
            🎯 Graduate with an AI project delivery plan, functional automation
            suite, and portfolio-ready showcase
          </p>
        </div>
      </section>

      {/* Footer */}
      <MainFooter />
    </div>
  );
}
