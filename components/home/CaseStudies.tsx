"use client";
// This component is a client component that uses React hooks and Next.js features.
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaHospitalUser, FaChartLine, FaShoppingCart } from "react-icons/fa";

interface CaseStudyProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  roi: string;
}

const CaseStudy: React.FC<CaseStudyProps> = ({
  icon,
  color,
  title,
  description,
  roi,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full testimonial-slide">
      <div className={`h-32 ${color} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-primary">{roi}</span>
          {/* <Link
            href="/case-studies"
            className="text-gray-600 hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
          </Link> */}
        </div>
      </div>
    </div>
  );
};

const CaseStudies: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const caseStudies: CaseStudyProps[] = [
    {
      icon: <FaHospitalUser className="text-white text-4xl" />,
      color: "bg-primary-light",
      title: "Healthcare Provider",
      description:
        "Implemented AI diagnostics systems that reduced patient wait times by 35% and improved diagnostic accuracy.",
      roi: "ROI: 240% in 18 months",
    },
    {
      icon: <FaChartLine className="text-white text-4xl" />,
      color: "bg-primary",
      title: "Financial Services",
      description:
        "Deployed AI risk assessment models that increased fraud detection by 62% while reducing false positives.",
      roi: "ROI: 320% in 12 months",
    },
    {
      icon: <FaShoppingCart className="text-white text-4xl" />,
      color: "bg-primary-dark",
      title: "Retail Organization",
      description:
        "Implemented predictive inventory management that reduced stockouts by 42% and optimized supply chain.",
      roi: "ROI: 180% in 9 months",
    },
  ];

  return (
    <section className="container py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Success Stories Across Industries
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover how organizations are leveraging AI First principles to
            transform their operations and drive business value.
          </p>
        </div>

        <div className="relative">
          <Carousel ref={carouselRef} className="w-full">
            <CarouselContent>
              {caseStudies.map((study, index) => (
                <CarouselItem key={index} className="md:basis-1/3 p-2">
                  <CaseStudy {...study} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute top-1/2 -left-4 transform -translate-y-1/2" />
              <CarouselNext className="absolute top-1/2 -right-4 transform -translate-y-1/2" />
            </div>
          </Carousel>
        </div>

        {/* <div className="text-center mt-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default CaseStudies;
