const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const Feedback = require('./models/Feedback');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salon_management');
    console.log('✅ MongoDB connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Booking.deleteMany({});
    await Feedback.deleteMany({});
    
    // Sample bookings
    const sampleBookings = [
      {
        bookingId: 'BK_1729468800000',
        customerId: 'CUST_001',
        customerName: 'Ledner Tobin',
        customerEmail: 'ledner.tobin@email.com',
        customerPhone: '+1234567890',
        services: [
          { service: 'Facial Treatment', subService: 'Brightening Clean Up (Ume Care)', price: 3500 }
        ],
        datetime: new Date('2025-10-20T12:45:00'),
        staff: 'Sarah Johnson',
        totalAmount: 3500,
        status: 'confirmed',
        isNew: false
      },
      {
        bookingId: 'BK_1729469700000',
        customerId: 'GUEST',
        customerName: 'Ashley Mackenzie',
        customerEmail: 'ashley.mackenzie@email.com',
        customerPhone: '+1234567891',
        services: [
          { service: 'Hair Treatment', subService: 'Cut & Re-Style (Advance)', price: 4500 }
        ],
        datetime: new Date('2025-10-20T14:15:00'),
        staff: 'Mike Brown',
        totalAmount: 4500,
        status: 'confirmed',
        isNew: true
      }
    ];

    // Sample feedbacks
    const sampleFeedbacks = [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        message: 'Excellent service! Very professional staff.',
        rating: 5,
        status: 'received'
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@email.com',
        message: 'Great experience, will definitely come back.',
        rating: 5,
        status: 'received'
      }
    ];

    // Insert sample data
    await Booking.insertMany(sampleBookings);
    await Feedback.insertMany(sampleFeedbacks);

    console.log('✅ Sample data seeded successfully!');
    console.log(`📊 Created ${sampleBookings.length} bookings`);
    console.log(`💬 Created ${sampleFeedbacks.length} feedbacks`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run if called directly
if (require.main === module) {
  connectDB().then(() => seedData());
}

module.exports = { seedData };