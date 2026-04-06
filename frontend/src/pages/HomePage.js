import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./HomePage.css";
import hero1 from "../assets/hero-section-6.png";
import hero2 from "../assets/hero-section-4.png";
import hero3 from "../assets/hero-section-7.png";
import academicImg from "../assets/Acadamic_uni.png";
import electronicImg from "../assets/Electronics_uni.png";
import hostelImg from "../assets/Living_uni.png";
import personalImg from "../assets/Personal_uni.png";



function HomePage() {
  const [products, setProducts] = useState([]);
  const heroImages = [hero1, hero2, hero3];
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) =>
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
            Student Marketplace is a web-based platform designed specifically
            for university students to buy, sell, and exchange products within
            their campus community. The system provides a secure, user-friendly
            environment where students can easily connect with each other to
            trade items,
            <br />
            <br />
            The platform simplifies the process of listing products, searching
            for items, and interacting with other students by offering features
            such as category-based filtering, real-time search, and detailed
            product listings. 
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

        <div className="hero-slider-wrapper">
          <div
            className="hero-slider-track"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {heroImages.map((image, index) => (
              <div className="hero-slide" key={index}>
                <img src={image} alt={`Hero ${index + 1}`} />
              </div>
            ))}

            {/* duplicate first image for smoother loop feeling */}
            <div className="hero-slide">
              <img src={heroImages[0]} alt="Hero duplicate" />
            </div>
          </div>
        </div>
      </section>


    {/* features-section */}

    <section className="features-section">
  <h2 className="section-title">Why Choose Our Platform?</h2>

  <div className="features-grid">
    <div className="feature-card">
      <h3>Buy Products</h3>
      <p>
        Find affordable products from fellow students quickly and easily.
      </p>
    </div>

    <div className="feature-card">
      <h3>Sell Products</h3>
      <p>
        Post your unused items and reach other students on campus.
      </p>
    </div>

    <div className="feature-card">
      <h3>Trusted Community</h3>
      <p>
        Use a student-focused platform designed for a safer marketplace.
      </p>
    </div>

    <div className="feature-card">
      <h3>Category-Based Search</h3>
      <p>
        Easily browse products by categories like Academic, Electronics, and Personal Items.
      </p>
    </div>

    <div className="feature-card">
      <h3>Manage Your Listings</h3>
      <p>
        Edit, delete, or mark your products as sold anytime from your dashboard.
      </p>
    </div>

    <div className="feature-card">
      <h3>Secure Login System</h3>
      <p>
        Your account is protected with authentication, ensuring only verified users can post and manage products.
      </p>
    </div>
  </div>
 </section>

           {/* categories-section */}
      
     <section className="categories-section">
        <h2 className="section-title">Popular Categories</h2>

        <div className="categories-grid">
          <Link to="/category/Academic" className="category-card-link">
            <div className="category-card">
              <img
                src={academicImg}
                alt="Academic"
                className="category-image"
              />
              <h3 className="category-title">Academic</h3>
            </div>
          </Link>

          <Link to="/category/Electronics" className="category-card-link">
            <div className="category-card">
              <img
                src={electronicImg}
                alt="Electronics"
                className="category-image"
              />
              <h3 className="category-title">Electronics</h3>
            </div>
          </Link>

          <Link
            to="/category/Living%20%26%20Hostel"
            className="category-card-link"
          >
            <div className="category-card">
              <img
                src={hostelImg}
                alt="Living and Hostel"
                className="category-image"
              />
              <h3 className="category-title">Living & Hostel</h3>
            </div>
          </Link>

          <Link
            to="/category/Personal%20Items"
            className="category-card-link"
          >
            <div className="category-card">
              <img
                src={personalImg}
                alt="Personal Items"
                className="category-image"
              />
              <h3 className="category-title">Personal Items</h3>
            </div>
          </Link>
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