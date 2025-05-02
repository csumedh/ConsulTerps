import React, { useState, useRef } from "react";
import "../App.css";
import frameworkInfo from "../data/frameworkInfo";
import "../styles/Recommender.css";

const frameworkData = [
  { factor: "Team Size", options: ["Small (1-10 people)", "Medium (11-50 people)", "Large (50+ people)"], tooltip: "Clarifying team size ensures appropriate team structure, effective communication, and optimal project performance. Smaller teams benefit from agile frameworks that emphasize flexibility, rapid decision-making, and close collaboration. Medium-sized teams often require structured methods balancing agility and formality for clear communication and coordination. Larger teams typically benefit from frameworks designed for scalability, structured communication channels, and defined roles, minimizing complexity and maximizing efficiency." },
  
  { factor: "Cross-functional Teams", options: ["Yes", "No"], tooltip: "Clarifying if your teams are cross-functional helps select a framework that supports effective collaboration. Cross-functional teams require methods promoting integrated workflows and clear communication, while specialized teams benefit from clearly defined roles and structured coordination." },
  
  { factor: "Deliverable Frequency", options: ["Daily", "Weekly", "Monthly", "On Demand"], tooltip: "Daily frequency supports urgent, immediate-impact activities, rapid response to feedback, or quick operational tests. \n Weekly is ideal for short, iterative cycles, like promotions or fast-turnaround updates. \n Monthly aligns with structured projects that have clear monthly milestones, such as menu launches or training initiatives.\n On Demand fits projects triggered by specific events, such as store openings or seasonal campaigns, rather than fixed intervals." },
  
  { factor: "Flexibility of Changes", options: ["Rigid", "Somewhat Flexible", "Flexible"], tooltip: "Rigid frameworks follow fixed steps with limited room for mid-course changes—best for predictable, compliance-driven projects.\n Somewhat Flexible approaches allow adjustments at set checkpoints—useful for structured initiatives like campaigns or seasonal rollouts. Flexible frameworks support continuous changes—ideal for fast-paced, feedback-driven work like digital innovation or operational improvements." },
  
  { factor: "Project Type", options: ["Product Development", "Operations/Process Improvement"], tooltip: "End‑to‑end product builds require roadmap‑driven planning, stakeholder engagement, and release management to bring new offerings to market.\n Process improvement initiatives depend on iterative audits, waste‑reduction strategies, and performance metrics to optimize operations. \n Hybrid endeavors combine feature delivery and operational refinement, guiding both innovation and efficiency in parallel." },
  
  { factor: "Triple Constraint Priority", options: ["Schedule", "Budget", "Scope"], tooltip: "Your project is a tripod standing on the constraints of budget, scope and shcedule, selecting which leg can be bent most easily can help recommend a more fitting framework: \n Time’s your anchor: When deadlines are carved in stone, time‑boxed methods squeeze maximum value into fixed windows. \n Money’s your margin: If budget drives decisions, cost‑focused approaches phase spending to protect your bottom line. \n Features are fluid: When scope can stretch or shrink, iterative frameworks let you reprioritize and deliver in bite‑sized increments." },
  
  { factor: "Workflow Flexibility", options: ["Structured", "Flexible"], tooltip: "Structured: Gate‑driven processes with fixed phases. Unplanned tasks—like a compliance audit—require formal change controls and plan revisions. Selecting this ensures we recommend frameworks built for rigor and tight control.\n Flexible: Pull‑based systems with open backlogs. Ad‑hoc work—such as urgent menu tweaks—slots in seamlessly without derailing progress. Selecting this ensures we recommend flow‑based frameworks optimized for adaptability and rapid response." },
  
  { factor: "Regulations", options: ["Yes", "No"], tooltip: "Yes: For work needing regular audits, sign‑offs, and strict adherence to standards—like food‑safety inspections or data‑privacy reviews—we’ll recommend frameworks with built‑in checkpoints, documentation, and governance gates.\n No: For less regulated initiatives, you can lean on streamlined methodologies that minimize paperwork and overhead while maximizing speed and flexibility." },
  
  { factor: "Use of Tools", options: ["Yes or Open to Use", "No"], tooltip: "Clarifying your openness to digital tracking ensures recommendations match your team’s workflow:\n Yes: Teams using backlogs, Kanban or sprint boards, and burndown/burnup charts can leverage tool‑centric frameworks like Scrum, SAFe, or LeSS for maximum visibility and metrics.\n No: If you rely on manual or low‑tech tracking—whiteboards, simple checklists or spreadsheets—we’ll recommend frameworks that thrive without specialized apps." }
];

export default function FrameworkRecommender() {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useState("");
  const [copied, setCopied] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);
  const currentIndex = Object.keys(answers).length;

