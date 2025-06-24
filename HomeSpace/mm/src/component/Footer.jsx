import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        <span className="brand">Home Space</span> © {new Date().getFullYear()}. All rights reserved.
      </p>
      <a href="/terms" className="footer-terms">
        Terms & Privacy
      </a>
    </footer>
  );
};

export default Footer;
