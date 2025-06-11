import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What prerequisites do I need for this course?",
      answer:
        "No specific prerequisites are required. Basic project management knowledge is helpful but not mandatory. We'll teach you everything you need to know about AI and project management from the ground up.",
    },
    {
      question: "How is the course structured?",
      answer:
        "The course runs for 8 weeks with approximately 5-7 hours of commitment per week. It includes video lessons, interactive workshops, hands-on projects, and mentorship sessions for Premium plan members.",
    },
    {
      question: "Is the certification recognized in the industry?",
      answer:
        "Yes, our AI Project Manager certification is recognized by leading tech companies and organizations. It demonstrates your proficiency in applying AI to project management tasks and can significantly boost your career prospects.",
    },
    {
      question: "Can I access the course materials after completion?",
      answer:
        "Standard plan members get 3 months of access after course completion. Premium plan members receive lifetime access to course materials and updates.",
    },
    {
      question: "What if I can't attend the live sessions?",
      answer:
        "All live sessions are recorded and made available within 24 hours. You can watch them at your convenience and still participate in discussions through our community forum.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, we offer a 14-day money-back guarantee if you're not satisfied with the course. Simply contact our support team within 14 days of enrollment to request a refund.",
    },
  ];

  return (
    <section className="py-16 bg-white" id="faq">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Find answers to common questions about our AI Project Manager
            certification program.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">About the Certification</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-[#fcfaf7] p-4 rounded-lg">
              <img
                alt="Certification Badge"
                className="h-16 w-16 mx-auto"
                src="/images/industry-recognized.png"
              />
              <p className="mt-2 text-sm font-medium">Industry Recognized</p>
            </div>
            <div className="bg-[#fcfaf7] p-4 rounded-lg">
              <img
                alt="Digital Certificate"
                className="h-16 w-16 mx-auto"
                src="/images/Digital-certificate.png"
              />
              <p className="mt-2 text-sm font-medium">Digital Certificate</p>
            </div>
            <div className="bg-[#fcfaf7] p-4 rounded-lg">
              <img
                alt="LinkedIn Badge"
                className="h-16 w-16 mx-auto"
                src="/images/linkdin-certificate.png"
              />
              <p className="mt-2 text-sm font-medium">LinkedIn Verification</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
