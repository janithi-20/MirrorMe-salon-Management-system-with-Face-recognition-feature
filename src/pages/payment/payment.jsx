import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import paymentImg from '../../components/payment.jpg';
import './payment.css';

const Payment = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const booking = location?.state?.booking || null;

  const handlePay = (e) => {
    e.preventDefault();
    // Build the invoice data and navigate to bill page
    const invoice = {
      customer: booking?.name || 'Guest',
      service: booking?.service || 'Service',
      date: booking?.datetime ? new Date(booking.datetime).toLocaleDateString() : '',
      time: booking?.datetime ? new Date(booking.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      total: booking?.total || 'TBD',
      booking
    };
    navigate('/bill', { state: { invoice } });
  };

  return (
  <div className="payment-page" style={{ backgroundImage: `url(${paymentImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Header />
      <div className="container" style={{ padding: '3rem 0' }}>
        <h2>Payment</h2>
        <p>Please enter your payment details to complete the booking.</p>

        <form className="payment-form" onSubmit={handlePay}>
          <div className="field">
            <label>Cardholder name</label>
            <input type="text" placeholder="Name on card" required />
          </div>

          <div className="field">
            <label>Card number</label>
            <input type="text" placeholder="4242 4242 4242 4242" required />
          </div>

          <div className="grid-row">
            <div className="grid-cell">
              <label>Expiry</label>
              <input type="text" placeholder="MM/YY" required />
            </div>
            <div className="grid-cell">
              <label>CVC</label>
              <input type="text" placeholder="CVC" required />
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <button className="btn" type="submit">Pay now</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
