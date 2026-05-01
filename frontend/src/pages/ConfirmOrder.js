import React, { useState } from "react";
import "./ConfirmOrder.css"; // optional styling file

const ConfirmOrder = ({ product }) => {
  // Buyer details (you can later replace with auth user data)
  const [buyer, setBuyer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("");

  const [cardDetails, setCardDetails] = useState({
    holderName: "",
    cardNumber: "",
    expiryDate: "",
  });

  // Handle input changes
  const handleBuyerChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  // Submit order
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

    const orderData = {
      buyer,
      product,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : null,
    };

    console.log("ORDER CONFIRMED:", orderData);

    alert("Order placed successfully!");
  };

  return (
    <div className="confirm-container">

      {/* SECTION 1 - BUYER DETAILS */}
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

      {/* SECTION 2 - PRODUCT DETAILS */}
      <div className="section">
        <h2>Product Details</h2>

        <p><strong>Product Name:</strong> {product?.title}</p>
        <p><strong>Quantity:</strong> {product?.quantity || 1}</p>
        <p><strong>Price:</strong> Rs. {product?.price}</p>
        <p><strong>Return Date:</strong> {product?.returnDate || "7 Days Guarantee"}</p>
      </div>

      {/* SECTION 3 - PAYMENT */}
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

        {/* CARD FORM */}
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

      {/* SECTION 4 - CONFIRM BUTTON */}
      <div className="section">
        <button className="confirm-btn" onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;