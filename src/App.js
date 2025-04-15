import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx"; // Import the SheetJS library
import "./App.css";

// Instead of importing a JSON file, we will load the data from an Excel file.
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
  "Scrum",
  "SAFe",
  "Six Sigma",
  "PRINCE2",
  "Stage-Gate",
  "Kanban",
  "LeSS",
  "Waterfall",
  "Disciplined Agile",
  "Crystal"
];

function App() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [scoresMatrix, setScoresMatrix] = useState([]); // Stores the parsed Excel data
  const [loading, setLoading] = useState(true);

  // Load and parse the Excel file when the component mounts.
  useEffect(() => {
    // Fetch the Excel file from the public folder.
    fetch('/framework_matrix.xlsx')
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // Read the data into a workbook.
        const workbook = XLSX.read(buffer, { type: 'array' });
        // Get the name of the first sheet.
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // Convert the sheet to JSON using the header row for keys.
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        setScoresMatrix(jsonData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading Excel file:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (factor, value) => {
    setAnswers({ ...answers, [factor]: value });
  };

  const calculateRecommendation = () => {
    if (loading || !scoresMatrix.length) {
      alert("Data is still loading or there was an error loading the data.");
      return;
    }

    const totalScores = {};
    const fivesCount = {};
    frameworks.forEach(fw => {
      totalScores[fw] = 0;
      fivesCount[fw] = 0;
    });

    frameworkData.forEach(({ factor, weight }) => {
      const selected = answers[factor];
      // Find the row in the scoresMatrix matching the factor and user's option.
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
    <div className="App" style={{ padding: 24, maxWidth: 800, margin: "auto" }}>
      <h1>🧠 Project Management Framework Recommender</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {frameworkData.map(({ factor, options }) => (
            <div key={factor} style={{ marginBottom: "1rem", textAlign: "left" }}>
              <label><strong>{factor}</strong></label>
              <select
                value={answers[factor] || ""}
                onChange={(e) => handleChange(factor, e.target.value)}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              >
                <option value="" disabled>Select one</option>
                {options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}

          <button onClick={calculateRecommendation} style={{ padding: 12, marginTop: 16 }}>
            Get Recommendations
          </button>

          {results.length > 0 && (
            <div style={{ marginTop: 24, textAlign: "left" }}>
              <h2>🎯 Top 3 Frameworks:</h2>
              <ol>
                {results.map(([fw, score]) => (
                  <li key={fw}>{fw} (Score: {score})</li>
                ))}
              </ol>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
