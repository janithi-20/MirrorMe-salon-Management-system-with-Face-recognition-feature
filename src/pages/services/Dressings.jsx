import React from 'react';
import { Link } from 'react-router-dom';

const dressingRows = [
  ['Full Dressing (Early Morning) Add on Before 8.30am', '2,500.00'],
  ['Full Dressing Derma', '6,500.00'],
  ['Full Dressing Mac', '10,300.00'],
  ['Saree Draping', '2,000.00'],
  ['Make-Up (Mac)', '8,000.00'],
  ['Make-Up (Derma)', '4,200.00'],
  ['Hair Style', '3,100.00'],
  ['Add-on Eye Lashes', '1,800.00'],
];

const Dressings = () => (
  <div className="service-page container" style={{ padding: '3rem 0' }}>
    <h2>Dressings</h2>
  <p><strong>What we do:</strong> Get ready for any occasion with our expert makeup and outfit styling. We create flawless looks for weddings, parties, and special events.</p>

    <div style={{ marginTop: 24 }}>
      <table className="service-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {dressingRows.map((row, idx) => (
            <tr key={idx}>
              <td>{row[0]}</td>
              <td>{row.slice(1).filter(Boolean).join(' / ')}</td>
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

export default Dressings;
