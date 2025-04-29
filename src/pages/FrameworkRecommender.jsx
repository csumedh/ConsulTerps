import React, { useState, useRef } from "react";
import "../App.css";
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


// Mapping for descriptions and links
const frameworkInfo = {
  Scrum: {
    description: "Scrum is one of the most widely used Agile frameworks, known for its sprint-based structure, fixed roles (Scrum Master, Product Owner, Developers), and emphasis on iterative delivery. It is highly effective for fast-paced product development projects where requirements evolve rapidly and quick feedback loops are essential. Based on your decision weights, Scrum is best suited for small, cross-functional teams that can deliver weekly, prefer flexible workflows, and prioritize scope as the most adjustable constraint. It thrives in non-regulated environments and integrates seamlessly with modern tools like Jira and Trello. -Scrum is great for startups or small dev teams building apps, software features, or prototypes. -Choose Scrum when teamwork, feedback, and speed matter more than long-term forecasting.",
    link: "https://www.scrum.org/"
  },
  Kanban: {
    description: "Kanban is a visual workflow management system designed to optimize continuous delivery without imposing iterations or specific roles. It’s great for operations, service teams, or teams looking to evolve their workflow organically. Your decision weights show that Kanban fits small, cross-functional teams delivering daily, who need flexible, visual workflows, and operate in non-regulated environments. It’s especially effective when schedule flexibility is key and tools like Trello or Jira are already in place. -Use Kanban for DevOps, customer support, marketing campaigns, or any team handling frequent task inflow. -Choose Kanban when flow efficiency and work-in-progress visibility matter most.",
    link: "https://kanbanize.com/kanban-resources/getting-started/what-is-kanban"
  },
  SAFe: {
    description: "SAFe is a structured Agile framework tailored for large enterprises needing to scale Agile across multiple teams and departments. It introduces roles like Release Train Engineers and aligns team execution with business strategy. According to your model, SAFe fits large, cross-functional teams in regulated industries (e.g., healthcare, finance) that deliver weekly or monthly and require both governance and agility. It supports flexible changes, focuses on scope management, and is ideal when tools are already in use for coordination and tracking. -SAFe is ideal for digital transformation efforts or enterprise-wide software development. -Choose SAFe if multiple teams need to align under shared planning and delivery cycles.",
    link: "https://scaledagileframework.com/"
  },
  "Six Sigma": {
    description: "Six Sigma is a process improvement methodology that aims to reduce defects and enhance quality through data-driven decisions, often applied in manufacturing, logistics, and healthcare. It’s more analytical than iterative, emphasizing statistical control rather than adaptability. Your weights suggest Six Sigma is best for large teams in highly regulated industries where budget is the primary constraint, deliverables are often on demand, and the environment is structured and inflexible. -Six Sigma is most effective in environments where precision, efficiency, and quality are top priorities. -Choose Six Sigma for stable processes needing optimization—not rapidly changing product builds.",
    link: "https://www.isixsigma.com/"
  },
  "PRINCE2": {
    description: "PRINCE2 is a governance-focused project management methodology originating in the UK government sector. It breaks projects into controlled stages and is known for its rigor, documentation, and role clarity. Based on your scoring, PRINCE2 works best for large, non-cross-functional teams delivering on a weekly cadence in regulated environments. It favors rigid planning, prioritizes budget control, and suits teams using tracking tools where visibility and compliance are critical. -Use PRINCE2 for infrastructure, policy, or government-funded projects where audits are likely. -Choose this framework when you need structure, accountability, and clearly assigned roles.",
    link: "https://www.axelos.com/best-practice-solutions/prince2"
  },
  "Stage-Gate": {
    description: "Stage-Gate is a phase-based approach to product development commonly used in industries like pharmaceuticals and hardware engineering. Projects pass through predefined gates where continuation is reviewed based on business case alignment. According to your analysis, Stage-Gate is ideal for large, structured teams in regulated industries, delivering monthly with limited flexibility. It’s especially suited for organizations prioritizing budget control, formal checkpoints, and senior-level oversight. -Stage-Gate works best for R&D and innovation projects requiring multiple internal reviews. -Choose Stage-Gate when decisions need executive approval before progressing.",
    link: "https://www.stage-gate.com/"
  },
  LeSS: {
    description: "LeSS is a minimal extension of Scrum for scaling across multiple teams working on the same product. It maintains Agile values while simplifying coordination between teams. Based on your scoring logic, LeSS is most appropriate for medium-sized, cross-functional teams delivering weekly in non-regulated, product-focused settings. It allows some flexibility, favors scope adjustability, and works well when multiple Scrum teams need to align with minimal process overhead. -LeSS is excellent for scaling product teams without heavy governance or complex process layers. -Choose LeSS when your teams already use Scrum but now need to coordinate more closely.",
    link: "https://less.works/"
  },
  Waterfall: {
    description: "Waterfall is a traditional, linear project management methodology where each phase—requirements, design, development, testing—must be completed before moving to the next. It’s best suited for projects with fixed scope and minimal expected change. According to your weights, Waterfall is ideal for medium-sized teams operating in regulated sectors with a monthly deliverable cycle, low flexibility, structured workflows, and strong emphasis on budget control. -Waterfall fits well in civil engineering, defense, and regulated manufacturing. -Choose Waterfall if you need high predictability, heavy documentation, and sequential sign-offs.",
    link: "https://www.atlassian.com/agile/project-management/waterfall"
  },
  "Disciplined Agile": {
    description: "Disciplined Agile is a flexible process decision toolkit that blends strategies from multiple Agile approaches (Scrum, Kanban, SAFe, XP) and helps organizations define their own 'Way of Working' (WoW). Your data suggests DA suits small teams working on process improvement or product dev, delivering daily, with schedule flexibility, and working in moderately regulated environments. It's ideal for organizations that want to apply Agile principles but also require guidance on tailoring their approach across business functions. -DA is especially useful in enterprise settings moving from chaos to guided agility. -Choose DA when you need structured choices rather than one prescribed method.",
    link: "https://www.pmi.org/disciplined-agile"
  },
  Crystal: {
    description: "Crystal is an Agile family that prioritizes people, communication, and team context over rigid processes. It adapts based on team size and criticality, with the goal of minimizing process overhead. Based on your weights, Crystal fits small, cross-functional teams working on product development with daily deliveries, high flexibility, and no regulatory constraints. It’s perfect for creative environments or startups where lightweight practices and team trust are more valuable than documentation and structure. -Crystal excels in face-to-face environments where close collaboration and rapid iteration are key. -Choose Crystal if your team values adaptability, low process friction, and fast decision-making.",
    link: "https://agilemanifesto.org/"
  }
};

