import React from 'react'; 

const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-content" style={{gap: "100px" }}>
          <div className="footer-column" id="about">
            <h3>About Us</h3>
            <p style={{ textAlign: "justify" }}>
              Mirror Me Salon is dedicated to bringing out the elegance in every client.
              We specialize in professional hair styling, skin care, and beauty treatments,
              delivering a luxurious experience with a personal touch.
            </p>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li>Address: 123 Elegance Street, Colombo, Sri Lanka</li>
              <li>Phone: +94 77 123 4567</li>
              <li>Email: info@mirrormesalon.com</li>
              <li>Website: www.mirrormesalon.com</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Open Hours</h3>
            <ul>
              <li>Weekdays: 9:00 AM – 6:00 PM</li>
              <li>Weekends: 9:00 AM – 7:00 PM</li>
              
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