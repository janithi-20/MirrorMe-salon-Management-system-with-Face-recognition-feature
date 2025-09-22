import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required />
            <button type="button" className="show-pass" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn">Login</button>
        <p><Link to="/forgot-password" className="forgot">Forgot Password?</Link></p>

        <p style={{ textAlign: 'center', marginTop: 12 }}>
          New User? <Link to="/register" className="register-link">Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
