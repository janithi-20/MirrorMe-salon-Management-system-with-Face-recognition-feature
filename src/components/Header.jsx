/* eslint-disable */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiBell, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Header = () => {
  // single admin panel link (no dropdown)
  const navigate = useNavigate();
  const { isAdminAuthenticated, logoutAdmin } = useAuth();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const handleScrollToSection = (sectionId) => {
    // Check if we're already on the home page
    if (window.location.pathname === '/') {
      // If on home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on a different page, navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
            <li><button className="nav-link-btn" onClick={() => handleScrollToSection('contact')}>About</button></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><button className="nav-link-btn" onClick={() => handleScrollToSection('brands')}>Brands</button></li>
            <li><button className="nav-link-btn" onClick={() => handleScrollToSection('contact')}>Contact</button></li>
            {/* Admin Panel link (shown after Contact) */}
            <li><Link to="/admin">Admin Panel</Link></li>
            

            {/* Book Now removed per request */}

            {/* Show Logout if admin is authenticated, otherwise show Login */}
            {isAdminAuthenticated ? (
              <li>
                <button onClick={handleLogout} className="btn btn-icon btn-secondary" style={{ padding: '8px 12px' }}>
                  <FiLogOut style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="btn btn-icon btn-secondary" style={{ padding: '8px 12px' }}>
                  <FiLogIn style={{ verticalAlign: 'middle', marginRight: 6 }} />
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
                >
                  <FiBell size={20} />
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