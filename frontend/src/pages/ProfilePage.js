import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
    localStorage.setItem("profileImage", imageUrl);
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
          <div className="profile-photo-section">
            <div className="profile-photo-circle">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-photo"
                />
              ) : (
                <span>{user.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <label className="profile-upload-button">
              Upload Profile Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                hidden
              />
            </label>
          </div>

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
            <span className="profile-value">{user.role || "User"}</span>
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