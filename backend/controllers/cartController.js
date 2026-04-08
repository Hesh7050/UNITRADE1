const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status === "sold") {
      return res.status(400).json({ message: "Product already sold" });
    }

    if (product.seller.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot add your own product to cart" });
    }

    const alreadyExists = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (alreadyExists) {
      return res.status(400).json({ message: "Already in cart" });
    }

    const cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
    });

    res.status(201).json({
      message: "Added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my cart
const getMyCart = async (req, res) => {
  try {
    const items = await Cart.find({ user: req.user._id }).populate("product");
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (cartItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await cartItem.deleteOne();

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getMyCart,
  removeFromCart,
};