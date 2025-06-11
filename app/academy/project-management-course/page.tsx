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
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <Hero />
      <Benefits />
      <HowItWorks />
      <CapstonePreview />
      <PricingCards />
      <FAQ />
      {/* <EnrollmentArea /> */}
      <MainFooter />
    </div>
  );
}
