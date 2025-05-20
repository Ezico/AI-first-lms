import { notFound } from "next/navigation"
import { getPodcastById } from "@/lib/actions/podcast"
import PodcastForm from "@/components/admin/podcast-form"

export default async function EditPodcastPage({ params }: { params: { id: string } }) {
  const podcastId = Number.parseInt(params.id, 10)

  if (isNaN(podcastId)) {
    notFound()
  }

  const podcast = await getPodcastById(podcastId)

  if (!podcast) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Podcast</h1>
        <p className="text-muted-foreground">Update podcast details and content</p>
      </div>

      <PodcastForm podcast={podcast} />
    </div>
  )
}
