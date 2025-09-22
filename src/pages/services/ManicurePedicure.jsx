import React from 'react';
import { Link } from 'react-router-dom';

const maniPediRows = [
  ['Luxury Pedicure-Massage Chair', '8,100.00'],
  ['Premium Pedicure', '6,800.00'],
  ['Classic Manicure', '2,300.00'],
  ['Classic Pedicure', '2,300.00'],
  ['Spa Manicure', '4,400.00'],
  ['Spa Pedicure', '4,800.00'],
  ['Soak Up Pedicure', '5,800.00'],
];

const ManicurePedicure = () => (
  <div className="service-page container" style={{ padding: '3rem 0' }}>
    <h2>Manicure & Pedicure</h2>
  <p><strong>What we do:</strong> Relax with our soothing manicure and pedicure treatments. They leave your hands and feet soft, clean, and refreshed.</p>

    <div style={{ marginTop: 24 }}>
      <table className="service-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {maniPediRows.map((row, idx) => (
            <tr key={idx}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
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

export default ManicurePedicure;
