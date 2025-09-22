import React from 'react';
import { Link } from 'react-router-dom';

const priceRows = [
  ['Face Shaving', '4,400.00'],
  ['Low Upper Threading', '200.00'],
  ['Add on - Galvanize Treatment', '1,400.00'],
  ['Classic Clean Up', '3,800.00'],
  ['Brightening Clean Up (Ume Care)', '6,800.00'],
  ['Basic Clean Up (Sothys)', '9,800.00'],
  ['Basic Clean Up - with Ampoule (Sothys)', '11,000.00'],
  ['Natural Glow Facial', '5,800.00'],
  ['Re-Energising Radiance Facial (Ume Care)', '10,500.00'],
  ['Sothys Hydra Moist Facial (with Ampule)', '13,300.00'],
  ['Sothys Illumination Facial', '23,600.00'],
  ['Under Eye Treatment', '7,000.00'],
  ['Natural Face Massage', '1,600.00'],
];
const SkinTreatments = () => {
  return (
    <div className="service-page container" style={{ padding: '3rem 0' }}>
        <h2>Skin Treatments</h2>
        <p><strong>What we do:</strong> Our skin treatments are designed to refresh and brighten your complexion. From facials to advanced care, we help you achieve healthy, glowing skin.</p>

      <div style={{ marginTop: 24 }}>
        <table className="service-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {priceRows.map((row, idx) => (
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
};

export default SkinTreatments;
