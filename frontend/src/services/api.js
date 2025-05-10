import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Register new user
export const registerUser = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await axios.post(`${API_URL}/api/auth/register`, userData, config);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const response = await axios.post(`${API_URL}/api/auth/login`, userData, config);
  return response.data;
};

// Get projects (protected route)
export const getProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}/api/projects`, config);
  return response.data;
};

// Create a new task (protected route)
export const createTask = async (taskData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(`${API_URL}/api/tasks`, taskData, config);
  return response.data;
};

// Get tasks for a specific user (protected route)
export const getUserTasks = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}/api/tasks/user/${userId}`, config);
  return response.data;
};

// Update a task (protected route)
export const updateTask = async (taskId, updatedData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, updatedData, config);
  return response.data;
};

// Delete a task (protected route)
export const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(`${API_URL}/api/tasks/${taskId}`, config);
  return response.data;
};
