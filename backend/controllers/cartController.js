const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status === "sold") {
      return res.status(400).json({ message: "This product is already sold" });
    }

    const alreadyInCart = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (alreadyInCart) {
      return res.status(400).json({ message: "Product already added to cart" });
    }

    const cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
    });

    res.status(201).json({
      message: "Product added to cart successfully",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user._id }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getMyCart,
};