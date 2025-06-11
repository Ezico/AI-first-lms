import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import MainNavigation from "@/components/main-navigation";
import MainFooter from "@/components/main-footer";
import TeamMemberCard from "@/components/team-member-card";
import Link from "next/link";

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
];

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
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                About the author
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                The experts and visionaries behind AI First, dedicated to
                helping organizations navigate the AI transformation journey.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              About the Author – Davies Kenny Bamigboye (DKB)
            </h2>
            <p className="text-lg  text-gray-600 mb-12 max-w-3xl mx-auto">
              <strong>Davies Kenny Bamigboye (DKB)</strong> is a seasoned
              technology executive, AI transformation strategist, and author,
              with a career spanning finance, infrastructure, healthcare, and
              innovation across Europe and Africa.{" "}
            </p>
            <p className="text-lg  text-gray-600 mb-12 max-w-3xl mx-auto">
              He is the author of AI First: The Leader’s Guide to Building an
              AI-Centric Organisation — a strategic playbook for leaders
              navigating the shift from experimentation to scalable, responsible
              AI adoption.
            </p>
          </Reveal>
        </div>

        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold max-w-3xl mx-auto text-gray-900 mb-4">
              Enterprise-Grade Experience
            </h2>
            <p className="text-lg  text-gray-600 mb-12 max-w-3xl mx-auto">
              With senior roles at the{" "}
              <b>
                London Stock Exchange Group (LSEG), BNP Paribas, Zurich
                Insurance
              </b>
              , and <b>Transport for London</b>, Davies has led critical
              programs including:
            </p>
            <ul className="max-w-3xl space-y-3 mx-auto">
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
                <p className="text-gray-700 ">
                  Global platform and infrastructure rollouts
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
                <p className="text-gray-700 ">Enterprise IAM systems</p>
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
                <p className="text-gray-700 ">
                  Cross-border transformation and governance initiatives
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
                <p className="text-gray-700 ">
                  Team leadership across Europe and Africa
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
                <p className="text-gray-700 ">
                  CTO-level leadership in the healthcare sector
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
                <p className="text-gray-700 ">
                  Non-Executive Director roles in Fintech
                </p>
              </li>
            </ul>
          </Reveal>
        </div>
        <br />
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold max-w-3xl mx-auto text-gray-900 mb-4">
              Building What’s Next
            </h2>
            <p className="text-lg  text-gray-600 mb-12 max-w-3xl mx-auto">
              Davies is currently developing <b>Readie</b>, a platform focused
              on AI readiness, leadership alignment, and maturity benchmarking.
              As part of this emerging ecosystem, he is:
            </p>
            <ul className="max-w-3xl space-y-3 mx-auto">
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
                <p className="text-gray-700 ">
                  Piloting the <b>AI First Newsletter</b>
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
                <p className="text-gray-700 ">
                  Preparing to launch the <b>AI First Podcast</b> and{" "}
                  <b> AI First Summit</b>
                </p>
              </li>
            </ul>
            <p className="text-lg  text-gray-600 mb-12 max-w-3xl mx-auto">
              These initiatives are in early release stages, with an emphasis on
              learning, iteration, and community co-creation.
            </p>
          </Reveal>
        </div>
        <br />
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold max-w-3xl mx-auto text-gray-900 mb-4">
              Beyond the Boardroom
            </h2>
            <p className="text-lg  text-gray-600 mb-12 max-w-3xl mx-auto">
              Davies is also the author of Invaluable: Discover, Embrace, and
              Experience Your Incredible Worth in Christ, a devotional designed
              to help readers grow in identity, purpose, and faith. He serves as
              a <b>Christian Success Coach</b>, blending leadership and personal
              transformation in his work with individuals and organisations
              alike.
            </p>
          </Reveal>
        </div>
        <br />
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold max-w-3xl mx-auto text-gray-900 mb-4">
              Areas of Focus
            </h2>

            <ul className="max-w-3xl space-y-3 mx-auto">
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
                <p className="text-gray-700 ">
                  AI Maturity & Executive Alignment
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
                <p className="text-gray-700 ">
                  Cross-Sector Transformation & Governance
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
                <p className="text-gray-700 ">
                  Data Infrastructure & Scalable Architecture
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
                <p className="text-gray-700 ">
                  Leadership Development in Regulated Environments
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
                <p className="text-gray-700 ">
                  Ethical & Responsible AI Practices
                </p>
              </li>
            </ul>
            <blockquote className="max-w-3xl space-y-3 mx-auto border-l-4 border-purple-700 pl-6 italic text-gray-700 text-lg my-8">
              “I’m building <span className="font-semibold">AI First</span> for
              the strategist — the one responsible for turning hype into health,
              headlines into impact.”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="bg-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              We're always looking for talented individuals passionate about AI
              and business transformation. Explore our current openings and join
              us in our mission.
            </p>
            <Link href={"/contact"}>
              <Button className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-6">
                Contact us
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
