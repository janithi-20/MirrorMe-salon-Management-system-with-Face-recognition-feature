import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAdmin, loginUser } = useAuth();

  // Get redirect information from navigation state
  const redirectTo = location.state?.redirectTo || '/';
  const redirectMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check for admin credentials first
      if (email === 'mirrorme@gmail.com' && password === 'Mirrorme@1234') {
        loginAdmin();
        setLoading(false);
        navigate('/admin');
        return;
      }

      const response = await fetch('/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data or token if provided by backend
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        if (data.customer) {
          // Use AuthContext to properly set user authentication
          loginUser(data.customer);
          localStorage.setItem('customer', JSON.stringify(data.customer));
        }
        
        // Trigger a custom event to notify header about login
        window.dispatchEvent(new Event('userLoggedIn'));
        
        // Check if user should be redirected to feedback modal
        if (location.state?.openFeedbackModal) {
          // Trigger feedback modal after redirect
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openFeedbackModal'));
          }, 500);
        }
        
        // Redirect to the intended page or home page after successful login
        navigate(redirectTo);
      } else {
        // Display error message from backend
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please make sure the backend is running on localhost:5000');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {redirectMessage && (
        <div className="info-message" style={{ 
          color: '#d1842c', 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: '#fff3e0', 
          borderRadius: '4px',
          border: '1px solid #d1842c',
          textAlign: 'center'
        }}>
          {redirectMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '10px', padding: '8px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button type="button" className="show-pass" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p><Link to="/forgot-password" className="forgot">Forgot Password?</Link></p>

        <p style={{ textAlign: 'center', marginTop: 12 }}>
          New User? <Link to="/register" className="register-link">Register now</Link>
        </p>
        
        <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 15, borderTop: '1px solid #eee' }}>
          <Link 
            to="/" 
            style={{ 
              display: 'inline-block',
              padding: '10px 20px',
              background: '#f8f9fa',
              color: '#666',
              textDecoration: 'none',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#e9ecef';
              e.target.style.color = '#333';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#f8f9fa';
              e.target.style.color = '#666';
            }}
          >
            ← Back to Main Page
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
