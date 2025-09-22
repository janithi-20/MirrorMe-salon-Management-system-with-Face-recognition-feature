import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <h2>Sign up</h2>
      <form>
        <div className="form-group">
          <label>User Name</label>
          <input type="text" placeholder="Enter your name" required />
        </div>

        <div className="form-group">
          <label>Mobile No.</label>
          <input type="tel" placeholder="Enter your mobile number" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input type={showPassword ? 'text' : 'password'} placeholder="Create a password" required />
            <button type="button" className="show-pass" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn">Sign up</button>

        <p style={{ textAlign: 'center', marginTop: 12 }}>
          Have an Account? <Link to="/login" className="register-link">Login Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
