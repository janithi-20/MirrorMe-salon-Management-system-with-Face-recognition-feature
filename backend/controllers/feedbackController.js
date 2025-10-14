// controllers/feedbackController.js
const submitFeedback = async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    
    // Validate required fields
    if (!name || !message || !rating) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Name, message, and rating are required'
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: 'Invalid rating',
        message: 'Rating must be between 1 and 5'
      });
    }

    // Here you would typically save to database
    // For now, we'll just log and return success
    const feedback = {
      id: Date.now(), // temporary ID
      name: name.trim(),
      message: message.trim(),
      rating: parseInt(rating),
      timestamp: new Date().toISOString(),
      status: 'received'
    };

    console.log('New feedback received:', feedback);

    // In a real app, you would save to database:
    // await Feedback.create(feedback);

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to submit feedback'
    });
  }
};

module.exports = {
  submitFeedback
};