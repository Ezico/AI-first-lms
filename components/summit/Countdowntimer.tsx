"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const targetDate = new Date("2025-12-10T10:00:00"); // Change to your summit date

export default function SummitCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        mins: Math.floor((distance / 1000 / 60) % 60),
        secs: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animation-fade-in-up">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Summit Countdown
        </h2>
        <p className="text-gray-600 mb-6">
          Reserve your spot before registration closes
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <TimeBox label="Days" value={timeLeft.days} />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <TimeBox label="Minutes" value={timeLeft.mins} />
        <TimeBox label="Seconds" value={timeLeft.secs} />
      </div>

      <Button className="w-full" size="lg" asChild>
        <a href="#waitlist">Join the Waitlist Now</a>
      </Button>
    </div>
  );
}

const TimeBox = ({ label, value }) => (
  <div className="bg-gray-50 rounded-lg p-3 text-center">
    <div className="text-3xl font-bold text-primary">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>

  //   <div className="flex flex-col items-center bg-white bg-opacity-20 px-4 py-2 rounded-lg min-w-[60px]">
  //     <span className="text-2xl font-bold"></span>
  //     <span className="text-xs uppercase"></span>
  //   </div>
);
