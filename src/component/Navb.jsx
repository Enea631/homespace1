import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navb.scss';


const Navb = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close menu when clicking a link (optional)
  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeNav}>
        <img src="http://localhost:5000/images/unnamed.jpg" alt="HomeSpace Logo" className="logo-img" />
      </Link>

      <div className="brand-text">Your Dream, Your Doorstep.</div>

      {/* Hamburger Button */}
      <button
        className={`hamburger ${isNavOpen ? 'toggle' : ''}`}
        onClick={toggleNav}
        aria-label="Toggle navigation menu"
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${isNavOpen ? 'nav-active' : ''}`}>
        <Link to="/" onClick={closeNav}>Home</Link>
        <Link to="/PropertyList" onClick={closeNav}>Properties</Link>
        <Link to="/about" onClick={closeNav}>About</Link>
        <Link to="/contact" onClick={closeNav}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navb;
