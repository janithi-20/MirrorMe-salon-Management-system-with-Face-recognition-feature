// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../controllers/feedbackController');

// POST /feedback/submit - Submit new feedback
router.post('/submit', submitFeedback);

module.exports = router;