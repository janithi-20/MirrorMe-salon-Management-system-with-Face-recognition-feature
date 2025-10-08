import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiBell } from 'react-icons/fi';
import '../App.css';

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

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
            <li><a href="#about">About</a></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><a href="#brands">Brands</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/admin">Admin Panel</Link></li>
            

            <li>
              <Link to="/login" className="btn btn-icon btn-secondary" style={{ padding: '8px 12px' }}>
                <FiLogIn style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Login
              </Link>
            </li>
            <li className="nav-notification">
              <div className="bell-wrapper" style={{ position: 'relative' }}>
                <button
                  className="bell-btn"
                  onClick={() => setOpen(prev => !prev)}
                  aria-label="Notifications"
                >
                  <FiBell size={20} />
                  <span className="bell-badge">3</span>
                </button>

                {open && (
                  <div className="bell-dropdown" ref={dropdownRef}>
                    <div className="bell-dropdown-header">Notifications</div>
                    <ul className="bell-list">
                      <li className="bell-item">New appointment booked</li>
                      <li className="bell-item">Feedback received</li>
                      <li className="bell-item">New team member added</li>
                    </ul>
                    <div className="bell-footer"><Link to="/notifications">View all</Link></div>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
