/* eslint-disable */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiBell } from 'react-icons/fi';
import '../App.css';

const Header = () => {
  // single admin panel link (no dropdown)
  const navigate = useNavigate();

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
