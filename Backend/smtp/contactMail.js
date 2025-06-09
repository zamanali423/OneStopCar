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

const sendOrderConfirmationEmail = (to, contactDetailJson) => {
  // Parse the orderDetails JSON
  const contactDetail = JSON.parse(contactDetailJson);

  // Construct the email
  const mailOptions = {
    from: `"OneStopCar" <${process.env.EMAIL}>`, // Sender address
    to: to, // List of receivers
    subject: "Your OneStopCar contact form has been received!", // Subject line
    text: `Thank you for your contact! Here are the details: ${contactDetailJson}`, // Plain text body
    html: `
      <div style="margin: 0; font-family: Arial, sans-serif; background: linear-gradient(to bottom, #000, #000); display: flex; justify-content: center; align-items: center; height: 100vh; color: white;">
        <div style="text-align: center; padding: 20px; background: rgba(0, 0, 0, 0.7); border-radius: 10px; width: 90%; max-width: 400px;">
          <h1>Thank you for your Contact us</h1>
          <p>Hi ${contactDetail.name},</p>
          <p>Just to let you know - we've received your contact form and it is now being processed:</p>
          <div style="background: #333; padding: 10px; border-radius: 10px; margin-top: 20px;">
            <p style="text-align: center; font-size:2rem"><strong>Your Detail</strong></p>
            <p><strong>Name:</strong> ${contactDetail.name}</p>
            <p><strong>Subject:</strong> ${contactDetail.subject}</p>
            <p><strong>Email:</strong> ${contactDetail.email}</p>
            <p><strong>Phone:</strong> ${contactDetail.phone}</p>
            <p><strong>Message:</strong> ${contactDetail.message}</p>
            <p><strong>Date:</strong> ${new Date(
              contactDetail.date
            ).toLocaleDateString()}</p>
            <p><strong>Thanks for using us:</strong> <a href="https://onestopcar.net" target="_blank">onestopcar.net</a></p>
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
