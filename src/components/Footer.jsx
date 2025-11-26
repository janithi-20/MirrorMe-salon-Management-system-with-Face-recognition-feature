import React, { useState, useEffect } from 'react'; 

const Footer = () => {
  const [settings, setSettings] = useState({
    businessHours: {
      weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
      weekends: 'Saturday - Sunday: 9:00 AM - 7:00 PM'
    },
    contact: {
      phone: '+94 77 123 4567',
      email: 'info@mirrormesalon.com',
      address: '123 Elegance Street, Colombo, Sri Lanka',
      website: 'www.mirrormesalon.com'
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/settings');
      const data = await response.json();
      
      if (data.success) {
        // Transform API response to simple key-value structure
        const transformedSettings = {};
        
        // Transform businessHours
        if (data.data.businessHours) {
          transformedSettings.businessHours = {};
          Object.keys(data.data.businessHours).forEach(key => {
            transformedSettings.businessHours[key] = data.data.businessHours[key].value;
          });
        }
        
        // Transform contact
        if (data.data.contact) {
          transformedSettings.contact = {};
          Object.keys(data.data.contact).forEach(key => {
            transformedSettings.contact[key] = data.data.contact[key].value;
          });
        }
        
        setSettings(prev => ({ ...prev, ...transformedSettings }));
        console.log('✅ Footer settings loaded from API');
      }
    } catch (error) {
      console.error('❌ Error loading footer settings:', error);
      // Keep default values if API fails
    }
  };

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
              <li>Address: {settings.contact?.address || '123 Elegance Street, Colombo, Sri Lanka'}</li>
              <li>Phone: {settings.contact?.phone || '+94 77 123 4567'}</li>
              <li>Email: {settings.contact?.email || 'info@mirrormesalon.com'}</li>
              <li>Website: {settings.contact?.website || 'www.mirrormesalon.com'}</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Open Hours</h3>
            <ul>
              <li>Weekdays: {settings.businessHours?.weekdays ? settings.businessHours.weekdays.replace('Monday - Friday: ', '') : '9:00 AM – 6:00 PM'}</li>
              <li>Weekends: {settings.businessHours?.weekends ? settings.businessHours.weekends.replace('Saturday - Sunday: ', '') : '9:00 AM – 7:00 PM'}</li>
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