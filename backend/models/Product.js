const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: ["Academic", "Electronics", "Living & Hostel", "Personal Items"],
      required: true,
    },

    condition: {
      type: String,
      enum: ["Brand New", "Used"],
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    negotiable: {
      type: Boolean,
      default: false,
    },

    location: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    ownerEmail: {
      type: String,
      required: true,
    },

    ownerPhone: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);