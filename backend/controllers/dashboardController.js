// controllers/dashboardController.js

// Sample data storage (in a real app, this would come from a database)
let bookings = [
  { id: 1, service: 'Brightening Clean Up (Ume Care)', client: 'Ledner Tobin', date: '2025-10-20', time: '12:45 PM', status: 'confirmed', amount: 3500, isNew: false },
  { id: 2, service: 'Cut & Re-Style (Advance)', client: 'Ashley Mackenzie', date: '2025-10-20', time: '02:15 PM', status: 'confirmed', amount: 4500, isNew: true },
  { id: 3, service: 'Full Dressing Derma', client: 'Mackee Rose', date: '2025-10-20', time: '02:15 PM', status: 'confirmed', amount: 6000, isNew: false },
  { id: 4, service: 'Hair Treatment', client: 'John Smith', date: '2025-10-19', time: '10:00 AM', status: 'completed', amount: 2500, isNew: true },
  { id: 5, service: 'Facial Treatment', client: 'Sarah Johnson', date: '2025-10-19', time: '03:30 PM', status: 'completed', amount: 4000, isNew: false },
  { id: 6, service: 'Manicure & Pedicure', client: 'Emma Wilson', date: '2025-10-18', time: '11:00 AM', status: 'completed', amount: 3000, isNew: true },
  { id: 7, service: 'Hair Coloring', client: 'Mike Brown', date: '2025-10-18', time: '01:00 PM', status: 'cancelled', amount: 0, isNew: false },
  { id: 8, service: 'Eyebrow Threading', client: 'Lisa Davis', date: '2025-10-17', time: '09:00 AM', status: 'completed', amount: 1500, isNew: true },
];

let feedbacks = [
  { id: 1, name: 'Alice Johnson', message: 'Excellent service! Very professional staff.', rating: 5, timestamp: '2025-10-19T10:30:00Z', status: 'received' },
  { id: 2, name: 'Bob Smith', message: 'Great experience, will definitely come back.', rating: 5, timestamp: '2025-10-18T14:15:00Z', status: 'received' },
  { id: 3, name: 'Carol Williams', message: 'Good service but a bit expensive.', rating: 4, timestamp: '2025-10-17T16:45:00Z', status: 'received' },
  { id: 4, name: 'David Brown', message: 'Amazing transformation! Love my new look.', rating: 5, timestamp: '2025-10-16T11:20:00Z', status: 'received' },
];

// Import auth controller to access users
const authController = require('./authController');

const getDashboardStats = async (req, res) => {
  try {
    // Calculate total registered customers
    const totalCustomers = authController.users ? authController.users.length : 0;
    
    // Calculate total revenue from completed bookings
    const completedBookings = bookings.filter(booking => booking.status === 'completed');
    const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.amount, 0);
    
    // Total bookings count
    const totalBookings = bookings.length;
    
    // Weekly booking trends (last 7 days)
    const today = new Date();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const bookingTrend = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = weekDays[date.getDay()];
      const dateStr = date.toISOString().split('T')[0];
      
      const dayBookings = bookings.filter(booking => booking.date === dateStr);
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
    const walkInBookings = Math.floor(totalBookings * 0.25); // 25% walk-in
    const phoneBookings = totalBookings - onlineBookings - walkInBookings; // remaining through phone
    
    // Booking status counts
    const statusCounts = {
      booked: bookings.filter(b => b.status === 'booked').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length
    };
    
    // Upcoming bookings (today's confirmed bookings)
    const todayStr = today.toISOString().split('T')[0];
    const upcomingBookings = bookings
      .filter(booking => booking.date === todayStr && booking.status === 'confirmed')
      .map(booking => ({
        id: booking.id,
        service: booking.service,
        client: booking.client,
        time: booking.time,
        status: booking.status
      }));

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
        },
        {
          type: 'team',
          message: 'Team member added new service',
          time: '1 day ago',
          icon: 'users'
        },
        {
          type: 'revenue',
          message: 'Monthly revenue increased by 15%',
          time: '2 days ago',
          icon: 'trending-up'
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
    // In a real app, you'd fetch from database with pagination
    const customers = authController.users || [];
    
    const customerData = customers.map(user => ({
      id: user.id,
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
    const feedbackData = feedbacks.map(feedback => ({
      id: feedback.id,
      name: feedback.name,
      message: feedback.message,
      rating: feedback.rating,
      timestamp: feedback.timestamp,
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
    const bookingData = bookings.map(booking => ({
      id: booking.id,
      service: booking.service,
      customer: booking.client || booking.customer, // Support both field names
      date: booking.date,
      time: booking.time,
      status: booking.status,
      amount: booking.amount,
      isNew: booking.isNew
    }));

    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      bookings: bookingData, // Change from 'data' to 'bookings'
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
  getBookings,
  bookings, // Export bookings array for use in other controllers
  feedbacks // Export feedbacks array for use in other controllers
};