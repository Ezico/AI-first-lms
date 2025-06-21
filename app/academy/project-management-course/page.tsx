"use client";
import Hero from "@/components/management/hero";
import Benefits from "@/components/management/benefits";
import HowItWorks from "@/components/management/how-it-works";
import CapstonePreview from "@/components/management/capstone-preview";
import PricingCards from "@/components/management/pricing-cards";
import FAQ from "@/components/management/faq";
import EnrollmentArea from "@/components/management/enrollment-area";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";

export default function Home() { 
  const cohortDates = [
      { value: "2023-07-08", label: "July 8, 2023" },
      { value: "2023-09-02", label: "September 2, 2023" },
      { value: "2023-11-04", label: "November 4, 2023" },
    ]

    
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <Hero />
      <Benefits />
      <HowItWorks />
      <CapstonePreview />
      <PricingCards />
      <FAQ />
      <EnrollmentArea />
      <MainFooter />
    </div>
  );
}
