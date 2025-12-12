import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../App.css';
import './notification.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to format booking into a notification
  const bookingToNotification = (b) => {
    // determine date/time
    let dateStr = '';
    try {
      if (b.datetime) {
        const dt = new Date(b.datetime);
        dateStr = dt.toLocaleDateString() + ' at ' + dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (b.date && b.time) {
        dateStr = `${b.date} at ${b.time}`;
      }
    } catch (e) {
      dateStr = '';
    }

    const title = b.status === 'confirmed' ? 'Booking confirmed' : (b.status === 'cancelled' ? 'Booking cancelled' : 'Booking created');
    const message = `Your appointment ${dateStr ? 'on ' + dateStr : ''} is ${b.status}.`;
    return {
      id: `booking-${b.bookingId || b._id}`,
      type: 'booking',
      title,
      message
    };
  };

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        // Try to load customer info from localStorage
        const customer = JSON.parse(localStorage.getItem('customer') || 'null');
        const list = [];

        // Registration message (if any) from sessionStorage
        const regMsg = sessionStorage.getItem('registrationMessage');
        if (regMsg) {
          list.push({ id: 'reg', type: 'register', title: 'Registration successful', message: regMsg });
        }

        if (customer && customer.customerId) {
          const res = await fetch(`http://localhost:5000/bookings/customer/${encodeURIComponent(customer.customerId)}`);
          if (res.ok) {
            const data = await res.json();
            const bookings = data.bookings || [];
            // convert bookings to notifications (most recent first)
            const bookingNotifs = bookings.slice().reverse().map(bookingToNotification);
            list.push(...bookingNotifs);
          } else {
            console.warn('Failed to fetch customer bookings:', res.status);
          }
        }

        if (mounted) setNotifications(list);
      } catch (err) {
        console.error('Error loading notifications:', err);
        if (mounted) setError(err.message || 'Failed to load notifications');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchNotifications();

    // Listen for bookingCreated events to update notifications live
    const handler = (e) => {
      try {
        const b = e && e.detail && e.detail.booking;
        if (!b) return;
        const notif = bookingToNotification(b);
        setNotifications(prev => [notif, ...prev]);
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('bookingCreated', handler);
    return () => {
      mounted = false;
      window.removeEventListener('bookingCreated', handler);
    };
  }, []);

  return (
    <div>
      <Header />
      <main className="page-content container">
        <div className="notification-page">
          <h2 className="section-title">Notifications</h2>

          {loading && <div>Loading notifications...</div>}
          {error && <div style={{ color: 'red' }}>Error: {error}</div>}

          {!loading && !error && (
            <div className="notification-list">
              {notifications.length === 0 && <div style={{ color: '#666' }}>No notifications yet.</div>}
              {notifications.map(n => (
                <div key={n.id} className={`notification-card notification-${n.type}`}>
                  <div className="notification-title">{n.title}</div>
                  <div className="notification-message">{n.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotificationPage;
