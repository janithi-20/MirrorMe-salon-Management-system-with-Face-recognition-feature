// backend/server.js
const express = require('express');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedbackRoutes');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/feedback', feedbackRoutes);
app.use('/customers', forgotPasswordRoutes);

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
  console.log(`📝 Feedback API available at http://localhost:${PORT}/feedback/submit`);
  console.log(`🔐 Forgot Password API available at http://localhost:${PORT}/customers/forgot-password`);
});

module.exports = app;