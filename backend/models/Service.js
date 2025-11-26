const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: '/salon logo.jpg'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  categoryImage: {
    type: String,
    default: '/salon logo.jpg'
  },
  subServices: [subServiceSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create an index for better performance
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ slug: 1, isActive: 1 });

module.exports = mongoose.model('Service', serviceSchema);