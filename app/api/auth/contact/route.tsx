import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, message, name } = await request.json();
    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name, email and message are required",
        },
        { status: 400 }
      );
    }

    // save to database

    await executeQuery(
      `INSERT INTO contact_submissions 
    (name, email, message)
    VALUES ($1, $2, $3)`,
      [name, email, message]
    );

    return NextResponse.json({
      success: true,
      message:
        "Thank you for reaching out! We will get back to you as soon as possible.",
    });
  } catch (error) {
    console.error("Sending error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while submitting your message, please try again later.",
      },
      { status: 500 }
    );
  }
}
