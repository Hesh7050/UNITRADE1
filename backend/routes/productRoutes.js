const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productController");

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

module.exports = router;