import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./HomePage.css";
import hero1 from "../assets/hero-section-6.png";
import hero2 from "../assets/hero-section-4.png";
import hero3 from "../assets/hero-section-7.png";

function HomePage() {
  const [products, setProducts] = useState([]);
  const heroImages = [hero1, hero2, hero3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  return (
    <div className="homepage">
      <Navbar
        links={[
          { label: "Home", path: "/" },
          { label: "Register", path: "/register" },
          { label: "Login", path: "/login" },
        ]}
      />
      {/* hero-section */}

      <section className="hero-section">
        <div className="hero-text">
          <h1>Buy and Sell Easily on Campus</h1>
          <p>
            Student Marketplace helps university students buy, sell, and explore
            useful products in a simple and secure way.
          </p>

          <div className="hero-buttons">
            <Link to="/register">
              <button className="hero-btn primary-btn">Get Started</button>
            </Link>

            <Link to="/login">
              <button className="hero-btn secondary-btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="hero-image">
            <img src={heroImages[currentImageIndex]} alt="Students" />
        </div>
      </section>


    {/* features-section */}

      <section className="features-section">
        <h2 className="section-title">Why Choose Our Platform?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Buy Products</h3>
            <p>Find affordable products from fellow students quickly and easily.</p>
          </div>

          <div className="feature-card">
            <h3>Sell Products</h3>
            <p>Post your unused items and reach other students on campus.</p>
          </div>

          <div className="feature-card">
            <h3>Trusted Community</h3>
            <p>Use a student-focused platform designed for a safer marketplace.</p>
          </div>
        </div>
      </section>

           {/* categories-section */}
      
      <section className="categories-section">
        <h2 className="section-title">Popular Categories</h2>

        <div className="categories-grid">
          <div className="category-card">Academic</div>
          <div className="category-card">Electronics</div>
          <div className="category-card">Living & Hostel</div>
          <div className="category-card">Personal Items</div>
        </div>
      </section>

         {/* products-section */}

      <section className="products-section">
        <h2 className="section-title">Available Products</h2>

        {products.length === 0 ? (
          <p className="no-products">No products found</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                {product.image && (
                  <img
                    className="product-image"
                    src={`http://localhost:5001/uploads/${product.image}`}
                    alt={product.title}
                  />
                )}

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
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;