import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Alumni Association</Link>
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/contact">Contact Us</Link>
       
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776; 
      </div>
    </nav>
  );
};

export default Navbar;
