"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

const sql = neon(process.env.DATABASE_URL!)

export async function getPodcasts() {
  try {
    const podcasts = await sql`
      SELECT * FROM podcasts
      ORDER BY publish_date DESC
    `
    return podcasts
  } catch (error) {
    console.error("Failed to fetch podcasts:", error)
    return []
  }
}

export async function getPublishedPodcasts() {
  try {
    const podcasts = await sql`
      SELECT * FROM podcasts
      WHERE published = true
      ORDER BY publish_date DESC
    `
    return podcasts
  } catch (error) {
    console.error("Failed to fetch published podcasts:", error)
    return []
  }
}

export async function getFeaturedPodcasts() {
  try {
    const podcasts = await sql`
      SELECT * FROM podcasts
      WHERE published = true AND featured = true
      ORDER BY publish_date DESC
      LIMIT 3
    `
    return podcasts
  } catch (error) {
    console.error("Failed to fetch featured podcasts:", error)
    return []
  }
}

export async function getPodcastById(id: number) {
  try {
    const podcasts = await sql`
      SELECT * FROM podcasts
      WHERE id = ${id}
    `

    if (podcasts.length === 0) {
      return null
    }

    return podcasts[0]
  } catch (error) {
    console.error(`Failed to fetch podcast with id ${id}:`, error)
    return null
  }
}

export async function createPodcast(data: any) {
  try {
    const {
      episode_number,
      title,
      slug,
      description,
      guest_name,
      guest_title,
      duration,
      audio_url,
      image_url,
      published,
      featured,
    } = data

    const result = await sql`
      INSERT INTO podcasts (
        episode_number, 
        title, 
        slug, 
        description, 
        guest_name, 
        guest_title, 
        duration, 
        audio_url, 
        image_url, 
        published, 
        featured
      ) 
      VALUES (
        ${episode_number}, 
        ${title}, 
        ${slug}, 
        ${description}, 
        ${guest_name}, 
        ${guest_title || ""}, 
        ${duration}, 
        ${audio_url || ""}, 
        ${image_url || ""}, 
        ${published}, 
        ${featured}
      )
      RETURNING id
    `

    revalidatePath("/podcast")
    revalidatePath("/admin/podcasts")

    return { success: true, id: result[0].id }
  } catch (error) {
    console.error("Failed to create podcast:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function updatePodcast(id: number, data: any) {
  try {
    // First check if the podcast exists
    const podcast = await getPodcastById(id)
    if (!podcast) {
      return { success: false, error: `Podcast with id ${id} not found` }
    }

    const {
      episode_number,
      title,
      slug,
      description,
      guest_name,
      guest_title,
      duration,
      audio_url,
      image_url,
      published,
      featured,
    } = data

    const result = await sql`
      UPDATE podcasts
      SET 
        episode_number = ${episode_number},
        title = ${title},
        slug = ${slug},
        description = ${description},
        guest_name = ${guest_name},
        guest_title = ${guest_title || ""},
        duration = ${duration},
        audio_url = ${audio_url || ""},
        image_url = ${image_url || ""},
        published = ${published},
        featured = ${featured},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING id
    `

    revalidatePath("/podcast")
    revalidatePath("/admin/podcasts")

    return { success: true, id: result[0].id }
  } catch (error) {
    console.error(`Failed to update podcast with id ${id}:`, error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function deletePodcast(id: number) {
  try {
    await sql`
      DELETE FROM podcasts
      WHERE id = ${id}
    `

    revalidatePath("/podcast")
    revalidatePath("/admin/podcasts")

    return { success: true }
  } catch (error) {
    console.error(`Failed to delete podcast with id ${id}:`, error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
