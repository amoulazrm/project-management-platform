// src/services/api.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api'; // Backend URL

// Example API call to login
export const loginUser = async (email, password) => {
  const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
  return response.data;
};

// Example API call to register
export const registerUser = async (name, email, password, role) => {
  const response = await axios.post(`${apiUrl}/auth/register`, { name, email, password, role });
  return response.data;
};

// Example API call to fetch projects
export const getProjects = async () => {
  const response = await axios.get(`${apiUrl}/projects`);
  return response.data;
};
