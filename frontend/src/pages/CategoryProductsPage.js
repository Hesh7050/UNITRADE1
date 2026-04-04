import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProductsByCategory } from "../services/productService";
import "./CategoryProductsPage.css";

function CategoryProductsPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory(categoryName);
        setProducts(data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="category-products-page">
      <Navbar
        links={[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard" },
          { label: "My Products", path: "/my-products" },
          { label: "Create Product", path: "/create-product" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", type: "logout" },
        ]}
      />

      <div className="category-products-container">
        <h1 className="category-products-title">{categoryName} Products</h1>

        {loading && <p className="category-message">Loading products...</p>}
        {error && <p className="category-error">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <div className="category-empty">
            <p>No products found in this category.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="category-products-grid">
            {products.map((product) => {
              const imageUrl = product.image
                ? `http://localhost:5001/uploads/${product.image}`
                : "https://via.placeholder.com/400x300?text=No+Image";

              return (
                <div className="category-product-card" key={product._id}>
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="category-product-image"
                  />

                  <div className="category-product-content">
                    <div className="category-product-header">
                      <h3>{product.title}</h3>
                      <span
                        className={
                          product.status === "sold"
                            ? "product-status sold"
                            : "product-status available"
                        }
                      >
                        {product.status}
                      </span>
                    </div>

                    <p className="category-product-description">
                      {product.description}
                    </p>

                    <p className="category-product-price">Rs. {product.price}</p>
                    <p className="category-product-meta">
                      Condition: {product.condition}
                    </p>
                    <p className="category-product-meta">
                      Location: {product.location}
                    </p>
                    <p className="category-product-meta">
                      Seller: {product.seller?.name || "Unknown"}
                    </p>

                    <Link
                      to={`/products/${product._id}`}
                      className="category-view-button"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryProductsPage;