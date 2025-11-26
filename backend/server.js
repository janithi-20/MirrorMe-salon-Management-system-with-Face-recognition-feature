// backend/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const feedbackRoutes = require('./routes/feedbackRoutes');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const teamRoutes = require('./routes/teamRoutes');
const brandRoutes = require('./routes/brandRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const aiAnalysisRoutes = require('./routes/aiAnalysisRoutes');
const { swaggerUi, specs } = require('./swagger');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.56.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/feedback', feedbackRoutes);
app.use('/customers', forgotPasswordRoutes);
app.use('/customers', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/bookings', bookingRoutes);
app.use('/services', serviceRoutes);
app.use('/team', teamRoutes);
app.use('/brands', brandRoutes);
app.use('/settings', settingsRoutes);
app.use('/ai', aiAnalysisRoutes);

// Debug endpoint to check database contents
app.get('/debug/users', async (req, res) => {
  try {
    const User = require('./models/User');
    const users = await User.find({}).select('-password -verificationCode -resetPasswordToken');
    const userCount = await User.countDocuments();
    
    console.log('📊 Database Debug - Total Users:', userCount);
    users.forEach(user => {
      console.log(`👤 User: ${user._id} - ${user.firstName} ${user.lastName} (${user.email})`);
    });
    
    res.json({
      success: true,
      totalUsers: userCount,
      users: users
    });
  } catch (error) {
    console.error('❌ Debug endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Salon Management API',
}));

// Basic health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Salon Management System API', 
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 Swagger API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`📝 Feedback API available at http://localhost:${PORT}/feedback/submit`);
  console.log(`🔐 Forgot Password API available at http://localhost:${PORT}/customers/forgot-password`);
  console.log(`📊 Dashboard APIs available at http://localhost:${PORT}/dashboard/stats`);
  console.log(`📅 Booking APIs available:`);
  console.log(`   - Create Booking: http://localhost:${PORT}/bookings`);
  console.log(`   - Get Customer Bookings: http://localhost:${PORT}/bookings/customer/{customerId}`);
  console.log(`   - Update Booking Status: http://localhost:${PORT}/bookings/{id}/status`);
  console.log(`🛍️ Service APIs available:`);
  console.log(`   - Get All Services: http://localhost:${PORT}/services`);
  console.log(`   - Get Service by Slug: http://localhost:${PORT}/services/slug/{slug}`);
  console.log(`   - Admin Service Management: http://localhost:${PORT}/services/admin/all`);
  console.log(`👥 Team APIs available:`);
  console.log(`   - Get All Team Members: http://localhost:${PORT}/team`);
  console.log(`   - Get Team Member by ID: http://localhost:${PORT}/team/{id}`);
  console.log(`   - Admin Team Management: http://localhost:${PORT}/team/admin/all`);
  console.log(`   - Team Statistics: http://localhost:${PORT}/team/admin/stats`);
  console.log(`🏢 Brand APIs available:`);
  console.log(`   - Get All Brands: http://localhost:${PORT}/brands`);
  console.log(`   - Admin Brand Management: http://localhost:${PORT}/brands/admin`);
  console.log(`   - Create Brand: http://localhost:${PORT}/brands/admin`);
  console.log(`   - Update Brand: http://localhost:${PORT}/brands/admin/{id}`);
  console.log(`   - Delete Brand: http://localhost:${PORT}/brands/admin/{id}`);
  console.log(`⚙️ Settings APIs available:`);
  console.log(`   - Get All Settings: http://localhost:${PORT}/settings`);
  console.log(`   - Admin Settings: http://localhost:${PORT}/settings/admin`);
  console.log(`   - Update Setting: http://localhost:${PORT}/settings/admin/{key}`);
  console.log(`   - Bulk Update: http://localhost:${PORT}/settings/admin/bulk`);
  console.log(`👤 Authentication APIs available:`);
  console.log(`   - Registration: http://localhost:${PORT}/customers/createCustomer`);
  console.log(`   - Login: http://localhost:${PORT}/customers/login`);
  console.log(`   - Email Verification: http://localhost:${PORT}/customers/verify-email`);
  console.log(`   - Resend Verification: http://localhost:${PORT}/customers/resend-verification`);
  console.log(`🤖 AI Analysis APIs available:`);
  console.log(`   - Face Analysis: http://localhost:${PORT}/ai/analyze`);
  console.log(`   - Analysis Options: http://localhost:${PORT}/ai/options`);
  console.log(`   - Sample Recommendations: http://localhost:${PORT}/ai/sample`);
  
  // Email service status
  const emailConfigured = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD;
  console.log(`📧 Email Service: ${emailConfigured ? '✅ Configured' : '❌ Not Configured'}`);
  if (emailConfigured) {
    console.log(`   - Gmail User: ${process.env.GMAIL_USER}`);
    console.log(`   - Features: Email verification, Password reset`);
    console.log(`   - Test: npm run test-email`);
  } else {
    console.log(`   - Setup required: See EMAIL_SETUP_GUIDE.md`);
  }
});

module.exports = app;