import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Is this course really completely free?",
      answer:
        "Yes! This course is 100% free with no hidden costs. You get full access to all modules, resources, and even a certificate of completion at no charge.",
    },
    {
      question: "Do I need any prior AI experience?",
      answer:
        "Not at all! This course is designed for business analysts at all levels. We start with the fundamentals and build up to advanced concepts, making it accessible to complete beginners.",
    },
    {
      question: "How long does it take to complete the course?",
      answer:
        "The course contains approximately 2+ hours of content across 8 modules. You can complete it in one sitting or take it at your own pace over several days or weeks.",
    },
    {
      question: "Will I get a certificate?",
      answer:
        "Yes! Upon completion of all modules, you'll receive a certificate that you can add to your LinkedIn profile and resume to showcase your AI knowledge.",
    },
    {
      question: "Can I access the course on mobile devices?",
      answer:
        "Our Learning Management System is fully responsive and works perfectly on desktop, tablet, and mobile devices, so you can learn anywhere.",
    },
    {
      question: "What if I have questions during the course?",
      answer:
        "While this is a self-paced course, you can reach out through our support system if you have technical issues. For deeper learning, consider our paid bootcamp program.",
    },
    {
      question: "Are there any prerequisites?",
      answer:
        "The only prerequisite is basic familiarity with business analysis concepts. If you're working as a BA or aspiring to become one, you're ready for this course.",
    },
    {
      question: "How is this different from other AI courses?",
      answer:
        "This course is specifically designed for business analysts, focusing on practical applications in BA work rather than technical implementation. It bridges the gap between AI theory and BA practice.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about the course
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border-0 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
