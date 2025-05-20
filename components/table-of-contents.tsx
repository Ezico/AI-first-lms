"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const chapters = [
  {
    title: "Chapter 1: The AI-First Mindset",
    topics: [
      "Understanding AI's business impact",
      "Shifting from digital-first to AI-first",
      "Executive leadership in AI transformation",
    ],
  },
  {
    title: "Chapter 2: AI Maturity Model",
    topics: [
      "Assessing your organization's AI readiness",
      "The 5 stages of AI maturity",
      "Building capability roadmaps",
    ],
  },
  {
    title: "Chapter 3: Strategic Implementation",
    topics: [
      "Identifying high-value AI use cases",
      "Building cross-functional AI teams",
      "Technology stack considerations",
    ],
  },
  {
    title: "Chapter 4: Change Management",
    topics: [
      "Overcoming resistance to AI adoption",
      "Reskilling and upskilling strategies",
      "Creating an AI-positive culture",
    ],
  },
  {
    title: "Chapter 5: Ethical AI Framework",
    topics: [
      "Developing responsible AI guidelines",
      "Addressing bias and fairness",
      "Privacy and transparency considerations",
    ],
  },
  {
    title: "Chapter 6: Measuring AI Success",
    topics: ["KPIs for AI initiatives", "ROI calculation models", "Long-term value creation metrics"],
  },
]

export default function TableOfContents() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(0)

  const toggleChapter = (index: number) => {
    setExpandedChapter(expandedChapter === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
          <button
            className={`w-full flex justify-between items-center p-4 text-left font-medium ${
              expandedChapter === index ? "bg-purple-50 text-purple-800" : "bg-white text-gray-800"
            }`}
            onClick={() => toggleChapter(index)}
          >
            <span>{chapter.title}</span>
            {expandedChapter === index ? (
              <ChevronUp className="h-5 w-5 text-purple-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              expandedChapter === index ? "max-h-48" : "max-h-0"
            }`}
          >
            <ul className="p-4 space-y-2 bg-gray-50">
              {chapter.topics.map((topic, topicIndex) => (
                <li key={topicIndex} className="flex items-start">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-600 mt-2 mr-2"></span>
                  <span className="text-gray-700">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
