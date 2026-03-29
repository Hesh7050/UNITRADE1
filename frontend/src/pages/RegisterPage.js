import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/users/register", formData);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <Navbar />

      <div className="register-container">
        <h2 className="register-title">Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />

          <input
            className="register-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="register-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button className="register-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;