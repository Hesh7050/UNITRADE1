const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  markProductAsSold,
} = require("../controllers/productController");

// Public routes
router.get("/", getAllProducts);

// Protected routes
router.get("/my-products", protect, getMyProducts);
router.post("/", protect, upload.single("image"), createProduct);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);
router.put("/:id/sold", protect, markProductAsSold);

// Public single product route
router.get("/:id", getSingleProduct);

module.exports = router;