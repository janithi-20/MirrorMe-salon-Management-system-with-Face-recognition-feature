import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);
  
  // Get email and customerId from navigation state or session storage
  const email = location.state?.email || sessionStorage.getItem('registeredEmail') || '';
  const customerId = location.state?.customerId || sessionStorage.getItem('customerId');
  const message = location.state?.message || sessionStorage.getItem('registrationMessage') || 'Please check your inbox and enter the verification code below to verify your email address.';

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Debug logging
    console.log('VerifyEmail component loaded');
    console.log('Location state:', location.state);
    console.log('CustomerId:', customerId);
    console.log('Email:', email);
    
    // Redirect to register if no customerId is provided
    if (!customerId) {
      console.log('No customerId found, redirecting to register');
      navigate('/register');
    }
  }, [customerId, email, navigate, location.state]);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    const otp = otpDigits.join('');
    
    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    if (!customerId) {
      setError('Customer ID is missing. Please complete registration first.');
      return;
    }

    console.log('=== VERIFICATION ATTEMPT ===');
    console.log('CustomerId:', customerId);
    console.log('OTP:', otp.trim());
    
    setLoading(true);

    try {
      const requestBody = {
        customerId: customerId.trim(),
        otp: otp.trim()
      };
      
      console.log('Request body:', JSON.stringify(requestBody));
      
      const response = await fetch('/customers/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Email verified successfully! Logging you in...');
        setOtpDigits(['', '', '', '', '', '']);
        
        // Auto-login after successful verification
        if (data.customer && data.token) {
          // Store user data for automatic login
          localStorage.setItem('token', data.token);
          localStorage.setItem('customer', JSON.stringify(data.customer));
          
          // Trigger the userLoggedIn event to update header state
          window.dispatchEvent(new Event('userLoggedIn'));
        }
        
        // Clear session storage after successful verification
        sessionStorage.removeItem('customerId');
        sessionStorage.removeItem('registeredEmail');
        sessionStorage.removeItem('registrationMessage');
        
        console.log('Email verification successful, user automatically logged in');
        
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(data.message || 'OTP verification failed. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please make sure the backend is running.');
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setResendLoading(true);

    try {
      // Use resend endpoint instead of verify endpoint
      const requestBody = customerId ? { customerId } : { email };
      
      const response = await fetch('/customers/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSuccess('Verification code resent to your email!');
        setTimer(300); // Reset timer to 5 minutes
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to resend verification code. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
      console.error('Resend OTP error:', err);
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    return null; // Will redirect to register
  }

  return (
    <div className="login-container verify-email-container">
      {/* Email icon */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          backgroundColor: '#4CAF50', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          marginBottom: '20px'
        }}>
          <span style={{ color: 'white', fontSize: '24px' }}>📧</span>
        </div>
        <h2 style={{ color: '#333', marginBottom: '8px', fontSize: '24px', fontWeight: '600' }}>
          VERIFY YOUR EMAIL ADDRESS
        </h2>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <p style={{ color: '#333', marginBottom: '8px', fontSize: '16px' }}>
          A verification code has been sent to
        </p>
        <p style={{ color: '#333', fontSize: '16px', fontWeight: '600' }}>
          {email.replace(/(.{3}).*(@.*)/, '$1***$2')}
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          {message} The code will expire in {formatTime(timer)}.
        </p>
        
        {error && (
          <div className="error-message" style={{ 
            color: 'red', 
            marginBottom: '15px', 
            padding: '8px', 
            backgroundColor: '#ffe6e6', 
            borderRadius: '4px', 
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        {success && (
          <div className="success-message" style={{ 
            color: 'green', 
            marginBottom: '15px', 
            padding: '8px', 
            backgroundColor: '#e6ffe6', 
            borderRadius: '4px', 
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleVerifyOtp}>
          {/* OTP Input Boxes */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center', 
            marginBottom: '30px' 
          }}>
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength="1"
                style={{
                  width: '50px',
                  height: '50px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: '#333',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            ))}
          </div>
          
          <button 
            type="submit" 
            className="btn verify-btn" 
            disabled={loading || otpDigits.join('').length !== 6}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: otpDigits.join('').length === 6 ? 'pointer' : 'not-allowed',
              opacity: otpDigits.join('').length === 6 ? 1 : 0.6,
              marginBottom: '20px'
            }}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <button 
            type="button"
            onClick={handleResendOtp}
            disabled={resendLoading || timer > 0}
            style={{
              background: 'none',
              border: 'none',
              color: timer > 0 ? '#999' : '#4CAF50',
              fontSize: '14px',
              cursor: timer > 0 ? 'not-allowed' : 'pointer',
              textDecoration: 'none',
              marginRight: '20px'
            }}
          >
            {resendLoading ? 'Resending...' : 'Resend code'}
          </button>
          
          <button 
            type="button"
            onClick={() => navigate('/register')}
            style={{
              background: 'none',
              border: 'none',
              color: '#4CAF50',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            Change email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;