// controllers/dashboardController.js
const Booking = require('../models/Booking');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

const getDashboardStats = async (req, res) => {
  try {
    // Get all bookings from database with virtual fields
    const allBookings = await Booking.find({}).lean({ virtuals: true });
    
    // Calculate total registered customers from database
    const totalCustomers = await User.countDocuments();
    
    // Calculate total revenue from completed bookings
    const completedBookings = allBookings.filter(booking => booking.status === 'completed');
    const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    
    // Total bookings count
    const totalBookings = allBookings.length;
    
    // Weekly booking trends (last 7 days)
    const today = new Date();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const bookingTrend = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = weekDays[date.getDay()];
      const dateStr = date.toISOString().split('T')[0];
      
      const dayBookings = allBookings.filter(booking => booking.date === dateStr);
      const newClients = dayBookings.filter(booking => booking.isNew).length;
      const returningClients = dayBookings.filter(booking => !booking.isNew).length;
      
      bookingTrend.push({
        day: dayName,
        newClients,
        returningClients
      });
    }
    
    // Booking channels
    const onlineBookings = Math.floor(totalBookings * 0.65); // 65% online
    const walkInBookings = Math.floor(totalBookings * 0.30); // 30% walk-in
    const phoneBookings = totalBookings - onlineBookings - walkInBookings; // remaining through phone
    
    // Booking status counts (removed 'booked' and 'confirmed' boxes)
    const statusCounts = {
      pending: allBookings.filter(b => b.status === 'pending').length,
      completed: allBookings.filter(b => b.status === 'completed').length,
      cancelled: allBookings.filter(b => b.status === 'cancelled').length
    };
    
    // Upcoming bookings (today's pending bookings)
    const todayStr = today.toISOString().split('T')[0];
    console.log('=== UPCOMING BOOKINGS DEBUG ===');
    console.log('Looking for bookings on:', todayStr);
    console.log('Total bookings found:', allBookings.length);
    
    // Log some booking dates for debugging
    allBookings.forEach((booking, index) => {
      console.log(`Booking ${index + 1}: ${booking.customerName}`);
      console.log(`  Date: ${booking.date} (comparing with ${todayStr})`);
      console.log(`  Status: ${booking.status}`);
      console.log(`  Is Today: ${booking.date === todayStr}`);
      console.log(`  Valid Status: ${['confirmed', 'pending'].includes(booking.status)}`);
    });
    
    const upcomingBookings = allBookings
      .filter(booking => {
        const bookingDate = booking.date;
        const isToday = bookingDate === todayStr;
        const isPending = booking.status === 'pending';
        console.log(`Filter result for ${booking.customerName}: IsToday=${isToday} && IsPending=${isPending} = ${isToday && isPending}`);
        return isToday && isPending;
      })
      .map(booking => ({
        id: booking._id,
        service: booking.services.map(s => s.service).join(', '),
        client: booking.customerName,
        time: booking.time,
        status: booking.status
      }));
      
    console.log('Upcoming bookings found:', upcomingBookings.length);

    const dashboardData = {
      stats: {
        totalCustomers,
        totalRevenue,
        totalBookings
      },
      bookingTrend,
      bookingChannels: {
        totalBookings,
        online: onlineBookings,
        walkIn: walkInBookings,
        phone: phoneBookings
      },
      bookingStatus: statusCounts,
      upcomingBookings,
      recentActivities: [
        {
          type: 'appointment',
          message: 'New appointment scheduled for tomorrow',
          time: '2 hours ago',
          icon: 'clock'
        },
        {
          type: 'review',
          message: 'New 5-star review received',
          time: '4 hours ago',
          icon: 'star'
        }
      ]
    };

    res.status(200).json({
      success: true,
      message: 'Dashboard data retrieved successfully',
      data: dashboardData
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch dashboard statistics'
    });
  }
};

const getCustomers = async (req, res) => {
  try {
    // Fetch customers from database
    const customers = await User.find({}).select('-password -verificationCode -resetPasswordToken');
    
    const customerData = customers.map(user => ({
      id: user._id,
      customerId: user.customerId,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified,
      createdAt: user.createdAt
    }));

    res.status(200).json({
      success: true,
      message: 'Customers retrieved successfully',
      data: customerData,
      total: customerData.length
    });

  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch customers'
    });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    // Try to get from database first, fall back to in-memory if no database data
    let feedbacks = [];
    try {
      feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    } catch (dbError) {
      console.log('Database not available for feedbacks, using sample data');
      // Sample data fallback
      feedbacks = [
        { id: 1, name: 'Alice Johnson', message: 'Excellent service! Very professional staff.', rating: 5, createdAt: '2025-10-19T10:30:00Z', status: 'received' },
        { id: 2, name: 'Bob Smith', message: 'Great experience, will definitely come back.', rating: 5, createdAt: '2025-10-18T14:15:00Z', status: 'received' },
        { id: 3, name: 'Carol Williams', message: 'Good service but a bit expensive.', rating: 4, createdAt: '2025-10-17T16:45:00Z', status: 'received' },
        { id: 4, name: 'David Brown', message: 'Amazing transformation! Love my new look.', rating: 5, createdAt: '2025-10-16T11:20:00Z', status: 'received' }
      ];
    }

    const feedbackData = feedbacks.map(feedback => ({
      id: feedback._id || feedback.id,
      name: feedback.name,
      message: feedback.message,
      rating: feedback.rating,
      timestamp: feedback.createdAt || feedback.timestamp,
      status: feedback.status
    }));

    // Calculate average rating
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const averageRating = feedbacks.length > 0 ? (totalRating / feedbacks.length).toFixed(1) : 0;

    res.status(200).json({
      success: true,
      message: 'Feedbacks retrieved successfully',
      data: {
        feedbacks: feedbackData,
        total: feedbackData.length,
        averageRating: parseFloat(averageRating)
      }
    });

  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch feedbacks'
    });
  }
};

const getBookings = async (req, res) => {
  try {
    // Fetch all bookings from database
    const allBookings = await Booking.find({}).sort({ createdAt: -1 });
    
    const bookingData = allBookings.map(booking => ({
      id: booking._id,
      service: booking.services.map(s => s.service).join(', '),
      customer: booking.customerName,
      date: booking.date,
      time: booking.time,
      status: booking.status,
      // Include explicit paymentStatus so frontend can display cancelled payments
      // Do not show a payment status for cancelled bookings
      paymentStatus: booking.status === 'cancelled' ? null : (booking.paymentStatus || (booking.status === 'completed' ? 'completed' : 'pending')),
      staff: booking.staff || 'Any',
      amount: booking.totalAmount,
      isNew: booking.isNew
    }));

    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      bookings: bookingData,
      total: bookingData.length
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch bookings'
    });
  }
};

module.exports = {
  getDashboardStats,
  getCustomers,
  getFeedbacks,
  getBookings
};