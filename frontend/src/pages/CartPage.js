import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5001/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", type: "logout" },
        ]}
      />

      <div className="cart-container">
        <h2 className="cart-title">My Cart</h2>

        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-card">
                {item.product.image && (
                  <img
                    src={`http://localhost:5001/uploads/${item.product.image}`}
                    alt={item.product.title}
                  />
                )}

                <h3>{item.product.title}</h3>
                <p>Rs. {item.product.price}</p>
                <p>{item.product.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;