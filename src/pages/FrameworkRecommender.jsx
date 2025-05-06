import React, { useState, useRef } from "react";
import "../App.css";
import frameworkInfo from "../data/frameworkInfo";
import "../styles/Recommender.css";
import "../styles/Results.css";
import Footer from "../components/Footer";

const frameworkData = [
  { factor: "Team Size", options: ["Small (<10 people)", "Medium (11-50 people)", "Medium to Large (50-100)", "Large (100- 250 people)", "Enterprise Level (250+)"], tooltip: "Clarifying your team size helps us recommend a project approach tailored to your communication and coordination style. How is your team currently structured—do you operate as a smaller, agile group emphasizing flexibility, a medium-sized team balancing agility with formal roles, or a larger team with clearly defined roles and structured communication?" },
  
  { factor: "Cross-functional Teams", options: ["Yes", "No", "I Dont Know"], tooltip: "Choose Yes if each team is a blend of multiple divisions working together end to end. Choose No if tasks are owned by specialist departments and work is handed off from one team to another. This lets us suggest frameworks that fit your team structure: collaboration-heavy methods for integrated teams, or clearer boundary methods for specialized teams." },
  
  { factor: "Deliverable Frequency", options: ["Daily", "Weekly", "Monthly", "On Demand", "I Dont Know"], tooltip: "Letting us know your deliverable frequency helps match recommendations to your operational rhythm. How often does your team currently deliver key outputs? Daily: Quick updates or urgent fixes Weekly: Regular promotions or frequent updates Monthly: Structured releases such as menu changes or training sessions On Demand: Event-based launches or seasonal campaigns" },
  
  { factor: "Flexibility of Changes", options: ["Rigid", "Somewhat Flexible", "Flexible", "I Dont Know"], tooltip: "Understanding how flexible your project framework should be helps us recommend the best fit for managing change during your project. How moldable do you want your approach to be? Rigid: Minimal changes after initial planning, suited for predictable or compliance-focused projects. Somewhat Flexible: Allows occasional adjustments at predefined checkpoints, ideal for structured campaigns or seasonal rollouts. Flexible: Supports continuous changes, best for rapidly evolving projects like digital innovation or operational improvements." },
  
  { factor: "Stakeholder Interaction", options: ["Daily or continuous feedback", "Weekly updates", "Only at key milestones", "After project completion", "I Dont Know/ Other"], tooltip: "Knowing how often stakeholders are involved helps us recommend a framework tailored to your communication style. How frequently does your team interact with stakeholders? Daily or continuous: Frequent feedback and rapid input. Weekly: Regular updates and scheduled check-ins. Only at key milestones: Important checkpoints or major deliverables. After project completion: Minimal engagement until final delivery." },
  
  { factor: "Triple Constraint Priority", options: ["Schedule", "Budget", "Scope", "I Dont Know"], tooltip: "Your project is a tripod standing on the constraints of budget, scope and shcedule, selecting which leg can be bent most easily can help recommend a more fitting framework: Schedule: Select this if your timeline can shift, but scope and budget are locked. When schedule is flexible, rolling-wave planning lets you refine upcoming milestones while keeping overall delivery on track. Budget: Choose this when funding can rise or fall, while timeline and scope remain steady. When budgets fluctuate, phased cycles help you redistribute resources and maintain progress. Scope: Pick this if you can add or trim features to hit fixed targets on time or cost. When scope can stretch or shrink, iterative frameworks let you reprioritize and deliver in bite-sized increments." },
  
  { factor: "Workflow Flexibility", options: ["Structured", "Flexible", "I Dont Know"], tooltip: "Knowing your level of workflow flexibility helps us suggest frameworks suited to your team's handling of unplanned tasks. How frequently does your team handle unexpected or variable work? Structured: Tasks rarely change; formal approvals required for unexpected work. Flexible: Tasks frequently change; easily accommodates urgent or ad-hoc requests." },

  { factor: "Regulations", options: ["Yes", "No"], tooltip: "Knowing your regulatory environment helps us recommend a framework suited to your compliance and documentation needs. Does your work involve strict regulatory oversight? Yes: Frequent audits, approvals, and detailed documentation required. No: Minimal oversight, emphasizing speed, flexibility, and streamlined processes." },
  
  { factor: "Use of Tools", options: ["Yes or Open to Use", "No", "I Dont Know"], tooltip: "Knowing if your team uses digital tracking helps us suggest frameworks that align with your current methods. Do you currently track tasks digitally? Yes: Regular use of digital tools like Kanban boards, sprint trackers, or task management apps. No: Primarily manual tracking methods like whiteboards, physical checklists, or paper-based systems." },
];

export default function FrameworkRecommender() {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useState("");
  const [copied, setCopied] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);
  const currentIndex = Object.keys(answers).length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userId || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Copy to clipboard failed.");
    }
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
            body: JSON.stringify({
              recommendations: data.recommendations,
              name: projectName,
              email
            })
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
            <div className="recommender-input-wrapper">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Optional: Project Name"
                className="recommender-input"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Optional: Email"
                className="recommender-input"
              />
            </div>
            <div className="button-group">
            <button
              onClick={calculateRecommendation}
              disabled={currentIndex !== frameworkData.length}
              className="custom-button"
            >
              Get Recommendations
            </button>

            <button
              onClick={clearForm}
              className="custom-button"
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
    <>
      <div ref={resultsRef} className="results-container">
        {userId && (
          <div className="id-box">
            <div>
              <strong>Your ID:</strong> <code>{userId}</code>
            </div>
            <button onClick={handleCopy} className="copy-button">
              {copied ? "Copied!" : "Copy"}
            </button>
            <div className="save-message">
              📌 Save this ID to revisit your results later.
            </div>
          </div>
        )}

        <div className="results-boxes">
          <div className="input-box">
            <h3>Your Inputs</h3>
            <ul>
              {Object.entries(answers).map(([factor, value]) => (
                <li key={factor}>
                  <strong>{factor}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="recommendation-box">
            <h3>Top 3 Frameworks</h3>
            <div className="framework-grid">
              {results.map((fw) => (
                <div key={fw} className="framework-card">
                  <div className="font-bold text-lg mb-1">{fw}</div>
                  <div className="text-sm whitespace-pre-wrap mb-2">
                    {frameworkInfo[fw]?.description || "No description available."}
                  </div>
                  {frameworkInfo[fw]?.getStarted && (
                    <a
                      href={frameworkInfo[fw].getStarted}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get Started →
                    </a>
                  )}
                  {frameworkInfo[fw]?.learnMore && (
                    <a
                      href={frameworkInfo[fw].learnMore}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
    )}
  </div>
); 
}