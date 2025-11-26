import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Default fallback images for each category
import blowdryLong from './haircut images/blowdry long hair.jpg';
import skinTreatmentImg from './skin images/basiccleaning.jpg';
import dressingImg from './dressing & makeup/full dessing mac.jpg';
import nailsImg from './nails image/gel colour express.jpg';
import waxingImg from './waxing/classic full legs.jpg';
import manicureImg from './manicure pedicure/classic manicure.jpg';
import consultationImg from './consultation.jpg';

const defaultImages = {
  'haircut': blowdryLong,
  'skin-treatments': skinTreatmentImg,
  'dressings': dressingImg,
  'nails': nailsImg,
  'manicure-pedicure': manicureImg,
  'waxing': waxingImg,
  'consultations': consultationImg
};

function formatCurrency(v) {
  return 'LKR ' + v.toLocaleString();
}

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError('');
        
        console.log('🔍 Fetching service details for slug:', slug);
        const response = await fetch(`/services/slug/${slug}`);
        const data = await response.json();
        
        console.log('📋 Service detail API response:', data);
        
        if (data.success) {
          setService(data.data);
        } else {
          setError('Service not found');
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [slug]);

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
          <div className="service-page container" style={{ 
            background: 'rgba(255,255,255,0.9)', 
            padding: '2rem 1.75rem', 
            borderRadius: 16, 
            boxShadow: '0 6px 18px rgba(0,0,0,0.15)', 
            maxWidth: 860 
          }}>
            <h2>Loading...</h2>
            <p>Fetching service details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div>
        <Header />
        <div style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
          <div className="service-page container" style={{ 
            background: 'rgba(255,255,255,0.9)', 
            padding: '2rem 1.75rem', 
            borderRadius: 16, 
            boxShadow: '0 6px 18px rgba(0,0,0,0.15)', 
            maxWidth: 860 
          }}>
            <h2>Service Not Found</h2>
            <p>{error || 'The requested service could not be found.'}</p>
            <Link to="/services" className="btn">Back to Services</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter active sub-services
  const activeSubServices = service.subServices?.filter(sub => sub.isActive) || [];

  return (
    <div>
      <Header />
      <div style={{ padding: '3.5rem 1rem' }}>
        <div className="service-page container" style={{ 
          background: 'rgba(255,255,255,0.9)', 
          padding: '2rem 1.75rem', 
          borderRadius: 16, 
          boxShadow: '0 6px 18px rgba(0,0,0,0.15)', 
          maxWidth: 860 
        }}>
          <h2 style={{ marginTop: 0 }}>{service.category}</h2>
          
          {service.description && (
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>{service.description}</p>
          )}
          
          <p><strong>Available sub-services:</strong></p>

          {activeSubServices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              <p>No sub-services available for this category yet.</p>
              <p>Admin can add sub-services through the admin panel.</p>
            </div>
          ) : (
            <div style={{ 
              marginTop: '1.25rem', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: 14 
            }}>
              {activeSubServices.map(subService => (
                <div 
                  key={subService._id} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    overflow: 'hidden', 
                    borderRadius: 10, 
                    border: '1px solid #e6e6e6', 
                    background: '#fff', 
                    boxShadow: '0 6px 18px rgba(0,0,0,0.06)' 
                  }}
                >
                  <div 
                    style={{ 
                      height: 140, 
                      backgroundImage: `url(${subService.image || defaultImages[slug] || defaultImages['consultations']})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center',
                      backgroundColor: '#f0f0f0'
                    }} 
                  />
                  <div style={{ padding: '12px 14px', textAlign: 'left' }}>
                    <div style={{ fontWeight: 700 }}>{subService.name}</div>
                    <div style={{ marginTop: 6, color: '#666' }}>
                      {formatCurrency(subService.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <Link to="/services" className="btn">Back to Services</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetail;