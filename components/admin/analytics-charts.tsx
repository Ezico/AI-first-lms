"use client"

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for revenue chart
const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 4800 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 5400 },
  { month: "May", revenue: 6200 },
  { month: "Jun", revenue: 7100 },
  { month: "Jul", revenue: 8200 },
  { month: "Aug", revenue: 7600 },
  { month: "Sep", revenue: 6900 },
  { month: "Oct", revenue: 6300 },
  { month: "Nov", revenue: 5900 },
  { month: "Dec", revenue: 6800 },
]

// Mock data for enrollment chart
const enrollmentData = [
  { month: "Jan", enrollments: 24 },
  { month: "Feb", enrollments: 32 },
  { month: "Mar", enrollments: 38 },
  { month: "Apr", enrollments: 42 },
  { month: "May", enrollments: 48 },
  { month: "Jun", enrollments: 56 },
  { month: "Jul", enrollments: 64 },
  { month: "Aug", enrollments: 58 },
  { month: "Sep", enrollments: 52 },
  { month: "Oct", enrollments: 46 },
  { month: "Nov", enrollments: 42 },
  { month: "Dec", enrollments: 48 },
]

// Mock data for user activity chart
const userActivityData = [
  { day: "Mon", users: 120 },
  { day: "Tue", users: 132 },
  { day: "Wed", users: 145 },
  { day: "Thu", users: 140 },
  { day: "Fri", users: 138 },
  { day: "Sat", users: 110 },
  { day: "Sun", users: 105 },
]

// Mock data for course completion chart
const courseCompletionData = [
  { name: "AI Leadership", completion: 85 },
  { name: "AI Ethics", completion: 78 },
  { name: "AI Strategy", completion: 65 },
  { name: "AI Implementation", completion: 92 },
]

const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"]

export function RevenueChart() {
  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function EnrollmentChart() {
  return (
    <ChartContainer
      config={{
        enrollments: {
          label: "Enrollments",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={enrollmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="enrollments"
            stroke="var(--color-enrollments)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function UserActivityChart() {
  return (
    <ChartContainer
      config={{
        users: {
          label: "Active Users",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={userActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="users"
            stroke="var(--color-users)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function CourseCompletionChart() {
  return (
    <ChartContainer
      config={{
        completion: {
          label: "Completion Rate",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={courseCompletionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="name" type="category" width={100} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="completion"
            fill="var(--color-completion)"
            radius={[0, 4, 4, 0]}
            label={{ position: "right", formatter: (value) => `${value}%` }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
