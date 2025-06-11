import { CheckCircle } from "lucide-react"

export default function Benefits() {
  const benefits = [
    {
      title: "AI-Powered Skills",
      description: "Learn to leverage AI tools to automate routine tasks and focus on strategic project management.",
    },
    {
      title: "Industry Recognition",
      description: "Earn a certification recognized by leading tech companies and boost your career prospects.",
    },
    {
      title: "Hands-on Experience",
      description: "Build real AI project management solutions that you can add to your portfolio.",
    },
    {
      title: "Expert Mentorship",
      description: "Learn from industry professionals with extensive experience in AI and project management.",
    },
    {
      title: "Flexible Learning",
      description: "Access course materials anytime, anywhere, and learn at your own pace.",
    },
    {
      title: "Career Support",
      description: "Get personalized career guidance and job placement assistance after course completion.",
    },
  ]

  return (
    <section className="py-16 bg-white" id="benefits">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900">
            Why Choose Our Program
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-Ready Project Manager course can transform your career and equip you with future-proof
            skills.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-primary-100">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 mt-2">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
