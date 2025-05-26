import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CalendarDays,
  Globe,
  Mic,
  Lightbulb,
  Network,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import SummitHero from "@/components/summit/WaitlistForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import WaitlistForm from "@/components/summit/SummitHero";

const speakers = [
  {
    name: "Dr. Sarah Johnson",
    title: "AI Research Director, Tech Innovations Inc.",
    topic: "The Future of Enterprise AI",
    image: "/professional-woman-headshot.png",
  },
  {
    name: "Michael Chen",
    title: "Chief Innovation Officer, Global Retail",
    topic: "AI Transformation in Retail",
    image: "/professional-man-headshot.png",
  },
  {
    name: "Elena Rodriguez",
    title: "VP of AI Strategy, Financial Services Group",
    topic: "AI Ethics and Governance",
    image: "/professional-woman-headshot.png",
  },
  {
    name: "David Williams",
    title: "CEO, AI Solutions Ltd",
    topic: "Building AI-First Organizations",
    image: "/professional-man-headshot.png",
  },
];

const agenda = [
  {
    time: "9:00 AM - 10:00 AM",
    title: "Opening Keynote: The AI-First Revolution",
    speaker: "Dr. Sarah Johnson",
    description:
      "An overview of how AI is transforming industries and creating new competitive advantages.",
  },
  {
    time: "10:15 AM - 11:15 AM",
    title: "Panel: AI Implementation Challenges and Solutions",
    speaker: "Industry Leaders Panel",
    description:
      "Real-world insights from organizations that have successfully implemented AI at scale.",
  },
  {
    time: "11:30 AM - 12:30 PM",
    title: "Workshop: Building Your AI Strategy Roadmap",
    speaker: "Michael Chen",
    description:
      "Interactive session on developing a comprehensive AI strategy for your organization.",
  },
  {
    time: "1:30 PM - 2:30 PM",
    title: "Case Studies: AI Transformation Success Stories",
    speaker: "Elena Rodriguez",
    description:
      "Detailed analysis of successful AI implementations across different industries.",
  },
];

