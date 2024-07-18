import axios from "axios";

import { BASE_URL } from "../../../config";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/admin/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
