import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./DashboardPage.css";

function DashboardPage() {
  
  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <div className="dashboard-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },         
          { label: "Profile", path: "/profile" },         
          { label: "Logout", type: "logout" },
        ]}
      />

      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to Student Marketplace</h1>

        <p className="dashboard-subtitle">
          Hello, <strong>{user?.name || "User"}</strong>
        </p>

        <div className="dashboard-cards">
          

          <div className="dashboard-card">
            <h3>Sell Product</h3>
            <p>Add your own product and start selling to other students.</p>
            <Link to="/create-product" className="dashboard-link-btn">
              Add Product
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>My Products</h3>
            <p>View, edit, delete, and mark your posted products as sold.</p>
            <Link to="/my-products" className="dashboard-link-btn">
              Manage Products
            </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;