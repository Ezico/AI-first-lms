import { BookOpen, Bot, Lightbulb } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Learn",
      description:
        "Master project management fundamentals and AI integration through interactive lessons and workshops.",
    },
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: "Use AI",
      description: "Apply AI tools to streamline project workflows, automate tasks, and enhance decision-making.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Build a Bot",
      description: "Create your own AI assistant to handle project management tasks and showcase your new skills.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50" id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our structured learning path takes you from basics to building your own AI project management solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 relative">
              <div className="mb-4 bg-gray-100 p-4 rounded-full">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="#8B5A96"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
