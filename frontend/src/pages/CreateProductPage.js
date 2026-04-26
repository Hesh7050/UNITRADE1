import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./CreateProductPage.css";

function CreateProductPage() {
  const [formData, setFormData] = useState({
    category: "",
    condition: "",
    brand: "",
    title: "",
    description: "",
    price: "",
    negotiable: false,
    location: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    images: [null, null, null, null, null],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return;

    const updatedImages = [...formData.images];
    updatedImages[index] = file;

    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !token) {
      alert("Please login first");
      return;
    }

    const selectedImages = formData.images.filter((image) => image !== null);

    if (selectedImages.length < 3) {
      alert("Please upload at least 3 product photos");
      return;
    }

    const data = new FormData();

    data.append("condition", formData.condition);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("negotiable", formData.negotiable);
    data.append("location", formData.location);
    data.append("ownerName", formData.ownerName);
    data.append("ownerEmail", formData.ownerEmail);
    data.append("ownerPhone", formData.ownerPhone);

    formData.images.forEach((image) => {
      if (image) {
        data.append("images", image);
      }
    });

    try {
      const res = await axios.post("http://localhost:5001/api/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);

      setFormData({
        category: "",
        condition: "",
        brand: "",
        title: "",
        description: "",
        price: "",
        negotiable: false,
        location: "",
        ownerName: "",
        ownerEmail: "",
        ownerPhone: "",
        images: [null, null, null, null, null],
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
            <option value="Brand New">Brand New</option>
            <option value="Used">Used</option>
          </select>

          <input
            className="create-product-input"
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />

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

          <label className="create-product-checkbox">
            <input
              type="checkbox"
              name="negotiable"
              checked={formData.negotiable}
              onChange={handleChange}
            />
            Negotiable
          </label>

          <label className="create-product-label">Add up to 5 photos</label>

          <div className="photo-upload-grid">
            {formData.images.map((image, index) => (
              <label key={index} className="photo-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  hidden
                  required={index < 3}
                />

                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Product ${index + 1}`}
                    className="photo-preview"
                  />
                ) : (
                  <span>
                    {index < 3 ? "Add required photo" : "Add optional photo"}
                  </span>
                )}
              </label>
            ))}
          </div>

          <p className="create-product-note">
            First 3 photos are required. Last 2 photos are optional.
          </p>

          <input
            className="create-product-input"
            type="text"
            name="location"
            placeholder="Seller Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <h3 className="create-product-subtitle">Seller Contact Details</h3>

          <input
            className="create-product-input"
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />

          <input
            className="create-product-input"
            type="email"
            name="ownerEmail"
            placeholder="Owner Email"
            value={formData.ownerEmail}
            onChange={handleChange}
            required
          />

          <input
            className="create-product-input"
            type="tel"
            name="ownerPhone"
            placeholder="Owner Phone Number"
            value={formData.ownerPhone}
            onChange={handleChange}
            required
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