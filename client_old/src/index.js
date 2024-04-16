import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// react routing
import { BrowserRouter } from "react-router-dom";
// import components
import ScrollToTop from "./utils/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
