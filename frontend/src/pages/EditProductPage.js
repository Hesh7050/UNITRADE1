import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/productService';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Academic');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setCondition(product.condition);
        setLocation(product.location);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('condition', condition);
      formData.append('location', location);

      if (image) {
        formData.append('image', image);
      }

      await updateProduct(id, formData);
      setMessage('Product updated successfully');

      setTimeout(() => {
        navigate('/my-products');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    }
  };

  if (loading) {
    return <div className="p-6">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-indigo-900 mb-6">Edit Product</h1>

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

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              className="w-full border rounded-lg px-4 py-2"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-medium">Price</label>
            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Academic">Academic</option>
              <option value="Electronics">Electronics</option>
              <option value="Living & Hostel">Living & Hostel</option>
              <option value="Personal Items">Personal Items</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Condition</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Change Image</label>
            <input
              type="file"
              className="w-full"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;