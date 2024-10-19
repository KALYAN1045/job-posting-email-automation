import React from "react";
import InputGroup from "./InputGroup";
import GreenCheckmark from "./GreenCheckmark";
import Mail from "../../images/Mail icon.png";
import Phone from "../../images/Phone icon.png";

const OtpForm = ({
  formData,
  handleInputChange,
  isEmailVerified,
  isPhoneVerified,
  handleVerifyEmailOtp,
  handleVerifyPhoneOtp,
}) => {
  return (
    <>
      <h2>OTP Verification</h2>
      <p className="title">Please enter the OTP sent to your email and phone</p>

      <div className="input-group">
        <InputGroup
          iconSrc={Mail}
          className="icon"
          name="emailOtp"
          placeholder="Email OTP (Nodemailer takes time/use 123456)"
          value={formData.emailOtp}
          onChange={handleInputChange}
        />
        {isEmailVerified && <GreenCheckmark />}
      </div>
      <button onClick={handleVerifyEmailOtp}>Verify Email</button>

      <br />
      <br />

      <div className="input-group">
        <InputGroup
          iconSrc={Phone}
          className="icon"
          name="phoneOtp"
          placeholder="Phone OTP (use 123456)"
          value={formData.phoneOtp}
          onChange={handleInputChange}
        />
        {isPhoneVerified && <GreenCheckmark />}
      </div>
      <button onClick={handleVerifyPhoneOtp}>Verify Phone</button>
    </>
  );
};

export default OtpForm;
