const express = require("express");
const router = express.Router();
const Orders = require("../../database/orders/ordersData");
const Products = require("../../database/productsData/productsData");
const Contacts = require("../../database/contacts/contactsData");
const Reviews = require("../../database/reviews/reviewsData");
const authentication = require("../../middleware/verifyToken");

//! Get all orders
router.get("/orders", authentication, async (req, res) => {
  try {
    const orders = await Orders.find().sort({ orderNo: -1 });
    if (!orders) {
      return res.status(404).json({ msg: "Orders not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! edit orders
router.put("/orders/update/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Orders.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ msg: "Orders not found" });
    }
    console.log(status)
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! create product
router.post("/products/new-product", authentication, async (req, res) => {
  const {
    title,
    regularPrice,
    salePrice,
    description,
    shortDescription,
    sku,
    quantity,
    stock,
    category,
    rating,
    images,
    tags,
  } = req.body;
  try {
    const product = new Products({
      title,
      regularPrice,
      salePrice,
      description,
      shortDescription,
      sku,
      quantity,
      stock,
      category,
      rating,
      images,
      tags,
    });
    if (!product) {
      return res.status(404).json({ msg: "Product not create" });
    }
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! update product
router.put("/products/product/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const {
    title,
    regularPrice,
    salePrice,
    description,
    shortDescription,
    sku,
    quantity,
    stock,
    category,
    rating,
    images,
    tags,
  } = req.body;
  try {
    const product = await Products.findByIdAndUpdate(
      id,
      {
        title,
        regularPrice,
        salePrice,
        description,
        shortDescription,
        sku,
        quantity,
        stock,
        category,
        rating,
        images,
        tags,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! delete product
router.delete("/products/delete/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! get all products
router.get("/products", authentication, async (req, res) => {
  try {
    const products = await Products.find();
    if (!products) {
      return res.status(404).json({ msg: "Products not found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! get all Contacts
router.get("/contacts", authentication, async (req, res) => {
  try {
    const contacts = await Contacts.find().sort({ date: -1 });
    if (!contacts) {
      return res.status(404).json({ msg: "contacts not found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! get all Reviews
router.get("/reviews", authentication, async (req, res) => {
  try {
    const reviews = await Reviews.find().sort({ date: -1 });
    if (!reviews) {
      return res.status(404).json({ msg: "contacts not found" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! delete reviews
router.delete(
  "/reviews/delete-review/:id",
  authentication,
  async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Reviews.findByIdAndDelete(id);
      if (!review) {
        return res.status(404).json({ msg: "review not found" });
      }
      return res.status(200).json(review);
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error", error });
    }
  }
);

module.exports = router;
