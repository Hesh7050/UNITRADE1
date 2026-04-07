import axios from "axios";

const API_URL = "http://localhost:5001/api/cart";

const getToken = () => localStorage.getItem("token");

export const addToCart = async (productId) => {
  const token = getToken();

  const response = await axios.post(
    API_URL,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};