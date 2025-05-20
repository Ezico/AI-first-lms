import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, GraduationCap, Mic, Users } from "lucide-react";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                The AI First Ecosystem
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                A comprehensive suite of resources to help business leaders
                navigate the AI transformation journey
              </p>
              <Button className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-6 text-lg rounded-lg shadow-lg">
                Explore the Ecosystem
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="container py-16 bg-white">
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

      {/* Testimonials */}
      <section className="container bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Trusted by Industry Leaders
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/professional-woman-headshot.png"
                      alt="Sarah Johnson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Sarah Johnson</p>
                    <p className="text-gray-600">CTO, Global Healthcare Corp</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The AI First ecosystem has been instrumental in our
                  organization's AI transformation. From the book to the
                  academy, every resource provided practical value."
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/professional-man-headshot.png"
                      alt="Michael Chen"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Michael Chen</p>
                    <p className="text-gray-600">
                      Chief Innovation Officer, Retail Innovations
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The AI First Summit connected us with partners that
                  accelerated our AI initiatives by years. The networking
                  opportunities alone were worth the investment."
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/professional-woman-headshot.png"
                      alt="Elena Rodriguez"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Elena Rodriguez</p>
                    <p className="text-gray-600">
                      VP of Digital Transformation, Financial Services
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The AI First Academy training programs have equipped our
                  teams with the skills needed to implement AI solutions that
                  deliver real business value."
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
                className="border-white text-white hover:bg-purple-600 px-8 py-6"
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
