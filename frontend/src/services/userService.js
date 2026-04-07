import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

export const getSellerProfile = async (sellerId) => {
  const response = await axios.get(`${API_URL}/seller/${sellerId}`);
  return response.data;
};