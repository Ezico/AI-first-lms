import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import MainNavigation from "@/components/main-navigation"
import MainFooter from "@/components/main-footer"
import TeamMemberCard from "@/components/team-member-card"

// Team data
const leadershipTeam = [
  {
    name: "Dr. James Wilson",
    role: "Founder & CEO",
    bio: "Dr. Wilson is a renowned AI strategist with over 15 years of experience helping organizations implement AI solutions. He founded AI First to help business leaders navigate the AI transformation journey.",
    image: "/team/james-wilson.png",
    social: {
      linkedin: "https://linkedin.com/in/jameswilson",
      twitter: "https://twitter.com/jameswilson",
      website: "https://jameswilson.com",
    },
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Research Officer",
    bio: "Dr. Johnson leads AI First's research initiatives, bringing her expertise in enterprise AI implementation and organizational transformation to help shape our methodologies and frameworks.",
    image: "/team/sarah-johnson.png",
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
    },
  },
  {
    name: "Michael Chen",
    role: "Chief Operating Officer",
    bio: "Michael oversees AI First's operations, ensuring our ecosystem delivers maximum value to business leaders. His background in scaling technology companies informs our growth strategy.",
    image: "/team/michael-chen.png",
    social: {
      linkedin: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen",
    },
  },
]

const advisoryBoard = [
  {
    name: "Elena Rodriguez",
    role: "AI Ethics Advisor",
    bio: "Elena is a leading expert in AI ethics and governance, helping organizations implement responsible AI practices. She advises AI First on ethical considerations in AI implementation.",
    image: "/team/elena-rodriguez.png",
    social: {
      linkedin: "https://linkedin.com/in/elenarodriguez",
    },
  },
  {
    name: "David Williams",
    role: "Industry Transformation Advisor",
    bio: "David brings decades of experience in digital transformation across multiple industries. He advises AI First on industry-specific AI implementation strategies.",
    image: "/team/david-williams.png",
    social: {
      linkedin: "https://linkedin.com/in/davidwilliams",
      twitter: "https://twitter.com/davidwilliams",
    },
  },
  {
    name: "Dr. Aisha Patel",
    role: "Academic Advisor",
    bio: "Dr. Patel is a professor of AI and Machine Learning, bridging the gap between academic research and practical business applications. She advises on AI First's educational content.",
    image: "/team/aisha-patel.png",
    social: {
      linkedin: "https://linkedin.com/in/aishapatel",
      website: "https://aishapatel.edu",
    },
  },
]

const coreTeam = [
  {
    name: "Thomas Lee",
    role: "Head of Academy",
    bio: "Thomas leads the AI First Academy, developing comprehensive training programs to help organizations build AI capabilities at every level.",
    image: "/team/thomas-lee.png",
    social: {
      linkedin: "https://linkedin.com/in/thomaslee",
    },
  },
  {
    name: "Sophia Garcia",
    role: "Summit Director",
    bio: "Sophia oversees the AI First Summit, bringing together business leaders, AI practitioners, and industry experts to share insights and strategies.",
    image: "/team/sophia-garcia.png",
    social: {
      linkedin: "https://linkedin.com/in/sophiagarcia",
      twitter: "https://twitter.com/sophiagarcia",
    },
  },
  {
    name: "Robert Kim",
    role: "Podcast Producer",
    bio: "Robert produces the AI First Podcast, bringing engaging conversations with AI pioneers and business transformation experts to our audience.",
    image: "/team/robert-kim.png",
    social: {
      linkedin: "https://linkedin.com/in/robertkim",
    },
  },
  {
    name: "Olivia Martinez",
    role: "Content Director",
    bio: "Olivia leads AI First's content strategy, ensuring our insights and methodologies are accessible to business leaders across all our platforms.",
    image: "/team/olivia-martinez.png",
    social: {
      linkedin: "https://linkedin.com/in/oliviamartinez",
      twitter: "https://twitter.com/oliviamartinez",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">Meet Our Team</h1>
              <p className="text-xl text-purple-100 mb-8">
                The experts and visionaries behind AI First, dedicated to helping organizations navigate the AI
                transformation journey.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Meet the visionaries leading AI First's mission to help organizations build competitive, AI-centric
              capabilities.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <TeamMemberCard member={member} featured={true} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Advisory Board</h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Industry experts and thought leaders who provide strategic guidance to shape AI First's vision and
              offerings.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryBoard.map((member, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <TeamMemberCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Core Team</h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              The dedicated professionals who bring the AI First ecosystem to life, from the Academy to the Summit and
              beyond.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreTeam.map((member, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <TeamMemberCard member={member} compact={true} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="bg-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals passionate about AI and business transformation. Explore our
              current openings and join us in our mission.
            </p>
            <Button className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-6">View Open Positions</Button>
          </Reveal>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              The core principles that guide our work and shape our culture at AI First.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Reveal delay={0.1}>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center h-full">
                <div className="bg-purple-100 text-purple-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We embrace cutting-edge AI technologies and methodologies to drive meaningful business transformation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center h-full">
                <div className="bg-purple-100 text-purple-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Integrity</h3>
                <p className="text-gray-600">
                  We are committed to ethical AI practices and transparent, honest relationships with our community.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center h-full">
                <div className="bg-purple-100 text-purple-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
                <p className="text-gray-600">
                  We measure our success by the tangible business outcomes our clients achieve through AI
                  implementation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center h-full">
                <div className="bg-purple-100 text-purple-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Inclusion</h3>
                <p className="text-gray-600">
                  We believe diverse perspectives are essential to developing AI solutions that work for everyone.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}
