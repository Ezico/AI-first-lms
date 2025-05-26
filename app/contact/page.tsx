"use client";
import MainFooter from "@/components/main-footer";
import MainNavigation from "@/components/main-navigation";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const response = await fetch("/api/auth/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "success",
          variant: "default",
          description: data.message,
        });

        setMessage(data.message);
        setSuccess(true);
        setForm({ name: "", email: "", message: "" }); // Reset form
      } else {
        setForm({ name: "", email: "", message: "" }); // Reset form
        setMessage(
          "An error occurred while submitting your message. please try again"
        );
        toast({
          title: "error",
          variant: "destructive",
          description: "An error occurred while submitting your message.",
        });
      }
      setSending(false);
    } catch (error) {
      setSuccess(false);
      setMessage("An error occurred while submitting your message.");
      toast({
        title: "error",
        variant: "destructive",
        description: "An error occurred while submitting your message.",
      });
      setSending(false);
      setMessage("An error occurred while submitting your message.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex min-h-screen mt-5 flex-col">
      <MainNavigation />
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <Reveal>
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Have questions or need assistance? We're here to help!
                </h1>

                <p className="text-purple-200">
                  Get in touch with us for any inquiries, feedback, or support.
                  whether you want to learn more about our services, discuss a
                  potential collaboration, or just say hello, feel free to reach
                  out. We value your feedback and inquiries.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative h-[400px] w-full">
                <p className="mb-6 text-white ">
                  Fill out the form below and we’ll get back to you as soon as
                  possible.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Form fields */}
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3  text-black/60  rounded"
                    required
                    onChange={handleChange}
                    name="name"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 text-black/60 rounded"
                    required
                    onChange={handleChange}
                    name="email"
                  />
                  <Textarea
                    placeholder="Your Message"
                    className="w-full p-3  text-black/60 rounded h-40"
                    required
                    onChange={handleChange}
                    name="message"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded hover:text-primary hover:bg-white"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                  {/* show error message */}
                  {message && (
                    <p
                      className={`mt-4 text-center ${
                        success ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {message}
                    </p>
                  )}
                </form>
              </div>
              <br />
            </Reveal>
          </div>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
