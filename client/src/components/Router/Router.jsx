import { useEffect } from "react";

// importing necessary packages for routing
import { Routes, Route, useLocation } from "react-router-dom";

// importing all pages which need routing
import LandingPage from "../../pages/LandingPage/LandingPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import UserPage from "../../pages/UserPage/UserPage";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
<<<<<<< HEAD
import FirstLogin from "../../pages/FirstLogin/FirstLogin";
import SearchPage from "../../pages/SearchPage/SearchPage";
=======
import ProtectedRoutes from "../../pages/ProtectedRoutes";
>>>>>>> origin/dev

const Router = () => {
    let location = useLocation();
    let path = location.pathname;

<<<<<<< HEAD
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);

    return (
        <>
            <Routes key={path} location={location}>
                {/* placeholder paths and pages */}
                <Route exact="true" path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<UserPage />} />
                <Route path="/first-login" element={<FirstLogin />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </>
    );
=======
  return (
    <>
      <Routes key={location.pathname} location={location}>
        {/* placeholder paths and pages */}
        <Route exact="true" path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<UserPage />} />
        </Route>
        <Route path="/background-form" element={<BackgroundForm />} />
      </Routes>
    </>
  );
>>>>>>> origin/dev
};

export default Router;
