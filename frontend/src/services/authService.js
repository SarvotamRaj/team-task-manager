import axios from "axios";

const API_URL = "team-task-manager-production-a0ee.up.railway.app";


// LOGIN USER
export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};


// REGISTER USER
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};