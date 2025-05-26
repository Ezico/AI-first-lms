"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check } from "lucide-react";

const WaitlistForm: React.FC = () => {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    jobTitle: "",
    industry: "",
    interests: "",
    referral: "",
  });

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    // Make an API call to save submission and send ebook
    const res = await fetch("/api/auth/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setStatus(data.message);
      setForm({
        fullName: "",
        email: "",
        company: "",
        jobTitle: "",
        industry: "",
        interests: "",
        referral: "",
      }); // reset form
      setIsSubmitting(false);
      setIsSubmitted(true);
    } else {
      setStatus(data.message);
      setIsSubmitted(false);
      setIsSubmitting(false);
    }

    // try {
    //   await apiRequest("POST", "/api/waitlist", data);
    //   toast({
    //     title: "Waitlist Registration Successful",
    //     description: "You'll be notified when registration opens.",
    //     variant: "default",
    //   });
    //   setIsSubmitted(true);
    // } catch (error) {
    //   toast({
    //     title: "Registration Failed",
    //     description: "Please try again later.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const industries = [
    "Technology",
    "Finance & Banking",
    "Healthcare",
    "Retail",
    "Manufacturing",
    "Education",
    "Government",
    "Consulting",
    "Energy",
    "Transportation",
    "Other",
  ];

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="mb-4 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              You're on the List!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Thank you for joining the AI First Summit waitlist. We'll notify
              you when registration opens with early access and special pricing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" asChild>
                <a
                  href="https://linkedin.com/share"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share on LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://twitter.com/intent/tweet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share on Twitter
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full" id="waitlist">
      <CardHeader>
        <CardTitle className="text-2xl">Join the Waitlist</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="fullName"
              placeholder="Full Name"
              required
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <Input
              name="company"
              placeholder="Company"
              required
              value={form.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            {/* job title */}
            <Input
              placeholder="Job Title"
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <Select
              onValueChange={(value) => setForm({ ...form, industry: value })}
              defaultValue={form.industry}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* <input
              name="industry"
              placeholder="Industry"
              required
              value={form.industry}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            /> */}
            <Input
              name="interests"
              placeholder="Interests (optional)"
              value={form.interests}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <Input
              name="referral"
              placeholder="Referral (optional)"
              value={form.referral}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Join the Waitlist"}
            </button>
          </div>
          {status && (
            <p
              className={`mt-4 text-center ${
                isSubmitted ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </p>
          )}
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">
          By joining the waitlist, you'll receive updates about the summit. We
          respect your privacy and won't share your information.
        </p>
      </CardContent>
    </Card>
  );
};

export default WaitlistForm;
//
