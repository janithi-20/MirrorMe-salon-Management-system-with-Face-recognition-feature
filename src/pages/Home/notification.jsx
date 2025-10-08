import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../App.css';
import './notification.css';

const sampleNotifications = [
  { id: 1, type: 'booking', title: 'Booking confirmed', message: 'Your appointment on Oct 10 at 3:00 PM is confirmed.' },
  { id: 2, type: 'register', title: 'Registration successful', message: 'Welcome to Mirror Me! Your account was created.' },
  { id: 3, type: 'feedback', title: 'Feedback received', message: 'Thanks! Your feedback has been submitted.' },
];

const NotificationPage = () => {
  return (
    <div>
      <Header />
      <main className="page-content container">
        <div className="notification-page">
          <h2 className="section-title">Notifications</h2>
          <div className="notification-list">
            {sampleNotifications.map(n => (
              <div key={n.id} className={`notification-card notification-${n.type}`}>
                <div className="notification-title">{n.title}</div>
                <div className="notification-message">{n.message}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotificationPage;
