"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      image: "/team/sarah-johnson.png",
    },
    action: "enrolled in",
    target: "AI Leadership Fundamentals",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      email: "michael@example.com",
      image: "/team/michael-chen.png",
    },
    action: "completed",
    target: "AI Ethics & Governance",
    time: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Elena Rodriguez",
      email: "elena@example.com",
      image: "/team/elena-rodriguez.png",
    },
    action: "left a review on",
    target: "AI Strategy for Business",
    time: "1 day ago",
  },
  {
    id: 4,
    user: {
      name: "David Williams",
      email: "david@example.com",
      image: "/team/david-williams.png",
    },
    action: "enrolled in",
    target: "AI Implementation",
    time: "1 day ago",
  },
  {
    id: 5,
    user: {
      name: "Aisha Patel",
      email: "aisha@example.com",
      image: "/team/aisha-patel.png",
    },
    action: "completed",
    target: "AI Leadership Fundamentals",
    time: "2 days ago",
  },
]

export function AdminRecentActivity() {
  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.image || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
