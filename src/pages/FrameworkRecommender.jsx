import React, { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import "../App.css";

const frameworkData = [
  { factor: "Team Size", weight: 3, options: ["Small (1-10 people)", "Medium (11-50 people)", "Large (50+ people)"] },
  { factor: "Cross-functional Teams", weight: 2, options: ["Yes", "No"] },
  { factor: "Deliverable Frequency", weight: 2, options: ["Daily", "Weekly", "Monthly", "On Demand"] },
  { factor: "Flexibility of Changes", weight: 2, options: ["Rigid", "Somewhat Flexible", "Flexible"] },
  { factor: "Project Type", weight: 1, options: ["Product Development", "Operations/Process Improvement"] },
  { factor: "Triple Constraint Priority", weight: 3, options: ["Schedule", "Budget", "Scope"] },
  { factor: "Workflow Flexibility", weight: 2, options: ["Structured", "Flexible"] },
  { factor: "Regulations", weight: 1, options: ["Yes", "No"] },
  { factor: "Use of Tools", weight: 1, options: ["Yes or Open to Use", "No"] }
];

export default function FrameworkRecommender() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questionRefs = useRef(frameworkData.map(() => React.createRef()));
  const resultsRef = useRef(null);

  const handleChange = (factor, value, index) => {
    const updatedAnswers = { ...answers, [factor]: value };
    setAnswers(updatedAnswers);
    const nextIndex = frameworkData.findIndex((q, i) => !updatedAnswers[q.factor] && i > index);
    if (nextIndex !== -1 && questionRefs.current[nextIndex]?.current) {
      questionRefs.current[nextIndex].current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const calculateRecommendation = () => {
    setLoading(true);
    setShowResults(false);
    fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers })
    })
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setResults(data.recommendations);
          setLoading(false);
          setShowResults(true);
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 100);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
        alert("Could not fetch recommendation.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Management Framework Recommender</h1>

      {frameworkData.map(({ factor, options }, index) => (
        <div key={factor} ref={questionRefs.current[index]}>
          <Card className="mb-4">
            <CardContent className="space-y-2">
              <Label className="font-semibold">{factor}</Label>
              <select
                className="w-full border p-2 rounded"
                value={answers[factor] || ""}
                onChange={(e) => handleChange(factor, e.target.value, index)}
              >
                <option value="" disabled>Select an option</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </CardContent>
          </Card>
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <Button onClick={calculateRecommendation} className="w-full mb-2" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </Button>
        <Button
          onClick={() => {
            setAnswers({});
            setResults([]);
            setShowResults(false);
          }}
          className="w-full"
          style={{ backgroundColor: "#6c63ff", color: "white" }}
        >
          Clear Selections
        </Button>
      </div>

      <div ref={resultsRef}>
      {loading && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1.5rem", width: "100%" }}>
            {/* Progress container */}
            <div
            style={{
                width: "100%",
                height: "64px",
                position: "relative",
                backgroundColor: "#e5e7eb", // gray-200
                borderRadius: "9999px",
                overflow: "hidden",
                marginBottom: "1rem"
            }}
            >
            {/* Progress fill */}
            <div
                style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                backgroundColor: "#34d399", // emerald-400
                animation: "progressFill 2s linear forwards",
                borderRadius: "9999px",
                zIndex: 1
                }}
            ></div>

            {/* Turtle */}
            <img
                src="/turtle.gif"
                alt="Turtle walking"
                style={{
                position: "absolute",
                top: "6px",
                left: 0,
                width: "60px",
                height: "auto",
                animation: "turtleMove 2s linear forwards",
                zIndex: 2
                }}
            />
            </div>

            <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>Analyzing your inputs...</p>
        </div>
        )}


        {showResults && (
          <Card className="bg-purple-50 mt-6">
            <CardContent>
              <h2 className="text-lg font-bold mb-2">Your Inputs:</h2>
              <ul className="list-disc ml-6 mb-4">
                {Object.entries(answers).map(([factor, value]) => (
                  <li key={factor}><strong>{factor}:</strong> {value}</li>
                ))}
              </ul>
              <h2 className="text-lg font-bold mb-2">Top 3 Frameworks:</h2>
              <ol className="list-decimal ml-5">
                {results.map((fw) => (
                  <li key={fw}>{fw}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
