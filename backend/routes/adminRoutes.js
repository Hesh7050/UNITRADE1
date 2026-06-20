const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/authMiddleware");


router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const availableProducts = await Product.countDocuments({
      status: "available",
    });
    const soldProducts = await Product.countDocuments({
      status: "sold",
    });

    res.json({
      totalUsers,
      totalProducts,
      availableProducts,
      soldProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load admin stats" });
  }
});


router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to load users" });
  }
});


router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "Admin cannot delete own account" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});


router.get("/products", protect, adminOnly, async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to load products" });
  }
});


router.delete("/products/:id", protect, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;