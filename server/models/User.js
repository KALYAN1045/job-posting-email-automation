const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  companyName: { type: String },
  employeeSize: { type: Number },
  emailOtp: { type: String },
  phoneOtp: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
