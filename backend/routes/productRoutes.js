const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

// Create product
router.post("/", protect, upload.array("images", 5), async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      condition,
      brand,
      negotiable,
      location,
      ownerName,
      ownerEmail,
      ownerPhone,
      category,
    } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Please select a product category" });
    }

    if (!req.files || req.files.length < 3) {
      return res.status(400).json({
        message: "Please upload at least 3 product photos",
      });
    }

    const imagePaths = req.files.map((file) => file.filename);

    const product = new Product({
      title,
      description,
      price,
      condition,
      brand,
      negotiable: negotiable === "true",
      location,
      ownerName,
      ownerEmail,
      ownerPhone,
      category,
      images: imagePaths,
      seller: req.user._id,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Product creation failed",
    });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to load products",
    });
  }
});

// Get products by category
router.get("/category/:categoryName", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryName })
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to load products" });
  }
});

// Get current seller products
router.get("/my-products", protect, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to load your products" });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
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
    console.log(error);
    res.status(500).json({ message: "Failed to load product details" });
  }
});

// Update product
router.put("/:id", protect, upload.array("images", 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this product" });
    }

    const fields = [
      "title",
      "description",
      "price",
      "category",
      "condition",
      "brand",
      "negotiable",
      "location",
      "ownerName",
      "ownerEmail",
      "ownerPhone",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = field === "negotiable" ? req.body[field] === "true" : req.body[field];
      }
    });

    if (req.files && req.files.length > 0) {
      product.images = req.files.map((file) => file.filename);
    }

    const updated = await product.save();
    res.status(200).json({ message: "Product updated successfully", product: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// Delete product
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

// Mark product as sold
router.put("/:id/sold", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this product" });
    }

    product.status = "sold";
    const updated = await product.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Product marked as sold", product: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update product status" });
  }
});

module.exports = router;