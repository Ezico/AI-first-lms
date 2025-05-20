"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const categories = [
  { id: "leadership", label: "Leadership" },
  { id: "strategy", label: "Strategy" },
  { id: "implementation", label: "Implementation" },
  { id: "ethics", label: "Ethics" },
  { id: "governance", label: "Governance" },
  { id: "business", label: "Business" },
  { id: "applications", label: "Applications" },
  { id: "product", label: "Product" },
  { id: "management", label: "Management" },
  { id: "case-studies", label: "Case Studies" },
]

const levels = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
  { id: "all-levels", label: "All Levels" },
  { id: "executive", label: "Executive" },
]

const durations = [
  { id: "short", label: "Under 4 weeks" },
  { id: "medium", label: "4-6 weeks" },
  { id: "long", label: "Over 6 weeks" },
]

export default function CourseFilters() {
  const [priceRange, setPriceRange] = useState([0, 1500])

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

      <Accordion type="multiple" defaultValue={["categories", "level", "duration", "price"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox id={`category-${category.id}`} />
                  <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level">
          <AccordionTrigger className="text-base font-medium">Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {levels.map((level) => (
                <div key={level.id} className="flex items-center">
                  <Checkbox id={`level-${level.id}`} />
                  <label htmlFor={`level-${level.id}`} className="ml-2 text-sm text-gray-700">
                    {level.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration">
          <AccordionTrigger className="text-base font-medium">Duration</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {durations.map((duration) => (
                <div key={duration.id} className="flex items-center">
                  <Checkbox id={`duration-${duration.id}`} />
                  <label htmlFor={`duration-${duration.id}`} className="ml-2 text-sm text-gray-700">
                    {duration.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price</AccordionTrigger>
          <AccordionContent>
            <div className="mt-4 px-2">
              <Slider defaultValue={[0, 1500]} max={2000} step={100} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex justify-between mt-2 text-sm text-gray-700">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button className="w-full mt-6 py-2 text-sm text-purple-700 border border-purple-700 rounded-md hover:bg-purple-50 transition-colors">
        Apply Filters
      </button>
      <button className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
        Clear All
      </button>
    </div>
  )
}
