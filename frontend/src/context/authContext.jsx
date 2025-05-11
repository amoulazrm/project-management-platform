"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, register as apiRegister } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password)
      if (response.success) {
        const userData = response.data
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return { success: true }
      } else {
        return { success: false, message: response.message || "Login failed" }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred during login",
      }
    }
  }

  const register = async (email, password) => {
    try {
      const response = await apiRegister(email, password)
      if (response.success) {
        return { success: true }
      } else {
        return { success: false, message: response.message || "Registration failed" }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "An error occurred during registration",
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
