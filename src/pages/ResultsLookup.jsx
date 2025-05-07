import React, { useState } from "react";
import frameworkInfo from "../data/frameworkInfo";
import "../styles/results.css";
import Footer from "../components/Footer";

export default function ResultsLookup() {
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchResults = async () => {
    setError("");
    setData(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/results/${code}`);
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
      <h1 className="text-3xl font-bold mb-6 text-center">
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
          <h2 className="results-heading mb-4 text-center">
            Top Frameworks for Code:{" "}
            <span className="inline-block font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded ml-2">
              {code}
            </span>
          </h2>

          {data.name && (
            <p className="project-meta">
              <strong>Project:</strong> {data.name}
            </p>
          )}

          {data.email && (
            <p className="project-meta mb-4">
              <strong>Email:</strong> {data.email}
            </p>
          )}

          <ol className="list-decimal ml-6 text-base space-y-6">
            {data.recommendations.map((r, i) => (
              <li key={i}>
                <div className="text-lg font-bold text-purple-900 mb-2">{r}</div>
                <div className="text-sm whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {frameworkInfo[r]?.description
                    .split("\n")
                    .map((line, idx) => (
                      <p key={idx} className="mb-2">{line}</p>
                    ))}
                </div>
                <div className="mt-2">
                  {frameworkInfo[r]?.getStarted && (
                    <a
                      href={frameworkInfo[r].getStarted}
                      target="_blank"
                      rel="noreferrer"
                      className="text-link"
                    >
                      Get Started →
                    </a>
                  )}
                  {frameworkInfo[r]?.learnMore && (
                    <a
                      href={frameworkInfo[r].learnMore}
                      target="_blank"
                      rel="noreferrer"
                      className="text-link"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <Footer />
    </div>
  );
}
