import React from "react";
import ReactDOM from "react-dom/client"; // <-- FIXED
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // <-- FIXED
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
