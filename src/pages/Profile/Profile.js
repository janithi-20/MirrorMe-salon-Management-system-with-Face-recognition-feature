import React from 'react';
import './Profile.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Profile = () => {
  return (
    <div className="profile-page">
      {/* Header at the top */}
      <Header />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1>Appointment History</h1>
          <div className="customer-greeting">
            <h2>Hi, Customer Name</h2>
          </div>
        </div>
        
        <div className="wishlist-section">
          <div className="wishlist-header">
            <span className="search-icon">🔍</span>
            <h3>Wish List</h3>
          </div>
          
          <div className="wishlist-content">
            <div className="empty-wishlist">
              <p>Your wish list is empty</p>
              <button className="browse-services-btn">Browse Services</button>
            </div>
          </div>
        </div>

        <div className="appointment-history">
          <div className="appointment-list">
            <div className="appointment-item">
              <div className="appointment-date">
                <span className="date">15 SEP</span>
                <span className="year">2024</span>
              </div>
              <div className="appointment-details">
                <h4>Haircut & Styling</h4>
                <p>With: Lewis Fernandiz</p>
                <span className="status completed">Completed</span>
              </div>
            </div>

            <div className="appointment-item">
              <div className="appointment-date">
                <span className="date">22 AUG</span>
                <span className="year">2024</span>
              </div>
              <div className="appointment-details">
                <h4>Facial Treatment</h4>
                <p>With: Marie De Zoya</p>
                <span className="status completed">Completed</span>
              </div>
            </div>

            <div className="appointment-item">
              <div className="appointment-date">
                <span className="date">10 OCT</span>
                <span className="year">2024</span>
              </div>
              <div className="appointment-details">
                <h4>Manicure & Pedicure</h4>
                <p>With: Kylie Nellina</p>
                <span className="status upcoming">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Profile;