import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./components/Register/Register";
import MainPage from "./components/MainPage/MainPage";

function App() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerification = () => {
      const verified = localStorage.getItem("isVerified") === "true";
      console.log("Checking verification in App.js:", verified);
      setIsVerified(verified);
    };

    checkVerification();
    window.addEventListener("storage", checkVerification);
    window.addEventListener("localStorageChanged", checkVerification);

    return () => {
      window.removeEventListener("storage", checkVerification);
      window.removeEventListener("localStorageChanged", checkVerification);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isVerified ? <Navigate to="/main" /> : <RegisterPage />}
        />
        <Route
          path="/main"
          element={isVerified ? <MainPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;