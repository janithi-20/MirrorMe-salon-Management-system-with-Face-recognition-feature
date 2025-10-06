import React, { useState } from 'react';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import './serviceManage.css';

const ServiceManagement = () => {
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([
    {
      name: 'Hair Cut & Styling',
      subServices: [
        { id: 'adv-restyle', service: 'Cut & Re-Style (Advance)', price: 4000 },
        { id: 'fringe', service: 'Fringe Cut', price: 1000 },
        { id: 'trim', service: 'Trim', price: 1400 },
        { id: 'reg-restyle', service: 'Cut & Re-Style (Regular)', price: 2900 },
        { id: 'wash-blast', service: 'Hair Wash & Blast Dry', price: 2000 },
        { id: 'blow-short', service: 'Blow Dry - Short', price: 2400 },
        { id: 'blow-medium', service: 'Blow Dry - Medium', price: 3900 },
        { id: 'blow-long', service: 'Blow Dry - Long', price: 4500 },
        { id: 'braid-short', service: 'Braiding Per Strand - Short', price: 1300 }
      ]
    },
    {
      name: 'Skin Treatments',
      subServices: [
        { id: 'face-shave', service: 'Face Shaving', price: 4400 },
        { id: 'low-upper-thread', service: 'Low Upper Threading', price: 200 },
        { id: 'galvanize', service: 'Add on - Galvanize Treatment', price: 1400 },
        { id: 'classic-clean', service: 'Classic Clean Up', price: 3800 },
        { id: 'brightening-ume', service: 'Brightening Clean Up (Ume Care)', price: 6800 },
        { id: 'basic-sothys', service: 'Basic Clean Up (Sothys)', price: 9800 }
      ]
    },
    {
      name: 'Dressings',
      subServices: [
        { id: 'full-early', service: 'Full Dressing (Early Morning) Add on Before 8.30am', price: 2500 },
        { id: 'full-derma', service: 'Full Dressing Derma', price: 6500 },
        { id: 'full-mac', service: 'Full Dressing Mac', price: 10300 },
        { id: 'saree', service: 'Saree Draping', price: 2000 },
        { id: 'makeup-mac', service: 'Make-Up (Mac)', price: 8000 },
        { id: 'makeup-derma', service: 'Make-Up (Derma)', price: 4200 },
        { id: 'hairstyle', service: 'Hair Style', price: 3100 },
        { id: 'addon-lashes', service: 'Add-on Eye Lashes', price: 1800 }
      ]
    },
    {
      name: 'Nail Care',
      subServices: [
        { id: 'gel-individual', service: 'Gel Individual', price: 900 },
        { id: 'gel-soak-off', service: 'Gel Nail Soak Off', price: 1700 },
        { id: 'normal-color', service: 'Normal Color', price: 1100 },
        { id: 'gel-color-express', service: 'Gel Color (Express Mani)', price: 2300 },
        { id: 'nail-art', service: 'Nail Art Rein Stone/Sticker/ Each', price: 180 }
      ]
    },
    {
      name: 'Manicure & Pedicure',
      subServices: [
        { id: 'luxury-pedi', service: 'Luxury Pedicure-Massage ', price: 8100 },
        { id: 'premium-pedi', service: 'Premium Pedicure', price: 6800 },
        { id: 'classic-mani', service: 'Classic Manicure', price: 2300 },
        { id: 'classic-pedi', service: 'Classic Pedicure', price: 2300 },
        { id: 'spa-mani', service: 'Spa Manicure', price: 4400 },
        { id: 'spa-pedi', service: 'Spa Pedicure', price: 4800 },
        { id: 'soak-up-pedi', service: 'Soak Up Pedicure', price: 5800 }
      ]
    },
    {
      name: 'Waxing',
      subServices: [
        { id: 'full-body', service: 'Full Body', price: 5900 },
        { id: 'stomach', service: 'Stomach', price: 950 },
        { id: 'half-leg', service: 'Half Leg', price: 1450 },
        { id: 'half-arms', service: 'Half Arms', price: 1350 },
        { id: 'classic-full-legs', service: 'Classic Full Legs', price: 2200 },
        { id: 'classic-full-arms', service: 'Classic Full Arms', price: 1800 }
      ]
    }
  ]);

  return (
    <div className="section-content">
      <h2>Services Management</h2>
      <div className="services-container">
        {services.map((mainService, mainIndex) => (
          <div key={mainIndex} className="main-service-card">
            <div className="main-service-header">
              <h3>{mainService.name}</h3>
              <span className="service-count">{mainService.subServices.length} services</span>
            </div>
            
            <div className="sub-services-grid">
              {mainService.subServices.map((subService) => (
                <div key={subService.id} className="sub-service-item">
                  {editingService === subService.id ? (
                    <div className="edit-service-form">
                      <input
                        type="text"
                        defaultValue={subService.service}
                        className="edit-input"
                        onBlur={(e) => {
                          setServices(prevServices =>
                            prevServices.map((ms, msIndex) =>
                              msIndex === mainIndex
                                ? {
                                    ...ms,
                                    subServices: ms.subServices.map(ss =>
                                      ss.id === subService.id
                                        ? { ...ss, service: e.target.value }
                                        : ss
                                    )
                                  }
                                : ms
                            )
                          );
                          setEditingService(null);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.target.blur();
                          }
                        }}
                        autoFocus
                      />
                      <input
                        type="number"
                        defaultValue={subService.price}
                        className="edit-input price-input"
                        onBlur={(e) => {
                          setServices(prevServices =>
                            prevServices.map((ms, msIndex) =>
                              msIndex === mainIndex
                                ? {
                                    ...ms,
                                    subServices: ms.subServices.map(ss =>
                                      ss.id === subService.id
                                        ? { ...ss, price: parseInt(e.target.value) || 0 }
                                        : ss
                                    )
                                  }
                                : ms
                            )
                          );
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.target.blur();
                          }
                        }}
                      />
                      <div className="edit-actions">
                        <button
                          className="save-btn"
                          onClick={() => setEditingService(null)}
                        >
                          <FiSave size={16} />
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => setEditingService(null)}
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="service-display">
                      <div className="service-info">
                        <h4>{subService.service}</h4>
                        <p className="service-price">Rs. {subService.price}</p>
                      </div>
                      <button
                        className="edit-service-btn"
                        onClick={() => setEditingService(subService.id)}
                      >
                        <FiEdit2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceManagement;
