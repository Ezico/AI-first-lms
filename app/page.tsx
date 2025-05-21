import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  GraduationCap,
  Mic,
  ShoppingCart,
  Users,
} from "lucide-react";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import { Reveal } from "@/components/reveal";
import AsSeenOn from "@/components/home/AsseenOn";
import CaseStudies from "@/components/home/CaseStudies";
import Testimonials from "@/components/book/Testimonials";

export default function Home() {
  const features = [
    "Actionable Strategy",
    "Real-world examples",
    "Composite & Illustrative Case Studies",
    "Designed for executives and teams",
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Hero Section */}
      <section className=" gradient-bg py-12 lg:py-20 clip-path-bottom">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 animation-fade-in-up">
              <img
                src="/images/AI-First-Book.png"
                alt="AI First Book Cover"
                className="mx-auto lg:mx-0 max-w-xs md:max-w-sm rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="w-full lg:w-1/2 lg:pl-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
                AI First: A Leader's Guide to Building a Competitive, AI-Centric
                Organisation
              </h1>

              <p className="text-lg md:text-xl text-gray-700 mb-6">
                The age of AI is here—and it's not waiting. Equip your
                leadership team with the frameworks, case studies, and maturity
                models to scale enterprise AI.
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="text-primary" />
                    </div>
                    <p className="ml-3 text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild className="shadow-lg">
                  <Link
                    href="/book"
                    className="flex items-center justify-center"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Free Chapter
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link
                    href="/book"
                    className="flex items-center justify-center"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Order Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* As Seen On */}
      <AsSeenOn />

      {/* Ecosystem Overview */}
      <section className=" py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              The Complete AI First Ecosystem
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              From foundational knowledge to practical implementation, our
              ecosystem provides everything leaders need to build AI-centric
              organizations.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Reveal delay={0.1}>
              <Link href="/book" className="group">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <BookOpen className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                    The Book
                  </h3>
                  <p className="text-gray-600 mb-4">
                    The essential guide for business leaders navigating the AI
                    transformation journey.
                  </p>
                  <div className="flex items-center text-purple-700 font-medium">
                    Learn more{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.2}>
              <Link href="/academy" className="group">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                    AI First Academy
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive training programs to develop AI literacy and
                    implementation skills.
                  </p>
                  <div className="flex items-center text-purple-700 font-medium">
                    Learn more{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.3}>
              <Link href="/summit" className="group">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Users className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                    AI First Summit
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Connect with AI leaders and practitioners at our premier
                    industry event.
                  </p>
                  <div className="flex items-center text-purple-700 font-medium">
                    Learn more{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.4}>
              <Link href="/podcast" className="group">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Mic className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                    AI First Podcast
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Insights and interviews with AI pioneers and business
                    transformation experts.
                  </p>
                  <div className="flex items-center text-purple-700 font-medium">
                    Learn more{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* case studies */}
      <CaseStudies />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className=" bg-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your AI Transformation Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Explore our ecosystem of resources designed to help you build a
              competitive, AI-centric organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-6">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-white text-purple-800 hover:text-white hover:bg-purple-600 px-8 py-6"
              >
                Contact Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
