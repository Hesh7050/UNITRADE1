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

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await axios.post("http://localhost:5001/api/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        location: "",
        image: null,
      });
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
          { label: "My Products", path: "/my-products" },
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
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            className="create-product-textarea"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <input
            className="create-product-input"
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <select
            className="create-product-input"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Academic">Academic</option>
            <option value="Electronics">Electronics</option>
            <option value="Living & Hostel">Living & Hostel</option>
            <option value="Personal Items">Personal Items</option>
          </select>

          <select
            className="create-product-input"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
            <option value="Fair">Fair</option>
          </select>

          <input
            className="create-product-input"
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
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