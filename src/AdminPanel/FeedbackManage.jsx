import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiEye, FiTrash2, FiStar, FiRefreshCw, FiFilter, FiMessageCircle } from 'react-icons/fi';
import './FeedbackManage_new.css';

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalFeedback: 0,
    averageRating: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0
  });
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [viewingFeedback, setViewingFeedback] = useState(null);
  const [respondingTo, setRespondingTo] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');

  // Fetch all feedback for admin
  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const filterParam = filter !== 'all' ? `?status=${filter}` : '';
      const response = await fetch(`/feedback/admin/all${filterParam}`);
      const data = await response.json();
      
      console.log('📋 Admin Feedback Response:', data);
      
      if (data.success) {
        setFeedback(data.data);
      } else {
        setError('Failed to fetch feedback');
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Fetch feedback statistics
  const fetchStats = async () => {
    try {
      const response = await fetch('/feedback/admin/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching feedback stats:', error);
    }
  };

  // Approve feedback
  const approveFeedback = async (feedbackId) => {
    try {
      const response = await fetch(`/feedback/admin/approve/${feedbackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminResponse: adminResponse || undefined
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Feedback approved');
        await fetchFeedback();
        await fetchStats();
        setRespondingTo(null);
        setAdminResponse('');
        alert('Feedback approved successfully!');
      } else {
        alert(`Failed to approve feedback: ${data.message}`);
      }
    } catch (error) {
      console.error('Error approving feedback:', error);
      alert('Failed to approve feedback. Please try again.');
    }
  };

  // Reject feedback
  const rejectFeedback = async (feedbackId, reason) => {
    try {
      const response = await fetch(`/feedback/admin/reject/${feedbackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: reason || 'Rejected by admin'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('❌ Feedback rejected');
        await fetchFeedback();
        await fetchStats();
        alert('Feedback rejected successfully!');
      } else {
        alert(`Failed to reject feedback: ${data.message}`);
      }
    } catch (error) {
      console.error('Error rejecting feedback:', error);
      alert('Failed to reject feedback. Please try again.');
    }
  };

  // Delete feedback
  const deleteFeedback = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/feedback/admin/${feedbackId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('🗑️ Feedback deleted');
        await fetchFeedback();
        await fetchStats();
        alert('Feedback deleted successfully!');
      } else {
        alert(`Failed to delete feedback: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('Failed to delete feedback. Please try again.');
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
        size={14}
      />
    ));
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  useEffect(() => {
    fetchFeedback();
    fetchStats();
  }, [filter]);

  if (loading && feedback.length === 0) {
    return (
      <div className="section-content">
        <h2>Feedback Management</h2>
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <FiRefreshCw className="spin" size={24} />
          <p>Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-content">
      <div className="feedback-header">
        <h2>Feedback Management</h2>
        <button className="refresh-btn" onClick={() => { fetchFeedback(); fetchStats(); }}>
          <FiRefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="feedback-stats">
        <div className="stat-card">
          <FiMessageCircle className="stat-icon" />
          <div className="stat-content">
            <h3>{stats.totalFeedback}</h3>
            <p>Total Feedback</p>
          </div>
        </div>
        <div className="stat-card">
          <FiStar className="stat-icon" />
          <div className="stat-content">
            <h3>{stats.averageRating}</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ padding: '10px', margin: '10px 0', backgroundColor: '#ffe6e6', color: '#d63384', borderRadius: '5px', border: '1px solid #f5c6cb' }}>
          ⚠️ {error} - Some features may not work properly.
        </div>
      )}

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({stats.totalFeedback})
        </button>
        <button 
          className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({stats.pendingCount})
        </button>
        <button 
          className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved ({stats.approvedCount})
        </button>
        <button 
          className={`filter-tab ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected ({stats.rejectedCount})
        </button>
      </div>

      {/* Feedback List */}
      <div className="feedback-list">
        {feedback.length === 0 ? (
          <div className="no-feedback">
            <FiMessageCircle size={48} color="#ccc" />
            <p>No feedback found</p>
          </div>
        ) : (
          feedback.map((item) => (
            <div key={item._id} className={`feedback-card ${getStatusClass(item.status)}`}>
              <div className="feedback-header-card">
                <div className="user-info">
                  <h4>{item.name}</h4>
                  <p className="user-email">{item.email}</p>
                  <div className="rating">
                    {renderStars(item.rating)}
                    <span className="rating-number">({item.rating}/5)</span>
                  </div>
                </div>
                <div className="feedback-meta">
                  <span className={`status-badge ${getStatusClass(item.status)}`}>
                    {item.status.toUpperCase()}
                  </span>
                  <span className="feedback-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="feedback-message">
                <p>{item.message}</p>
              </div>

              {item.adminResponse && (
                <div className="admin-response">
                  <strong>Admin Response:</strong> {item.adminResponse}
                </div>
              )}

              <div className="feedback-actions">
                {item.status === 'pending' && (
                  <>
                    <button 
                      className="action-btn approve-btn"
                      onClick={() => {
                        setRespondingTo(item._id);
                        setAdminResponse('');
                      }}
                    >
                      <FiCheck size={16} />
                      Approve
                    </button>
                    <button 
                      className="action-btn reject-btn"
                      onClick={() => {
                        const reason = prompt('Reason for rejection (optional):');
                        if (reason !== null) {
                          rejectFeedback(item._id, reason);
                        }
                      }}
                    >
                      <FiX size={16} />
                      Reject
                    </button>
                  </>
                )}
                <button 
                  className="action-btn view-btn"
                  onClick={() => setViewingFeedback(item)}
                >
                  <FiEye size={16} />
                  Details
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => deleteFeedback(item._id)}
                >
                  <FiTrash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Approval Modal */}
      {respondingTo && (
        <div className="modal-backdrop" onClick={() => setRespondingTo(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Approve Feedback</h3>
            <p>Optional admin response (will be visible to public):</p>
            <textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              placeholder="Thank you for your feedback! We're glad you enjoyed your experience..."
              rows={4}
              style={{ width: '100%', minHeight: '80px', resize: 'vertical', marginBottom: '15px' }}
            />
            <div className="modal-actions">
              <button 
                className="approve-btn"
                onClick={() => approveFeedback(respondingTo)}
              >
                <FiCheck size={16} /> Approve
              </button>
              <button 
                className="cancel-btn"
                onClick={() => {
                  setRespondingTo(null);
                  setAdminResponse('');
                }}
              >
                <FiX size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingFeedback && (
        <div className="modal-backdrop" onClick={() => setViewingFeedback(null)}>
          <div className="modal-card view-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Feedback Details</h3>
            <div className="feedback-detail">
              <div className="detail-row">
                <strong>Customer:</strong> {viewingFeedback.name}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {viewingFeedback.email}
              </div>
              <div className="detail-row">
                <strong>Customer ID:</strong> {viewingFeedback.user?.customerId || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Rating:</strong> {renderStars(viewingFeedback.rating)} ({viewingFeedback.rating}/5)
              </div>
              <div className="detail-row">
                <strong>Status:</strong> 
                <span className={`status-badge ${getStatusClass(viewingFeedback.status)}`}>
                  {viewingFeedback.status.toUpperCase()}
                </span>
              </div>
              <div className="detail-row">
                <strong>Submitted:</strong> {new Date(viewingFeedback.createdAt).toLocaleString()}
              </div>
              {viewingFeedback.approvedAt && (
                <div className="detail-row">
                  <strong>Approved:</strong> {new Date(viewingFeedback.approvedAt).toLocaleString()}
                </div>
              )}
              <div className="detail-row">
                <strong>Message:</strong>
                <div className="feedback-message-detail">
                  {viewingFeedback.message}
                </div>
              </div>
              {viewingFeedback.adminResponse && (
                <div className="detail-row">
                  <strong>Admin Response:</strong>
                  <div className="admin-response-detail">
                    {viewingFeedback.adminResponse}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button 
                className="close-btn"
                onClick={() => setViewingFeedback(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;
