// importing necessary packages for routing
import { Routes, Route, useLocation } from "react-router-dom";

// importing all pages which need routing
import LoginPage from "../pages/LoginPage";

const Router = () => {
  let location = useLocation();

  return (
    <>
      <Routes key={location.pathname} location={location}>
        {/* placeholder paths and pages */}
        <Route exact="true" path="/" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default Router;
