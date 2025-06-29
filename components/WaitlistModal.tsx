"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export default function WaitlistModal({ isOpen, onClose, courseName }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    e.preventDefault();
    const res = await fetch("/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ ...form, courseName }),
    });

    setIsSubmitting(false);

    if (res.ok) {
      setSuccess(true);
      setForm({ email: "", firstName: "", lastName: "" });
    } else {
      alert("Something went wrong");
    }
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>
        <Card className="w-full" id="waitlist">
          <CardHeader>
            <CardTitle className="text-2xl">Join the Waitlist</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success ? (
                <div className="text-green-600 text-center">
                  You've been added to the waitlist!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="firstName"
                    placeholder="Full Name"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />

                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={form.lastName}
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

                  {/* job title */}

                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Join the Waitlist"}
                  </button>
                </div>
              )}
            </form>
            <p className="text-xs text-gray-500 text-center mt-4">
              By joining the waitlist, you'll receive updates about the summit.
              We respect your privacy and won't share your information.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
