"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createPodcast, updatePodcast } from "@/lib/actions/podcast"
import { toast } from "@/components/ui/use-toast"

interface PodcastFormProps {
  podcast?: {
    id: number
    episode_number: string
    title: string
    slug: string
    description: string
    guest_name: string
    guest_title: string
    duration: string
    audio_url: string
    image_url: string
    published: boolean
    featured: boolean
  }
}

export default function PodcastForm({ podcast }: PodcastFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    episode_number: podcast?.episode_number || "",
    title: podcast?.title || "",
    slug: podcast?.slug || "",
    description: podcast?.description || "",
    guest_name: podcast?.guest_name || "",
    guest_title: podcast?.guest_title || "",
    duration: podcast?.duration || "",
    audio_url: podcast?.audio_url || "",
    image_url: podcast?.image_url || "",
    published: podcast?.published || false,
    featured: podcast?.featured || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSlugGeneration = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (podcast) {
        // Update existing podcast
        const result = await updatePodcast(podcast.id, formData)
        if (result.success) {
          toast({
            title: "Success",
            description: "Podcast updated successfully",
          })
          router.push("/admin/podcasts")
          router.refresh()
        } else {
          throw new Error(result.error)
        }
      } else {
        // Create new podcast
        const result = await createPodcast(formData)
        if (result.success) {
          toast({
            title: "Success",
            description: "Podcast created successfully",
          })
          router.push("/admin/podcasts")
          router.refresh()
        } else {
          throw new Error(result.error)
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${podcast ? "update" : "create"} podcast: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="episode_number">Episode Number</Label>
          <Input
            id="episode_number"
            name="episode_number"
            value={formData.episode_number}
            onChange={handleChange}
            placeholder="EP 42"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Podcast Episode Title"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="slug">Slug</Label>
            <Button type="button" variant="outline" size="sm" onClick={handleSlugGeneration} className="text-xs">
              Generate from Title
            </Button>
          </div>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="podcast-episode-slug"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="45 min"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guest_name">Guest Name</Label>
          <Input
            id="guest_name"
            name="guest_name"
            value={formData.guest_name}
            onChange={handleChange}
            placeholder="Dr. Jane Smith"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guest_title">Guest Title</Label>
          <Input
            id="guest_title"
            name="guest_title"
            value={formData.guest_title}
            onChange={handleChange}
            placeholder="AI Research Director"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audio_url">Audio URL</Label>
          <Input
            id="audio_url"
            name="audio_url"
            value={formData.audio_url}
            onChange={handleChange}
            placeholder="https://example.com/podcasts/episode.mp3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/images/episode.jpg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description of the podcast episode..."
          rows={4}
          required
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={formData.published}
            onCheckedChange={(checked) => handleSwitchChange("published", checked)}
          />
          <Label htmlFor="published">Published</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/podcasts")} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : podcast ? "Update Podcast" : "Create Podcast"}
        </Button>
      </div>
    </form>
  )
}
