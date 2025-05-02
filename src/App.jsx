import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FAQPage from "./pages/FAQPage";
import FrameworkRecommender from "./pages/FrameworkRecommender";
import ContactPage from "./pages/ContactPage";
import ResultsLookup from "./pages/ResultsLookup";
import "./App.css";

function App() {
  return (
    <Router>
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
          <Link style={{ color: "#61dafb", textDecoration: "none" }} to="/contact">📬 Contact Us</Link>
          <Link style={{ color: "#61dafb", textDecoration: "none" }} to="/results">🎗️ Results</Link>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/recommender" element={<FrameworkRecommender />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/results" element={<ResultsLookup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
