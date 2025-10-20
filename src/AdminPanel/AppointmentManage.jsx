import React, { useState, useEffect } from 'react';
import './AppointmentManage.css';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        console.log('Fetching appointments from:', 'http://localhost:5000/dashboard/bookings');
        
        const response = await fetch('http://localhost:5000/dashboard/bookings');
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.success && data.bookings) {
          console.log('Bookings found:', data.bookings.length);
          // Transform backend data to match frontend structure
          const transformedAppointments = data.bookings.map(booking => ({
            id: booking.id,
            dateTime: formatDateTime(booking.date, booking.time),
            service: booking.service,
            customer: booking.customer,
            status: booking.status,
            provider: 'Any', // Default since backend doesn't specify staff
            advancePayment: Math.floor(booking.amount * 0.5), // 50% advance
            totalAmount: booking.amount,
            paymentStatus: booking.status === 'completed' ? 'completed' : 'pending'
          }));
          console.log('Transformed appointments:', transformedAppointments);
          setAppointments(transformedAppointments);
        } else {
          console.log('No bookings data in response');
          setError('Failed to load appointments');
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Unable to connect to server. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Helper function to format date and time
  const formatDateTime = (date, time) => {
    try {
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      return `${formattedDate} - ${time || 'Not specified'}`;
    } catch (error) {
      return `${date} - ${time || 'Not specified'}`;
    }
  };

  const handlePaymentReceived = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:5000/bookings/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'completed',
          paymentStatus: 'completed'
        })
      });

      if (response.ok) {
        // Update local state
        setAppointments(prevAppointments =>
          prevAppointments.map(appointment =>
            appointment.id === appointmentId
              ? { 
                  ...appointment, 
                  paymentStatus: 'completed',
                  status: 'completed'
                }
              : appointment
          )
        );
        alert('Payment status updated successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Unable to update payment status. Please check your connection and try again.');
    }
  };

  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(app => app.status === 'completed').length;
  const confirmedAppointments = appointments.filter(app => app.status === 'confirmed').length;
  const pendingAppointments = appointments.filter(app => app.status === 'pending').length;
  const totalRevenue = appointments
    .filter(app => app.paymentStatus === 'completed')
    .reduce((sum, app) => sum + app.totalAmount, 0);

  return (
    <div className="appointment-management">
      <div className="appointments-header">
        <h2>Appointment History</h2>
      </div>

      {loading && (
        <div className="loading-container" style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading appointments...</p>
        </div>
      )}

      {error && (
        <div className="error-container" style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: '#d32f2f',
          background: '#ffe6e6',
          borderRadius: '8px',
          margin: '1rem 0'
        }}>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '8px 16px',
              background: '#d32f2f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="appointments-grid">
            <div className="grid-header">
              <div className="header-cell">Date & Time</div>
              <div className="header-cell">Service / Customer</div>
              <div className="header-cell">Status</div>
              <div className="header-cell">Staff</div>
              <div className="header-cell">Payment</div>
              <div className="header-cell">Payment Status</div>
              <div className="header-cell">Actions</div>
            </div>

            {appointments.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                gridColumn: '1 / -1',
                color: '#666'
              }}>
                No appointments found. Once customers start booking, they will appear here.
              </div>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment.id} className="grid-row">
                  <div className="grid-cell date-time">
                    <div className="date">{appointment.dateTime}</div>
                  </div>
                  <div className="grid-cell service-info">
                    <div className="service-name">{appointment.service}</div>
                    <div className="customer-name">{appointment.customer}</div>
                  </div>
                  <div className="grid-cell status">
                    <span className={`status-badge ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="grid-cell provider-info">
                    <span>{appointment.provider}</span>
                  </div>
                  <div className="grid-cell payment-info">
                    <div className="advance-amount">Rs. {appointment.advancePayment?.toLocaleString()}</div>
                    <div className="total-amount">of Rs. {appointment.totalAmount?.toLocaleString()}</div>
                  </div>
                  <div className="grid-cell payment-status">
                    <span className={`payment-badge ${appointment.paymentStatus}`}>
                      {appointment.paymentStatus}
                    </span>
                  </div>
                  <div className="grid-cell appointment-actions">
                    {appointment.paymentStatus === 'pending' && (
                      <button 
                        className="payment-received-btn"
                        onClick={() => handlePaymentReceived(appointment.id)}
                      >
                        Payment Received
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="appointments-summary">
            <div className="summary-stats">
              <div className="summary-item">
                <div className="summary-label">Total Appointments</div>
                <div className="summary-value">{totalAppointments}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Pending</div>
                <div className="summary-value">{pendingAppointments}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Confirmed</div>
                <div className="summary-value">{confirmedAppointments}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Completed</div>
                <div className="summary-value">{completedAppointments}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Total Revenue</div>
                <div className="summary-value">Rs. {totalRevenue.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentManagement;
