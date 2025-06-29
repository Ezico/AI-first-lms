import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { valid: false, message: "Token is required" },
        { status: 400 }
      );
    }

    // Check if token exists and is not expired or used
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
      return NextResponse.json({
        valid: false,
        message: "Invalid reset token",
      });
    }

    const tokenData = tokens[0];

    if (tokenData.used) {
      return NextResponse.json({
        valid: false,
        message: "This reset link has already been used",
      });
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json({
        valid: false,
        message: "This reset link has expired",
      });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { valid: false, message: "An error occurred while verifying the token" },
      { status: 500 }
    );
  }
}
