import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

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

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        Student Marketplace
      </Link>

      <div style={linksContainer}>
        <Link
          to="/"
          style={getLinkStyle("/")}
          onMouseOver={(e) => {
            if (location.pathname !== "/") {
              e.target.style.backgroundColor = "rgba(255,255,255,0.15)";
            }
          }}
          onMouseOut={(e) => {
            if (location.pathname !== "/") {
              e.target.style.backgroundColor = "transparent";
            }
          }}
        >
          Home
        </Link>

        <Link
          to="/register"
          style={getLinkStyle("/register")}
          onMouseOver={(e) => {
            if (location.pathname !== "/register") {
              e.target.style.backgroundColor = "rgba(255,255,255,0.15)";
            }
          }}
          onMouseOut={(e) => {
            if (location.pathname !== "/register") {
              e.target.style.backgroundColor = "transparent";
            }
          }}
        >
          Register
        </Link>

        <Link
          to="/login"
          style={getLinkStyle("/login")}
          onMouseOver={(e) => {
            if (location.pathname !== "/login") {
              e.target.style.backgroundColor = "rgba(255,255,255,0.15)";
            }
          }}
          onMouseOut={(e) => {
            if (location.pathname !== "/login") {
              e.target.style.backgroundColor = "transparent";
            }
          }}
        >
          Login
        </Link>

        <Link
          to="/create-product"
          style={getLinkStyle("/create-product")}
          onMouseOver={(e) => {
            if (location.pathname !== "/create-product") {
              e.target.style.backgroundColor = "rgba(255,255,255,0.15)";
            }
          }}
          onMouseOut={(e) => {
            if (location.pathname !== "/create-product") {
              e.target.style.backgroundColor = "transparent";
            }
          }}
        >
          Add Product
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;