import React, { useState } from 'react';
import './FeedbackModal.css';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const payload = { name, message, rating };
    console.log('Feedback submitted:', payload);
    alert('Thank you for your feedback!');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal review-modal" onClick={(e) => e.stopPropagation()}>
        <div className="review-header">
          <div>
            <h3>Rate & review</h3>
            <div className="review-sub">Mirror Me Salon</div>
          </div>
          <div className="review-avatar">{name ? name.charAt(0).toUpperCase() : 'U'}</div>
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
            <div className="review-name">{name || 'Your review will be posted publicly'}</div>
          </div>

          <textarea
            className="review-textarea"
            placeholder="Describe your experience"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="name-row">
            <input
              className="name-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-actions review-actions">
          <button type="button" className="btn btn-link" onClick={onClose}>CANCEL</button>
          <button
            type="button"
            className="btn"
            disabled={!message.trim()}
            onClick={handleSubmit}
          >
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
