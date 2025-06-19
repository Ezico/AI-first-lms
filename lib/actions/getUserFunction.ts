"use server";
import { cookies } from "next/headers";

export default async function getServerUser() {
  try {
    const cookieStore = await cookies();
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
