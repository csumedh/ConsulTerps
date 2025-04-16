import React from "react";
import "../styles/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      {/* === Hero Section with Video Background === */}
      <section className="hero-section">
        <video className="bg-video" autoPlay loop muted>
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          {/* Left Side Text */}
          <div className="overlay-left">
            <div className="hero-quote">Your project's a work of art...</div>
            <h1 className="hero-logo-title">SELECTSMART</h1>
            <div className="hero-subtext">by ConsulTerps</div>
          </div>

          {/* Right Side Logo */}
          <img
            src="/logo192.png"
            alt="SelectSmart Logo"
            className="hero-logo"
          />
        </div>
      </section>

      {/* === About Section === */}
      <section className="about-section">
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            At ConsulTerps, we blend creativity and analytics to deliver smart
            project framework recommendations. SelectSmart is your guide to
            choosing the right project methodology.
          </p>
        </div>
        <div className="about-gif">
          <img src="/about-animation.gif" alt="About Animation" />
        </div>
      </section>

      {/* === Team Section === */}
      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {[
            {
              name: "Alice",
              role: "Frontend Developer",
              img: "/team/alice.jpg",
              github: "https://github.com/alice",
              linkedin: "https://linkedin.com/in/alice",
              email: "mailto:alice@example.com",
            },
            {
              name: "Bob",
              role: "Backend Engineer",
              img: "/team/bob.jpg",
              github: "https://github.com/bob",
              linkedin: "https://linkedin.com/in/bob",
              email: "mailto:bob@example.com",
            },
            {
              name: "Carol",
              role: "Designer",
              img: "/team/carol.jpg",
              github: "https://github.com/carol",
              linkedin: "https://linkedin.com/in/carol",
              email: "mailto:carol@example.com",
            },
          ].map((member) => (
            <div className="team-member" key={member.name}>
              <img
                src={member.img}
                alt={member.name}
                className="member-pic"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="social-links">
                <a href={member.github} target="_blank" rel="noreferrer">
                  🐙
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  🔗
                </a>
                <a href={member.email}>✉️</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
