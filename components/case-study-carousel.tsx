"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const caseStudies = [
  {
    icon: "🏥",
    title: "Healthcare",
    impact: "50% reduction in diagnostic time through AI-powered imaging",
  },
  {
    icon: "🏦",
    title: "Financial Services",
    impact: "85% increase in fraud detection accuracy with ML models",
  },
  {
    icon: "🛒",
    title: "Retail",
    impact: "32% growth in customer retention using AI personalization",
  },
  {
    icon: "🏭",
    title: "Manufacturing",
    impact: "40% decrease in maintenance costs with predictive AI",
  },
  {
    icon: "🚚",
    title: "Logistics",
    impact: "28% improvement in delivery efficiency through AI routing",
  },
  {
    icon: "🏢",
    title: "Real Estate",
    impact: "3x faster property valuation with computer vision models",
  },
]

export default function CaseStudyCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    const el = scrollRef.current
    if (!el) return

    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener("scroll", checkScrollability)
      // Check on resize
      window.addEventListener("resize", checkScrollability)
      // Initial check
      checkScrollability()
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScrollability)
        window.removeEventListener("resize", checkScrollability)
      }
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return

    const scrollAmount = 300
    const newPosition = direction === "left" ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount

    el.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative">
      <div
        className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6 pb-4 px-2"
        ref={scrollRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {caseStudies.map((study, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-[280px] border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="text-4xl mb-4">{study.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{study.title}</h3>
              <p className="text-gray-600">{study.impact}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full bg-white shadow-lg ${!canScrollLeft ? "opacity-0" : "opacity-100"}`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full bg-white shadow-lg ${!canScrollRight ? "opacity-0" : "opacity-100"}`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
