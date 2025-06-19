import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      description,
      price,
      imageUrl,
      fileUrl,
      featured,
      level,
      duration,
      instructorName,
      instructorImageUrl,
    } = body;

    const result = await sql`
    INSERT INTO "SimpleCourse" 
      ("title", "slug", "description", "price", "imageUrl", "fileUrl", "featured", "level", "duration", "instructorName", "instructorImageUrl") 
    VALUES 
      (${title}, ${slug}, ${description}, ${price}, ${imageUrl}, ${fileUrl}, ${featured}, ${level}, ${duration}, ${instructorName}, ${instructorImageUrl})
    RETURNING *;
  `;

    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("❌ Error inserting SimpleCourse:", err);
    return new NextResponse("Error creating course", { status: 500 });
  }
}
