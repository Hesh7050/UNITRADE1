import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { addToCart } from "../services/cartService";
import { buyNow } from "../services/orderService";
import "./ProductDetailsPage.css";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProduct = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/products/${id}`);
      setProduct(res.data);
      setError("");
    } catch (error) {
      setError("Failed to load product details");
    }
  }, [id]);
  
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = async () => {
    try {
      const res = await addToCart(product._id);
      setMessage(res.message);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add to cart");
      setMessage("");
    }
  };

  const handleBuyNow = async () => {
    try {
      const res = await buyNow(product._id);
      setMessage(res.message);
      setError("");
      fetchProduct();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to buy product");
      setMessage("");
    }
  };

  if (!product) {
    return <div className="product-details-loading">Loading...</div>;
  }

  const imageUrl = product.image
    ? `http://localhost:5001/uploads/${product.image}`
    : "https://via.placeholder.com/500x350?text=No+Image";

  const isOwner =
    product.seller &&
    product.seller._id &&
    user &&
    product.seller._id === user._id;

  return (
    <div className="product-details-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", type: "logout" },
        ]}
      />

      <div className="product-details-container">
        {message && <div className="product-alert success">{message}</div>}
        {error && <div className="product-alert error">{error}</div>}

        <div className="product-details-card">
          <img src={imageUrl} alt={product.title} className="product-details-image" />

          <div className="product-details-content">
            <h1>{product.title}</h1>
            <p className="product-details-price">Rs. {product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Condition:</strong> {product.condition}</p>
            <p><strong>Location:</strong> {product.location}</p>
            <p><strong>Status:</strong> {product.status}</p>
            <p><strong>Description:</strong> {product.description}</p>

            <div className="seller-info">
              <h3>Seller Information</h3>
              <p><strong>Name:</strong> {product.seller?.name}</p>
              <p><strong>Email:</strong> {product.seller?.email}</p>
            </div>

            <div className="product-details-actions">
              {!isOwner && product.status !== "sold" && (
                <>
                  <button className="product-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>

                  <button className="product-buy-btn" onClick={handleBuyNow}>
                    Buy Product
                  </button>
                </>
              )}

              {product.seller?._id && (
                <Link to={`/seller/${product.seller._id}`} className="seller-profile-link">
                  <button className="product-seller-btn">View Seller Profile</button>
                </Link>
              )}

              <button className="product-back-btn" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;