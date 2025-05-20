import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const error = url.searchParams.get("error") || "default"

  // Redirect to our custom error page
  return NextResponse.redirect(new URL(`/auth/error?error=${error}`, request.url))
}
