import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
})

// Authentication APIs
export const register = async (email, password) => {
  try {
    const response = await api.post("/users/register", { email, password })
    return response.data
  } catch (error) {
    throw error
  }
}

export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password })
    return response.data
  } catch (error) {
    throw error
  }
}

// Task APIs
export const createTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserTasks = async (userId) => {
  try {
    const response = await api.get(`/tasks/user/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Add interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user")
    if (user) {
      // In a real app, you would extract the token from the user object
      // config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
