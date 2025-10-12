/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiLogOut, FiBell } from 'react-icons/fi';
import '../App.css';

const Header = () => {
  // single admin panel link (no dropdown)
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const checkAuthStatus = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const customer = localStorage.getItem('customer');
    
    if (token || customer) {
      setIsLoggedIn(true);
      
      // Get user name from stored customer data
      if (customer) {
        try {
          const customerData = JSON.parse(customer);
          const fullName = `${customerData.firstName || ''} ${customerData.lastName || ''}`.trim();
          setUserName(fullName || customerData.email || 'User');
        } catch (e) {
          setUserName('User');
        }
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  useEffect(() => {
    // Initial check
    checkAuthStatus();
    
    // Listen for login events
    window.addEventListener('userLoggedIn', checkAuthStatus);
    
    // Cleanup
    return () => {
      window.removeEventListener('userLoggedIn', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    sessionStorage.removeItem('customerId');
    
    // Update state
    setIsLoggedIn(false);
    setUserName('');
    
    // Redirect to home page
    navigate('/');
    
    // Show confirmation
    alert('You have been logged out successfully!');
  };

  const handleSmoothScroll = (targetId) => {
    // Check if we're on the home page
    if (window.location.pathname !== '/') {
      // If not on home page, navigate to home first, then scroll
      navigate('/', { replace: true });
      // Use setTimeout to allow navigation to complete
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    } else {
      // If already on home page, scroll directly
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="/salon logo.jpg"
            alt="Salon Logo"
            className="logo-img"
            style={{ height: 40, objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}>Mirror Me</span>
        </Link>

        <nav>
             <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li>
              <button 
                onClick={() => handleSmoothScroll('about')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: 'inherit',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  padding: 0
                }}
              >
                About
              </button>
            </li>
            <li><Link to="/team">Our Team</Link></li>
            <li>
              <button 
                onClick={() => handleSmoothScroll('brands')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: 'inherit',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  padding: 0
                }}
              >
                Brands
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleSmoothScroll('contact')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: 'inherit',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  padding: 0
                }}
              >
                Contact
              </button>
            </li>

            <li><Link to="/admin">Admin Panel</Link></li>
            

            {/* Book Now removed per request */}

            {/* Conditional Login/Logout button */}
            {isLoggedIn ? (
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#fff', fontSize: '14px' }}>Welcome, {userName}!</span>
                <button 
                  onClick={handleLogout}
                  className="btn btn-icon btn-secondary" 
                  style={{ padding: '8px 12px', color: 'white' }}
                >
                  <FiLogOut style={{ verticalAlign: 'middle', marginRight: 6, color: 'white' }} />
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="btn btn-icon btn-secondary" style={{ padding: '8px 12px', color: 'white' }}>
                  <FiLogIn style={{ verticalAlign: 'middle', marginRight: 6, color: 'white' }} />
                  Login
                </Link>
              </li>
            )}
            {/* Notification bell */}
            <li className="nav-notification">
              <div className="bell-wrapper" style={{ position: 'relative' }}>
                <button
                  className="bell-btn"
                  onClick={() => navigate('/notifications')}
                  aria-label="Notifications"
                  style={{ color: 'white' }}
                >
                  <FiBell size={20} style={{ color: 'white' }} />
                  <span className="bell-badge">3</span>
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
