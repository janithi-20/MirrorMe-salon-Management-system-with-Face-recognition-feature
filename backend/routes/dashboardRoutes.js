// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  getCustomers, 
  getFeedbacks, 
  getBookings 
} = require('../controllers/dashboardController');

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Dashboard data retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalCustomers:
 *                           type: integer
 *                           example: 156
 *                         totalRevenue:
 *                           type: integer
 *                           example: 95000
 *                         totalBookings:
 *                           type: integer
 *                           example: 89
 *                     bookingTrend:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           day:
 *                             type: string
 *                             example: "Mon"
 *                           newClients:
 *                             type: integer
 *                             example: 12
 *                           returningClients:
 *                             type: integer
 *                             example: 8
 *                     bookingChannels:
 *                       type: object
 *                       properties:
 *                         totalBookings:
 *                           type: integer
 *                           example: 78
 *                         online:
 *                           type: integer
 *                           example: 52
 *                         walkIn:
 *                           type: integer
 *                           example: 18
 *                         phone:
 *                           type: integer
 *                           example: 8
 *                     upcomingBookings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           service:
 *                             type: string
 *                           client:
 *                             type: string
 *                           time:
 *                             type: string
 *                           status:
 *                             type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/stats', getDashboardStats);

/**
 * @swagger
 * /dashboard/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Customers retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       customerId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       isVerified:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                 total:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/customers', getCustomers);

/**
 * @swagger
 * /dashboard/feedbacks:
 *   get:
 *     summary: Get all feedback submissions
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Feedbacks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Feedbacks retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     feedbacks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           message:
 *                             type: string
 *                           rating:
 *                             type: integer
 *                           timestamp:
 *                             type: string
 *                           status:
 *                             type: string
 *                     total:
 *                       type: integer
 *                     averageRating:
 *                       type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/feedbacks', getFeedbacks);

/**
 * @swagger
 * /dashboard/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Bookings retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       service:
 *                         type: string
 *                       client:
 *                         type: string
 *                       date:
 *                         type: string
 *                       time:
 *                         type: string
 *                       status:
 *                         type: string
 *                       amount:
 *                         type: integer
 *                       isNew:
 *                         type: boolean
 *                 total:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/bookings', getBookings);

module.exports = router;