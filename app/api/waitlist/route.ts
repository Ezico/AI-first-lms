// /app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, courseName } = body;

    if (!email || !courseName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO "Course_Waitlist" (email, first_name, last_name, course_slug)
      VALUES (${email}, ${firstName}, ${lastName}, ${courseName});
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
