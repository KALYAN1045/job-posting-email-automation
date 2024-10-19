import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./components/Register/Register";
import MainPage from "./components/MainPage/MainPage";

function App() {
  const isVerified = localStorage.getItem("isVerified"); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route
          path="/main"
          element={isVerified ? <MainPage /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
