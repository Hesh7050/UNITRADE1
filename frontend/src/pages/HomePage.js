import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  return (
    <div className="homepage-container">
      <Navbar />

      <div className="homepage-content">
        <h2 className="homepage-title">Available Products</h2>

        {products.length === 0 ? (
          <p className="no-products">No products found</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-text">
                <strong>Price:</strong> {product.price}
              </p>
              <p className="product-text">
                <strong>Category:</strong> {product.category}
              </p>

              <Link to={`/product/${product._id}`} className="details-link">
                <button className="details-button">View Details</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;