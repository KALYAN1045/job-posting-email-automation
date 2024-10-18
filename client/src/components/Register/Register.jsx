// RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import logo from "../../images/logo.png";
import SignUp from "../Sign-Container/Signup";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    email: "",
    employeeSize: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", formData);
      alert("Please verify your email and phone to complete the registration");
    } catch (err) {
      console.error(err);
    }
  };

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
