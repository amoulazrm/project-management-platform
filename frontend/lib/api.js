// lib/api.js
import axios from "axios"

// Create an axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Only run this code on the client side
if (typeof window !== "undefined") {
  // Add a request interceptor to add the auth token to every request
  api.interceptors.request.use(
    (config) => {
      // Get token from localStorage
      const token = localStorage.getItem("token")
      
      // If token exists, add it to the headers
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Add a response interceptor to handle common errors
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // Handle 401 Unauthorized errors (token expired)
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        window.location.href = "/login"
      }
      return Promise.reject(error)
    },
  )
}

export { api }