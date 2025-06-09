const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String },
  rating: { type: Number },
  regularPrice: { type: Number },
  salePrice: { type: Number },
  description: { type: String },
  shortDescription: { type: String },
  sku: { type: String, unique: true },
  quantity: { type: Number },
  stock: { type: String },
  category: { type: String },
  value: { type: Number },
  tags: [{ type: String }],
  images: [{ type: String }],
});

module.exports = mongoose.model("products", productSchema);
