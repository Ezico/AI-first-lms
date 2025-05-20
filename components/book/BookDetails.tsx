"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const downloadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().min(2, "Company name is required"),
});

type DownloadFormData = z.infer<typeof downloadSchema>;

const BookDetails: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DownloadFormData>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
  });

  const onSubmit = async () => {};

  //   const onSubmit = async (data: DownloadFormData) => {
  //     setIsSubmitting(true);
  //     try {
  //       await apiRequest("POST", "/api/book/download", data);
  //       toast({
  //         title: "Request Successful",
  //         description: "The free chapter has been sent to your email.",
  //         variant: "default",
  //       });
  //       form.reset();
  //     } catch (error) {
  //       toast({
  //         title: "Request Failed",
  //         description: "Please try again later.",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  const tableOfContents = [
    "Strategic AI Transformation",
    "AI Maturity Assessment",
    "Building AI Capabilities",
    "Industry Case Studies",
    "Technology Implementation",
    "Change Management",
  ];

  return (
    <section className=" py-16 bg-white" id="download">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-3/5">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
              Transform Your Organization with AI-First Principles
            </h2>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contents">Table of Contents</TabsTrigger>
                <TabsTrigger value="author">About the Author</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <p className="text-gray-700 mb-4">
                  The AI First book provides a comprehensive framework for
                  organizations looking to harness the transformative power of
                  artificial intelligence. It goes beyond theory to offer
                  practical guidance, real-world examples, and actionable
                  strategies.
                </p>
                <p className="text-gray-700 mb-4">This book is designed for:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                  <li>C-suite executives and business leaders</li>
                  <li>Technology and innovation officers</li>
                  <li>Digital transformation teams</li>
                  <li>Business strategists and consultants</li>
                </ul>
                <p className="text-gray-700">
                  Through case studies, frameworks, and maturity models, readers
                  will learn how to assess their organization's AI readiness and
                  develop a roadmap for successful transformation.
                </p>
              </TabsContent>
              <TabsContent value="contents" className="mt-6">
                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Part I: Foundations
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 1:</span>{" "}
                        The AI Imperative
                      </li>
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 2:</span>{" "}
                        AI Maturity Model
                      </li>
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 3:</span>{" "}
                        Assessment Framework
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Part II: Implementation
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 4:</span>{" "}
                        Building AI Capabilities
                      </li>
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 5:</span>{" "}
                        Data Strategy
                      </li>
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 6:</span>{" "}
                        Organizational Change
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-3">
                    Part III: Case Studies & Applications
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 7:</span>{" "}
                        Healthcare
                      </li>
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 8:</span>{" "}
                        Financial Services
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 9:</span>{" "}
                        Retail
                      </li>
                      <li className="flex">
                        <span className="font-semibold mr-2">Chapter 10:</span>{" "}
                        Manufacturing
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="author" className="mt-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
                      alt="Davies K. Bamigboye"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Davies K. Bamigboye
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Davies K. Bamigboye is an AI strategist, advisor, and
                      thought leader with over 15 years of experience helping
                      organizations implement transformative technologies. He
                      has worked with Fortune 500 companies across multiple
                      industries to develop and execute AI strategies that
                      deliver measurable business value.
                    </p>
                    <p className="text-gray-700">
                      As a frequent speaker at global technology conferences and
                      a contributor to leading business publications, Davies
                      brings practical insights and real-world experience to the
                      complex challenge of AI transformation.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-xl font-semibold mb-4">Inside the Book</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {tableOfContents.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <ArrowRight className="text-primary h-4 w-4" />
                    </div>
                    <p className="ml-3 text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5" id="download-form">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Get Your Free Chapter
                </h3>
                <p className="text-gray-700 mb-6">
                  Download a free chapter from AI First to discover the
                  frameworks and strategies for building a competitive,
                  AI-centric organization.
                </p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              className="w-full px-4 py-2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Work Email"
                              {...field}
                              className="w-full px-4 py-2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Company Name"
                              {...field}
                              className="w-full px-4 py-2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" /> Send My Free Chapter
                        </>
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
                  <p>
                    By requesting this chapter, you agree to receive occasional
                    emails about AI First resources. You can unsubscribe at any
                    time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
