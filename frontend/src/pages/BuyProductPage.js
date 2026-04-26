import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./BuyProductPage.css";

function BuyProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const shippingFeePerItem = 300;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log("Error loading product:", error);
      alert("Failed to load product");
    }
  };

  const getGuaranteeDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString();
  };

  if (!product) {
    return <p>Loading product...</p>;
  }

  const itemTotal = product.price * quantity;
  const shippingTotal = shippingFeePerItem * quantity;
  const finalTotal = itemTotal + shippingTotal;

  return (
    <div className="buy-product-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Cart", path: "/cart" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", type: "logout" },
        ]}
      />

      <div className="buy-product-container">
        <h2 className="buy-title">Buy Product</h2>

        <div className="buy-product-card">
          {product.images?.[0] && (
            <img
              src={`http://localhost:5001/uploads/${product.images[0]}`}
              alt={product.title}
              className="buy-product-image"
            />
          )}

          <div className="buy-product-info">
            <h3>{product.title}</h3>

            <p className="buy-description">{product.description}</p>

            <p>
              <strong>Brand:</strong> {product.brand}
            </p>

            <p>
              <strong>Condition:</strong> {product.condition}
            </p>

            <p>
              <strong>Location:</strong> {product.location}
            </p>

            <p>
              <strong>Guarantee Valid Until:</strong> {getGuaranteeDate()}
            </p>

            <label className="quantity-label">
              Quantity
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Item Price</span>
            <span>Rs. {product.price}</span>
          </div>

          <div className="summary-row">
            <span>Quantity</span>
            <span>{quantity}</span>
          </div>

          <div className="summary-row">
            <span>Items Total</span>
            <span>Rs. {itemTotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping Fee</span>
            <span>Rs. {shippingTotal}</span>
          </div>

          <div className="summary-row total">
            <span>Total Payment</span>
            <span>Rs. {finalTotal}</span>
          </div>

          <button className="pay-button">Proceed to Pay</button>

          <Link to="/dashboard">
            <button className="back-button">Back to Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BuyProductPage;