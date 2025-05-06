import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FAQPage from "./pages/FAQPage";
import FrameworkRecommender from "./pages/FrameworkRecommender";
import ContactPage from "./pages/ContactPage";
import ResultsLookup from "./pages/ResultsLookup";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* ✅ Styled Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        padding: "1rem",
        backgroundColor: "#282c34",
        color: "#fff"
      }}>
        <Link style={{ color: "#61dafb", textDecoration: "none" }} to="/">🏠 Home</Link>
        <Link style={{ color: "#61dafb", textDecoration: "none" }} to="/faq">📖 How To</Link>
        <Link style={{ color: "#61dafb", textDecoration: "none" }} to="/recommender">🤖 Recommender</Link>
        <Link style={{ color: "#61dafb", textDecoration: "none" }} to="/results">🎗️ Results</Link>
        <Link style={{ color: "#61dafb", textDecoration: "none" }} to="/contact">📬 Contact Us</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/recommender" element={<FrameworkRecommender />} />
        <Route path="/results" element={<ResultsLookup />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
