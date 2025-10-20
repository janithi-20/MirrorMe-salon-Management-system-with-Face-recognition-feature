// controllers/bookingController.js

// Import the entire dashboardController to access the bookings array by reference
const dashboardController = require('./dashboardController');

// Initialize nextBookingId to be higher than existing bookings
let nextBookingId = Math.max(...dashboardController.bookings.map(b => b.id), 0) + 1;

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
    const newBooking = {
      id: nextBookingId++,
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
      datetime: datetime,
      staff: staff,
      totalAmount: subtotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to bookings array (this would be saved to database in production)
    dashboardController.bookings.push({
      id: newBooking.id,
      customer: newBooking.customerName,
      date: datetime.split('T')[0], // Extract date part for dashboard compatibility
      time: datetime.split('T')[1] || '00:00', // Extract time part
      service: items.map(item => item.service).join(', '),
      amount: subtotal,
      status: 'pending',
      isNew: !customerInfo?.customerId // Mark as new if no customer ID (guest booking)
    });

    console.log('New booking created:', { 
      bookingId: newBooking.bookingId, 
      customer: newBooking.customerName,
      services: newBooking.services.length,
      amount: subtotal
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Booking created successfully!',
      booking: newBooking
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

    // Filter bookings by customer ID
    const customerBookings = dashboardController.bookings.filter(booking => booking.customerId === customerId);

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

    // Find and update the booking in the bookings array
    console.log('Looking for booking with ID:', id, 'Parsed ID:', parseInt(id));
    console.log('Available bookings:', dashboardController.bookings.map(b => ({id: b.id, customer: b.customer || b.client})));
    
    const bookingIndex = dashboardController.bookings.findIndex(booking => booking.id === parseInt(id));
    
    if (bookingIndex === -1) {
      return res.status(404).json({
        error: 'Booking not found',
        message: `No booking found with ID: ${id}. Available IDs: ${dashboardController.bookings.map(b => b.id).join(', ')}`
      });
    }

    // Update the booking
    if (status) {
      dashboardController.bookings[bookingIndex].status = status;
    }
    
    // If payment received, mark as completed
    if (paymentStatus === 'completed') {
      dashboardController.bookings[bookingIndex].status = 'completed';
    }

    console.log('Booking updated:', { 
      bookingId: id, 
      newStatus: status || dashboardController.bookings[bookingIndex].status,
      paymentStatus: paymentStatus
    });

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking: dashboardController.bookings[bookingIndex]
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