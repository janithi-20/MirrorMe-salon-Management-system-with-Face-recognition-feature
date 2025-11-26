import React, { useState, useEffect } from 'react';
import './Brands.css';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/brands');
      const data = await response.json();
      
      if (data.success) {
        setBrands(data.data);
        console.log('✅ Brands loaded:', data.data.length);
      } else {
        throw new Error(data.message || 'Failed to fetch brands');
      }
    } catch (error) {
      console.error('❌ Error fetching brands:', error);
      setError(error.message);
      // Fallback to static brands if API fails
      setBrands([
        { _id: '1', name: 'KEUNE', image: '/keune.png', description: 'Premium hair care products' },
        { _id: '2', name: 'LOREAL', image: '/loreal.png', description: 'Professional hair care' },
        { _id: '3', name: 'jEVAL', image: '/jeval.png', description: 'Professional products' },
        { _id: '4', name: 'Dreamron', image: '/dreamron.jpeg', description: 'Beauty products' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="brands" className="brands">
        <div className="container">
          <div className="section-title">
            <h2>Brands</h2>
            <p>Loading our brand partners...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="brands" className="brands">
      <div className="container">
        <div className="section-title">
          <h2>Brands</h2>
          <p><strong>We partner with industry-leading brands to bring you the best salon products and treatments.</strong></p>
          {error && <p style={{color: '#ff6b6b', fontSize: '14px'}}>Note: Using offline brand data</p>}
        </div>
        <div className="brands-grid">
          {brands.map((brand) => (
            <div key={brand._id || brand.id} className="brand-card">
              <img 
                src={brand.image} 
                alt={brand.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <h4>{brand.name}</h4>
              {brand.description && (
                <p className="brand-description">{brand.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
