import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Get all users
export const getUsers = () => axios.get(`${BASE_URL}/users`);

// Add new user
export const addUser = (userData) => axios.post(`${BASE_URL}/users`, userData);

// Update user
export const updateUser = (id, userData) =>
  axios.put(`${BASE_URL}/users/${id}`, userData);

// Delete user
export const deleteUser = (id) =>
  axios.delete(`${BASE_URL}/users/${id}`);
