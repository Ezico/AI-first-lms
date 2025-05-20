"use client"

import { useState } from "react"
import Image from "next/image"
import { Linkedin, Twitter, Globe, Mail, ChevronDown, ChevronUp } from "lucide-react"

interface SocialLinks {
  linkedin?: string
  twitter?: string
  website?: string
  email?: string
}

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social: SocialLinks
}

interface TeamMemberCardProps {
  member: TeamMember
  featured?: boolean
  compact?: boolean
}

export default function TeamMemberCard({ member, featured = false, compact = false }: TeamMemberCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all ${
        featured ? "hover:-translate-y-2" : "hover:-translate-y-1"
      }`}
    >
      <div className={`relative ${featured ? "h-72" : compact ? "h-48" : "h-64"} w-full`}>
        <Image
          src={member.image || "/placeholder.svg?height=300&width=300&query=professional headshot"}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-purple-700 font-medium mb-3">{member.role}</p>

        {compact ? (
          <div className="flex space-x-2 mt-4">
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {member.social.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {member.social.website && (
              <a
                href={member.social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            )}
            {member.social.email && (
              <a
                href={`mailto:${member.social.email}`}
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
          </div>
        ) : (
          <>
            <div className={expanded ? "block" : "line-clamp-3"}>
              <p className="text-gray-600">{member.bio}</p>
            </div>

            {member.bio.length > 150 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center text-purple-700 mt-2 text-sm font-medium"
              >
                {expanded ? "Show less" : "Read more"}
                {expanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
            )}

            <div className="flex space-x-3 mt-4">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-purple-700 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {member.social.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-purple-700 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {member.social.website && (
                <a
                  href={member.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-purple-700 transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
              {member.social.email && (
                <a
                  href={`mailto:${member.social.email}`}
                  className="text-gray-500 hover:text-purple-700 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
