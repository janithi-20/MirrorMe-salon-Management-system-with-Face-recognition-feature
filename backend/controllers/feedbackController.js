const Feedback = require('../models/Feedback');
const User = require('../models/User');

// Submit new feedback (requires authentication)
const submitFeedback = async (req, res) => {
  try {
    const { userId, name, message, rating } = req.body;
    
    console.log('📝 Feedback submission request:', { 
      userId, 
      name, 
      message: message ? `${message.substring(0, 50)}...` : 'undefined',
      rating,
      fullBody: req.body 
    });
    
    // Validate required fields with detailed logging
    if (!userId || !name || !message || rating === undefined || rating === null) {
      console.log('❌ Validation failed:', {
        userId: !!userId,
        name: !!name, 
        message: !!message,
        rating: rating,
        ratingType: typeof rating
      });
      return res.status(400).json({
        success: false,
        message: 'User ID, name, message, and rating are required'
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Validate message length
    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters long'
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    console.log('👤 User lookup result:', { 
      userId, 
      userFound: !!user,
      userEmail: user?.email || 'not found'
    });
    
    if (!user) {
      console.log('⚠️ User not found in database. This might be a test user.');
      
      // For development/testing: Allow submission without user validation
      // In production, you would want to enforce user validation
      if (process.env.NODE_ENV !== 'production') {
        console.log('🧪 Development mode: Creating feedback without user validation');
        
        // Create a temporary ObjectId for test submissions
        const mongoose = require('mongoose');
        const tempUserId = new mongoose.Types.ObjectId();
        
        const feedback = await Feedback.create({
          user: tempUserId, // Use temporary ObjectId instead of null
          name: name.trim(),
          email: 'test@example.com', // Default email for test submissions
          message: message.trim(),
          rating: parseInt(rating),
          status: 'pending'
        });
        
        console.log('✅ Test feedback created successfully:', feedback._id);
        
        return res.status(201).json({
          success: true,
          message: 'Test feedback submitted successfully. It will be reviewed before appearing publicly.',
          data: {
            id: feedback._id,
            status: feedback.status,
            createdAt: feedback.createdAt
          }
        });
      }
      
      return res.status(404).json({
        success: false,
        message: 'User not found. Please log in again.'
      });
    }

    // Check if user has already submitted feedback recently (within 24 hours)
    const recentFeedback = await Feedback.findOne({
      user: userId,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (recentFeedback) {
      return res.status(429).json({
        success: false,
        message: 'You can only submit one feedback per day. Please try again tomorrow.'
      });
    }

    // Create new feedback
    const feedback = await Feedback.create({
      user: userId,
      name: name.trim(),
      email: user.email,
      message: message.trim(),
      rating: parseInt(rating),
      status: 'pending'
    });

    console.log('✅ Feedback created successfully:', feedback._id);

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully. It will be reviewed before appearing publicly.',
      data: {
        id: feedback._id,
        status: feedback.status,
        createdAt: feedback.createdAt
      }
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback. Please try again.'
    });
  }
};

// Get all approved feedback for public display
const getApprovedFeedback = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    
    const feedback = await Feedback.find({ status: 'approved' })
      .sort({ approvedAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('user', 'firstName lastName')
      .select('name message rating createdAt approvedAt');

    const total = await Feedback.countDocuments({ status: 'approved' });

    res.status(200).json({
      success: true,
      data: feedback,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching approved feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback'
    });
  }
};

// Get all feedback for admin (pending, approved, rejected)
const getAllFeedbackAdmin = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    let filter = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      filter.status = status;
    }

    const feedback = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('user', 'firstName lastName email customerId');

    const total = await Feedback.countDocuments(filter);
    
    // Get counts by status
    const statusCounts = await Feedback.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const counts = {
      pending: 0,
      approved: 0,
      rejected: 0
    };
    
    statusCounts.forEach(item => {
      counts[item._id] = item.count;
    });

    res.status(200).json({
      success: true,
      data: feedback,
      counts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Error fetching feedback for admin:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback'
    });
  }
};

// Approve feedback
const approveFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminResponse } = req.body;
    
    console.log('👍 Approving feedback:', id);
    
    const feedback = await Feedback.findById(id);
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    if (feedback.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending feedback can be approved'
      });
    }

    feedback.status = 'approved';
    feedback.approvedAt = new Date();
    feedback.approvedBy = 'Admin'; // You can get this from auth context
    if (adminResponse) {
      feedback.adminResponse = adminResponse.trim();
    }

    await feedback.save();

    console.log('✅ Feedback approved successfully');

    res.status(200).json({
      success: true,
      message: 'Feedback approved successfully',
      data: feedback
    });

  } catch (error) {
    console.error('Error approving feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve feedback'
    });
  }
};

// Reject feedback
const rejectFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    console.log('❌ Rejecting feedback:', id);
    
    const feedback = await Feedback.findById(id);
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    if (feedback.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending feedback can be rejected'
      });
    }

    feedback.status = 'rejected';
    if (reason) {
      feedback.adminResponse = reason.trim();
    }

    await feedback.save();

    console.log('✅ Feedback rejected successfully');

    res.status(200).json({
      success: true,
      message: 'Feedback rejected successfully',
      data: feedback
    });

  } catch (error) {
    console.error('Error rejecting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject feedback'
    });
  }
};

// Delete feedback (admin only)
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('🗑️ Deleting feedback:', id);
    
    const feedback = await Feedback.findByIdAndDelete(id);
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    console.log('✅ Feedback deleted successfully');

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback'
    });
  }
};

// Get feedback statistics
const getFeedbackStats = async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          pendingCount: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          approvedCount: {
            $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
          },
          rejectedCount: {
            $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalFeedback: 0,
      averageRating: 0,
      pendingCount: 0,
      approvedCount: 0,
      rejectedCount: 0
    };

    res.status(200).json({
      success: true,
      data: {
        ...result,
        averageRating: Math.round(result.averageRating * 10) / 10
      }
    });

  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback statistics'
    });
  }
};

module.exports = {
  submitFeedback,
  getApprovedFeedback,
  getAllFeedbackAdmin,
  approveFeedback,
  rejectFeedback,
  deleteFeedback,
  getFeedbackStats
};