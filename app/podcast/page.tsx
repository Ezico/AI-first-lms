import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Mic, Headphones, Rss, ChevronRight, ExternalLink } from "lucide-react"
import { Reveal } from "@/components/reveal"
import MainNavigation from "@/components/main-navigation"
import MainFooter from "@/components/main-footer"
import { getPublishedPodcasts } from "@/lib/actions/podcast"

const platforms = [
  { name: "Apple Podcasts", url: "#" },
  { name: "Spotify", url: "#" },
  { name: "Google Podcasts", url: "#" },
  { name: "Amazon Music", url: "#" },
  { name: "Stitcher", url: "#" },
  { name: "Overcast", url: "#" },
]

export default async function PodcastPage() {
  // Fetch podcasts from the database
  const episodes = await getPublishedPodcasts()

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <Reveal>
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">AI First Podcast</h1>
                <p className="mt-3 text-xl text-purple-100 md:mt-5">
                  Insights and interviews with AI pioneers and business transformation experts
                </p>
                <p className="text-purple-200">
                  Join us as we explore how organizations are leveraging AI to transform their businesses and create
                  competitive advantages in the digital age.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="bg-white text-purple-800 hover:bg-purple-50 px-6 py-6 rounded-lg transition-all hover:scale-105 shadow-lg">
                    <Headphones className="mr-2 h-5 w-5" />
                    Listen Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-purple-800 px-6 py-6 rounded-lg transition-all"
                  >
                    <Rss className="mr-2 h-5 w-5" />
                    Subscribe
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative h-[400px] w-full">
                <Image
                  src="/placeholder.svg?height=400&width=400&query=podcast microphone with AI First logo"
                  alt="AI First Podcast"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Latest Episodes</h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Listen to our conversations with AI leaders and experts on building AI-centric organizations.
            </p>
          </Reveal>

          <div className="space-y-8">
            {episodes.length > 0 ? (
              episodes.map((episode, index) => (
                <Reveal key={episode.id} delay={index * 0.1}>
                  <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
                        <Image
                          src={episode.image_url || "/placeholder.svg?height=300&width=300&query=podcast episode"}
                          alt={episode.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div className="flex items-center gap-3 mb-2 md:mb-0">
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                              {episode.episode_number}
                            </span>
                            <span className="text-gray-500 text-sm">{episode.duration}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-700 text-purple-700 hover:bg-purple-50"
                            as="a"
                            href={episode.audio_url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Play className="mr-1 h-4 w-4" />
                            Play Episode
                          </Button>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{episode.title}</h3>
                        <p className="text-purple-700 font-medium mb-2">
                          With {episode.guest_name}
                          {episode.guest_title && `, ${episode.guest_title}`}
                        </p>
                        <p className="text-gray-600">{episode.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No episodes available at the moment. Check back soon!</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4">
              View All Episodes
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of the page remains the same */}
      {/* Listen On */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Listen On</h2>
            <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Subscribe to the AI First Podcast on your favorite platform.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {platforms.map((platform, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <a
                  href={platform.url}
                  className="bg-white p-6 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <p className="font-medium text-gray-900">{platform.name}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Host Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400&query=professional podcast host"
                  alt="AI First Podcast Host"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Meet Your Host</h2>
                <h3 className="text-xl font-bold text-purple-700">Dr. James Wilson</h3>
                <p className="text-gray-600">
                  Dr. James Wilson is a renowned AI strategist and author with over 15 years of experience helping
                  organizations implement AI solutions. As the host of the AI First Podcast, he brings deep insights and
                  engaging conversations with industry leaders to help you navigate the AI transformation journey.
                </p>
                <p className="text-gray-600">
                  Each episode features practical advice, real-world case studies, and actionable strategies you can
                  implement in your organization.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" className="border-purple-700 text-purple-700 hover:bg-purple-50">
                    About James
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4">Have a Question or Topic Suggestion?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              We'd love to hear from you! Submit your questions or suggest topics for future episodes.
            </p>
            <Button className="bg-white text-purple-800 hover:bg-purple-50 px-8 py-6">
              <Mic className="mr-2 h-5 w-5" />
              Submit a Topic
            </Button>
          </Reveal>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}
