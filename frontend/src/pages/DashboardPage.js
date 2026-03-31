import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Profile", path: "/profile" },
          { label: "Add Product", path: "/create-product" },
          { label: "Logout", type: "logout" },
        ]} />

      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to Student Marketplace</h1>

        <p className="dashboard-subtitle">
          Hello, <strong>{user?.name || "User"}</strong>
        </p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Browse Products</h3>
            <p>View available products and explore items from other students.</p>
            <Link to="/" className="dashboard-link-btn">
              Go to Home
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>Sell Product</h3>
            <p>Add your own product and start selling to other students.</p>
            <Link to="/create-product" className="dashboard-link-btn">
              Add Product
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>My Account</h3>
            <p>Manage your account and use the system securely.</p>
            <Link to="/profile" className="dashboard-link-btn">
              My Profile
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>Logout</h3>
            <p>Sign out from the system safely.</p>
            <button className="dashboard-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;