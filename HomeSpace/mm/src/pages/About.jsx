// src/pages/About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Us</h1>
        <p className="intro">
          At <strong>Home Space</strong>, we believe your next home should be more than just four walls — it should be where life happens.
        </p>

        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            We're committed to connecting buyers and sellers with reliable, transparent, and efficient property solutions.
            Whether you're looking for your forever home, your next investment, or your first apartment, we're here to guide you every step of the way.
          </p>
        </section>

        <section className="why-choose">
          <h2>Why Choose Us?</h2>
          <ul>
            <li><strong>Trusted Agents:</strong> Experienced professionals with local expertise.</li>
            <li><strong>Verified Listings:</strong> What you see is what you get — no surprises.</li>
            <li><strong>Customer Focused:</strong> We listen first, act fast, and stay by your side.</li>
          </ul>
        </section>

        <section className="contact-cta">
          <p>
            Ready to make a move? <a href="/contact">Get in touch</a> — we’d love to hear from you.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
