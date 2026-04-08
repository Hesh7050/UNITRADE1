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

export const getMyCart = async () => {
  const token = getToken();

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const removeFromCart = async (cartItemId) => {
  const token = getToken();

  const response = await axios.delete(`${API_URL}/${cartItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};