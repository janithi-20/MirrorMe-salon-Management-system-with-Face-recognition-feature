const mongoose = require('mongoose');
const Booking = require('./models/Booking');


mongoose.connect('mongodb://localhost:27017/salon-management');

async function createTestBooking() {
  try {
    console.log('Creating test booking for today...');
    
    
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    console.log('Today is:', todayStr);
    
    const testBooking = new Booking({
      bookingId: `TEST-${Date.now()}`,
      customerId: 'test-customer-001',
      customerName: 'John Test',
      customerEmail: 'john.test@example.com',
      customerPhone: '+94123456789',
      services: [{
        service: 'Hair Cut',
        subService: 'Classic Cut',
        price: 2500
      }],
      datetime: new Date(),
      staff: 'Sarah Wilson',
      totalAmount: 2500,
      status: 'confirmed',  
      isNew: false
    });
    
    await testBooking.save();
    console.log('✅ Test booking created successfully!');
    console.log('Booking details:', {
      id: testBooking._id,
      customer: testBooking.customerName,
      service: testBooking.services[0].service,
      date: testBooking.date,
      time: testBooking.time,
      status: testBooking.status,
      staff: testBooking.staff
    });
    
    
    const testBooking2 = new Booking({
      bookingId: `TEST-${Date.now() + 1}`,
      customerId: 'test-customer-002',
      customerName: 'Jane Test',
      customerEmail: 'jane.test@example.com',
      customerPhone: '+94123456780',
      services: [{
        service: 'Facial Treatment',
        subService: 'Deep Cleansing',
        price: 3500
      }],
      datetime: new Date(),
      staff: 'Emily Chen',
      totalAmount: 3500,
      status: 'confirmed',  
      isNew: true
    });
    
    await testBooking2.save();
    console.log('✅ Second test booking created successfully!');
    console.log('Booking details:', {
      id: testBooking2._id,
      customer: testBooking2.customerName,
      service: testBooking2.services[0].service,
      date: testBooking2.date,
      time: testBooking2.time,
      status: testBooking2.status,
      staff: testBooking2.staff
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test booking:', error);
    process.exit(1);
  }
}

createTestBooking();