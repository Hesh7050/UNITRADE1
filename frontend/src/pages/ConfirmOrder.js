import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const [buyer, setBuyer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    holderName: "",
    cardNumber: "",
    expiryDate: "",
  });

  const handleBuyerChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = () => {
    if (!buyer.name || !buyer.address || !buyer.phone) {
      alert("Please fill buyer details");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "card") {
      if (
        !cardDetails.holderName ||
        !cardDetails.cardNumber ||
        !cardDetails.expiryDate
      ) {
        alert("Please fill card details");
        return;
      }
    }

    const payload = {
      buyer,
      order: orderData,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : null,
    };

    console.log("ORDER CONFIRMED:", payload);

    alert("Order placed successfully!");
  };

  if (!orderData) {
    return (
      <div className="confirm-container">
        <p>No order data found. Please start from the Buy Product page.</p>
        <button className="confirm-btn" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Cart", path: "/cart" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", type: "logout" },
        ]}
      />

      <div className="confirm-container">
      <div className="section">
        <h2>Buyer Details</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={buyer.name}
          onChange={handleBuyerChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={buyer.address}
          onChange={handleBuyerChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={buyer.phone}
          onChange={handleBuyerChange}
        />
      </div>

      <div className="section">
        <h2>Product Details</h2>

        <p><strong>Product Name:</strong> {orderData.title}</p>
        <p><strong>Quantity:</strong> {orderData.quantity}</p>
        <p><strong>Item Total:</strong> Rs. {orderData.itemTotal}</p>
        <p><strong>Shipping Fee:</strong> Rs. {orderData.shippingFee}</p>
        <p><strong>Total Payment:</strong> Rs. {orderData.total}</p>
        <p><strong>Return Date:</strong> {orderData.returnDate}</p>
      </div>

      <div className="section">
        <h2>Payment Method</h2>

        <label>
          <input
            type="radio"
            name="payment"
            value="cod"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card Payment
        </label>

        {paymentMethod === "card" && (
          <div className="card-box">
            <h3>Card Details</h3>

            <input
              type="text"
              name="holderName"
              placeholder="Card Holder Name"
              value={cardDetails.holderName}
              onChange={handleCardChange}
            />

            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
            />

            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={cardDetails.expiryDate}
              onChange={handleCardChange}
            />
          </div>
        )}
      </div>

      <div className="section">
        <button className="confirm-btn" onClick={handleConfirmOrder}>
          Confirm Order
        </button>
        <Link to={`/buy-product/${orderData.productId}`}>
          <button className="confirm-btn">Back</button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default ConfirmOrder;