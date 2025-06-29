import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: "Token and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long",
        },
        { status: 400 }
      );
    }

    // Verify token is valid and not expired or used
    const rows = await executeQuery(
      `SELECT id, user_id, expires_at, used 
       FROM password_reset_tokens 
       WHERE token = $1`,
      [token]
    );

    const tokens = rows as {
      id: number;
      user_id: number;
      expires_at: string;
      used: boolean;
    }[];

    if (tokens.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid reset token" },
        { status: 400 }
      );
    }

    const tokenData = tokens[0];

    if (tokenData.used) {
      return NextResponse.json(
        { success: false, message: "This reset link has already been used" },
        { status: 400 }
      );
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json(
        { success: false, message: "This reset link has expired" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the user's password
    await executeQuery("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPassword,
      tokenData.user_id,
    ]);

    // Mark the token as used
    await executeQuery(
      "UPDATE password_reset_tokens SET used = true WHERE id = $1",
      [tokenData.id]
    );

    // Clean up expired tokens for this user
    await executeQuery(
      "DELETE FROM password_reset_tokens WHERE user_id = $1 AND (expires_at < NOW() OR used = true)",
      [tokenData.user_id]
    );

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while resetting your password",
      },
      { status: 500 }
    );
  }
}
