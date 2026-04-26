import React, { useEffect, useState } from "react";
import {
  getMyProducts,
  deleteProduct,
  markProductAsSold,
} from "../services/productService";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./MyProductsPage.css";

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getMyProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setMessage("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleMarkSold = async (id) => {
    try {
      await markProductAsSold(id);
      setMessage("Product marked as sold");
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product status");
    }
  };

  if (loading) {
    return <div className="my-products-loading">Loading your products...</div>;
  }

  return (
    <div className="my-products-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Create Product", path: "/create-product" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", type: "logout" },
        ]}
      />

      <div className="my-products-container">
        <h1 className="my-products-title">My Products</h1>

        {message && <div className="my-products-message success">{message}</div>}
        {error && <div className="my-products-message error">{error}</div>}

        {products.length === 0 ? (
          <div className="my-products-empty">
            <p>You have not posted any products yet.</p>
            <Link to="/create-product" className="my-products-empty-btn">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="my-products-grid">
            {products.map((product) => {
              const thumbnail = product.images?.[0] || product.image;
              const imageUrl = thumbnail
                ? `http://localhost:5001/uploads/${thumbnail}`
                : "https://via.placeholder.com/400x300?text=No+Image";

              return (
                <div key={product._id} className="my-product-card">
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="my-product-image"
                  />

                  <div className="my-product-content">
                    <div className="my-product-header">
                      <h2 className="my-product-name">{product.title}</h2>

                      <span
                        className={`my-product-status ${
                          product.status === "sold" ? "sold" : "available"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>

                    <p className="my-product-description">{product.description}</p>
                    <p className="my-product-price">Rs. {product.price}</p>
                    <p className="my-product-meta">Category: {product.category}</p>
                    <p className="my-product-meta">Condition: {product.condition}</p>
                    <p className="my-product-meta">Location: {product.location}</p>

                    <div className="my-product-actions">
                      <Link
                        to={`/product/${product._id}`}
                        className="my-product-btn view-btn"
                      >
                        View
                      </Link>

                      <Link
                        to={`/edit-product/${product._id}`}
                        className="my-product-btn edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="my-product-btn delete-btn"
                      >
                        Delete
                      </button>

                      {product.status !== "sold" && (
                        <button
                          onClick={() => handleMarkSold(product._id)}
                          className="my-product-btn sold-btn"
                        >
                          Mark as Sold
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProductsPage;