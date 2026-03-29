const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, condition, location, seller } =
      req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      condition,
      location,
      seller,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getSingleProduct };