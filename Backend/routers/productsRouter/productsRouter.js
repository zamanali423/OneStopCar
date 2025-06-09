const express = require("express");
const router = express.Router();
const Products = require("../../database/productsData/productsData");
const Categories = require("../../database/productsData/Categories");

//! Get all products
router.get("/products", async (req, res) => {
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

//! Get single product by title
router.get("/products/product-details/:title", async (req, res) => {
  const { title } = req.params;

  const decodedTitle = decodeURIComponent(title); // decode URL-encoded title

  try {
    const product = await Products.findOne({ title: decodedTitle });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! Search products by partial title match
router.get("/products/search/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const products = await Products.find({
      title: { $regex: title, $options: "i" },
    });

    if (products.length === 0) {
      return res.status(404).json({ msg: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! Search products by car name, model, year, and beam
router.get("/categories", async (req, res) => {
  try {
    const { name, model, year, beam } = req.query;
    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (model) {
      filter.model = { $regex: model, $options: "i" };
    }
    const yearNum = parseInt(year);
    if (year) {
      filter["years"] = {
        $elemMatch: {
          from: { $lte: yearNum },
          to: { $gte: yearNum },
          ...(beam && { "beams.beam": { $regex: beam, $options: "i" } }),
        },
      };
    } else if (beam) {
      // If year is not provided, only filter by beam
      filter["years"] = {
        $elemMatch: {
          "beams.beam": { $regex: beam, $options: "i" },
        },
      };
    }

    const product = await Categories.findOne(filter);
    if (!product) {
      return res.status(404).json({ msg: "No products found" });
    }

    // Filter out the specific year details from the found product
    const filteredProduct = {
      ...product._doc,
      years: product.years.filter(
        (yearEntry) => yearEntry.from <= yearNum && yearEntry.to >= yearNum
      ),
    };

    return res.status(200).json(filteredProduct);
  } catch (error) {
    console.error("Error during category search:", error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! Sort products by price range
router.get("/products/sorting/:price", async (req, res) => {
  const { price } = req.params;
  try {
    let sortOption = {};

    if (price === "high to low") {
      sortOption = { salePrice: -1 };
    } else if (price === "low to high") {
      sortOption = { salePrice: 1 };
    }

    // Find products and apply sorting (skip sorting for "default")
    const products =
      price === "default"
        ? await Products.find()
        : await Products.find().sort(sortOption);

    // Check if products exist
    if (products.length === 0) {
      return res.status(404).json({ msg: "No products Found" });
    }

    // Respond with products
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error finding products:", error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! Search products by price range
router.get("/products/price-range", async (req, res) => {
  try {
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);

    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return res.status(400).json({ msg: "Invalid price range" });
    }

    const products = await Products.find({
      salePrice: { $gte: minPrice, $lte: maxPrice },
    });

    if (products.length === 0) {
      return res.status(404).json({ msg: "No products in this Range" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error during price range search:", error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = router;
