const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: { type: String },
  productName: { type: String },
  rating: { type: Number },
  comment: { type: String },
  date: { type: Date },
  userName: { type: String },
  userEmail: { type: String },
});

module.exports = mongoose.model("reviews", reviewSchema);
