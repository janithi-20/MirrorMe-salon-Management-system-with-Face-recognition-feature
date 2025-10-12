import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './verifyEmail.css';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(755); // 12:35 in seconds
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get email and customerId from navigation state or session storage
  const email = location.state?.email || sessionStorage.getItem('registeredEmail') || '*******@peatix.com';
  const customerId = location.state?.customerId || sessionStorage.getItem('customerId');
  const message = location.state?.message || sessionStorage.getItem('registrationMessage') || 'Please check your email for the verification code.';
  
  // Debug logging
  useEffect(() => {
    console.log('VerifyEmail component loaded');
    console.log('Location state:', location.state);
    console.log('Session storage - customerId:', sessionStorage.getItem('customerId'));
    console.log('Session storage - email:', sessionStorage.getItem('registeredEmail'));
    console.log('Final customerId:', customerId);
    console.log('Final email:', email);
    
    // Cleanup function - clear session storage if user navigates away without verifying
    return () => {
      // Only clear if not verified (component unmounting due to navigation away)
      if (!isVerified) {
        console.log('Component unmounting - verification not completed');
        // Note: We'll keep the session storage in case user comes back
      }
    };
  }, [isVerified]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isVerified]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle backspace to go to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle verify button click
  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      // Check if customerId is available
      if (!customerId) {
        setError('Customer ID is missing. Please complete the registration process first and then return to this page.');
        console.error('CustomerId not found in location.state:', location.state);
        return;
      }

      setIsLoading(true);
      setError('');
      
      console.log('=== VERIFICATION DEBUG ===');
      console.log('CustomerId from state:', location.state?.customerId);
      console.log('CustomerId from session:', sessionStorage.getItem('customerId'));
      console.log('Final customerId:', customerId);
      console.log('OTP String:', otpString);
      console.log('Attempting verification with:', { customerId, otp: otpString });
      console.log('Request body:', JSON.stringify({ customerId: customerId, otp: otpString }));
      
      // Additional validation
      if (!customerId || customerId.trim() === '') {
        setError('Customer ID is empty. Please register again.');
        return;
      }
      
      if (!otpString || otpString.length !== 6) {
        setError('Please enter a valid 6-digit verification code.');
        return;
      }
      
      try {
        const requestBody = {
          customerId: customerId.trim(),
          otp: otpString.trim()
        };
        
        console.log('=== FINAL REQUEST BODY ===');
        console.log('Request body object:', requestBody);
        console.log('Request body JSON:', JSON.stringify(requestBody));
        console.log('Body keys:', Object.keys(requestBody));
        console.log('=========================');
        
        // First check if customerId and otp are valid
        if (!requestBody.customerId || !requestBody.otp) {
          throw new Error('Missing required fields: customerId or otp is empty');
        }
        
        // Ensure we have the right field names
        if (!requestBody.hasOwnProperty('customerId')) {
          throw new Error('customerId field is missing from request body');
        }
        if (!requestBody.hasOwnProperty('otp')) {
          throw new Error('otp field is missing from request body');
        }
        
        const response = await fetch('/customers/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status);
        
        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
          setIsVerified(true);
          
          // Clear session storage after successful verification
          sessionStorage.removeItem('customerId');
          sessionStorage.removeItem('registeredEmail');
          sessionStorage.removeItem('registrationMessage');
          
          console.log('Email verification successful, session storage cleared');
          
          // Optional: Navigate to login after a delay
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          console.error('Verification failed:', { status: response.status, data });
          
          // Show detailed error message
          let errorMessage = 'Verification failed. Please try again.';
          
          if (data.message) {
            errorMessage = data.message;
          } else if (data.error) {
            errorMessage = data.error;
          } else if (response.status === 400) {
            errorMessage = 'Missing required fields. Please ensure all fields are properly filled.';
          } else if (response.status === 404) {
            errorMessage = 'Verification endpoint not found. The backend may not have this endpoint implemented yet. Please contact the developer.';
          }
          
          setError(errorMessage);
          // Clear the OTP inputs on error
          setOtp(['', '', '', '', '', '']);
        }
      } catch (err) {
        console.error('Network error:', err);
        
        // Check if it's a 404 error (endpoint not implemented)
        if (err.message && err.message.includes('404')) {
          setError('The verification endpoint is not yet implemented in the backend. Please ask the backend developer to implement POST /customers/verify-email');
        } else if (err.message && err.message.includes('Missing required fields')) {
          setError('Missing required fields. CustomerId: ' + (customerId || 'missing') + ', OTP: ' + (otpString || 'missing'));
        } else {
          setError('Network error. Please check your connection and try again. Error: ' + err.message);
        }
        
        setOtp(['', '', '', '', '', '']);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(755); // Reset timer
    setError('');
    
    try {
      // Call resend API if available (using customerId if provided, otherwise email)
      const requestBody = customerId 
        ? { customerId } 
        : { email };
        
      const response = await fetch('/customers/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        console.log('Verification code resent successfully');
      }
    } catch (err) {
      console.error('Failed to resend code:', err);
    }
    
    // Focus first input
    const firstInput = document.getElementById('otp-0');
    if (firstInput) firstInput.focus();
  };

  // Handle change email
  const handleChangeEmail = () => {
    // Navigate back to signup or show email change modal
    console.log('Change email clicked');
  };

  if (isVerified) {
    return (
      <div className="verify-email-container">
        <div className="verify-email-card success-card">
          <div className="success-icon">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
          </div>
          <h2 className="success-title">🎉 Email Verified!</h2>
          <p className="success-message">
            Congratulations! Your email address <strong>{email}</strong> has been successfully verified.
          </p>
          <p className="redirect-message">
            You will be redirected to the login page in a few seconds...
          </p>
          <button 
            className="continue-button"
            onClick={() => navigate('/login')}
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  // Check if customerId is missing - show error page
  if (!customerId) {
    return (
      <div className="verify-email-container">
        <div className="verify-email-card">
          <div className="error-icon">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#f44336" strokeWidth="2"/>
              <path d="m15 9-6 6" stroke="#f44336" strokeWidth="2"/>
              <path d="m9 9 6 6" stroke="#f44336" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="error-title">Registration Required</h2>
          <p className="error-message">
            You need to complete the registration process first to verify your email.
          </p>
          <button 
            className="register-button"
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        <div className="email-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7L10.5 13.5L21 7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 7H21V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18V7Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="verify-title">VERIFY YOUR EMAIL ADDRESS</h1>
        
        <div className="verification-info">
          <p className="verification-text">
            A verification code has been sent to
          </p>
          <p className="email-address">{email}</p>
        </div>
        
        <div className="instructions">
          <p>
            {message}
          </p>
          <p>
            Please enter the verification code below. The code will expire in {formatTime(timeLeft)}.
          </p>
        </div>

        {/* Debug Panel - Remove in production */}
        <div style={{ fontSize: '11px', color: '#888', marginBottom: '15px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
          <strong>🔧 Debug Info:</strong><br/>
          Customer ID: {customerId || 'Not found'}<br/>
          Email: {email}<br/>
          From: {location.state?.customerId ? 'Navigation State' : sessionStorage.getItem('customerId') ? 'Session Storage' : 'None'}<br/>
          OTP Length: {otp.join('').length}/6<br/>
          Session Storage CustomerId: {sessionStorage.getItem('customerId') || 'None'}<br/>
          Expected API: POST /customers/verify-email with {'{customerId, otp}'}
        </div>
        
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`otp-input ${digit ? 'filled' : ''} ${error ? 'error' : ''}`}
              maxLength="1"
              disabled={isLoading}
            />
          ))}
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <button 
          className={`verify-button ${otp.join('').length === 6 && !isLoading ? 'active' : ''}`}
          onClick={handleVerify}
          disabled={otp.join('').length !== 6 || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
        
        <div className="action-buttons">
          <button className="resend-button" onClick={handleResendCode}>
            Resend code
          </button>
          <button className="change-email-button" onClick={handleChangeEmail}>
            Change email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
