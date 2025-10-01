import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer id="about" className="site-footer">
      <div id="contact" className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>About Us</h3>
            <p>Mirror Me Salon is dedicated to bringing out the elegance in every client.
               We specialize in professional hair styling, skin care, and beauty treatments,
               delivering a luxurious experience with a personal touch.</p>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li><a href="#blog">📍 Address: 123 Elegance Street, Colombo, Sri Lanka</a></li>
              <li><a href="#help">📞 Phone: +94 77 123 4567</a></li>
              <li><a href="#support">📧 Email: info@mirrormesalon.com</a></li>
               <li><a href="#support">🌐 Website: www.mirrormesalon.com</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Open Hours</h3>
            <ul>
              <li><a href="#about">Monday: 9:00 AM – 7:00 PM</a></li>

               <li><a href="#about">Tuesday: 9:00 AM – 7:00 PM</a></li>    

               <li><a href="#about">Wednesday: 9:00 AM – 7:00 PM
</a></li>    
                <li><a href="#about">Thursday: 9:00 AM – 7:00 PM</a></li>    

                <li><a href="#about">Friday: 9:00 AM – 7:00 PM</a></li>    

                 <li><a href="#about">Saturday: 9:00 AM – 6:00 PM
</a></li>   
                  <li><a href="#about">Sunday: 9:00 AM – 6:00 PM
              </a></li>  
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
