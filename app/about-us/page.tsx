import MainFooter from "@/components/main-footer";
import MainNavigation from "@/components/main-navigation";
import HeroSection from "@/components/pages/Hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Download, Headphones, Rss } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex min-h-screen mt-5 flex-col">
      <MainNavigation />
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <Reveal>
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Contact Us
                </h1>
                <p className="mt-3 text-xl text-purple-100 md:mt-5">
                  Insights and interviews with AI pioneers and business
                  transformation experts
                </p>
                <p className="text-purple-200">
                  Join us as we explore how organizations are leveraging AI to
                  transform their businesses and create competitive advantages
                  in the digital age.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="bg-white text-purple-800 hover:bg-purple-50 px-6 py-6 rounded-lg transition-all hover:scale-105 shadow-lg">
                    <Headphones className="mr-2 h-5 w-5" />
                    Listen Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-purple-800 px-6 py-6 rounded-lg transition-all"
                  >
                    <Rss className="mr-2 h-5 w-5" />
                    Subscribe
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative h-[400px] w-full">
                <p className="mb-6 text-white ">
                  Fill out the form below and we’ll get back to you as soon as
                  possible.
                </p>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border rounded"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 border rounded"
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    className="w-full p-3 border rounded h-40"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-pink-600 text-white px-6 py-2 rounded"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
