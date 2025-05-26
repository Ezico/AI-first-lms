import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { company, name, email } = await request.json();
    // Validate input
    if (!name || !company || !email) {
      return NextResponse.json(
        { success: false, message: "Name, company, and email are required" },
        { status: 400 }
      );
    }

    // save to database
    await executeQuery(
      "INSERT INTO submissions (name, company, email) VALUES ($1, $2, $3)",
      [name, company, email]
    );

    // Send eBook email
    await resend.emails.send({
      from: "Your Company <noreply@aifirst.one>",
      to: email,
      subject: "Your eBook is here!",
      html: `
            <h2>Hi ${name},</h2>
            <p>Thanks for reaching out from ${company}!</p>
            <p>Here is your free eBook:</p>
            <a href="https://aifirst.com/files/ebook.pdf">📕 Download eBook</a>
            <p>Cheers,<br/>Your Company</p>
            <p><small>If you did not request this email, please ignore it.</small></p>
            <p><small>This email was sent to ${email}.</small></p>
            <p><small>To unsubscribe, click <a href="https://aifirst.one/unsubscribe">hereto unsubscribe</a>.</small></p>
          `,
    });

    return NextResponse.json({
      success: true,
      message: "Ebook was sent successfully",
    });
  } catch (error) {
    console.error("Sending error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during sending ebook" },
      { status: 500 }
    );
  }
}
