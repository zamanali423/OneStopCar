require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const productRouter = require("./routers/productsRouter/productsRouter");
const orderRouter = require("./routers/ordersRouter/ordersRouter");
const reviewRouter = require("./routers/reviews/reviewsRouter");
const contactsRouter = require("./routers/contactsRouter/contactsRouter");
const adminRouter = require("./routers/admin/adminRouter");
const userRouter = require("./routers/admin/users/users");
const port = process.env.PORT;
const path = require("path");

const dns = require("dns");
dns.setServers(["8.8.8.8"]);

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "100mb" })); // Set a larger limit for JSON payloads
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Routes
app.use("/shop", productRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.use("/contacts", contactsRouter);
app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server running");
});
// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.URL, { family: 4 }) // no deprecated options!
  .then(() => {
    console.log("✅ Database connected");
    app.listen(port, () => {
      console.log(`🚀 Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
  });
