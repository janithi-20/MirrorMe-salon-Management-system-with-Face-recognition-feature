/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import '../App.css';

const Header = () => {
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="logo" style={{ fontWeight: 700, fontSize: 20 }}>
          Mirror Me
        </Link>

        <nav>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><a href="#about">About</a></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><a href="#feedback">Feedback</a></li>
            <li><a href="#brands">Brands</a></li>
            <li><a href="#contact">Contact</a></li>
            {/* Book Now removed per request */}

            <li className="login-dropdown">
              <button
                className="btn btn-icon dropdown-toggle"
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
              >
                <FiLogIn style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Login
              </button>
              {isLoginDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/login" className="dropdown-item">Admin</Link>
                  <Link to="/login" className="dropdown-item">Customer</Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
/* eslint-enable */
