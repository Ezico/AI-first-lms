"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "This book provided our executive team with the clarity and framework we needed to implement AI across our organization. The ROI has been tremendous.",
    author: "Sarah Johnson",
    title: "CTO, Global Healthcare Corp",
    avatar: "/professional-woman-headshot.png",
  },
  {
    quote:
      "AI First is now required reading for our leadership development program. It bridges the gap between technical possibilities and business strategy.",
    author: "Michael Chen",
    title: "Chief Innovation Officer, Retail Innovations Inc",
    avatar: "/professional-man-headshot.png",
  },
  {
    quote:
      "The maturity model presented in this book helped us benchmark our AI capabilities and create a roadmap that transformed our business.",
    author: "Elena Rodriguez",
    title: "VP of Digital Transformation, Financial Services Group",
    avatar: "/professional-woman-headshot.png",
  },
  {
    quote:
      "A practical guide that cuts through the AI hype and delivers actionable insights. We've implemented several of the frameworks with great success.",
    author: "David Williams",
    title: "CEO, Tech Solutions Ltd",
    avatar: "/professional-man-headshot.png",
  },
]

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white h-full">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-purple-200 mb-4" />
                  <p className="text-lg text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-2 h-2 rounded-full p-0 min-w-0 ${index === activeIndex ? "bg-purple-700" : "bg-gray-300"}`}
            onClick={() => {
              setAutoplay(false)
              setActiveIndex(index)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
