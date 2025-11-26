const mongoose = require('mongoose');
const Booking = require('./models/Booking');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/salon-management');

async function checkBookings() {
  try {
    console.log('Checking all bookings in database...');
    
    const allBookings = await Booking.find({});
    console.log(`Total bookings found: ${allBookings.length}`);
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    console.log('Today is:', todayStr);
    
    console.log('\nAll bookings:');
    allBookings.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.customerName}`);
      console.log(`   ID: ${booking._id}`);
      console.log(`   DateTime: ${booking.datetime}`);
      console.log(`   Date (virtual): ${booking.date}`);
      console.log(`   Time (virtual): ${booking.time}`);
      console.log(`   Status: ${booking.status}`);
      console.log(`   Is Today: ${booking.date === todayStr}`);
      console.log(`   Should Show: ${booking.date === todayStr && ['confirmed', 'pending'].includes(booking.status)}`);
      console.log('---');
    });
    
    // Filter for today's bookings
    const todaysBookings = allBookings.filter(booking => {
      return booking.date === todayStr && ['confirmed', 'pending'].includes(booking.status);
    });
    
    console.log(`\nBookings for today (${todayStr}): ${todaysBookings.length}`);
    todaysBookings.forEach(booking => {
      console.log(`- ${booking.customerName}: ${booking.services[0].service} at ${booking.time} (${booking.status})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking bookings:', error);
    process.exit(1);
  }
}

checkBookings();