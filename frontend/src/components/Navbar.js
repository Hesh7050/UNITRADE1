import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ links = [] }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navStyle = {
    background: "linear-gradient(90deg, #3D0066, #5B2C6F)",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  };

  const logoStyle = {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    letterSpacing: "0.5px",
  };

  const linksContainer = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  };

  const getLinkStyle = (path) => ({
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
    padding: "10px 18px",
    borderRadius: "25px",
    backgroundColor: location.pathname === path ? "#ffffff" : "transparent",
    color: location.pathname === path ? "#4B0082" : "white",
    border: "1px solid rgba(255,255,255,0.35)",
    transition: "all 0.3s ease",
    display: "inline-block",
  });

  const buttonStyle = {
    fontSize: "15px",
    fontWeight: "600",
    padding: "10px 18px",
    borderRadius: "25px",
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid rgba(255,255,255,0.35)",
    cursor: "pointer",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        Student Marketplace
      </Link>

      <div style={linksContainer}>
        {links.map((link, index) =>
          link.type === "logout" ? (
            <button key={index} onClick={handleLogout} style={buttonStyle}>
              {link.label}
            </button>
          ) : (
            <Link key={index} to={link.path} style={getLinkStyle(link.path)}>
              {link.label}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;