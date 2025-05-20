import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  src: string;
  alt: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt, className }) => {
  return (
    <div className="flex justify-center transition-opacity duration-300 opacity-70 hover:opacity-100">
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300",
          className
        )}
      />
    </div>
  );
};

export default function AsSeenOn() {
  const logos = [
    {
      src: "/images/substack.png",
      alt: "Substack",
    },
    {
      src: "/images/Linkedin.png",
      alt: "LinkedIn",
    },
    {
      src: "/images/Amazon.png",
      alt: "Amazon",
    },
    {
      src: "/images/Maven.png",
      alt: "Maven",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-gray-500 font-medium mb-8">
          AS SEEN ON
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {logos.map((logo, index) => (
            <Logo key={index} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
