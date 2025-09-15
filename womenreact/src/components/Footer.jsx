import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>SafeHer</h3>
          <p>Empowering women with safety resources, emergency tools, and community support.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/emergency">Emergency</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Safety Tools</h4>
          <ul>
            <li><a href="/self-defense">Self Defense</a></li>
            <li><a href="/workshop">Workshops</a></li>
            <li><a href="/downloads">Downloads</a></li>
            <li><a href="/quiz">Safety Quiz</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} SafeHer | Women's Safety Awareness Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;