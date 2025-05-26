import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      fullName,
      name,
      email,
      company,
      jobTitle,
      industry,
      interests,
      referral,
    } = await request.json();
    // Validate input
    if (!fullName || !email || !company || !jobTitle || !industry) {
      return NextResponse.json(
        {
          success: false,
          message:
            "fullName, name, email, company, jobTitle and industry are required",
        },
        { status: 400 }
      );
    }

    // save to database
    await executeQuery(
      `INSERT INTO waitlist_subscribers 
      (full_name, email, company, job_title, industry, interests, referral)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [fullName, email, company, jobTitle, industry, interests, referral]
    );

    return NextResponse.json({
      success: true,
      message:
        "Successfully joined waitlist! <br> We will notify you when we launch.",
    });
  } catch (error) {
    console.error("Sending error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred during joining the waitlist, please try again",
      },
      { status: 500 }
    );
  }
}
