require("dotenv").config();
const express = require("express");
const router = express.Router();
const Contacts = require("../../database/contacts/contactsData");
const nodemailer = require("nodemailer");

// 🟩 Create reusable transporter with fallback handling
const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    family: 4, // ⛑️ Force IPv4 to avoid ENETUNREACH (SMTP IPv6 issue)
  });

router.post("/new-contact", async (req, res) => {
  const { name, subject, email, phone, message, date } = req.body;

  try {
    const newContact = new Contacts({
      name,
      subject,
      email,
      phone,
      message,
      date,
    });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ msg: "Failed to save contact", error });
  }
});

router.post("/send-email-contact", async (req, res) => {
  const { name, subject, email, phone, message, date } = req.body;

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"OneStopCar" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your OneStopCar contact form has been received!",
      text: `Hi ${name}, your contact has been received. Details: ${JSON.stringify(
        {
          name,
          subject,
          email,
          phone,
          message,
          date,
        }
      )}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #000; color: #fff; padding: 40px; border-radius: 10px; max-width: 500px; margin: auto;">
          <h2 style="text-align: center;">Thanks for contacting OneStopCar</h2>
          <p>Hello ${name},</p>
          <p>We've received your contact form and will reach out soon. Here's what we got:</p>
          <ul style="line-height: 1.6;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Subject:</strong> ${subject}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Message:</strong> ${message}</li>
            <li><strong>Date:</strong> ${new Date(date).toLocaleString()}</li>
          </ul>
          <p style="margin-top: 30px;">Thank you,<br>— OneStopCar Team</p>
          <p style="margin-top: 20px;"><a href="https://onestopcar.net" style="color: #FFC107;">Visit our website</a></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "Contact email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ msg: "Failed to send email", error });
  }
});

module.exports = router;
