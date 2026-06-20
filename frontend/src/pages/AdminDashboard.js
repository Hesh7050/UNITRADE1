import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./AdminDashboard.css";


const API_URL = "http://localhost:5001/api/admin";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    availableProducts: 0,
    soldProducts: 0,
  });

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("products");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadAdminData = async () => {
    try {
      const statsRes = await axios.get(`${API_URL}/stats`, config);
      const usersRes = await axios.get(`${API_URL}/users`, config);
      const productsRes = await axios.get(`${API_URL}/products`, config);

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Admin data loading failed:", error);
      alert("Failed to load admin dashboard data");
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/products/${id}`, config);
      loadAdminData();
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/users/${id}`, config);
      loadAdminData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="admin-small-title">UNITRADE ADMIN PANEL</p>
          <h1>Admin Dashboard</h1>
          <p>Manage users, products, and marketplace activity.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Total Users</span>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="admin-stat-card">
          <span>Total Products</span>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div className="admin-stat-card">
          <span>Available Products</span>
          <h2>{stats.availableProducts}</h2>
        </div>

        <div className="admin-stat-card">
          <span>Sold Products</span>
          <h2>{stats.soldProducts}</h2>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>

        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {activeTab === "products" && (
        <div className="admin-section">
          <h2>Product Management</h2>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Seller</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6">No products found</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.title}</td>
                      <td>{product.category}</td>
                      <td>Rs. {product.price}</td>
                      <td>{product.seller?.name || "Unknown"}</td>
                      <td>
                        <span className={`status-badge ${product.status}`}>
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="admin-section">
          <h2>User Management</h2>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5">No users found</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;