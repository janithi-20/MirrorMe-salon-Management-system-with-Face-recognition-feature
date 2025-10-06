import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import './AppointmentManage.css';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      dateTime: 'Oct 16, 2025 - 10:01 AM',
      service: 'Cut & Re-Style (Advance)',
      customer: 'Sarah Johnson',
      status: 'completed',
      provider: 'Lewis Fernandiz',
      providerImage: '/Lewis.jpg',
      advancePayment: 2000,
      totalAmount: 4000,
      paymentStatus: 'completed'
    },
    {
      id: 2,
      dateTime: 'Oct 15, 2025 - 02:30 PM',
      service: 'Brightening Clean Up (Ume Care)',
      customer: 'Emma Wilson',
      status: 'pending',
      provider: 'Marie De Zoya',
      providerImage: '/Marie.jpg',
      advancePayment: 3000,
      totalAmount: 6800,
      paymentStatus: 'pending'
    },
    {
      id: 3,
      dateTime: 'Oct 14, 2025 - 11:15 AM',
      service: 'Full Dressing Mac',
      customer: 'Jessica Perera',
      status: 'pending',
      provider: 'Angela Diano',
      providerImage: '/Angela.jpg',
      advancePayment: 5000,
      totalAmount: 10300,
      paymentStatus: 'pending'
    },
    {
      id: 4,
      dateTime: 'Oct 13, 2025 - 04:45 PM',
      service: 'Luxury Pedicure-Massage Chair',
      customer: 'Rajitha Silva',
      status: 'cancelled',
      provider: 'Kylie Nellina',
      providerImage: '/Kylie.jpg',
      advancePayment: 4000,
      totalAmount: 8100,
      paymentStatus: 'refunded'
    },
    {
      id: 5,
      dateTime: 'Oct 12, 2025 - 09:00 AM',
      service: 'Spa Manicure',
      customer: 'Michael Fernando',
      status: 'confirmed',
      provider: 'Kylie Nellina',
      providerImage: '/Kylie.jpg',
      advancePayment: 2200,
      totalAmount: 4400,
      paymentStatus: 'completed'
    },
    {
      id: 6,
      dateTime: 'Oct 11, 2025 - 03:20 PM',
      service: 'Hair Wash & Blast Dry',
      customer: 'Sonali De Silva',
      status: 'completed',
      provider: 'Ethan Kal',
      providerImage: '/Ethan.jpg',
      advancePayment: 1000,
      totalAmount: 2000,
      paymentStatus: 'completed'
    }
  ]);

  // Appointment management handlers
  const handleAcceptAppointment = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'confirmed' }
          : appointment
      )
    );
  };

  const handleDeclineAppointment = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'cancelled' }
          : appointment
      )
    );
  };

  const handleDeleteAppointment = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.filter(appointment => appointment.id !== appointmentId)
    );
  };

  // Calculate summary statistics
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

        {appointments.map((appointment) => (
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
              <img 
                src={appointment.providerImage} 
                alt={appointment.provider}
                className="provider-avatar"
              />
              <span>{appointment.provider}</span>
            </div>
            <div className="grid-cell payment-info">
              <div className="advance-amount">Rs. {appointment.advancePayment}</div>
              <div className="total-amount">of Rs. {appointment.totalAmount}</div>
            </div>
            <div className="grid-cell payment-status">
              <span className={`payment-badge ${appointment.paymentStatus}`}>
                {appointment.paymentStatus}
              </span>
            </div>
            <div className="grid-cell appointment-actions">
              {appointment.status === 'pending' && (
                <>
                  <button 
                    className="accept-appointment-btn"
                    onClick={() => handleAcceptAppointment(appointment.id)}
                  >
                    <FaCheck />
                    Accept
                  </button>
                  <button 
                    className="decline-appointment-btn"
                    onClick={() => handleDeclineAppointment(appointment.id)}
                  >
                    <FaTimes />
                    Decline
                  </button>
                </>
              )}
              {appointment.status !== 'pending' && (
                <button 
                  className="delete-appointment-btn"
                  onClick={() => handleDeleteAppointment(appointment.id)}
                >
                  <FaTrash />
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default AppointmentManagement;
