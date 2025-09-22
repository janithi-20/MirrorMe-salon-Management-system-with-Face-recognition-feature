import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Booking = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // here you could run validation or send data to an API
    // for now we just navigate back to home
    navigate('/');
  };

  return (
    <div className="booking-page">
      <Header />

      <main className="booking-main container">
        <h2 className="booking-title">Book Appointment</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="grid-row">
            <div className="grid-cell">
              <label>Name</label>
              <input type="text" placeholder="Full name" />
            </div>
            <div className="grid-cell">
              <label>Email</label>
              <input type="email" placeholder="you@email.com" />
            </div>
            <div className="grid-cell">
              <label>Phone No.</label>
              <input type="tel" placeholder="07x xxx xxxx" />
            </div>
          </div>

          <div className="grid-row">
            <div className="grid-cell select-cell">
              <label>Services</label>
              <select>
                <option>Haircut</option>
                <option>Coloring</option>
                <option>Styling</option>
              </select>
            </div>
            <div className="grid-cell">
              <label>Date/Time</label>
              <input type="datetime-local" />
            </div>
            <div className="grid-cell">
              <label>Staff Member</label>
              <select>
                <option>Any</option>
                <option>Stylist A</option>
                <option>Stylist B</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="oval-book">Book</button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
