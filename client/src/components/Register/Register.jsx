// RegisterPage.js
import React from "react";
import "./Register.css";
import logo from "../../images/logo.png";
import SignUp from "../Sign-Container/Signup";

function RegisterPage() {
  return (
    <div>
      <div className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="navbar-contact">Contact</div>
      </div>
      <div className="register-container">
        <div className="register-info">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}

export default RegisterPage;
