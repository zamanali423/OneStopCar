const express = require("express");
const router = express.Router();
const Reviews = require("../../database/reviews/reviewsData");

//! Get reviews by title
router.get("/:title", async (req, res) => {
  const { title } = req.params;
  const decodedTitle = decodeURIComponent(title);
  try {
    const review = await Reviews.find({ productName: decodedTitle }).sort({
      date: -1,
    });
    if (!review) {
      return res.status(404).json({ msg: "review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! create reviews
router.post("/new-review", async (req, res) => {
  const { productId, productName, rating, comment, date, userName, userEmail } =
    req.body;
  try {
    const review = new Reviews({
      productId,
      productName,
      rating,
      comment,
      date,
      userName,
      userEmail,
    });
    if (!review) {
      return res.status(404).json({ msg: "review can not given" });
    }
    await review.save();
    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = router;
