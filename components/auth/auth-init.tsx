"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"

export function AuthInit() {
  const { user, loading } = useAuth()

  useEffect(() => {
    // This is just to ensure the auth context is initialized on the client side
    console.log("Auth initialized", { user, loading })
  }, [user, loading])

  return null
}
