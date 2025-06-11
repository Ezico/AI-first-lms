import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-sm text-white font-medium">
              <span className="bg-white text-primary-500 px-2 py-1 rounded mr-2 font-bold">
                AI
              </span>
              FIRST ACADEMY
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Launch Your Project Management Career with AI
            </h1>
            <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Master AI-powered project management skills and get certified in
              just 8 weeks. Join our next cohort and transform your career with
              AI First Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="#pricing">
                <Button size="lg" className="w-full">
                  Start Now
                </Button>
              </Link>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-primary-500 text-primary-500 hover:bg-primary-50"
              >
                Register for Future Dates
              </Button> */}
              <Button
                size="lg"
                variant="ghost"
                className="bg-white text-primary hover:bg-white/90"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto">
            <img
              alt="AI Project Manager Course"
              className="overflow-hidden rounded-xl object-cover object-center shadow-lg"
              height="550"
              src="/images/ai-cover.png"
              width="800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
