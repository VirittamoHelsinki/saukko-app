// importing necessary packages for routing
import { Routes, Route, useLocation } from "react-router-dom";
import React, { useContext } from "react";

// importing all pages which need routing
import LandingPage from "../../pages/LandingPage/LandingPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import UserPage from "../../pages/UserPage/UserPage";
import BackgroundForm from "../../pages/BackgroundForm/BackgroundForm";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ProtectedRoutes from "../../pages/ProtectedRoutes";
import AuthContext from "../context/AuthContext";

const Router = () => {
  let location = useLocation();
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <Routes key={location.pathname} location={location}>
        {/* placeholder paths and pages */}
        <Route exact="true" path="/" element={<LandingPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/background-form" element={<BackgroundForm />} />

        {!loggedIn && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        {loggedIn && <Route path="/home" element={<UserPage />} />}
      </Routes>
    </>
  );
};

export default Router;
