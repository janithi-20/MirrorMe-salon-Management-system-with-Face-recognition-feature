import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Mirror Me</h3>
            <p>Your trusted salon for styling, skincare, nails and more.</p>
          </div>

          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              <li><a href="/services">All Services</a></li>
              <li><a href="/booking">Book an Appointment</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Brands</h3>
            <ul>
              <li>KEUNE</li>
              <li>LOREAL</li>
              <li>jEVAL</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mirror Me. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
