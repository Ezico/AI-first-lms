import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, BookOpen, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import BookDetails from "@/components/book/BookDetails";
import AsSeenOn from "@/components/book/AsSeenOn";
import Testimonials from "@/components/book/Testimonials";

export default function BookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Hero Section */}
      <section className=" relative overflow-hidden bg-gradient-to-br from-white to-purple-50">
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <Reveal>
              <div className="relative h-[400px] w-full drop-shadow-2xl">
                <Image
                  src="/images/AI-First-Book.png"
                  alt="AI First Book Cover"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  <span className="block text-purple-800">AI First:</span>
                  <span className="block">
                    A Leader's Guide to Building a Competitive, AI-Centric
                    Organisation
                  </span>
                </h1>
                <p className="mt-3 text-lg text-gray-600 sm:text-xl md:mt-5">
                  Equip your leadership team with the frameworks, case studies,
                  and maturity models to scale enterprise AI.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Actionable Strategy for AI Implementation
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Real-World Examples from Industry Leaders
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">
                      Executive Case Studies & Transformation Models
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-6 rounded-lg transition-all hover:scale-105 shadow-lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download Free Chapter
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-700 text-purple-700 hover:bg-purple-50 px-6 py-6 rounded-lg transition-all"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Order Now
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* As Seen In Section */}
      <AsSeenOn />
      <BookDetails />

      <Testimonials />

      {/* Corporate Preview CTA */}
      <section className="bg-gradient-to-r from-purple-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Reveal>
              <div className="relative h-[350px] w-full hidden md:block">
                <Image
                  src="/images/AI-First-Book.png"
                  alt="AI First Book Cover"
                  fill
                  className="object-contain"
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Equip Your Team with the Blueprint for AI Success
                </h2>
                <p className="text-lg text-gray-600">
                  Transform your organization with proven frameworks and
                  strategies. Get a corporate preview package including
                  executive summaries, implementation guides, and team
                  discussion materials.
                </p>
                <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-6 rounded-lg transition-all hover:scale-105 shadow-lg text-lg">
                  Send My Corporate Preview
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MainFooter />

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg z-50">
        <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-lg transition-all">
          <Download className="mr-2 h-5 w-5" />
          Get Free Chapter
        </Button>
      </div>
    </div>
  );
}
