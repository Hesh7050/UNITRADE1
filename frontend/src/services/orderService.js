import axios from "axios";

const API_URL = "http://localhost:5001/api/orders";

const getToken = () => localStorage.getItem("token");

export const buyNow = async (productId) => {
  const token = getToken();

  const response = await axios.post(
    `${API_URL}/buy`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};