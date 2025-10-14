import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  // Real-time password match validation
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    // Check if passwords match in real-time
    if (value && password && value !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate all required fields
    if (!firstName.trim()) {
      setError('First name is required.');
      return;
    }
    if (!lastName.trim()) {
      setError('Last name is required.');
      return;
    }
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!phoneNumber.trim()) {
      setError('Phone number is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Phone number validation
    if (phoneNumber.length < 10) {
      setError('Phone number must be at least 10 digits.');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match! Please make sure both passwords are the same.');
      setPasswordMismatch(true);
      return;
    }

    // Additional password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting registration with data:', { firstName, lastName, email, phoneNumber });
      
      const response = await fetch('/customers/createCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }),
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to email verification...');
        
        // Store customerId and email in session storage for verification
        sessionStorage.setItem('customerId', data.customerId);
        sessionStorage.setItem('registeredEmail', email);
        sessionStorage.setItem('registrationMessage', data.message || 'Please check your email for the verification code.');
        
        console.log('Stored in session storage:', {
          customerId: data.customerId,
          email: email
        });
        
        // Redirect to verify-email page after 2 seconds, passing customerId and email as state
        setTimeout(() => {
          navigate('/verify-email', { 
            state: { 
              customerId: data.customerId,
              email: email,
              message: data.message || 'Please check your email for the verification code.'
            } 
          });
        }, 2000);
      } else {
        console.error('Registration failed with status:', response.status, 'Data:', data);
        
        // Handle specific error cases
        let errorMessage = 'Registration failed. Please try again.';
        
        if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          if (data.error.includes('duplicate key') && data.error.includes('email')) {
            errorMessage = 'This email address is already registered. Please use a different email or try logging in.';
          } else if (data.error.includes('duplicate key')) {
            errorMessage = 'Account already exists. Please try with different details.';
          } else {
            errorMessage = data.error;
          }
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Registration network error:', err);
      setError('Unable to connect to server. Please make sure the backend is running on localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign up</h2>
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
          <label>First Name</label>
          <input 
            type="text" 
            placeholder="Enter your first name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input 
            type="text" 
            placeholder="Enter your last name" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Mobile No.</label>
          <input 
            type="tel" 
            placeholder="Enter your mobile number" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required 
          />
        </div>

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
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-pass"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              style={{ borderColor: passwordMismatch ? 'red' : '' }}
            />
            <button
              type="button"
              className="show-pass"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          {passwordMismatch && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              Passwords do not match
            </div>
          )}
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>

        <p style={{ textAlign: "center", marginTop: 12 }}>
          Have an Account?{" "}
          <Link to="/login" className="register-link">
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;