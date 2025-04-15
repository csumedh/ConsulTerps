// src/pages/FrameworkRecommender.jsx

import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import "../App.css";

const frameworkData = [
  {
    factor: "Team Size",
    weight: 3,
    options: [
      "Small (1-10 people)",
      "Medium (11-50 people)",
      "Large (50+ people)"
    ]
  },
  {
    factor: "Cross-functional Teams",
    weight: 2,
    options: ["Yes", "No"]
  },
  {
    factor: "Deliverable Frequency",
    weight: 2,
    options: ["Daily", "Weekly", "Monthly", "On Demand"]
  },
  {
    factor: "Flexibility of Changes",
    weight: 2,
    options: ["Rigid", "Somewhat Flexible", "Flexible"]
  },
  {
    factor: "Project Type",
    weight: 1,
    options: ["Product Development", "Operations/Process Improvement"]
  },
  {
    factor: "Triple Constraint Priority",
    weight: 3,
    options: ["Schedule", "Budget", "Scope"]
  },
  {
    factor: "Workflow Flexibility",
    weight: 2,
    options: ["Structured", "Flexible"]
  },
  {
    factor: "Regulations",
    weight: 1,
    options: ["Yes", "No"]
  },
  {
    factor: "Use of Tools",
    weight: 1,
    options: ["Yes or Open to Use", "No"]
  }
];

export default function FrameworkRecommender() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (factor, value) => {
    setAnswers({ ...answers, [factor]: value });
  };

  const calculateRecommendation = () => {
    setLoading(true);
    fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers })
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data.recommendations);
        setLoading(false);
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

      {frameworkData.map(({ factor, options }) => (
        <Card key={factor} className="mb-4">
          <CardContent className="space-y-2">
            <Label>{factor}</Label>
            <select
              className="w-full border p-2 rounded"
              value={answers[factor] || ""}
              onChange={(e) => handleChange(factor, e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </CardContent>
        </Card>
      ))}

      <Button onClick={calculateRecommendation} disabled={loading} className="w-full mb-4">
        {loading ? "Loading..." : "Get Recommendations"}
      </Button>

      {results.length > 0 && (
        <Card className="bg-green-50">
          <CardContent>
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
  );
}
