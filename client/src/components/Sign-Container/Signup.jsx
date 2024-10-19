import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SignUpForm from "./SignUpForm";
import OtpForm from "./OtpForm";
import "./Signup.css";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    companyName: "",
    email: "",
    employeeSize: "",
    emailOtp: "",
    phoneOtp: "",
  });
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const navigate = useNavigate();

  const setVerificationAndNavigate = useCallback(() => {
    localStorage.setItem("isVerified", "true");
    localStorage.setItem("userName", formData.name);
    // Dispatch a custom event to notify App.js about the change
    window.dispatchEvent(new Event('localStorageChanged'));
    // Navigate after a short delay to ensure state is updated
    setTimeout(() => navigate("/main"), 100);
  }, [formData.name, navigate]);

  useEffect(() => {
    if (isEmailVerified && isPhoneVerified && isAnimationComplete) {
      console.log("Both email and phone verified, setting verification...");
      setVerificationAndNavigate();
    }
  }, [isEmailVerified, isPhoneVerified, isAnimationComplete, setVerificationAndNavigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProceed = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when OTP request starts
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          phone: formData.phoneNumber,
          companyName: formData.companyName,
          email: formData.email,
          employeeSize: formData.employeeSize,
        }
      );
      console.log(response.data.message);
      setIsOtpVisible(true);
    } catch (err) {
      console.error(
        "Error sending OTPs:",
        err.response ? err.response.data.message : err.message
      );
      alert(err.response.data.message);
    } finally {
      setIsLoading(false); // Set loading to false once OTP request completes
    }
  };

  const handleVerifyEmailOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-email-otp",
        {
          email: formData.email,
          emailOtp: formData.emailOtp,
        }
      );
      console.log(response.data.message);
      setIsEmailVerified(true);
    } catch (err) {
      console.error(
        "Error during email OTP verification:",
        err.response ? err.response.data.message : err.message
      );
      alert(err.response.data.message);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-phone-otp",
        {
          phone: formData.phoneNumber,
          phoneOtp: formData.phoneOtp,
        }
      );
      console.log(response.data.message);
      setIsPhoneVerified(true);
      // Start the animation completion timer
      setTimeout(() => {
        setIsAnimationComplete(true);
      }, 2800); // Adjust this time to match your animation duration
    } catch (err) {
      console.error(
        "Error during phone OTP verification:",
        err.response ? err.response.data.message : err.message
      );
      alert(err.response.data.message);
    }
  };

  return (
    <div className="register-form-container">
      <AnimatePresence>
        {!isOtpVisible && (
          <motion.div
            className="register-form"
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.1 }}
          >
            <h2>Sign Up</h2>
            <p className="title">Fill in the details to sign up</p>
            <SignUpForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleProceed={handleProceed}
              isLoading={isLoading} // Pass loading state to SignUpForm
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOtpVisible && (
          <motion.div
            className="otp-form"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.1, delay: 0 }}
          >
            <OtpForm
              formData={formData}
              handleInputChange={handleInputChange}
              isEmailVerified={isEmailVerified}
              isPhoneVerified={isPhoneVerified}
              handleVerifyEmailOtp={handleVerifyEmailOtp}
              handleVerifyPhoneOtp={handleVerifyPhoneOtp}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SignUp;
