import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navb.scss";
import { HashLink } from "react-router-hash-link";

const Navb = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    // Close dropdown when nav toggled
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  // Close menu and dropdown when clicking a link
  const closeNav = () => {
    setIsNavOpen(false);
    setIsDropdownOpen(false);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeNav}>
        <img
          src="http://localhost:5000/images/LogoHomeSpace.jpg"
          alt="HomeSpace Logo"
          className="logo-img"
        />
      </Link>

      <div className="brand-text">Your Dream, Your Doorstep.</div>

      {/* Hamburger Button */}
      <button
        className={`hamburger ${isNavOpen ? "toggle" : ""}`}
        onClick={toggleNav}
        aria-label="Toggle navigation menu"
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${isNavOpen ? "nav-active" : ""}`}>
        <Link to="/" onClick={closeNav}>
          Home
        </Link>

        {/* Properties with dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Link
            to="/PropertyList"
            className="dropbtn"
            onClick={closeNav}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            Properties
          </Link>

          <div className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}>
            <HashLink smooth to="/PropertyList#12" onClick={closeNav}>
              For Sale
            </HashLink>
            <HashLink smooth to="/PropertyList#13" onClick={closeNav}>
              For Rent
            </HashLink>
          </div>
        </div>


        <Link to="/about" onClick={closeNav}>
          About
        </Link>
        <Link to="/contact" onClick={closeNav}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navb;
