import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

let ensureTablePromise: Promise<void> | null = null;
// async function ensurePasswordResetTokensTableExists() {
//   if (!ensureTablePromise) {
//     ensureTablePromise = (async () => {
//       await executeQuery(`
//         CREATE TABLE IF NOT EXISTS password_reset_tokens (
//           id          SERIAL PRIMARY KEY,
//           user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//           token       VARCHAR(255) NOT NULL UNIQUE,
//           expires_at  TIMESTAMP    NOT NULL,
//           used        BOOLEAN      DEFAULT FALSE,
//           created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
//         )
//       `);

//       await executeQuery(`
//         CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token)
//       `);

//       await executeQuery(`
//         CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id)
//       `);
//     })();
//   }
//   await ensureTablePromise;
// }

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // await ensurePasswordResetTokensTableExists();

    const rows = await executeQuery(
      "SELECT id, email, name FROM users WHERE email = $1",
      [email]
    );
    const users = rows as { id: number; email: string; name: string }[];

    console.log(`Found ${users.length} user(s) with email ${email}`);
    // Always return success to prevent email enumeration attacks
    if (users.length === 0) {
      return NextResponse.json({
        success: true,
        message:
          "If an account with that email exists, we've sent you a password reset link.",
      });
    }

    const user = users[0];

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Store the token in the database
    await executeQuery(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [user.id, token, expiresAt]
    );

    // Create the reset link
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;
    console.log(`Generated reset link: ${resetLink}`);
    try {
      // Send email using Resend
      await resend.emails.send({
        from: "AI Academy <noreply@aifirst.one>",
        to: [email],
        subject: "Reset Your Password - AI Academy",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Reset Your Password</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">AI Academy</h1>
              </div>
              
              <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
                <h2 style="color: #495057; margin-top: 0;">Reset Your Password</h2>
                
                <p>Hello ${user.name || "there"},</p>
                
                <p>We received a request to reset your password for your AI Academy account. If you didn't make this request, you can safely ignore this email.</p>
                
                <p>To reset your password, click the button below:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetLink}" 
                     style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                            color: white; 
                            padding: 12px 30px; 
                            text-decoration: none; 
                            border-radius: 5px; 
                            font-weight: bold;
                            display: inline-block;">
                    Reset Password
                  </a>
                </div>
                
                <p style="color: #6c757d; font-size: 14px;">
                  This link will expire in 1 hour for security reasons.
                </p>
                
                <p style="color: #6c757d; font-size: 14px;">
                  If the button doesn't work, you can copy and paste this link into your browser:<br>
                  <a href="${resetLink}" style="color: #667eea; word-break: break-all;">${resetLink}</a>
                </p>
                
                <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
                
                <p style="color: #6c757d; font-size: 12px; margin: 0;">
                  This email was sent from AI Academy. If you have any questions, please contact our support team.
                </p>
              </div>
            </body>
          </html>
        `,
        text: `
Hello ${user.name || "there"},

We received a request to reset your password for your AI Academy account. If you didn't make this request, you can safely ignore this email.

To reset your password, visit this link:
${resetLink}

This link will expire in 1 hour for security reasons.

If you have any questions, please contact our support team.

Best regards,
AI Academy Team
        `.trim(),
      });

      console.log(`Password reset email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      // Don't reveal email sending failures to prevent information disclosure
    }

    return NextResponse.json({
      success: true,
      message:
        "If an account with that email exists, we've sent you a password reset link.",
      // In development, include the reset link for testing
      ...(process.env.NODE_ENV === "development" && { resetLink }),
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
