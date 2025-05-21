import { redirect } from "next/navigation";
import getServerUser from "./actions/getUserFunction";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
};

// Get the current user from cookies (server-side)

// export function getServerUser(): User | null {
//   // Check if the request is from the server
//   try {
//     const cookieStore = cookies();
//     const authCookie = cookieStore.get("auth");
//     if (!authCookie?.value) {
//       return null;
//     }

//     const user = JSON.parse(atob(authCookie.value));
//     return user;
//   } catch (error) {
//     console.error("Error getting server user:", error);
//     return null;
//   }
// }

// Check if user is authenticated (server-side)
export async function requireAuth(redirectTo = "/auth/signin") {
  const user = await getServerUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

// Check if user is admin (server-side)
export async function requireAdmin(redirectTo = "/") {
  const user = await getServerUser();

  if (!user || user.role !== "admin") {
    redirect(redirectTo);
  }

  return user;
}
