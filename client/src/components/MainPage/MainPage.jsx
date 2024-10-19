import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import demoProfileImage from "../../images/default-profile.jpg";
import homeIcon from "../../images/home-icon.png";
import JobForm from "./JobPostingForm";
import "./MainPage.css";

const MainPage = () => {
  const [userName, setUserName] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); 

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility when the button is clicked
  };

  return (
    <div className="main-container">
      {/* Navbar */}
      <div className="nav">
        <img src={logo} alt="Logo" className="nav-logo" />
        <div className="nav-right">
          <div className="nav-contact">Contact</div>
          <div className="profile-container">
            <div className="profile-box" onClick={toggleDropdown}>
              <img
                src={demoProfileImage}
                alt="Profile"
                className="profile-img"
              />
              <span>{userName || "Your Name"}</span>
            </div>
            {isDropdownVisible && (
              <div className="dropdown-menu">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <Link to="/main">
          <img src={homeIcon} alt="Home" className="home-icon" />
        </Link>
      </div>

      {/* Main content */}
      <div className="content">
        {!isFormVisible && <button className="create-interview-btn" onClick={toggleFormVisibility}>
          Create Interview
        </button>}
      </div>
    {isFormVisible && <JobForm />}
    </div>
  );
};

export default MainPage;
