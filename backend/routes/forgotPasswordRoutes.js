// routes/forgotPasswordRoutes.js
const express = require('express');
const router = express.Router();
const { forgotPassword } = require('../controllers/forgotPasswordController');

// POST /customers/forgot-password - Request password reset
router.post('/forgot-password', forgotPassword);

module.exports = router;