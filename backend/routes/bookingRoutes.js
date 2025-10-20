// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { createBooking, getBookingsByCustomer, updateBookingStatus } = require('../controllers/bookingController');

/**
 * @swagger
 * components:
 *   schemas:
 *     BookingItem:
 *       type: object
 *       required:
 *         - service
 *         - label
 *         - price
 *       properties:
 *         service:
 *           type: string
 *           description: Main service category
 *           example: "Hair Cut"
 *         label:
 *           type: string
 *           description: Sub-service name
 *           example: "Women's Hair Cut & Style"
 *         price:
 *           type: number
 *           description: Price of the sub-service
 *           example: 2500
 *         subId:
 *           type: string
 *           description: Sub-service ID
 *           example: "haircut_women"
 *     
 *     CreateBookingRequest:
 *       type: object
 *       required:
 *         - items
 *         - datetime
 *         - staff
 *         - subtotal
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BookingItem'
 *         datetime:
 *           type: string
 *           format: date-time
 *           description: Appointment date and time
 *           example: "2024-12-25T14:30"
 *         staff:
 *           type: string
 *           description: Preferred staff member
 *           example: "Lewis Fernandiz"
 *         subtotal:
 *           type: number
 *           description: Total amount for all services
 *           example: 5000
 *         customerInfo:
 *           type: object
 *           properties:
 *             customerId:
 *               type: string
 *               example: "CUST_1234567890"
 *             firstName:
 *               type: string
 *               example: "John"
 *             lastName:
 *               type: string
 *               example: "Doe"
 *             email:
 *               type: string
 *               example: "john.doe@email.com"
 *             phoneNumber:
 *               type: string
 *               example: "+94712345678"
 *     
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         bookingId:
 *           type: string
 *           example: "BK_1703123456789"
 *         customerId:
 *           type: string
 *           example: "CUST_1234567890"
 *         customerName:
 *           type: string
 *           example: "John Doe"
 *         customerEmail:
 *           type: string
 *           example: "john.doe@email.com"
 *         customerPhone:
 *           type: string
 *           example: "+94712345678"
 *         services:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 example: "Hair Cut"
 *               subService:
 *                 type: string
 *                 example: "Women's Hair Cut & Style"
 *               price:
 *                 type: number
 *                 example: 2500
 *         datetime:
 *           type: string
 *           format: date-time
 *           example: "2024-12-25T14:30"
 *         staff:
 *           type: string
 *           example: "Lewis Fernandiz"
 *         totalAmount:
 *           type: number
 *           example: 5000
 *         status:
 *           type: string
 *           enum: [pending, confirmed, completed, cancelled]
 *           example: "pending"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingRequest'
 *     responses:
 *       201:
 *         description: Booking created successfully
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
 *                   example: "Booking created successfully!"
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad request - missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields"
 *                 message:
 *                   type: string
 *                   example: "All fields are required: items, datetime, staff, subtotal"
 *       500:
 *         description: Internal server error
 */
router.post('/', createBooking);

/**
 * @swagger
 * /bookings/customer/{customerId}:
 *   get:
 *     summary: Get bookings by customer ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *         example: "CUST_1234567890"
 *     responses:
 *       200:
 *         description: Customer bookings retrieved successfully
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
 *                   example: "Customer bookings retrieved successfully"
 *                 bookings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Missing customer ID
 *       500:
 *         description: Internal server error
 */
router.get('/customer/:customerId', getBookingsByCustomer);

/**
 * @swagger
 * /bookings/{id}/status:
 *   put:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Booking ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, completed, cancelled]
 *                 description: New status for the booking
 *                 example: "completed"
 *               paymentStatus:
 *                 type: string
 *                 enum: [pending, completed]
 *                 description: Payment status
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Booking updated successfully
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
 *                   example: "Booking updated successfully"
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Missing booking ID
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id/status', updateBookingStatus);

module.exports = router;