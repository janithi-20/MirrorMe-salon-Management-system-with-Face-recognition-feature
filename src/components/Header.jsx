import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

const Header = () => {
  return (
    <header>
      <div className="container header-container">
        <Link to="/" className="logo">Mirror Me</Link>
        <nav>
          <ul>
            <li><a href="#features">Home</a></li>
            <li><a href="#testimonials">About</a></li>
            <li><a href="#pricing">Services</a></li>
            <li><a href="#contact">Team</a></li>
            <li><a href="#contact">Product</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/booking" className="btn btn-secondary">Book Now</Link></li>
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
