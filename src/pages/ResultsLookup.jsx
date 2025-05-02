import React, { useState } from "react";
import frameworkInfo from "../data/frameworkInfo";
import "../styles/Results.css";
import Footer from "../components/Footer";

export default function ResultsLookup() {
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchResults = async () => {
    setError("");
    setData(null);

    try {
      const res = await fetch(`http://localhost:5000/results/${code}`);
      const result = await res.json();
      if (result.recommendations) {
        setData(result);
      } else {
        setError("❌ No results found. Please check your code.");
      }
    } catch {
      setError("⚠️ Could not connect to the server.");
    }
  };

  return (
    <div className="results-bg">
      <h1 className="text-white text-3xl font-bold mb-6 text-center">
        View Your Saved Frameworks
      </h1>

      <div className="button-wrapper">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your unique code"
          className="custom-input"
        />
        <button onClick={fetchResults} className="custom-button">
          View Results
        </button>
      </div>

      {error && <p className="text-red-400 font-medium mt-4">{error}</p>}

      {data && (
        <div className="results-card">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Top Frameworks for Code:
            <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded ml-2">
              {code}
            </span>
          </h2>

          {data.name && (
            <p className="text-sm text-gray-300 mb-1 text-center">
              <strong>Project:</strong> {data.name}
            </p>
          )}

          {data.email && (
            <p className="text-sm text-gray-300 mb-4 text-center">
              <strong>Email:</strong> {data.email}
            </p>
          )}

          <ol className="list-decimal ml-6 text-base space-y-6">
            {data.recommendations.map((r, i) => (
              <li key={i}>
                <div className="font-bold text-lg mb-1">{r}</div>
                <div className="text-sm whitespace-pre-wrap mb-1">
                  {frameworkInfo[r]?.description || "No description available."}
                </div>
                <a
                  href={frameworkInfo[r]?.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Visit Official Site 🔗
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      <Footer />
    </div>
  );
}
