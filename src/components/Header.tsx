import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isReflectsPage = location.pathname.startsWith('/reflect');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`${isScrolled ? 'scrolled' : ''} ${isReflectsPage ? 'black-bg' : ''}`}
      style={isReflectsPage ? { backgroundColor: '#000000' } : undefined}
    >
      <div className="logo" onClick={() => window.location.href = '/'}>
        <img 
          className="logo-main" 
          src="/images/logo_check2.png" 
          width="150rem" 
          height="50rem" 
          alt="company logo" 
        />
      </div>
      
      {/* Mobile menu toggle button */}
      <div 
        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      >
        <input type="checkbox" className="bar" />
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      {/* Navigation menu */}
      <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <a className="menu-item" href="/" rel="noopener noreferrer">
            Home
          </a>
        </li>
        <li>
          <a className="menu-item" href="/services" rel="noopener noreferrer">
            Products/Services
          </a>
        </li>
        <li>
          <a className="menu-item" href="/about" rel="noopener noreferrer">
            About Us
          </a>
        </li>
        <li>
          <a className="menu-item" href="/reflect" rel="noopener noreferrer">
            Reflect
          </a>
        </li>
        <li>
          <a className="menu-item" href="/contact" rel="noopener noreferrer">
            Contact
          </a>
        </li>
      </ul>

      {/* Contact and social icons */}
      <div className="social-icons">
        <div className="contact">
          <span id="phno-text">Talk To Us</span>
          <br />
          <span id="phno">+1 425-900-9663</span>
        </div>
        <div className="icons">
          <a 
            href="https://www.linkedin.com/company/metricdust/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;