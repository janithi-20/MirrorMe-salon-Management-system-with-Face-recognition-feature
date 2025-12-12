const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');

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

// GET /admin/customers
// Returns a list of registered customers (non-sensitive fields only)
router.get('/customers', async (req, res) => {
  try {
    const users = await User.find({}).select('customerId firstName lastName email phoneNumber isVerified createdAt');
    res.status(200).json({ success: true, total: users.length, customers: users });
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// PUT /admin/customers/:id - admin update of a customer by _id or customerId
router.put('/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body || {};
    console.log('admin PUT /admin/customers/:id called. id=', id, 'updates=', updates);

    if (!id) return res.status(400).json({ success: false, message: 'Missing id' });

    let user = null;
    try { user = await User.findById(id); } catch (e) { user = null; }
    if (!user) user = await User.findOne({ customerId: id });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const allowed = ['firstName', 'lastName', 'email', 'phoneNumber', 'isVerified'];
    allowed.forEach(k => {
      if (typeof updates[k] !== 'undefined') {
        user[k] = (k === 'email' && updates[k]) ? String(updates[k]).toLowerCase() : updates[k];
      }
    });

    await user.save();

    res.status(200).json({ success: true, message: 'Customer updated', user: {
      _id: user._id,
      customerId: user.customerId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isVerified: user.isVerified
    }});
  } catch (err) {
    console.error('Admin update customer error', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

