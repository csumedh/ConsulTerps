import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import "./App.css";

// Framework question data remains the same.
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
    // Optionally, add validations to ensure all required answers are provided.
    setLoading(true);
    fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send the user-selected answers to the backend
      body: JSON.stringify({ answers })
    })
      .then((response) => response.json())
      .then((data) => {
        // Assume the backend returns a JSON with "recommendations" as an array.
        setResults(data.recommendations);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setLoading(false);
        alert("Failed to get recommendations from the backend.");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Management Framework Recommender</h1>

      {frameworkData.map(({ factor, options }) => (
        <Card key={factor} className="mb-4">
          <CardContent className="space-y-2">
            <Label className="font-semibold">{factor}</Label>
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

      <Button onClick={calculateRecommendation} className="w-full mb-4" disabled={loading}>
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
