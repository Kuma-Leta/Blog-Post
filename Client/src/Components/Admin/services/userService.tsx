// src/services/userService.tsx
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1"; // Update with your API URL

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data.data.data; // Return only the users array
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Optionally handle or log errors
  }
};
