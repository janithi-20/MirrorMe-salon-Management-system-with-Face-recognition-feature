import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>SalonPro</h3>
            <p>The complete salon management solution for businesses of all sizes.</p>
          </div>
          <div className="footer-column">
            <h3>Product</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#demo">Demo</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SalonPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
