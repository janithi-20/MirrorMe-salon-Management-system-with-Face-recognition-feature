// controllers/bookingController.js
const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { items, datetime, staff, subtotal, customerInfo } = req.body;
    
    // Validate required fields
    if (!items || !datetime || !staff || subtotal === undefined) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'All fields are required: items, datetime, staff, subtotal'
      });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Invalid items',
        message: 'At least one service item is required'
      });
    }

    // Create new booking
    const newBooking = new Booking({
      bookingId: `BK_${Date.now()}`,
      customerId: customerInfo?.customerId || 'GUEST',
      customerName: customerInfo?.firstName && customerInfo?.lastName 
        ? `${customerInfo.firstName} ${customerInfo.lastName}` 
        : customerInfo?.email || 'Guest Customer',
      customerEmail: customerInfo?.email || '',
      customerPhone: customerInfo?.phoneNumber || '',
      services: items.map(item => ({
        service: item.service,
        subService: item.label,
        price: item.price
      })),
      datetime: new Date(datetime),
      staff: staff,
      totalAmount: subtotal,
      status: 'pending',
      isNew: !customerInfo?.customerId // Mark as new if no customer ID (guest booking)
    });

    // Save to database
    const savedBooking = await newBooking.save();

    console.log('New booking created:', { 
      bookingId: savedBooking.bookingId, 
      customer: savedBooking.customerName,
      services: savedBooking.services.length,
      amount: subtotal
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Booking created successfully!',
      booking: savedBooking
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while creating the booking. Please try again.'
    });
  }
};

const getBookingsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    if (!customerId) {
      return res.status(400).json({
        error: 'Missing customer ID',
        message: 'Customer ID is required'
      });
    }

    // Filter bookings by customer ID from database
    const customerBookings = await Booking.find({ customerId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Customer bookings retrieved successfully',
      bookings: customerBookings
    });

  } catch (error) {
    console.error('Get customer bookings error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while retrieving bookings. Please try again.'
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;
    
    if (!id) {
      return res.status(400).json({
        error: 'Missing booking ID',
        message: 'Booking ID is required'
      });
    }

    // Find booking in database
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found',
        message: `No booking found with ID: ${id}`
      });
    }

    // Update the booking
    if (status) {
      booking.status = status;
      // If booking is cancelled, clear paymentStatus so frontend shows no payment badge
      if (status === 'cancelled') {
        booking.paymentStatus = null;
      }
    }
    
    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
      // If payment received, mark as completed
      if (paymentStatus === 'completed') {
        booking.status = 'completed';
      }
    }

    // Save updates
    const updatedBooking = await booking.save();

    console.log('Booking updated:', { 
      bookingId: id, 
      newStatus: updatedBooking.status,
      paymentStatus: updatedBooking.paymentStatus
    });

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while updating the booking. Please try again.'
    });
  }
};

module.exports = {
  createBooking,
  getBookingsByCustomer,
  updateBookingStatus
};