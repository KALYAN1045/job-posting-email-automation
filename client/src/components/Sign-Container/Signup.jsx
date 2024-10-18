import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import person from "../../images/Person_icon.png";
import Mail from "../../images/Mail icon.png";
import Phone from "../../images/Phone icon.png";
import Group from "../../images/Groups icon.png";
import "./Signup.css";

function SignUp() {
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  // Handler for form submission (when you click 'Proceed')
  const handleProceed = (e) => {
    e.preventDefault();
    setIsOtpVisible(true); // Trigger OTP form visibility
  };

  // Handler for OTP verification (dummy function for now)
  const handleVerifyOtp = () => {
    // OTP verification logic
  };

  return (
    <div className="register-form-container">
      <AnimatePresence>
        {/* Sign Up Form */}
        {!isOtpVisible && (
          <motion.div
            className="register-form"
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }} // Slide left and fade out
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }} // Speeding up the animation
          >
            <h2>Sign Up</h2>
            <p className="title">Lorem Ipsum is simply dummy text</p>
            <form onSubmit={handleProceed}>
              <div className="input-group">
                <img src={person} alt="Person Icon" className="icon" />
                <input type="text" placeholder="Name" />
              </div>
              <div className="input-group">
                <img src={Phone} alt="Phone Icon" className="icon" />
                <input type="text" placeholder="Phone no." />
              </div>
              <div className="input-group">
                <img src={person} alt="Person Icon" className="icon" />
                <input type="text" placeholder="Company Name" />
              </div>
              <div className="input-group">
                <img src={Mail} alt="Person Icon" className="icon" />
                <input type="email" placeholder="Company Email" />
              </div>
              <div className="input-group">
                <img src={Group} alt="Group Icon" className="icon" />
                <input type="number" placeholder="Employee Size" />
              </div>
              <p className="terms">
                By clicking on proceed you will accept our
                <br />
                <a href="#">Terms & Conditions</a>
              </p>
              <button type="submit">Proceed</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* OTP Form */}
        {isOtpVisible && (
          <motion.div
            className="otp-form"
            initial={{ opacity: 0, x: 100 }} // Start from right and invisible
            animate={{ opacity: 1, x: 0 }}  // Slide in from right
            exit={{ opacity: 0, x: -100 }}  // Exit to left
            transition={{
              duration: 0.3, // Speed up the animation
              delay: 0.3, // Delay the start of OTP form to wait for Sign Up form to exit
            }}
          >
            <h2>OTP Verification</h2>
            <p className="title">Please enter the OTP sent to your email and phone</p>
            <div className="input-group">
              <img src={Mail} alt="Mail Icon" className="icon" />
              <input
                type="text"
                name="emailOtp"
                placeholder="Email OTP"
              />
            </div>
            <button onClick={handleVerifyOtp}>Verify Email</button>
            <br />
            <br />
            <div className="input-group">
              <img src={Phone} alt="Phone Icon" className="icon" />
              <input
                type="text"
                name="phoneOtp"
                placeholder="Phone OTP"
              />
            </div>
            <button onClick={handleVerifyOtp}>Verify Phone</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SignUp;

