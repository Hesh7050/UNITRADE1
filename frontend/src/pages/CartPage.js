import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyCart, removeFromCart } from "../services/cartService";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      const data = await getMyCart();
      setCartItems(data);
      setError("");
    } catch (error) {
      console.log("Error fetching cart:", error);
      setError(error.response?.data?.message || "Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (cartItemId) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from cart?"
    );
    if (!confirmRemove) return;

    try {
      const res = await removeFromCart(cartItemId);
      setMessage(res.message || "Item removed from cart");
      fetchCart();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to remove item");
    }
  };

  const filteredCartItems = useMemo(() => {
    return cartItems.filter((item) => {
      const product = item.product;
      if (!product) return false;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [cartItems, searchTerm, categoryFilter]);

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

        {message && <div className="cart-alert success">{message}</div>}
        {error && <div className="cart-alert error">{error}</div>}

        <div className="cart-filters">
          <input
            type="text"
            placeholder="Search products..."
            className="cart-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="cart-filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Electronics">Electronics</option>
            <option value="Living & Hostel">Living & Hostel</option>
            <option value="Personal Items">Personal Items</option>
          </select>
        </div>

        {filteredCartItems.length === 0 ? (
          <p className="cart-empty">No items found in cart</p>
        ) : (
          <div className="cart-grid">
            {filteredCartItems.map((item) => (
              <div key={item._id} className="cart-card">
                {item.product?.image && (
                  <img
                    src={`http://localhost:5001/uploads/${item.product.image}`}
                    alt={item.product.title}
                    className="cart-image"
                  />
                )}

                <div className="cart-card-content">
                  <h3 className="cart-product-title">{item.product?.title}</h3>
                  <p className="cart-product-price">Rs. {item.product?.price}</p>
                  <p className="cart-product-text">
                    <strong>Category:</strong> {item.product?.category}
                  </p>
                  <p className="cart-product-text">
                    <strong>Condition:</strong> {item.product?.condition}
                  </p>
                  <p className="cart-product-text">
                    <strong>Location:</strong> {item.product?.location}
                  </p>

                  <button
                    className="cart-remove-btn"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;