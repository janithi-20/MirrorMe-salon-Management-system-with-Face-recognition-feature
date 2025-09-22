import React, { useState } from 'react';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, message, rating };
    console.log('Feedback submitted:', payload);
    alert('Thank you for your feedback!');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add Feedback</h3>
        <form onSubmit={handleSubmit} className="feedback-form">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>
          <label>
            Message
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your feedback" />
          </label>
          <label>
            Rating
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
