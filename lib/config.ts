// Environment variables and configuration
export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
  // We're not using NextAuth anymore, but keeping this for reference
  // authSecret: process.env.NEXTAUTH_SECRET || "your-secret-key",
}

// API endpoints
export const apiEndpoints = {
  login: `${config.baseUrl}/api/auth/login`,
  register: `${config.baseUrl}/api/auth/register`,
  courses: `${config.baseUrl}/api/courses`,
}
