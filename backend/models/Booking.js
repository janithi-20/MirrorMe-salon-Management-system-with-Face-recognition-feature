const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  customerId: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    default: ''
  },
  services: [{
    service: String,
    subService: String,
    price: Number
  }],
  datetime: {
    type: Date,
    required: true
  },
  staff: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  isNew: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true, // This adds createdAt and updatedAt automatically
  suppressReservedKeysWarning: true // Suppress the isNew warning
});

// Create a virtual for date and time for backward compatibility with existing dashboard
bookingSchema.virtual('date').get(function() {
  return this.datetime.toISOString().split('T')[0];
});

bookingSchema.virtual('time').get(function() {
  return this.datetime.toTimeString().split(' ')[0];
});

// Ensure virtual fields are included when converting to JSON
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Booking', bookingSchema);