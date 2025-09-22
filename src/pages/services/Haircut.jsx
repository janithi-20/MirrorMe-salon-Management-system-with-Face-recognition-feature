import React from 'react';
import { Link } from 'react-router-dom';

const priceList = [
  { service: 'Cut & Re-Style (Advance)', price: '4,000.00' },
  { service: 'Fringe Cut', price: '1,000.00' },
  { service: 'Trim', price: '1,400.00' },
  { service: 'Cut & Re-Style (Regular)', price: '2,900.00' },
  { service: 'Hair Wash & Blast Dry', price: '2,000.00' },
  { service: 'Blow Dry - Short', price: '2,400.00' },
  { service: 'Blow Dry - Medium', price: '3,900.00' },
  { service: 'Blow Dry - Long', price: '4,500.00' },
  { service: 'Braiding Per Strand - Short', price: '1,300.00' }
];

const Haircut = () => (
  <div className="service-page container" style={{ padding: '3rem 0' }}>
    <h2>Haircut & Styling</h2>
  <p><strong>What we do:</strong> We offer professional haircuts and modern styling that perfectly suit your look. Our experts ensure you step out with confidence and style.</p>

    <div style={{ marginTop: 18 }}>
      <table className="service-table" aria-label="Haircut services and prices">
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {priceList.map((row, idx) => (
            <tr key={idx}>
              <td>{row.service}</td>
              <td style={{ textAlign: 'right' }}>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div style={{ marginTop: 20 }}>
      <Link to="/services" className="btn">Back to Services</Link>
    </div>
  </div>
);

export default Haircut;
