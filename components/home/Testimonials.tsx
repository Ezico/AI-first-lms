import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface TestimonialProps {
  initials: string;
  name: string;
  title: string;
  text: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  initials,
  name,
  title,
  text,
}) => {
  return (
    <Card className="bg-white rounded-xl shadow-md">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
            <span className="text-primary font-bold text-xl">{initials}</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
        </div>
        <div className="mb-4">
          <Quote className="h-8 w-8 text-primary-50" />
        </div>
        <p className="text-gray-700 mb-4">{text}</p>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Testimonials() {
  const testimonials = [
    {
      initials: "DT",
      title: "Digital Transformation, NHS",
      name: "Deputy Director",
      text: "Essential reading for our leadership team as we shape our NHS digital strategy.",
    },
    {
      initials: "TC",
      title: "Europe",
      name: "Transformation Consultant",
      text: "Clear, actionable, and credible — exactly what my executive team needed.",
    },
  ];

  return (
    <section className="container py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            What Leaders Are Saying
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hear from executives who have successfully implemented AI First
            principles in their organizations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              initials={testimonial.initials}
              name={testimonial.name}
              title={testimonial.title}
              text={testimonial.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
