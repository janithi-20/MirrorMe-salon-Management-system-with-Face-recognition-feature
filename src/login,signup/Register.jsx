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
      const response = await fetch('http://localhost:5000/customers/createCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        // Clear form
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please make sure the backend is running on localhost:5000');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '10px', padding: '8px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="success-message" style={{ color: 'green', marginBottom: '10px', padding: '8px', backgroundColor: '#e6ffe6', borderRadius: '4px' }}>
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
              style={{ 
                borderColor: passwordMismatch ? 'red' : undefined,
                borderWidth: passwordMismatch ? '2px' : undefined 
              }}
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
            <small style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              ⚠️ Passwords do not match!
            </small>
          )}
        </div>

        <button type="submit" className="btn" disabled={loading || passwordMismatch}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>

        {/* Add space between signup and OTP section */}
        <div style={{ marginTop: "30px" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
            <div className="form-group" style={{ flex: "1" }}>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Type OTP"
                  required
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn"
              style={{
                width: "auto",
                padding: "10px 20px",
                minWidth: "100px",
                height: "40px",
                marginBottom: "15px",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
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
