import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import billImg from '../../components/bill.jpg';
import './bill.css';

const Bill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoice = location?.state?.invoice;

  if (!invoice) {
    return (
      <div className="container" style={{ padding: '3rem 0' }}>
        <p>No invoice data found. Please create a booking first.</p>
        <button className="btn" onClick={() => navigate('/booking')}>Go to Booking</button>
      </div>
    );
  }

  const handleDownload = () => {
    // Open a print dialog for the bill section; user can save as PDF
    window.print();
  };

  return (
    <div className="bill-page" style={{ backgroundImage: `url(${billImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <Header />
  <div className="container bill-container page-content">
        <div className="bill-card" id="bill">
          <h2>Invoice</h2>
          <div className="bill-row"><strong>Customer:</strong> <span>{invoice.customer}</span></div>
          <div className="bill-row"><strong>Service:</strong> <span>{invoice.service}</span></div>
          <div className="bill-row"><strong>Date:</strong> <span>{invoice.date}</span></div>
          <div className="bill-row"><strong>Time:</strong> <span>{invoice.time}</span></div>
          <div className="bill-row"><strong>Total:</strong> <span>LKR {Number(invoice.total || invoice.booking?.total || 0).toLocaleString()}</span></div>
        </div>

        <div style={{ marginTop: 28 }}>
          <button className="btn" onClick={handleDownload}>Download / Print</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bill;
