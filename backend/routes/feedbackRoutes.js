// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../controllers/feedbackController');

/**
 * @swagger
 * /feedback/submit:
 *   post:
 *     summary: Submit customer feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       200:
 *         description: Feedback submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/submit', submitFeedback);

module.exports = router;