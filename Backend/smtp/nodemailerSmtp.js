const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendOrderConfirmationEmail = (to, orderDetailsJson) => {
  // Parse the orderDetails JSON
  const orderDetails = JSON.parse(orderDetailsJson);

  // Construct the email
  const mailOptions = {
    from: `"OneStopCar" <${process.env.EMAIL}>`, // Sender address
    to: to, // List of receivers
    subject: "Your OneStopCar order has been received!", // Subject line
    text: `Thank you for your order! Here are the details: ${orderDetailsJson}`, // Plain text body
    html: `
      <div style="margin: 0; font-family: Arial, sans-serif; background: linear-gradient(to bottom, #000, #000); display: flex; justify-content: center; align-items: center; height: 100vh; color: white;">
        <div style="text-align: center; padding: 20px; background: rgba(0, 0, 0, 0.7); border-radius: 10px; width: 90%; max-width: 400px;">
          <h1>Thank you for your order</h1>
          <p>Hi ${orderDetails.customerDetail.firstName} ${
      orderDetails.customerDetail.lastName
    },</p>
          <p>Just to let you know - we've received your order #${
            orderDetails.orderNo
          }, and it is now being processed:</p>
          <p>Pay with cash upon delivery.</p>
          <div style="background: #333; padding: 10px; border-radius: 10px; margin-top: 20px;">
            <p><strong>Product:</strong> ${orderDetails.itemDetail
              .map((item) => item.title)
              .join(", ")}</p>
            <p><strong>Quantity:</strong> ${orderDetails.itemDetail
              .map((item) => item.quantity)
              .join(", ")}</p>
            <p><strong>Price:</strong> ${orderDetails.itemDetail
              .map((item) => `Rs.${item.total}`)
              .join(", ")}</p>
            <p><strong>Order Date:</strong> ${new Date(
              orderDetails.date
            ).toLocaleDateString()}</p>
            <p><strong>Shipping:</strong> Free</p>
            <p><strong>Total:</strong> Rs.${orderDetails.totalAmount}</p>
            <p style="background: #333; padding: 10px; border-radius: 10px; margin-top: 20px;">You will recieve your parcel within two to three working days</p>
            <p><strong>Track Your Order:</strong> <a href="https://onestopcar.net/order-tracker/" target="_blank">onestopcar.net</a></p>
            <p style="text-align: center; margin-top:4rem">— OneStopCar —</p>
          </div>
        </div>
      </div>
    `, // HTML body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: %s", info.messageId);
    }
  });
};

module.exports = sendOrderConfirmationEmail;
