import React from "react";
import "../styles/faq.css";
import "../styles/Recommender.css";
import Footer from "../components/Footer";

export default function FAQPage() {
  return (
    <>
      <div className="faq-wrapper">
        <h1 className="faq-heading">How to Use the Recommender</h1>
        <div className="faq-card">
          <ol className="faq-steps">
            <li>
              Go to the Recommender section and begin answering questions.
              <img src="/Faq/faq1.png" alt="Step 1" className="faq-image" />
            </li>
            <li>
              This step is completely optional; skip it if you don't not want to share the project name and email.
              <img src="/Faq/faq2.png" alt="Step 2" className="faq-image" />
            </li>
            <li>
              Hover over the grey ? icon next to any prompt to open a tooltip. Each tooltip explains why the question matters to framework selection, and how to choose the right option!
              <img src="/Faq/faq3.png" alt="Step 3" className="faq-image" />
            </li>
            <li>
              Choose the option that best fits your project from the dropdown.
              Some questions include “I don’t know” when a reliable answer may not be available. Use it sparingly! It lets the wizard fill gaps but may reduce recommendation precision.
              <img src="/Faq/faq4.png" alt="Step 4" className="faq-image" />
            </li>
            <li>
              Changed your mind? Click Go Back to return to the previous question, adjust your response, and continue forward without losing progress.
              <img src="/Faq/faq5.png" alt="Step 5" className="faq-image" />
            </li>
            <li>
              After the final question, click Get Recommendations. The wizard analyses your inputs, as testudo walks you to the results screen.
              <img src="/Faq/faq6.png" alt="Step 6" className="faq-image" />
            </li>
            <li>
              At the top of the results page you’ll see a unique code. Copy it to save the information, this is the only way to reopen these exact results later.
              <img src="/Faq/faq7.png" alt="Step 7" className="faq-image" />
            </li>
            <li>
              To your left - A concise recap of every answer you provided for easy reference.
              To your Right – Your Top 3 Frameworks
              For each recommended framework you’ll find:
              - A short summary of its strengths.
              - A “Get Started” link to guides.
              - When applicable, a sample Trello board link so you can get started quickly!
              <img src="/Faq/faq8.png" alt="Step 8" className="faq-image" />
            </li>
            <li>
              Return to Results › Retrieve, paste your unique code, and your full recommendation set reappears instantly!
              <img src="/Faq/faq9.png" alt="Step 9" className="faq-image" />
            </li>
          </ol>
        </div>
      </div>
      <Footer />
    </>
  );
}
