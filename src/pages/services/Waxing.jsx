import React from 'react';
import { Link } from 'react-router-dom';

const waxingRows = [
  ['Full Body', '5,900.00'],
  ['Stomach', '950.00'],
  ['Half Leg', '1,450.00'],
  ['Half Arms', '1,350.00'],
  ['Classic Full Legs', '2,200.00'],
  ['Classic Full Arms', '1,800.00'],
];

const Waxing = () => (
  <div className="service-page container" style={{ padding: '3rem 0' }}>
    <h2>Waxing</h2>
  <p><strong>What we do:</strong> Enjoy smooth, silky skin with our safe and hygienic waxing services. We ensure a comfortable experience with long-lasting results.</p>

    <div style={{ marginTop: 24 }}>
      <table className="service-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {waxingRows.map((row, idx) => (
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

export default Waxing;
