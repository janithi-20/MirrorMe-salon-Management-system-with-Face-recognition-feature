import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import '../App.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="logo">Mirror Me</Link>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><Link to="/services">Services</Link></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#products">Product</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <Link to="/booking" className="btn btn-secondary">Book Now</Link>
            </li>
            <li>
              <Link to="/login" className="btn btn-icon">
                <FiLogIn style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