const handleCopy = () => {
  navigator.clipboard.writeText(userId);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

  const handleChange = (factor, value) => {
    setAnswers({ ...answers, [factor]: value });
  };

  const goBack = () => {
    const updated = { ...answers };
    delete updated[frameworkData[currentIndex - 1].factor];
    setAnswers(updated);
    setShowResults(false);
  };

  const clearForm = () => {
    setAnswers({});
    setResults([]);
    setUserId("");
    setShowResults(false);
    setLoading(false);
  };

  const calculateRecommendation = () => {
    if (currentIndex !== frameworkData.length) return;
    setLoading(true);
    setShowResults(false);
    fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers })
    })
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setLoading(false);
          setShowResults(true);
          setResults(data.recommendations);
          setUserId(data.userId); // ✅ Capture ID from response
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });

          // Save to backend and get UID
          fetch("http://localhost:5000/save-result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recommendations: data.recommendations })
          })
          .then(res => res.json())
          .then(saveRes => {
            setUserId(saveRes.id);
          })
          .catch(() => console.error("Could not save results"));
        }, 2000);
      })
      .catch(() => {
        setLoading(false);
        alert("Could not fetch recommendation.");
      });
  };

  const question = frameworkData[currentIndex];

  return (
    <div className="recommender-bg">
      <h1 className="text-4xl font-bold text-white text-center mb-10">SelectSmart Framework Recommender</h1>

      {/* Question Block */}
      {!loading && !showResults && (
        <div className="question-slide">
          <div className="question-card relative">
            {question ? (
              <>
                {question.tooltip && (
                  <div className="tooltip-container absolute top-4 right-4">
                    <span className="tooltip-icon">?</span>
                    <div className="tooltip-text">
                      <strong>{question.factor}:</strong>{"\n"}{question.tooltip}
                    </div>
                  </div>
                )}

                <h2 className="text-white text-xl font-semibold text-center mb-6">{question.factor}</h2>
                <select
                  value={answers[question.factor] || ""}
                  onChange={(e) => handleChange(question.factor, e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  {question.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </>
            ) : (
              <p className="text-center text-white">All questions answered.</p>
            )}

            {currentIndex > 0 && (
              <div className="back-button" onClick={goBack}>← Go Back</div>
            )}

            <div className="button-group">
              <button
                onClick={calculateRecommendation}
                disabled={currentIndex !== frameworkData.length}
                className="bg-[#8c5eff] hover:bg-[#a07eff] px-4 py-2 rounded text-white w-1/2"
              >
                Get Recommendations
              </button>
              <button
                onClick={clearForm}
                className="bg-[#ec4899] hover:bg-[#f472b6] px-4 py-2 rounded text-white w-1/2"
              >
                Clear Selections
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Turtle */}
      {loading && (
        <div className="mt-12 w-full max-w-2xl flex flex-col items-center">
          <div className="relative w-full h-16 bg-gray-300 rounded-full overflow-hidden mb-4">
            <div className="absolute top-0 left-0 h-full bg-green-400 rounded-full animate-progressFill" />
            <img
              src="/turtle.gif"
              alt="Turtle"
              className="absolute top-1 left-0 w-16 h-auto animate-turtleMove z-10"
            />
          </div>
          <p className="text-gray-300">Analyzing your inputs...</p>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div ref={resultsRef} className="w-full max-w-2xl mt-12 bg-[#f0e6ff] text-black rounded-xl p-6">
          {userId && (
            <div className="mb-4 p-4 bg-white rounded shadow">
              <strong>Your Identifier:</strong>{" "}
              <span className="text-purple-700">{userId}</span><br />
              Save this ID to retrieve your results later.
            </div>
          )}

          <h2 className="text-2xl font-bold mb-3">Your Inputs</h2>
          {userId && (
            <div className="mb-4 text-sm text-gray-800 flex items-center gap-2">
              <span><strong>Your ID:</strong> <code>{userId}</code></span>
              <button
                onClick={handleCopy}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-xs"
              >
                Copy
              </button>
              {copied && <span className="text-green-600">Copied!</span>}
            </div>
          )}
          <ul className="list-disc ml-6 mb-6">
            {Object.entries(answers).map(([factor, value]) => (
              <li key={factor}><strong>{factor}:</strong> {value}</li>
            ))}
          </ul>

          <ol className="list-decimal ml-6 space-y-6">
            {results.map(fw => (
              <li key={fw} className="break-words">
                <div className="font-bold">{fw}</div>
                <div className="text-sm break-words whitespace-pre-wrap">
                  {frameworkInfo[fw]?.description || "No description available."}
                </div>
                <a
                  href={frameworkInfo[fw]?.link || "#"}
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
    </div>
  );
}