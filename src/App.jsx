import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const frameworks = [
  "Scrum", "SAFe", "Six Sigma", "PRINCE2", "Stage-Gate",
  "Kanban", "LeSS", "Waterfall", "Disciplined Agile", "Crystal"
];

const scoresMatrix = require("@/data/framework_matrix.json"); // Simulated import

export default function FrameworkRecommender() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

  const handleChange = (factor, value) => {
    setAnswers({ ...answers, [factor]: value });
  };

  const calculateRecommendation = () => {
    const totalScores = {};
    const fivesCount = {};
    frameworks.forEach(fw => {
      totalScores[fw] = 0;
      fivesCount[fw] = 0;
    });

    frameworkData.forEach(({ factor, weight }) => {
      const selected = answers[factor];
      const row = scoresMatrix.find(
        r => r.Factor === factor && r.Option === selected
      );
      if (row) {
        frameworks.forEach(fw => {
          const score = row[fw];
          totalScores[fw] += score * weight;
          if (score === 5) fivesCount[fw] += 1;
        });
      }
    });

    const sorted = frameworks
      .map(fw => [fw, totalScores[fw], fivesCount[fw]])
      .sort((a, b) => b[1] - a[1] || b[2] - a[2])
      .slice(0, 3);

    setResults(sorted);
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
              onChange={e => handleChange(factor, e.target.value)}
            >
              <option value="" disabled>Select an option</option>
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </CardContent>
        </Card>
      ))}

      <Button onClick={calculateRecommendation} className="w-full mb-4">Get Recommendations</Button>

      {results.length > 0 && (
        <Card className="bg-green-50">
          <CardContent>
            <h2 className="text-lg font-bold mb-2">Top 3 Frameworks:</h2>
            <ol className="list-decimal ml-5">
              {results.map(([fw, score], idx) => (
                <li key={fw}>{fw} (Score: {score})</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
}