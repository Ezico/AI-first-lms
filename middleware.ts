import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define paths that require authentication
const protectedPaths = ["/academy/dashboard", "/admin"]
const adminPaths = ["/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    // Get the auth cookie
    const authCookie = request.cookies.get("auth")?.value

    // If no auth cookie, redirect to sign in
    if (!authCookie) {
      const signInUrl = new URL("/auth/signin", request.url)
      signInUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signInUrl)
    }

    // If it's an admin path, check if the user is an admin
    if (isAdminPath) {
      try {
        const userData = JSON.parse(atob(authCookie))
        if (userData.role !== "admin") {
          // User is not an admin, redirect to dashboard
          return NextResponse.redirect(new URL("/academy/dashboard", request.url))
        }
      } catch (error) {
        // Invalid auth cookie, redirect to sign in
        const signInUrl = new URL("/auth/signin", request.url)
        signInUrl.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(signInUrl)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
