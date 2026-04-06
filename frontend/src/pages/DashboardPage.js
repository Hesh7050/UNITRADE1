import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./DashboardPage.css";

function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      setProducts(res.data);
      setError("");
    } catch (error) {
      console.log("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Profile", path: "/profile" },
          { label: "Add Product", path: "/create-product" },
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
            <Link to="/create-product" className="dashboard-link-btn">
              Add Product
            </Link>
          </div>
        </div>

        <section className="dashboard-products-section">
          <h2 className="dashboard-products-title">Available Products</h2>

          {error && <div className="dashboard-alert error">{error}</div>}

          {loading ? (
            <p className="dashboard-no-products">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="dashboard-no-products">No products found.</p>
          ) : (
            <div className="dashboard-products-grid">
              {products.map((product) => (
                <div key={product._id} className="dashboard-product-card">
                  {product.image && (
                    <img
                      className="dashboard-product-image"
                      src={`http://localhost:5001/uploads/${product.image}`}
                      alt={product.title}
                    />
                  )}

                  <div className="dashboard-product-content">
                    <div className="dashboard-product-header">
                      <h3 className="dashboard-product-name">{product.title}</h3>
                      <span
                        className={`dashboard-product-status ${
                          product.status === "sold" ? "sold" : "available"
                        }`}
                      >
                        {product.status || "available"}
                      </span>
                    </div>

                    <p className="dashboard-product-price">Rs. {product.price}</p>
                    <p className="dashboard-product-text">
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p className="dashboard-product-text">
                      <strong>Condition:</strong> {product.condition}
                    </p>
                    <p className="dashboard-product-text">
                      <strong>Location:</strong> {product.location}
                    </p>

                    <div className="dashboard-product-actions">
                      <Link
                        to={`/product/${product._id}`}
                        className="dashboard-details-link"
                      >
                        <button className="dashboard-details-button">
                          View Details
                        </button>
                      </Link>

                      <button className="dashboard-cart-button">
                        Add to Cart
                      </button>

                      <button className="dashboard-buy-button">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;