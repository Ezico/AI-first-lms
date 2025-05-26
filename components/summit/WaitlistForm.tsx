import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, MapPin, Users, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import SummitCountdown from "./Countdowntimer";

const SummitHero: React.FC = () => {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&h=800')",
          backgroundPosition: "center 30%",
        }}
      ></div>
      <div className="absolute inset-0 bg-primary/70 z-0"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-3/5 text-white">
            <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
              December 10-11, 2025
            </Badge>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              AI First Summit 2025
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              The premier conference for business leaders navigating the AI
              transformation journey
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center">
                <CalendarClock className="h-5 w-5 mr-2" />
                <span>Dec 10-11, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>500+ Attendees</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white text-primary hover:bg-white/90"
                size="lg"
                asChild
              >
                <a href="#waitlist">Join the Waitlist</a>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-primary hover:bg-white/20"
                size="lg"
                asChild
              >
                <Link href="#agenda" className="flex items-center">
                  <LinkIcon className="mr-2 h-4 w-4" /> View Agenda
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-2/5 mt-12 lg:mt-0 flex justify-center">
            <SummitCountdown />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummitHero;
