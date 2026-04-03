import React, { useEffect, useState } from 'react';
import { getMyProducts, deleteProduct, markProductAsSold } from '../services/productService';
import { Link } from 'react-router-dom';

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getMyProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load your products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setMessage('Product deleted successfully');
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleMarkSold = async (id) => {
    try {
      await markProductAsSold(id);
      setMessage('Product marked as sold');
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product status');
    }
  };

  if (loading) {
    return <div className="p-6 text-lg">Loading your products...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <h1 className="text-3xl font-bold text-indigo-900 mb-6">My Products</h1>

      {message && (
        <div className="mb-4 rounded-lg bg-green-100 text-green-700 px-4 py-3">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-3">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-gray-600">
          You have not posted any products yet.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const imageUrl = product.image
              ? `http://localhost:5001/${product.image}`
              : 'https://via.placeholder.com/400x300?text=No+Image';

            return (
              <div key={product._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">
                  <div className="flex justify-between items-start gap-3">
                    <h2 className="text-xl font-semibold text-slate-800">{product.title}</h2>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        product.status === 'sold'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                  <p className="text-indigo-700 font-bold mt-3">Rs. {product.price}</p>
                  <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
                  <p className="text-sm text-gray-500">Condition: {product.condition}</p>
                  <p className="text-sm text-gray-500">Location: {product.location}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      to={`/products/${product._id}`}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      View
                    </Link>

                    <Link
                      to={`/edit-product/${product._id}`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>

                    {product.status !== 'sold' && (
                      <button
                        onClick={() => handleMarkSold(product._id)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                      >
                        Mark as Sold
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyProductsPage;