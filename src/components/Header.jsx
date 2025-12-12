/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiBell, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Header = () => {
  const navigate = useNavigate();
  const { isAdminAuthenticated, logoutAdmin, logoutUser } = useAuth();

  const [conflictMessage, setConflictMessage] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Listen for booking conflict events
    const conflictHandler = (e) => {
      try {
        const d = e.detail;
        if (!d) {
          setConflictMessage(null);
        } else if (d && d.message) {
          setConflictMessage(d.message);
        } else {
          setConflictMessage(null);
        }
      } catch (err) {
        setConflictMessage(null);
      }
    };
    window.addEventListener('staffBookingConflict', conflictHandler);

    // Listen for customer updates to refresh displayed name
    const customerUpdatedHandler = (e) => {
      try {
        const u = e && e.detail && e.detail.user;
        if (u) {
          const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim();
          setUserName(fullName || u.email || 'User');
          setIsLoggedIn(true);
        } else {
          checkAuthStatus();
        }
      } catch (err) {
        checkAuthStatus();
      }
    };
    window.addEventListener('customerUpdated', customerUpdatedHandler);

    // Cleanup
    return () => {
      window.removeEventListener('userLoggedIn', checkAuthStatus);
      window.removeEventListener('staffBookingConflict', conflictHandler);
      window.removeEventListener('customerUpdated', customerUpdatedHandler);
    };
  }, []);

  const handleLogout = () => {
    // Use AuthContext logout function for proper state management
    logoutUser();
    
    // Clear any additional local storage items
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
    sessionStorage.removeItem('customerId');
    
    // Update local state
    setIsLoggedIn(false);
    setUserName('');
    
    // Redirect to home page
    navigate('/');
    
    // Show confirmation
    alert('You have been logged out successfully!');
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    navigate('/');
    alert('Admin logged out successfully!');
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="/salon-logo.jpg"
            alt="Salon Logo"
            className="logo-img"
            style={{ height: 40, objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}>Mirror Me</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/services" onClick={closeMobileMenu}>Services</Link></li>
            <li>
              <button 
                onClick={() => {
                  handleSmoothScroll('contact');
                  closeMobileMenu();
                }}
                className="nav-link-btn"
              >
                About
              </button>
            </li>
            <li><Link to="/team" onClick={closeMobileMenu}>Our Team</Link></li>
            <li>
              <button 
                onClick={() => {
                  handleSmoothScroll('brands');
                  closeMobileMenu();
                }}
                className="nav-link-btn"
              >
                Brands
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  handleSmoothScroll('contact');
                  closeMobileMenu();
                }}
                className="nav-link-btn"
              >
                Contact
              </button>
            </li>

            {/* Admin Panel link - only show when admin is authenticated */}
            {isAdminAuthenticated && (
              <li><Link to="/admin" onClick={closeMobileMenu}>Admin Panel</Link></li>
            )}

            {/* Admin authentication buttons */}
            {isAdminAuthenticated ? (
              <li>
                <button 
                  onClick={() => {
                    handleAdminLogout();
                    closeMobileMenu();
                  }} 
                  className="btn btn-icon btn-secondary" 
                  style={{ padding: '8px 12px' }}
                >
                  <FiLogOut style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  Admin Logout
                </button>
              </li>
            ) : null}

            {/* Regular user authentication buttons */}
            {isLoggedIn ? (
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => { navigate('/profile'); closeMobileMenu(); }}
                    title="View profile"
                    style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 14, padding: 0 }}
                  >
                    Welcome, {userName}!
                  </button>
                  <button 
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="btn btn-icon btn-secondary" 
                    style={{ padding: '8px 12px', color: 'white' }}
                  >
                    <FiLogOut style={{ verticalAlign: 'middle', marginRight: 6, color: 'white' }} />
                    Logout
                  </button>
                </li>
            ) : (
              <li>
                <Link 
                  to="/login" 
                  className="btn btn-icon btn-secondary" 
                  style={{ padding: '8px 12px', color: 'white' }}
                  onClick={closeMobileMenu}
                >
                  <FiLogIn style={{ verticalAlign: 'middle', marginRight: 6, color: 'white' }} />
                  Login
                </Link>
              </li>
            )}

            {/* Notification bell - only show when user is logged in */}
            {isLoggedIn && (
              <li className="nav-notification">
                <div className="bell-wrapper" style={{ position: 'relative' }}>
                  <button
                    className="bell-btn"
                    onClick={() => {
                      navigate('/notifications');
                      closeMobileMenu();
                    }}
                    aria-label="Notifications"
                    style={{ color: 'white' }}
                  >
                    <FiBell size={20} style={{ color: 'white' }} />
                    <span className="bell-badge">3</span>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>

    {/* Banner placed immediately below the header so it does not overlap header content */}
    {conflictMessage && (
      <div style={{ position: 'fixed', left: 0, right: 0, top: 100, background: '#fff3cd', color: '#856404', padding: '10px 18px', boxSizing: 'border-box', fontSize: 14, textAlign: 'center', zIndex: 200, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <span style={{ marginRight: 8 }}>⚠️</span>
        <span>{conflictMessage}</span>
      </div>
    )}

    </>
  );
};

export default Header;