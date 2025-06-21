"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

export default function EnrollmentArea() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [cohortFull, setCohortFull] = useState<boolean>(false);

  // For demo purposes, we'll simulate the July 8 cohort being full
  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    setCohortFull(value === "2023-07-08");
  };

  const cohortDates = [
    { value: "2023-07-08", label: "July 8, 2023" },
    { value: "2023-09-02", label: "September 2, 2023" },
    { value: "2023-11-04", label: "November 4, 2023" },
  ];

  return (
    <section className="py-16 bg-gray-50" id="enroll">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900">
            Ready to Transform Your Career?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your preferred start date and enrollment option below.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="cohort-date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Cohort Start Date
              </label>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                <Select onValueChange={handleDateChange}>
                  <SelectTrigger className="w-full border-gray-200 focus:border-gray-500">
                    <SelectValue placeholder="Choose a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {cohortDates.map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedDate === "2023-07-08" && (
                <p className="mt-2 text-sm text-amber-600">
                  This cohort is currently full. You can join the waitlist or
                  select another date.
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary text-white"
                disabled={!selectedDate || cohortFull}
              >
                Enroll Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary-500 hover:bg-gray-50"
                disabled={!selectedDate}
              >
                Register for Future Date
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-gray-500 hover:bg-primary"
                disabled={!cohortFull}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
