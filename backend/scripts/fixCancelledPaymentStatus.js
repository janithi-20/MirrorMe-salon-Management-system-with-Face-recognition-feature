const connectDB = require('../config/database');
const Booking = require('../models/Booking');

/**
 * One-off script to fix existing bookings where status === 'cancelled'
 * but paymentStatus is not set to 'cancelled'.
 *
 * Usage: from backend folder run `node scripts/fixCancelledPaymentStatus.js`
 */

const run = async () => {
  try {
    await connectDB();
    console.log('Connected to DB — starting update');

    const filter = { status: 'cancelled', paymentStatus: { $ne: 'cancelled' } };
    const update = { $set: { paymentStatus: 'cancelled' } };

    const result = await Booking.updateMany(filter, update);

    console.log(`Matched ${result.matchedCount || result.n} documents, modified ${result.modifiedCount || result.nModified}`);
    console.log('Update complete.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating bookings:', err);
    process.exit(1);
  }
};

run();
