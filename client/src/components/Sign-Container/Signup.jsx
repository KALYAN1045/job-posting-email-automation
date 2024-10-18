import React from "react";
import person from "../../images/Person_icon.png";
import Mail from "../../images/Mail icon.png";
import Phone from "../../images/Phone icon.png";
import Group from "../../images/Groups icon.png";
import "./Signup.css";

function SignUp() {
  return (
    <div className="register-form-container">
      <div className="register-form">
        <h2>Sign Up</h2>
        <p className="title">Lorem Ipsum is simply dummy text</p>
        <form>
          <div className="input-group">
            <img src={person} alt="Person Icon" className="icon" />
            <input type="text" placeholder="Name" />
          </div>
          <div className="input-group">
            <img src={Phone} alt="Person Icon" className="icon" />
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
            <img
              src={Group}
              alt="Person Icon"
              className="group"
            />
            <input type="number" placeholder="Employee Size" />
          </div>
          <p className="terms">
            By clicking on proceed you will accept our
            <br />
            <a href="#">Terms & Conditions</a>
          </p>
          <button type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
