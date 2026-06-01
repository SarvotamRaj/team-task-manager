import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

export const getDashboardData = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};import axios from "axios";

const API_URL = "https://team-task-manager-production-a0ee.up.railway.app/api/dashboard";

export const getDashboardData = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};