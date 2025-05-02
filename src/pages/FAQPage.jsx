import React from "react";
import Footer from "../components/Footer";

export default function FAQPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}>
      <h1>FAQ / How To</h1>
      <p>This page provides guidance on how to use the Recommender tool.</p>
      <h2>How does it work?</h2>
      <p>
        Answer the questions about your project using the dropdowns. Then click on "Get Recommendations" to see the top 3 agile frameworks tailored to your inputs.
      </p>
      <h2>What data does it use?</h2>
      <p>
        The recommender uses scoring logic from an Excel file (framework_matrix.xlsx) that is loaded
        at runtime.
      </p>
      {/* Add more FAQs as needed */}
      <Footer />
    </div>
  );
}
