const Order = require("../models/Order");
const Product = require("../models/Product");

const buyNow = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId).populate("seller");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status === "sold") {
      return res.status(400).json({ message: "This product is already sold" });
    }

    if (product.seller._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot buy your own product" });
    }

    const order = await Order.create({
      buyer: req.user._id,
      product: product._id,
      seller: product.seller._id,
      totalPrice: product.price,
      status: "placed",
    });

    // Legacy products may miss newer required fields (ex: category).
    // We only change status here, so skip full schema validation.
    product.status = "sold";
    await product.save({ validateBeforeSave: false });

    res.status(201).json({
      message: "Product purchased successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  buyNow,
};