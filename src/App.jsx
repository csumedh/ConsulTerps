import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FAQPage from "./pages/FAQPage";
import FrameworkRecommender from "./pages/FrameworkRecommender";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation */}
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/faq" style={{ marginRight: "1rem" }}>FAQ / How To</Link>
          <Link to="/recommender">Recommender</Link>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/recommender" element={<FrameworkRecommender />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
