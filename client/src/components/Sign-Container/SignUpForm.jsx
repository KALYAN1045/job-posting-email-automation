import React from "react";
import InputGroup from "./InputGroup";
import TermsAndConditions from "./TermsAndConditions";
import person from "../../images/Person_icon.png";
import Mail from "../../images/Mail icon.png";
import Phone from "../../images/Phone icon.png";
import Group from "../../images/Groups icon.png";

const SignUpForm = ({ formData, handleInputChange, handleProceed }) => {
  return (
    <form onSubmit={handleProceed}>
      <div className="input-group">
        <InputGroup
          iconSrc={person}
          className="icon"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <InputGroup
          iconSrc={Phone}
          className="icon"
          name="phoneNumber"
          placeholder="Phone no."
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <InputGroup
          iconSrc={person}
          className="icon"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <InputGroup
          iconSrc={Mail}
          className="icon"
          name="email"
          placeholder="Company Email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <InputGroup
          iconSrc={Group}
          className="groups"
          name="employeeSize"
          placeholder="Employee Size"
          type="number"
          value={formData.employeeSize}
          onChange={handleInputChange}
        />
      </div>
      <TermsAndConditions />

      <button type="submit">Proceed</button>
    </form>
  );
};

export default SignUpForm;
