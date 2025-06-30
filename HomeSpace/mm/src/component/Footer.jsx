import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Description */}
        <div className="footer-section footer-branding">
          <h2 className="brand">Home Space</h2>
          <p>Your trusted partner in finding the perfect home. Browse, discover, and connect with top agents.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/PropertyList">Properties</Link></li>
            <li><Link to="/terms">Terms & Privacy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section footer-contact">
  <h3>Contact Info</h3>
  <a
      href="https://www.google.com/maps/place/123+Main+Street,+Your+City,+Country"
      target="_blank"
      rel="noopener noreferrer"
    >
      123 Main Street, Your City, Country
    </a>
  <p>
    Email: <a href="mailto:info@homespace.com">info@homespace.com</a>
  </p>
  <p>Phone: +1 (555) 123-4567</p>
</div>


        {/* Newsletter */}
        {/* <div className="footer-section footer-newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to get latest updates and offers.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thanks for subscribing!');
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              aria-label="Email for newsletter subscription"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div> */}
      </div>

      {/* Bottom copyright and social */}
      <div className="footer-bottom">
  <p>© {new Date().getFullYear()} Home Space. All rights reserved.</p>
  <div className="social-icons">
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Facebook"
    >
      <FaFacebookF />
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Twitter"
    >
      <FaTwitter />
    </a>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram"
    >
      <FaInstagram />
    </a>
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn"
    >
      <FaLinkedinIn />
    </a>
  </div>
</div>
      
    </footer>
  );
};

export default Footer;
