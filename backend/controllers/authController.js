// controllers/authController.js

// Temporary in-memory storage for users (in production, use a database)
let users = [];
let nextId = 1;

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

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'This email address is already registered. Please use a different email or try logging in.'
      });
    }

    // Create new user
    const newUser = {
      id: nextId++,
      customerId: `CUST_${Date.now()}`,
      firstName,
      lastName,
      email,
      phoneNumber,
      password, // In production, hash this password
      isVerified: false,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    console.log('New customer created:', { 
      customerId: newUser.customerId, 
      email: newUser.email,
      name: `${firstName} ${lastName}`
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email for verification.',
      customerId: newUser.customerId,
      data: {
        id: newUser.id,
        customerId: newUser.customerId,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        isVerified: newUser.isVerified
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

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Invalid email or password'
      });
    }

    // Check password (in production, compare with hashed password)
    if (user.password !== password) {
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
        id: user.id,
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
    
    // Find user
    let user;
    if (customerId) {
      user = users.find(u => u.customerId === customerId);
    } else if (email) {
      user = users.find(u => u.email === email);
    }

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'Invalid customer ID or email'
      });
    }

    // For demo purposes, accept any 6-digit OTP
    if (!otp || otp.length !== 6) {
      return res.status(400).json({
        error: 'Invalid OTP',
        message: 'Please enter a valid 6-digit verification code'
      });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verifiedAt = new Date().toISOString();

    console.log('Email verified for customer:', { email: user.email, customerId: user.customerId });

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
    
    // Find user
    let user;
    if (customerId) {
      user = users.find(u => u.customerId === customerId);
    } else if (email) {
      user = users.find(u => u.email === email);
    }

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'Invalid customer ID or email'
      });
    }

    console.log('Verification code resent to:', user.email);

    res.status(200).json({
      success: true,
      message: 'Verification code resent to your email!'
    });

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
  resendVerification,
  users // Export users array for dashboard access
};