import React, { useState, useEffect } from 'react';
import './verifyEmail.css';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(755); 
  const [email] = useState('*******@peatix.com'); 

  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isVerified]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      setIsVerified(true);
    }
  };

  const handleResendCode = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(755); 
    const firstInput = document.getElementById('otp-0');
    if (firstInput) firstInput.focus();
  };

  const handleChangeEmail = () => {
    console.log('Change email clicked');
  };

  if (isVerified) {
    return (
      <div className="verify-email-container">
        <div className="verify-email-card">
          <div className="success-icon">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
          </div>
          <h2 className="success-title">Email Verified</h2>
          <p className="success-message">Your email address was successfully verified.</p>
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
            Please check your inbox and enter the verification code below to verify your email address. The code will expire in {formatTime(timeLeft)}.
          </p>
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
              className={`otp-input ${digit ? 'filled' : ''}`}
              maxLength="1"
            />
          ))}
        </div>
        
        <button 
          className={`verify-button ${otp.join('').length === 6 ? 'active' : ''}`}
          onClick={handleVerify}
          disabled={otp.join('').length !== 6}
        >
          Verify
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
