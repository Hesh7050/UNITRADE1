import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getSellerProfile } from "../services/userService";
import "./SellerProfilePage.css";

function SellerProfilePage() {
  const { id } = useParams();
  const [sellerData, setSellerData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const data = await getSellerProfile(id);
        setSellerData(data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load seller profile");
      }
    };

    fetchSeller();
  }, [id]);

  if (error) {
    return <div className="seller-profile-loading">{error}</div>;
  }

  if (!sellerData) {
    return <div className="seller-profile-loading">Loading seller profile...</div>;
  }

  const { seller, products } = sellerData;

  return (
    <div className="seller-profile-page">
      <Navbar
        links={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Home", path: "/" },
          { label: "Profile", path: "/profile" },
          { label: "Logout", type: "logout" },
        ]}
      />

      <div className="seller-profile-container">
        <div className="seller-profile-card">
          <h1>{seller.name}</h1>
          <p><strong>Email:</strong> {seller.email}</p>
        </div>

        <h2 className="seller-products-title">Seller Products</h2>

        {products.length === 0 ? (
          <p>No products found for this seller.</p>
        ) : (
          <div className="seller-products-grid">
            {products.map((product) => (
              <div key={product._id} className="seller-product-card">
                {product.image && (
                  <img
                    src={`http://localhost:5001/uploads/${product.image}`}
                    alt={product.title}
                    className="seller-product-image"
                  />
                )}
                <h3>{product.title}</h3>
                <p>Rs. {product.price}</p>
                <p>{product.category}</p>
                <Link to={`/product/${product._id}`} className="seller-view-link">
                  View Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProfilePage;