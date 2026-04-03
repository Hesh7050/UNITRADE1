import axios from "axios";

const API_URL = "http://localhost:5001/api/products";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getMyProducts = async () => {
  const token = getToken();

  const response = await axios.get(`${API_URL}/my-products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const token = getToken();

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteProduct = async (id) => {
  const token = getToken();

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const markProductAsSold = async (id) => {
  const token = getToken();

  const response = await axios.put(
    `${API_URL}/${id}/sold`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};