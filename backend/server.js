// backend/server.js
const express = require('express');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedbackRoutes');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 5000;

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
  console.log(`👤 Authentication APIs available:`);
  console.log(`   - Registration: http://localhost:${PORT}/customers/createCustomer`);
  console.log(`   - Login: http://localhost:${PORT}/customers/login`);
  console.log(`   - Email Verification: http://localhost:${PORT}/customers/verify-email`);
  console.log(`   - Resend Verification: http://localhost:${PORT}/customers/resend-verification`);
});

module.exports = app;