export default function SummitPage() {
  const speakers = [
    {
      name: "Dr. Sarah Chen",
      title: "Chief AI Officer, Global Tech",
      topic: "The Future of Enterprise AI",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    },
    {
      name: "Michael Rodriguez",
      title: "CEO, AI Innovate",
      topic: "Scaling AI Across the Enterprise",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    },
    {
      name: "Amara Johnson",
      title: "Director of AI Ethics, Tech Policy Institute",
      topic: "Responsible AI Implementation",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    },
    {
      name: "Dr. James Wilson",
      title: "AI Research Lead, Future Labs",
      topic: "Emerging AI Technologies",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    },
  ];

  const agenda = [
    {
      day: "Day 1 - December 10",
      sessions: [
        {
          time: "9:00 AM - 10:00 AM",
          title: "Opening Keynote: The AI Imperative",
          speaker: "Dr. Sarah Chen",
          type: "Keynote",
        },
        {
          time: "10:15 AM - 11:15 AM",
          title: "Panel: AI Transformation Success Stories",
          speaker: "Industry Leaders Panel",
          type: "Panel",
        },
        {
          time: "11:30 AM - 12:30 PM",
          title: "Workshop: AI Maturity Assessment",
          speaker: "Michael Rodriguez",
          type: "Workshop",
        },
        {
          time: "12:30 PM - 1:30 PM",
          title: "Lunch & Networking",
          type: "Break",
        },
        {
          time: "1:30 PM - 2:30 PM",
          title: "Ethical AI Implementation",
          speaker: "Amara Johnson",
          type: "Talk",
        },
        {
          time: "2:45 PM - 4:15 PM",
          title: "Industry Breakout Sessions",
          type: "Breakout",
        },
        {
          time: "4:30 PM - 5:30 PM",
          title: "Fireside Chat: Leadership in the AI Era",
          speaker: "Executive Panel",
          type: "Panel",
        },
        {
          time: "6:00 PM - 8:00 PM",
          title: "Welcome Reception & Networking Dinner",
          type: "Social",
        },
      ],
    },
    {
      day: "Day 2 - December 11",
      sessions: [
        {
          time: "9:00 AM - 10:00 AM",
          title: "Day 2 Keynote: The Future of Enterprise AI",
          speaker: "Dr. James Wilson",
          type: "Keynote",
        },
        {
          time: "10:15 AM - 11:15 AM",
          title: "Case Study: AI Transformation at Scale",
          speaker: "Industry Case Study",
          type: "Case Study",
        },
        {
          time: "11:30 AM - 12:30 PM",
          title: "Workshop: Building Your AI Roadmap",
          speaker: "Implementation Experts",
          type: "Workshop",
        },
        {
          time: "12:30 PM - 1:30 PM",
          title: "Lunch & Networking",
          type: "Break",
        },
        {
          time: "1:30 PM - 2:30 PM",
          title: "Technical Deep Dive: AI Architecture",
          speaker: "Technical Panel",
          type: "Technical",
        },
        {
          time: "2:45 PM - 3:45 PM",
          title: "Building AI-Ready Teams",
          speaker: "Organizational Leaders",
          type: "Talk",
        },
        {
          time: "4:00 PM - 5:00 PM",
          title: "Closing Keynote & Next Steps",
          speaker: "Davies K. Bamigboye",
          type: "Keynote",
        },
        {
          time: "5:00 PM - 6:00 PM",
          title: "Farewell Networking Reception",
          type: "Social",
        },
      ],
    },
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Hero Section */}
      <SummitHero />

      {/* About the Summit */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              About the Summit
            </h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              The AI First Summit brings together business leaders, AI
              practitioners, and industry experts to share insights, strategies,
              and practical approaches for building AI-centric organizations.
            </p>
          </Reveal>

          <div className="container grid md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Networking
                </h3>
                <p className="text-gray-600">
                  Connect with 500+ AI leaders, practitioners, and solution
                  providers from across industries.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Learning
                </h3>
                <p className="text-gray-600">
                  Gain insights from 30+ sessions covering AI strategy,
                  implementation, ethics, and more.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Clock className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Workshops
                </h3>
                <p className="text-gray-600">
                  Participate in hands-on workshops to develop practical AI
                  implementation skills.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-2/3">
              <div className="text-center lg:text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                  About the Summit
                </h2>
                <p className="text-lg text-gray-700">
                  Join industry pioneers, thought leaders, and AI practitioners
                  for two days of insights, networking, and hands-on workshops
                  focused on enterprise AI transformation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <CalendarDays className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold">Date</h3>
                        <p>December 10-11, 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <MapPin className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p>Lagos, Nigeria</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Users className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold">Attendees</h3>
                        <p>500+ Business Leaders</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Globe className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold">Format</h3>
                        <p>In-person Conference</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  Summit Highlights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex">
                    <div className="mr-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Mic className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Keynote Presentations
                      </h3>
                      <p className="text-gray-700">
                        Hear from global thought leaders about the future of AI
                        in enterprise.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Lightbulb className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Interactive Workshops
                      </h3>
                      <p className="text-gray-700">
                        Practical, hands-on sessions to develop your AI
                        strategy.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Network className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Networking Opportunities
                      </h3>
                      <p className="text-gray-700">
                        Connect with peers and industry experts during dedicated
                        networking sessions.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Panel Discussions</h3>
                      <p className="text-gray-700">
                        Engaging conversations on AI implementation challenges
                        and success stories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  Featured Speakers
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="text-center bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold">{speaker.name}</h3>
                      <p className="text-primary text-sm mb-2">
                        {speaker.title}
                      </p>
                      <p className="text-gray-600 text-sm">{speaker.topic}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Tabs defaultValue="day1" className="mb-12" id="agenda">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">
                    Summit Agenda
                  </h2>
                  <TabsList>
                    <TabsTrigger value="day1">Day 1</TabsTrigger>
                    <TabsTrigger value="day2">Day 2</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="day1">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">{agenda[0].day}</h3>
                      <div className="space-y-6">
                        {agenda[0].sessions.map((session, index) => (
                          <div key={index}>
                            {index > 0 && <Separator className="my-6" />}
                            <div className="flex flex-col md:flex-row md:items-start">
                              <div className="md:w-1/4 mb-2 md:mb-0">
                                <p className="text-gray-500 font-medium">
                                  {session.time}
                                </p>
                              </div>
                              <div className="md:w-3/4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-semibold">
                                      {session.title}
                                    </h4>
                                    {session.speaker && (
                                      <p className="text-gray-700">
                                        {session.speaker}
                                      </p>
                                    )}
                                  </div>
                                  <Badge
                                    variant={
                                      session.type === "Break" ||
                                      session.type === "Social"
                                        ? "secondary"
                                        : "purple"
                                    }
                                  >
                                    {session.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="day2">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">{agenda[1].day}</h3>
                      <div className="space-y-6">
                        {agenda[1].sessions.map((session, index) => (
                          <div key={index}>
                            {index > 0 && <Separator className="my-6" />}
                            <div className="flex flex-col md:flex-row md:items-start">
                              <div className="md:w-1/4 mb-2 md:mb-0">
                                <p className="text-gray-500 font-medium">
                                  {session.time}
                                </p>
                              </div>
                              <div className="md:w-3/4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-semibold">
                                      {session.title}
                                    </h4>
                                    {session.speaker && (
                                      <p className="text-gray-700">
                                        {session.speaker}
                                      </p>
                                    )}
                                  </div>
                                  <Badge
                                    variant={
                                      session.type === "Break" ||
                                      session.type === "Social"
                                        ? "secondary"
                                        : "purple"
                                    }
                                  >
                                    {session.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="w-full lg:w-1/3" id="waitlist">
              <div className="sticky top-24">
                <WaitlistForm />

                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Why Attend?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                        <svg
                          className="h-3 w-3 text-primary"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Access cutting-edge insights from AI thought leaders
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                        <svg
                          className="h-3 w-3 text-primary"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Connect with peers facing similar AI transformation
                        challenges
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                        <svg
                          className="h-3 w-3 text-primary"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Learn practical frameworks for AI implementation
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                        <svg
                          className="h-3 w-3 text-primary"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Develop a network of AI professionals and potential
                        partners
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                        <svg
                          className="h-3 w-3 text-primary"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Receive a comprehensive resource kit for post-summit
                        implementation
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
