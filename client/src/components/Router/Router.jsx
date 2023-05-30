import { useEffect } from "react";

// importing necessary packages for routing
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";

// importing all pages which need routing
import LandingPage from "../../pages/LandingPage/LandingPage";
import ChooseRole from "../../pages/ChooseRole/ChooseRole";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import UserPage from "../../pages/UserPage/UserPage";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import FirstLogin from "../../pages/FirstLogin/FirstLogin";
import SearchPage from "../../pages/SearchPage/SearchPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import AuthContext from "../../utils/context/AuthContext";
import HomePageAfterLoggedIn from "../../pages/HomePageAfterLoggedIn/HomePageAfterLoggedIn";


const Router = () => {
    let location = useLocation();
    const { loggedIn } = useContext(AuthContext);

    const path = location.path;
    const navigate = useNavigate();

    useEffect(() => {
        if (
            loggedIn &&
            (path === "/" ||
                path === "/login" ||
                path === "/register-customer" ||
                path === "/forgot-password")
        ) {
            navigate("/home");
        }
    }, [loggedIn, path, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);

    return (
        <>
            <Routes key={location.pathname} location={location}>
                {/* placeholder paths and pages */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/first-login" element={<FirstLogin />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/logged-user" element={ <HomePageAfterLoggedIn/>} />
              

                {!loggedIn && (
                    <>
                        <Route
                            exact="true"
                            path="/"
                            element={<LandingPage />}
                        />
                        <Route path="/choose-role" element={<ChooseRole />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/register-customer"
                            element={<RegisterPage />}
                        />
                    </>
                )}
                {loggedIn && (
                    <>
                        <Route path="/home" element={<UserPage />} />
                        <Route path="/first-login" element={<FirstLogin />} />
                        <Route path="/search" element={<SearchPage />} />
<<<<<<< HEAD
=======
                        <Route path="/profile" element={<ProfilePage />} />
>>>>>>> 31af6c9cc1e6498dc04df1d946098b09c8cfd65c
                        <Route path="/logged-user" element={ <HomePageAfterLoggedIn/>} />
                    </>
                )}
            </Routes>
        </>
    );
};

export default Router;
