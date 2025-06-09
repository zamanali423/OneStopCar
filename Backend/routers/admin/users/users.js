const express = require("express");
const router = express.Router();
const User = require("../../../database/adminData/adminData");
const verifyToken = require("../../../middleware/verifyToken");
const generateToken = require("../../../authentication/generateToken");
const bcryptjs = require("bcryptjs");

// Register User
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({
      msg: "Registered Successfully",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Email or password is incorrect" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Password is incorrect" });
    }

    // Generate token (assuming you have a generateToken function)
    const token = await generateToken(user);

    return res.status(200).json({
      msg: "Login Successfully",
      user: { _id: user._id, email: user.email },
      token,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

//! get user
router.get("/getUser", verifyToken, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ msg: "User not find" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

module.exports = router;
