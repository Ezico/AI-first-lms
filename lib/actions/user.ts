"use server";

import { executeQuery } from "@/lib/db";
import { hash, compare } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      error: "Missing required fields",
    };
  }

  try {
    // Check if user already exists
    const existingUsers = await executeQuery(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUsers.length > 0) {
      return {
        error: "User already exists",
      };
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    await executeQuery(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, "user"]
    );

    revalidatePath("/auth/signin");
    redirect("/auth/signin");
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: "An error occurred during registration. Please try again.",
    };
  }
}

export async function updateUserProfile(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as File | null;

    // Get current user from cookie
    const cookieStore = cookies();
    const authCookie = cookieStore.get("auth");

    if (!authCookie?.value) {
      return { error: "Not authenticated" };
    }

    const user = JSON.parse(atob(authCookie.value));

    // Check if email is already taken by another user
    if (email !== user.email) {
      const existingUsers = await executeQuery(
        "SELECT * FROM users WHERE email = $1 AND id != $2",
        [email, user.id]
      );

      if (existingUsers.length > 0) {
        return { error: "Email is already taken" };
      }
    }

    // In a real app, we would upload the image to a storage service
    // For this example, we'll just store the image URL
    let imageUrl = user.image;
    if (image && image.size > 0) {
      // Simulate image upload - in a real app, upload to a storage service
      imageUrl = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(
        name
      )}`;
    }

    // Update user in database
    await executeQuery(
      "UPDATE users SET name = $1, email = $2, image = $3 WHERE id = $4",
      [name, email, imageUrl, user.id]
    );

    // Update user in cookie
    const updatedUser = {
      ...user,
      name,
      email,
      image: imageUrl,
    };

    cookieStore.set("auth", btoa(JSON.stringify(updatedUser)), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    revalidatePath("/profile");
    revalidatePath("/academy/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "Failed to update profile" };
  }
}

export async function updateUserPassword(formData: FormData) {
  try {
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!currentPassword || !newPassword) {
      return { error: "Missing required fields" };
    }

    // Get current user from cookie
    const cookieStore = cookies();
    const authCookie = cookieStore.get("auth");

    if (!authCookie?.value) {
      return { error: "Not authenticated" };
    }

    const user = JSON.parse(atob(authCookie.value));

    // Get user from database to check password
    const users = await executeQuery("SELECT * FROM users WHERE id = $1", [
      user.id,
    ]);

    if (users.length === 0) {
      return { error: "User not found" };
    }

    const dbUser = users[0];

    // Verify current password
    const isPasswordValid = await compare(currentPassword, dbUser.password);

    if (!isPasswordValid) {
      return { error: "Current password is incorrect" };
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10);

    // Update password in database
    await executeQuery("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPassword,
      user.id,
    ]);

    revalidatePath("/profile");

    return { success: true };
  } catch (error) {
    console.error("Password update error:", error);
    return { error: "Failed to update password" };
  }
}
