import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./DashboardPage.css";

function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FILTER STATES (NO CONDITION FILTER)
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sellerFilter, setSellerFilter] = useState("All");

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

  // ✅ GET UNIQUE SELLERS
  const uniqueSellers = useMemo(() => {
    const sellers = products
      .map((p) => (typeof p.seller === "object" ? p.seller?.name : null))
      .filter(Boolean);

    return ["All", ...new Set(sellers)];
  }, [products]);

  // ✅ FILTER LOGIC (NO CONDITION)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const sellerName =
        typeof product.seller === "object" ? product.seller?.name || "" : "";

      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      const matchesSeller =
        sellerFilter === "All" || sellerName === sellerFilter;

      return matchesSearch && matchesCategory && matchesSeller;
    });
  }, [products, searchTerm, categoryFilter, sellerFilter]);

  return (
    <div className="dashboard-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Cart", path: "/cart" },
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

          {/* ✅ FILTER UI */}
          <div className="dashboard-filters">
            <input
              type="text"
              placeholder="Search product, seller, category..."
              className="dashboard-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="dashboard-filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Electronics">Electronics</option>
              <option value="Living & Hostel">Living & Hostel</option>
              <option value="Personal Items">Personal Items</option>
            </select>

            <select
              className="dashboard-filter-select"
              value={sellerFilter}
              onChange={(e) => setSellerFilter(e.target.value)}
            >
              {uniqueSellers.map((seller, index) => (
                <option key={index} value={seller}>
                  {seller === "All" ? "All Sellers" : seller}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="dashboard-no-products">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="dashboard-no-products">No products found.</p>
          ) : (
            <div className="dashboard-products-grid">
              {filteredProducts.map((product) => (
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
                      <h3 className="dashboard-product-name">
                        {product.title}
                      </h3>
                      <span
                        className={`dashboard-product-status ${
                          product.status === "sold" ? "sold" : "available"
                        }`}
                      >
                        {product.status || "available"}
                      </span>
                    </div>

                    <p className="dashboard-product-price">
                      Rs. {product.price}
                    </p>

                    <p className="dashboard-product-text">
                      <strong>Category:</strong> {product.category}
                    </p>

                    <p className="dashboard-product-text">
                      <strong>Condition:</strong> {product.condition}
                    </p>

                    <p className="dashboard-product-text">
                      <strong>Location:</strong> {product.location}
                    </p>

                    <p className="dashboard-product-text">
                      <strong>Seller:</strong>{" "}
                      {typeof product.seller === "object"
                        ? product.seller?.name
                        : "Unknown"}
                    </p>

                    <div className="dashboard-product-actions">
                      <Link to={`/product/${product._id}`}>
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