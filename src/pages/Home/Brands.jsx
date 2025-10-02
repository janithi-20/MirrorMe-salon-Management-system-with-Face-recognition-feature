import React from 'react';
import './Brands.css';

const Brands = () => {
  const brands = [
    { name: 'KEUNE', logo: '/keune.png' },
    { name: 'LOREAL', logo: '/loreal.png' },
    { name: 'jEVAL', logo: '/jeval.png' },
    { name: 'Dreamron', logo: '/dreamron.jpeg' },
  ];

  return (
    <section id="brands" className="brands">
      <div className="container">
        <div className="section-title">
          <h2>Brands</h2>
          <p><strong>We partner with industry-leading brands to bring you the best salon products and treatments.</strong></p>
        </div>
        <div className="brands-grid">
          {brands.map((b, i) => (
            <div key={i} className="brand-card">
              <img src={b.logo} alt={b.name} />
              <h4>{b.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
