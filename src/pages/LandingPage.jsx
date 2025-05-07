import React from "react";
import "../styles/LandingPage.css";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      {/* === Hero Section === */}
      <section className="hero-section">
        <video className="bg-video" autoPlay loop muted>
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay">
          <div className="overlay-left">
            <div className="hero-quote">Your project's a work of art...</div>
            <h1 className="hero-logo-title">SELECTSMART</h1>
            <div className="hero-subtext">by ConsulTerps</div>
          </div>
          <img src="/logo192.png" alt="SelectSmart Logo" className="hero-logo" />
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

        <div className="about-video-centered">
          <iframe
            src="https://www.youtube.com/embed/VExVOi2VF7s"
            title="SelectSmart Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* === Team Section === */}
      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {[
            {
              name: "Sumedh",
              role: "Project Manager",
              img: "/team/bob.jpg",
              github: "https://github.com/csumedh",
              linkedin: "https://www.linkedin.com/in/sumedhchinchmalatpure/",
              email: "mailto:sumedh.chinch@gmail.com",
            },
            {
              name: "Sandra",
              role: "Frontend Developer",
              img: "/team/carol.jpg",
              github: "https://github.com/sstaub1",
              linkedin: "https://www.linkedin.com/in/sandrahartstaub/",
              email: "mailto:sstaub1@umd.edu",
            },
            {
              name: "Anand",
              role: "Backend Developer",
              img: "/team/alice.jpg",
              github: "https://github.com/anandkannappan333",
              linkedin: "https://www.linkedin.com/in/anandkannappan333/",
              email: "mailto:anand333@umd.edu",
            },
            {
              name: "Matthew",
              role: "R&D",
              img: "/team/Matt.jpeg",
              github: "https://github.com/matthewhanstad",
              linkedin: "https://www.linkedin.com/in/matthew-hanstad-547642270/",
              email: "mailto:mhanstad@umd.edu",
            },
            {
              name: "Aishwarya",
              role: "Scrum Master",
              img: "/team/Aish.jpeg",
              github: "https://github.com/AishwaryaL24",
              linkedin: "https://www.linkedin.com/in/aishwaryalandekar/",
              email: "mailto:aishland@umd.edu",
            },
            {
              name: "Deepankar",
              role: "Designer",
              img: "/team/deep.jpeg",
              github: "https://github.com/deepukun79",
              linkedin: "www.linkedin.com/in/deepankar-sengar-056682218",
              email: "mailto:lucky.deepankar@gmail.com",
            },
          ].map((member) => (
            <div className="team-member" key={member.name}>
              <img src={member.img} alt={member.name} className="member-pic" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="social-links">
                <a href={member.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href={member.email} aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
