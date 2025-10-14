import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/customers/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset instructions have been sent to your email address.');
        // Clear the form
        setEmail('');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.message || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Unable to connect to server. Please make sure the backend is running on localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container forgot-password-container">
      <h2>Reset Password</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666', fontSize: '14px' }}>
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '10px', padding: '8px', backgroundColor: '#ffe6e6', borderRadius: '4px', fontSize: '14px' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="success-message" style={{ color: 'green', marginBottom: '10px', padding: '8px', backgroundColor: '#e6ffe6', borderRadius: '4px', fontSize: '14px' }}>
            {success}
          </div>
        )}
        
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="Enter your registered email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn" disabled={loading || !email.trim()}>
          {loading ? 'Sending...' : 'Send Reset Instructions'}
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" className="register-link">
            ← Back to Login
          </Link>
        </div>
        
        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#666' }}>
          Don't have an account? <Link to="/register" className="register-link">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;