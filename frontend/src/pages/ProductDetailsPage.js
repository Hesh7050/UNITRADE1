import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./ProductDetailsPage.css";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="product-details-loading">
        <Navbar />
        <p className="product-details-loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <Navbar />

      <div className="product-details-container">
        <h2 className="product-details-title">{product.title}</h2>

        {product.image && (
          <img
            className="product-details-image"
            src={`http://localhost:5001/uploads/${product.image}`}
            alt={product.title}
          />
        )}

        <div className="product-details-description">
          <span className="product-details-label">Description: </span>
          {product.description}
        </div>

        <p className="product-details-info">
          <span className="product-details-label">Price:</span> {product.price}
        </p>

        <p className="product-details-info">
          <span className="product-details-label">Category:</span> {product.category}
        </p>

        <p className="product-details-info">
          <span className="product-details-label">Condition:</span> {product.condition}
        </p>

        <p className="product-details-info">
          <span className="product-details-label">Location:</span> {product.location}
        </p>

        <p className="product-details-info">
          <span className="product-details-label">Seller:</span> {product.seller?.name}
        </p>
      </div>
    </div>
  );
}

export default ProductDetailsPage;