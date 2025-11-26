// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendVerificationEmail, generateVerificationCode } = require('../services/emailService');

const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'All fields are required: firstName, lastName, email, phoneNumber, password'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      });
    }

    // Check if user already exists in database
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'This email address is already registered. Please use a different email or try logging in.'
      });
    }

    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Create new user in database
    const newUser = new User({
      customerId: `CUST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      firstName,
      lastName,
      email: email.toLowerCase(),
      phoneNumber,
      password: hashedPassword,
      isVerified: false, // Set to false, require email verification
      verificationCode: verificationCode,
      verificationCodeExpires: verificationCodeExpires
    });

    const savedUser = await newUser.save();
    console.log('✅ User saved to database:', savedUser._id);

    // Send verification email
    try {
      await sendVerificationEmail(savedUser.email, savedUser.firstName, verificationCode);
      console.log('📧 Verification email sent to:', savedUser.email);
    } catch (emailError) {
      console.error('❌ Failed to send verification email:', emailError);
      // Continue with registration even if email fails
    }

    console.log('New customer created:', { 
      customerId: savedUser.customerId, 
      email: savedUser.email,
      name: `${firstName} ${lastName}`
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email for the verification code.',
      customerId: savedUser.customerId,
      requiresVerification: true,
      data: {
        id: savedUser._id,
        customerId: savedUser.customerId,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        phoneNumber: savedUser.phoneNumber,
        isVerified: savedUser.isVerified
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during registration. Please try again.'
    });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email and password are required'
      });
    }

    // Find user by email in database
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Invalid email or password'
      });
    }

    // Check password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Invalid email or password'
      });
    }

    console.log('Customer logged in:', { email: user.email, customerId: user.customerId });

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      customer: {
        _id: user._id,
        customerId: user.customerId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified
      },
      token: `TOKEN_${user.customerId}_${Date.now()}` // Simple token for demo
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during login. Please try again.'
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { customerId, email, otp } = req.body;
    
    // Find user in database
    let user;
    if (customerId) {
      user = await User.findOne({ customerId: customerId });
    } else if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'Invalid customer ID or email'
      });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({
        error: 'Already verified',
        message: 'This account has already been verified'
      });
    }

    // Validate verification code
    if (!otp || otp.length !== 6) {
      return res.status(400).json({
        error: 'Invalid OTP',
        message: 'Please enter a valid 6-digit verification code'
      });
    }

    // Check if verification code matches and hasn't expired
    if (user.verificationCode !== otp) {
      return res.status(400).json({
        error: 'Invalid verification code',
        message: 'The verification code you entered is incorrect'
      });
    }

    if (user.verificationCodeExpires && new Date() > user.verificationCodeExpires) {
      return res.status(400).json({
        error: 'Code expired',
        message: 'Verification code has expired. Please request a new one'
      });
    }

    // Mark user as verified and clear verification code
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    console.log('✅ Email verified for customer:', { email: user.email, customerId: user.customerId });

    res.status(200).json({
      success: true,
      message: 'Email verification successful! You can now access all features.',
      customer: {
        id: user.id,
        customerId: user.customerId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified
      },
      token: `TOKEN_${user.customerId}_${Date.now()}`
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during email verification. Please try again.'
    });
  }
};

const resendVerification = async (req, res) => {
  try {
    const { customerId, email } = req.body;
    
    // Find user in database
    let user;
    if (customerId) {
      user = await User.findOne({ customerId: customerId });
    } else if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'Invalid customer ID or email'
      });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({
        error: 'Already verified',
        message: 'This account has already been verified'
      });
    }

    // Generate new verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Update user with new verification code
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = verificationCodeExpires;
    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(user.email, user.firstName, verificationCode);
      console.log('📧 Verification code resent to:', user.email);

      res.status(200).json({
        success: true,
        message: 'Verification code resent to your email!'
      });
    } catch (emailError) {
      console.error('❌ Failed to send verification email:', emailError);
      res.status(500).json({
        error: 'Email sending failed',
        message: 'Failed to send verification email. Please try again.'
      });
    }

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while resending verification code. Please try again.'
    });
  }
};

module.exports = {
  createCustomer,
  loginCustomer,
  verifyEmail,
  resendVerification
};