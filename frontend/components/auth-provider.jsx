// components/auth-provider.jsx
"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // Only access localStorage on the client side
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        if (token) {
          const response = await api.get("/users/me")
          setUser(response.data)
        }
      } catch (error) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token")
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const response = await api.post("/auth/login", { email, password })
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token)
      }
      setUser(response.data.user)
      router.push("/dashboard")
    } catch (error) {
      throw new Error("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    try {
      const response = await api.post("/auth/register", { name, email, password })
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token)
      }
      setUser(response.data.user)
      router.push("/dashboard")
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}