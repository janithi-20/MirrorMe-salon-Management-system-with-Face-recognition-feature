// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createCustomer, 
  loginCustomer, 
  verifyEmail, 
  resendVerification 
} = require('../controllers/authController');

// add updateCustomer dynamically to support profile updates
const { updateCustomer } = require('../controllers/authController');

/**
 * @swagger
 * /customers/createCustomer:
 *   post:
 *     summary: Register a new customer
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerRegistration'
 *     responses:
 *       201:
 *         description: Customer registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request - Missing required fields or invalid email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict - Email already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/createCustomer', createCustomer);

/**
 * @swagger
 * /customers/login:
 *   post:
 *     summary: Customer login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', loginCustomer);

/**
 * @swagger
 * /customers/verify-email:
 *   post:
 *     summary: Verify email with OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailVerification'
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Bad request - Invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/verify-email', verifyEmail);

/**
 * @swagger
 * /customers/resend-verification:
 *   post:
 *     summary: Resend verification code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 example: 'CUST_1634567890123'
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'john.doe@email.com'
 *     responses:
 *       200:
 *         description: Verification code resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/resend-verification', resendVerification);

// PUT /customers/:id - update profile (by _id, customerId or email)
router.put('/:id', updateCustomer);

// POST /customers/update - tolerant fallback that accepts { id, ...fields }
router.post('/update', async (req, res) => {
  try {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ success: false, message: 'Missing id in body' });

    // Construct a fake req.params for reuse of update logic in controller
    req.params = req.params || {};
    req.params.id = id;
    // Delegate to controller
    return updateCustomer(req, res);
  } catch (err) {
    console.error('Fallback update route error', err);
    return res.status(500).json({ success: false, message: err.message || 'Internal error' });
  }
});

module.exports = router;