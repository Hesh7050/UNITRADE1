const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { buyNow } = require("../controllers/orderController");

router.post("/buy", protect, buyNow);

module.exports = router;