import React from 'react';
import { Link } from 'react-router-dom';

const nailRows = [
  ['Gel Individual', '900.00'],
  ['Gel Nail Soak Off', '1,700.00'],
  ['Gel Individual', '900.00'],
  ['Normal Color', '1,100.00'],
  ['Gel Color (Express Mani)', '2,300.00'],
  ['Nail Art Rein Stone/Sticker/ Each', '180.00'],
  ['Nail Art Foils/Gold & Silver Papers Each', '250.00'],
  ['Nail Gel Art Full Set', '1,700.00'],
  ['Temporary Nail Pasting (Press On)', '4,000.00'],
  ['Acrylic Natural Nail Overlay Full Set', '5,800.00'],
  ['Acrylic Full Set (Natural/French)With Gel Color', '8,600.00'],
  ['Gel Natural Nail Overlay Full Set', '7,500.00'],
  ['Gel Full Set Hands (Extension Natural/French)', '8,600.00'],
];

const Nails = () => (
  <div className="service-page container" style={{ padding: '3rem 0' }}>
    <h2>Nail Care</h2>
  <p><strong>What we do:</strong> We provide complete nail grooming along with stylish nail art designs. Your nails will always look polished, trendy, and well cared for.</p>

    <div style={{ marginTop: 24 }}>
      <table className="service-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {nailRows.map((row, idx) => (
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

export default Nails;
