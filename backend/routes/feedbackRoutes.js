// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const { 
  submitFeedback, 
  getApprovedFeedback, 
  getAllFeedbackAdmin,
  approveFeedback,
  rejectFeedback,
  deleteFeedback,
  getFeedbackStats
} = require('../controllers/feedbackController');

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get approved feedback for public display
 *     tags: [Feedback]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of feedback items to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Approved feedback retrieved successfully
 */
router.get('/', getApprovedFeedback);

/**
 * @swagger
 * /feedback/submit:
 *   post:
 *     summary: Submit customer feedback (requires user authentication)
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - name
 *               - message
 *               - rating
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of authenticated user
 *               name:
 *                 type: string
 *                 description: Customer name
 *               message:
 *                 type: string
 *                 description: Feedback message (10-500 chars)
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating from 1 to 5 stars
 *     responses:
 *       201:
 *         description: Feedback submitted successfully
 *       400:
 *         description: Bad request - Missing required fields or invalid data
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many requests - User already submitted feedback within 24 hours
 */
router.post('/submit', submitFeedback);

// Admin routes
router.get('/admin/all', getAllFeedbackAdmin);    // GET /feedback/admin/all - Get all feedback with filters
router.get('/admin/stats', getFeedbackStats);     // GET /feedback/admin/stats - Get feedback statistics
router.put('/admin/approve/:id', approveFeedback); // PUT /feedback/admin/approve/:id - Approve feedback
router.put('/admin/reject/:id', rejectFeedback);   // PUT /feedback/admin/reject/:id - Reject feedback
router.delete('/admin/:id', deleteFeedback);       // DELETE /feedback/admin/:id - Delete feedback

module.exports = router;