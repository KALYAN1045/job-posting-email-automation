const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmailOtp = require("../utils/sendEmailOtp");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, phone, companyName, employeeSize } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or phone already exists" });
    }

    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      name,
      email,
      phone,
      companyName,
      employeeSize,
      emailOtp,
      phoneOtp: "123456",
      isEmailVerified: false,
      isPhoneVerified: false,
    });

    await newUser.save();

    // Send email asynchronously without waiting for it to complete
    sendEmailOtp(email, emailOtp).catch(error => {
      console.error("Failed to send email:", error);
      // Consider implementing a retry mechanism or logging for failed emails
    });

    return res
      .status(200)
      .json({ message: "User registered. Email OTP will be sent shortly." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route: /verify-email-otp (Verify only email OTP)
router.post("/verify-email-otp", async (req, res) => {
  const { email, emailOtp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the email OTP matches
    if (user.emailOtp !== emailOtp) {
      return res.status(400).json({ message: "Invalid email OTP" });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    await user.save();

    return res.status(200).json({ message: "Email OTP verified. Proceed to verify phone OTP." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Route: /verify-phone-otp (Verify phone OTP and generate JWT if both are verified)
router.post("/verify-phone-otp", async (req, res) => {
  const { phone, phoneOtp } = req.body;

  try {
    // Find the user by phone number
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the phone OTP matches "123456"
    if (phoneOtp !== "123456") {
      return res.status(400).json({ message: "Invalid phone OTP" });
    }

    // Check if the email is already verified
    if (!user.isEmailVerified) {
      return res.status(400).json({ message: "Email not verified yet" });
    }

    // Mark phone as verified
    user.isPhoneVerified = true;
    await user.save();

    // Generate JWT Token after both verifications
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Phone OTP verified, user fully authenticated", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
