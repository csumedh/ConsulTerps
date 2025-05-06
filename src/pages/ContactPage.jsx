// src/pages/ContactPage.jsx
import React from "react";
import "../styles/Contact.css";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="contact-wrapper">
      <h1>Contact Us</h1>

      <form
        className="contact-form fade-in"
        action="https://formspree.io/f/mrbqpnpl"  
        method="POST"
      >
        <input
          type="email"
          name="email"
          className="custom-input"
          placeholder="Your email"
          required
        />
        <textarea
          name="message"
          className="custom-input"
          placeholder="Your message"
          rows="5"
          required
        ></textarea>
        <button type="submit" className="custom-button animate-button">
          Send Message
        </button>
      </form>

      <Footer />
    </div>
  );
}
