import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./CreateProductPage.css";

function CreateProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !token) {
      alert("Please login first");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("condition", formData.condition);
    data.append("location", formData.location);   
    data.append("image", formData.image);

    try {
      const res = await axios.post("http://localhost:5001/api/products", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Product creation failed");
    }
  };

  return (
    <div className="create-product-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", type: "logout" },
        ]}
      />

      <div className="create-product-container">
        <h2 className="create-product-title">Create Product</h2>

        <form className="create-product-form" onSubmit={handleSubmit}>
          <input
            className="create-product-input"
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />

          <textarea
            className="create-product-textarea"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          ></textarea>

          <input
            className="create-product-input"
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />

          <input
            className="create-product-input"
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />

          <input
            className="create-product-input"
            type="text"
            name="condition"
            placeholder="Condition"
            onChange={handleChange}
          />

          <input
            className="create-product-input"
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />

          <input
            className="create-product-file"
            type="file"
            name="image"
            onChange={handleChange}
          />

          <button className="create-product-button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProductPage;