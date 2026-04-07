const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addToCart, getMyCart } = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.get("/", protect, getMyCart);

module.exports = router;