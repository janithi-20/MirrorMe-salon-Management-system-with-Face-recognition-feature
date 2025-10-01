import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiChevronDown } from 'react-icons/fi';
import '../App.css';

const Header = () => {
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/images/logo.jpg" alt="Mirror Me logo" className="logo-image" />
        </Link>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><Link to="/services">Services</Link></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#Feedback">Feedback</a></li>
            <li><a href="#brands">Brands</a></li>
            <li><a href="#contact">Contact</a></li>

            <li>
              <Link to="/booking" className="btn btn-secondary">Book Now</Link>
            </li>
            <li className="login-dropdown">
              <button 
                className="btn btn-icon dropdown-toggle"
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
              >
                <FiLogIn style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Login
                <FiChevronDown style={{ verticalAlign: 'middle', marginLeft: 6 }} />
              </button>
              {isLoginDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/login" className="dropdown-item">
                    Admin
                  </Link>
                  <Link to="/login" className="dropdown-item">
                    Customer
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );

import React from 'react';
import '../App.css';

const Header = () => {
	return (
		<header className="site-header">
			<div className="container header-container">
				<a href="/" className="logo">Mirror Me</a>
				<nav>
					<ul>
						<li><a href="#features">Home</a></li>
						<li><a href="#testimonials">About</a></li>
						<li><a href="#pricing">Services</a></li>
						<li><a href="#contact">Team</a></li>
						<li><a href="#contact">Product</a></li>
						<li><a href="#contact">Contact</a></li>
						<li><a href="/login" className="btn btn-secondary">Book Now</a></li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
