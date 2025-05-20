"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Define user type
export type User = {
  id: string
  name: string
  email: string
  role: string
  image?: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  checkAuth: () => Promise<boolean>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage first for client-side auth
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Auth error:", error)
        // Clear invalid data
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Check auth status
  const checkAuth = async (): Promise<boolean> => {
    try {
      const storedUser = localStorage.getItem("user")
      return !!storedUser
    } catch (error) {
      return false
    }
  }

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // Make an API call to verify credentials against the database
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (!data.success) {
        return { success: false, message: data.message || "Invalid email or password" }
      }

      // Store user in state and localStorage
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Set a cookie for server-side auth check
      document.cookie = `auth=${btoa(JSON.stringify(data.user))}; path=/; max-age=${60 * 60 * 24 * 7}`

      return { success: true, message: "Login successful" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    document.cookie = "auth=; path=/; max-age=0"
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