export default function FrameworkRecommender() {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);
  const currentIndex = Object.keys(answers).length;

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
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
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
          <div className="question-card">
            {question ? (
              <>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h2 className="text-white">{question.factor}</h2>
                  {/* Tooltip next to question */}
                  {question.tooltip && (
                    <div className="relative group flex items-center">
                    <span className="text-white cursor-pointer text-sm bg-gray-600 px-2 py-1 rounded hover:bg-gray-700">
                      What this means
                    </span>
                    <div className="absolute left transform -translate-x-1/2 mt-2 w-72 p-3 rounded-md bg-gray-800 text-white text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 whitespace-pre-line">
                      <strong>{question.factor}:</strong> {question.tooltip}
                    </div>
                  </div>
                  )}
                </div>

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
          <h2 className="text-2xl font-bold mb-3">Your Inputs</h2>
          <ul className="list-disc ml-6 mb-6">
            {Object.entries(answers).map(([factor, value]) => (
              <li key={factor}><strong>{factor}:</strong> {value}</li>
            ))}
          </ul>

          <ol className="list-decimal ml-6 space-y-6">
            {results.map(fw => (
              <li key={fw} className="break-words">
                <div className="font-bold">{fw}</div>
                <div className="text-sm break-words whitespace-pre-wrap">{frameworkInfo[fw]?.description || "No description available."}</div>
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