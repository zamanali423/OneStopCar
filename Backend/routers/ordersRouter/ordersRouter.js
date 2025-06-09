require("dotenv").config();
const express = require("express");
const router = express.Router();
const Orders = require("../../database/orders/ordersData");
const Products = require("../../database/productsData/productsData");
const nodemailer = require("nodemailer");

//! track order
router.get("/track-order", async (req, res) => {
  const { orderNo, email } = req.query;

  try {
    const order = await Orders.findOne({
      orderNo,
      "customerDetail.email": email,
    });
    if (!order) {
      return res
        .status(404)
        .json({ msg: "No orders found with the provided details." });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! fetch order no
router.get("/latest-order-no", async (req, res) => {
  try {
    const latestOrder = await Orders.findOne().sort({ orderNo: -1 });
    return res.json({ orderNo: latestOrder ? latestOrder.orderNo : 4200 });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to fetch the latest order number" });
  }
});

// Create orders
router.post("/new-order", async (req, res) => {
  const {
    orderNo,
    date,
    status,
    orderNotes,
    firstName,
    lastName,
    email,
    phone,
    state,
    address,
    itemDetail, // Array of items in the order
    totalAmount,
  } = req.body;

  let newOrder;

  try {
    // Create a new order
    newOrder = new Orders({
      orderNo,
      date,
      status,
      orderNotes,
      customerDetail: {
        firstName,
        lastName,
        email,
        phone,
        country: "Pakistan",
        state,
        address,
      },
      itemDetail,
      totalAmount,
    });

    // Save the order
    await newOrder.save();

    // Update the quantity for each product in the order
    for (const item of itemDetail) {
      const product = await Products.findOne({ title: item.title });

      if (!product) {
        // Rollback: Remove the created order if product not found
        await Orders.deleteOne({ orderNo: newOrder.orderNo });
        return res.status(404).json({ msg: `Product ${item.title} not found` });
      }

      // Ensure the product has enough stock
      if (product.quantity < item.quantity) {
        // Rollback: Remove the created order if not enough stock
        await Orders.deleteOne({ orderNo: newOrder.orderNo });
        return res
          .status(400)
          .json({ msg: `Not enough stock for ${item.title}` });
      } else {
        // Deduct the ordered quantity from the product's available stock
        product.quantity -= item.quantity;
        await product.save();
      }
    }

    // Respond with the newly created order
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error placing order:", error);

    // Rollback: In case of any other error, ensure no partial updates
    if (newOrder) {
      await Orders.deleteOne({ orderNo: newOrder.orderNo });
    }

    return res.status(500).json({ msg: "Internal server error", error });
  }
});

// helper function for send email
const sendConfirmationEmail = async (orderData) => {
  const {
    firstName,
    lastName,
    email,
    orderNo,
    date,
    itemDetail,
    totalAmount,
    status,
  } = orderData;

  console.log(email);

  if (!email) {
    console.log("No email provided in order data:", orderData); // Debugging log
    throw new Error("No email provided");
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: `"OneStopCar" <${process.env.EMAIL}>`, // Sender address
    to: email, // List of receivers
    subject: "Your OneStopCar order has been received!", // Subject line
    html: `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px; text-align: center;">
        <div style="max-width: 600px; margin: 0 auto; background: #333; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); color: #ffffff;">
          <h2 style="color: #ffffff;">Thank you for your order, ${firstName} ${lastName}!</h2>
          <p style="font-size: 16px; color: #ffffff;">We've received your order <strong>#${orderNo}</strong> on ${new Date(
      date
    ).toLocaleDateString()} and it's now being ${status}.</p>
          <p style="font-size: 16px; color: #ffffff;"><strong>Items ordered:</strong></p>
          <ul style="list-style-type: none; padding: 0; margin: 10px 0;">
            ${itemDetail
              .map(
                (item) =>
                  `<li style="font-size: 14px; margin: 5px 0; color: #ffffff;">${item.title} (Qty: ${item.quantity}) - Rs.${item.total}</li>`
              )
              .join("")}
          </ul>
          <p style="font-size: 16px; color: #ffffff;"><strong>Total Amount:</strong> Rs.${totalAmount}</p>
          <p style="font-size: 16px; color: #ffffff;"><strong>Shipping:</strong> Free</p>
          <p style="font-size: 14px; color: #ffffff;">You will receive your parcel within two to three working days.</p>
          <a href="https://onestopcar.net/order-tracker/" style="display: inline-block; padding: 10px 20px; background-color: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px; margin-top: 20px;">Track your order here</a>
          <p style="font-size: 14px; color: #ffffff; margin-top: 20px;">Thank you for shopping with OneStopCar!</p>
        </div>
      </div>
    `,
  };

  // Send email
  return transporter.sendMail(mailOptions);
};

// Send confirmation email after the order is successfully saved
router.post("/send-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "No email provided" }); // Handling missing email
    }

    await sendConfirmationEmail(req.body);
    console.log("Email sent successfully");
    return res.status(200).json({ msg: "Email sent successfully" });
  } catch (error) {
    console.log("Error sending email:", error);
    return res.status(500).json({ msg: "Error sending email", error });
  }
});

module.exports = router;
