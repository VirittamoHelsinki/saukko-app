import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const Router = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<div>Home</div>} />
        <Route path="register" element={<Register />} />{" "}
        <Route path="login" element={<Login />} />{" "}
      </Routes>
    </div>
  );
};

export default Router;
