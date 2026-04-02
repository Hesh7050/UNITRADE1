const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getMyProducts,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/my-products", protect, getMyProducts);
router.get("/:id", getSingleProduct);
router.post("/", protect, upload.single("image"), createProduct);

module.exports = router;