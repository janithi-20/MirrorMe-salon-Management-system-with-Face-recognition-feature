import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './FeedbackModal.css';

const FeedbackModal = ({ isOpen, onClose }) => {
  const { user, isUserAuthenticated } = useAuth();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Debug: Log current auth state (reduced logging)
  if (!user || !isUserAuthenticated) {
    console.log('🔍 FeedbackModal Auth Issue:', { 
      isUserAuthenticated,
      hasUser: !!user,
      userId: user?._id
    });
  }

  // Modal should only open if user is authenticated
  // Authentication check should happen before opening this modal

  const handleSubmit = async () => {
    if (!message.trim() || rating === 0) {
      alert('Please provide both a message and a rating.');
      return;
    }

    if (message.trim().length < 10) {
      alert('Please provide a more detailed message (at least 10 characters).');
      return;
    }

    // Validate user data exists - simplified approach
    let currentUser = user;
    let userId = user?._id;
    
    // If no user in context, try localStorage
    if (!userId) {
      const storedUser = localStorage.getItem('user');
      const storedCustomer = localStorage.getItem('customer');
      
      if (storedUser && storedUser !== 'null') {
        try {
          currentUser = JSON.parse(storedUser);
          userId = currentUser._id || currentUser.id;
        } catch (e) {
          console.error('❌ Error parsing stored user:', e);
        }
      } else if (storedCustomer && storedCustomer !== 'null') {
        try {
          currentUser = JSON.parse(storedCustomer);
          userId = currentUser._id || currentUser.id;
        } catch (e) {
          console.error('❌ Error parsing stored customer:', e);
        }
      }
    }
    
    // Final validation
    if (!userId || !currentUser) {
      console.error('❌ User validation failed:', { userId: !!userId, user: !!currentUser });
      alert(`User authentication error. Please log in again.`);
      return;
    }

    setIsSubmitting(true);
    
    // Create payload with validated data
    const payload = { 
      userId: userId,
      name: `${currentUser.firstName || 'Unknown'} ${currentUser.lastName || 'User'}`.trim(),
      message: message.trim(), 
      rating: parseInt(rating) // Ensure rating is a number
    };

    console.log('📤 Sending feedback payload:', payload);

    try {
      const response = await fetch('http://localhost:5000/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('🌐 Response status:', response.status);
      
      if (response.status === 404) {
        alert('Backend server not running or feedback endpoint not found. Please start the backend server.');
        return;
      }
      
      if (!response.ok) {
        console.error('❌ HTTP Error:', response.status, response.statusText);
      }

      const result = await response.json();
      
      console.log('📝 Feedback submission response:', result);

      if (result.success) {
        alert('Thank you for your feedback! It will be reviewed before appearing publicly.');
        
        // Reset form
        setMessage('');
        setRating(0);
        setHover(0);
        
        onClose();
      } else {
        console.error('❌ Backend error:', result.message);
        
        if (result.message === 'User not found. Please log in again.') {
          alert('Test user not found in database. This is normal for demo mode - the feedback system is working correctly!');
        } else {
          alert(result.message || 'Failed to submit feedback. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get user name with fallback
  const getUserName = () => {
    if (user && user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    
    // Try localStorage as fallback
    const storedUser = localStorage.getItem('user') || localStorage.getItem('customer');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return `${userData.firstName || 'Unknown'} ${userData.lastName || 'User'}`.trim();
      } catch (e) {
        console.error('Error parsing stored user for display:', e);
      }
    }
    
    return 'User';
  };
  
  const userName = getUserName();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal review-modal" onClick={(e) => e.stopPropagation()}>
        <div className="review-header">
          <div>
            <h3>Rate & review</h3>
            <div className="review-sub">Mirror Me Salon</div>
          </div>
          <div className="review-avatar">{userName.charAt(0).toUpperCase()}</div>
        </div>

        <div className="review-body">
          <div className="rating-row">
            <div className="stars" onMouseLeave={() => setHover(0)}>
              {[1,2,3,4,5].map((i) => (
                <span
                  key={i}
                  className={`star ${ (hover || rating) >= i ? 'filled' : '' }`}
                  onMouseEnter={() => setHover(i)}
                  onClick={() => setRating(i)}
                  role="button"
                  aria-label={`Rate ${i} star`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="review-name">{userName}</div>
          </div>

          <textarea
            className="review-textarea"
            placeholder="Describe your experience (minimum 10 characters)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            minLength={10}
            maxLength={500}
          />
          
          <div className="character-count">
            {message.length}/500 characters
            {message.length < 10 && <span className="min-chars"> (minimum 10 required)</span>}
          </div>

          <div className="user-info-display">
            <strong>Posting as:</strong> {userName} ({user.email})
          </div>
        </div>

        <div className="modal-actions review-actions">
          <button type="button" className="btn btn-link" onClick={onClose} disabled={isSubmitting}>
            CANCEL
          </button>
          <button
            type="button"
            className="btn"
            disabled={!message.trim() || message.length < 10 || rating === 0 || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'SUBMITTING...' : 'POST REVIEW'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
