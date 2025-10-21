import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './FeedbackManage.css';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: 'Sonali De Silva',
      rating: 5,
      comment: 'They remember my preferences and service history, which makes me feel valued.',
      status: 'approved',
      showOnMainPage: true,
      date: '2025-10-03'
    },
    {
      id: 2,
      name: 'Michael Fernando',
      rating: 4,
      comment: 'The face recognition feature is a game-changer! It speeds up check-in and adds a personal touch.',
      status: 'approved',
      showOnMainPage: true,
      date: '2025-10-02'
    },
    {
      id: 3,
      name: 'Jessica Perera',
      rating: 4,
      comment: 'Booking appointments online is so easy and convenient compared to calling.',
      status: 'pending',
      showOnMainPage: false,
      date: '2025-10-01'
    },
    {
      id: 4,
      name: 'Rajitha Silva',
      rating: 2,
      comment: 'Service was okay but the waiting time was too long.',
      status: 'declined',
      showOnMainPage: false,
      date: '2025-09-30'
    }
  ]);

  return (
    <div className="section-content">
      <h2>Customer Feedback Management</h2>
      <div className="feedback-stats">
        <div className="feedback-stat">
          <span className="stat-number">{feedbacks.length}</span>
          <span className="stat-label">Total Feedback</span>
        </div>
        <div className="feedback-stat">
          <span className="stat-number">{feedbacks.filter(f => f.showOnMainPage).length}</span>
          <span className="stat-label">Showing on Site</span>
        </div>
      </div>
      
      <div className="feedback-list">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <div className="feedback-content">
              <div className="feedback-header">
                <div className="feedback-user-info">
                  <h4>{feedback.name}</h4>
                  <div className="feedback-meta">
                    <div className="rating">
                      {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
                    </div>
                    <span className="feedback-date">{feedback.date}</span>
                  </div>
                </div>
                <div className="feedback-status-badges">
                  <span className={`visibility-badge ${feedback.showOnMainPage ? 'visible' : 'hidden'}`}>
                    {feedback.showOnMainPage ? (
                      <>
                        <FiEye size={12} />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <FiEyeOff size={12} />
                        <span>Hidden</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
              
              <p className="feedback-comment">"{feedback.comment}"</p>
              
              <div className="feedback-actions">
                <div className="visibility-controls">
                  <label>
                    <input
                      type="checkbox"
                      checked={feedback.showOnMainPage}
                      onChange={(e) => {
                        setFeedbacks(prevFeedbacks =>
                          prevFeedbacks.map(f =>
                            f.id === feedback.id
                              ? { ...f, showOnMainPage: e.target.checked }
                              : f
                          )
                        );
                      }}
                      className="visibility-checkbox"
                    />
                    Show on main page
                  </label>
                </div>
                
                <div className="quick-actions">
                  <button
                    className="quick-show-btn"
                    onClick={() => {
                      setFeedbacks(prevFeedbacks =>
                        prevFeedbacks.map(f =>
                          f.id === feedback.id
                            ? { ...f, showOnMainPage: true }
                            : f
                        )
                      );
                    }}
                    disabled={feedback.showOnMainPage}
                  >
                    <FiEye size={14} />
                    Show on Site
                  </button>
                  
                  <button
                    className="quick-hide-btn"
                    onClick={() => {
                      setFeedbacks(prevFeedbacks =>
                        prevFeedbacks.map(f =>
                          f.id === feedback.id
                            ? { ...f, showOnMainPage: false }
                            : f
                        )
                      );
                    }}
                    disabled={!feedback.showOnMainPage}
                  >
                    <FiEyeOff size={14} />
                    Hide from Site
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackManagement;
