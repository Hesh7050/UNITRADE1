import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-container">
          <h2 className="profile-title">Profile</h2>
          <p className="profile-empty">No user is logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-card">
          <div className="profile-row">
            <span className="profile-label">Name</span>
            <span className="profile-value">{user.name}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user.email}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Role</span>
            <span className="profile-value">{user.role}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">User ID</span>
            <span className="profile-value">{user._id}</span>
          </div>

          <button className="profile-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;