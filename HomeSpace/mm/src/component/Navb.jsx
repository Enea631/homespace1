import React from 'react';
import { Link } from 'react-router-dom';
import './Navb.scss';
import logo from '../LogoImg/LogoHomeSpace.jpg';

const Navb = () => {
  return (
    <nav className="navbar">
     
      <Link to="/" className="logo">
        <img src={logo} alt="HomeSpace Logo" className="logo-img" />
      </Link>

     
      <div className="brand-text">Your Dream, Your Doorstep.</div>


      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/PropertyList">Properties</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navb;
