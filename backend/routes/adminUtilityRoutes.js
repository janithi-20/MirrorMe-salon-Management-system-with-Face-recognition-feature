const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

/**
 * POST /admin/fix-cancelled-payments
 * One-off admin utility to set paymentStatus='cancelled' for bookings
 * where status === 'cancelled' but paymentStatus is not 'cancelled'.
 * Returns counts of matched and modified documents.
 */
router.post('/fix-cancelled-payments', async (req, res) => {
  try {
    const filter = { status: 'cancelled', paymentStatus: { $ne: 'cancelled' } };
    const update = { $set: { paymentStatus: 'cancelled' } };

    const result = await Booking.updateMany(filter, update);

    // support multiple driver result shapes
    const matched = result.matchedCount || result.n || 0;
    const modified = result.modifiedCount || result.nModified || 0;

    res.status(200).json({ success: true, matched, modified });
  } catch (err) {
    console.error('Admin utility error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
