import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
};

// Get the current user from cookies (server-side)
export function getServerUser(): User | null {
  try {
    const cookieStore = cookies();
    const authCookie = cookieStore.get("auth");

    if (!authCookie?.value) {
      return null;
    }

    const user = JSON.parse(atob(authCookie.value));
    return user;
  } catch (error) {
    console.error("Error getting server user:", error);
    return null;
  }
}

// Check if user is authenticated (server-side)
export function requireAuth(redirectTo = "/auth/signin") {
  const user = getServerUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

// Check if user is admin (server-side)
export function requireAdmin(redirectTo = "/") {
  const user = getServerUser();

  if (!user || user.role !== "admin") {
    redirect(redirectTo);
  }

  return user;
}
