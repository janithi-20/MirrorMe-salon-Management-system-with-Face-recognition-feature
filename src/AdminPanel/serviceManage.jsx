import React, { useState } from 'react';
import { FiEdit2, FiSave, FiX, FiPlus, FiImage, FiTrash2 } from 'react-icons/fi';
import './serviceManage.css';

const ServiceManagement = () => {
  const [editingService, setEditingService] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    service: '',
    price: '',
    category: '',
    image: null,
    imagePreview: null
  });
  
  const [services, setServices] = useState([
    {
      name: 'Hair Cut & Styling',
      image: '/hair.jpg',
      subServices: [
        { id: 'adv-restyle', service: 'Cut & Re-Style (Advance)', price: 4000, image: '/haircut-images/cut-restyle-advance.jpg' },
        { id: 'fringe', service: 'Fringe Cut', price: 1000, image: '/haircut-images/fringe-cut.jpg' },
        { id: 'trim', service: 'Trim', price: 1400, image: '/haircut-images/trim.jpg' },
        { id: 'reg-restyle', service: 'Cut & Re-Style (Regular)', price: 2900, image: '/haircut-images/cut-restyle-regular.jpg' },
        { id: 'wash-blast', service: 'Hair Wash & Blast Dry', price: 2000, image: '/haircut-images/hair-wash.jpg' },
        { id: 'blow-short', service: 'Blow Dry - Short', price: 2400, image: '/haircut-images/blowdry-short-hair.jpg' },
        { id: 'blow-medium', service: 'Blow Dry - Medium', price: 3900, image: '/haircut-images/blowdry-medium-hair.jpg' },
        { id: 'blow-long', service: 'Blow Dry - Long', price: 4500, image: '/haircut-images/blowdry-long-hair.jpg' },
        { id: 'braid-short', service: 'Braiding Per Strand - Short', price: 1300, image: '/haircut-images/braiding-short.jpg' }
      ]
    },
    {
      name: 'Skin Treatments',
      image: '/skin.jpg',
      subServices: [
        { id: 'face-shave', service: 'Face Shaving', price: 4400, image: '/skin-images/faceshaving.jpg' },
        { id: 'low-upper-thread', service: 'Low Upper Threading', price: 200, image: '/skin-images/upperthreading.jpg' },
        { id: 'galvanize', service: 'Add on - Galvanize Treatment', price: 1400, image: '/skin-images/galvanic.webp' },
        { id: 'classic-clean', service: 'Classic Clean Up', price: 3800, image: '/skin-images/cleanup.jpg' },
        { id: 'brightening-ume', service: 'Brightening Clean Up (Ume Care)', price: 6800, image: '/skin-images/brightingcleanup.jpg' },
        { id: 'basic-sothys', service: 'Basic Clean Up (Sothys)', price: 9800, image: '/skin-images/basiccleaning.jpg' }
      ]
    },
    {
      name: 'Dressings',
      image: '/dressing.jpg',
      subServices: [
        { id: 'full-early', service: 'Full Dressing (Early Morning) Add on Before 8.30am', price: 2500, image: '/dressing-images/full-dressing-early-morning.jpg' },
        { id: 'full-derma', service: 'Full Dressing Derma', price: 6500, image: '/dressing-images/full-dressing-derma.jpg' },
        { id: 'full-mac', service: 'Full Dressing Mac', price: 10300, image: '/dressing-images/full-dressing-mac.jpg' },
        { id: 'saree', service: 'Saree Draping', price: 2000, image: '/dressing-images/saree-drapping.jpg' },
        { id: 'makeup-mac', service: 'Make-Up (Mac)', price: 8000, image: '/dressing-images/makeup-mac.jpg' },
        { id: 'makeup-derma', service: 'Make-Up (Derma)', price: 4200, image: '/dressing-images/makeup-derma.jpg' },
        { id: 'hairstyle', service: 'Hair Style', price: 3100, image: '/dressing-images/hairstyle.jpg' },
        { id: 'addon-lashes', service: 'Add-on Eye Lashes', price: 1800, image: '/dressing-images/eye-lashes.jpg' }
      ]
    },
    {
      name: 'Nail Care',
      image: '/nails.jpg',
      subServices: [
        { id: 'gel-individual', service: 'Gel Individual', price: 900, image: '/nails-images/gel-individual.jpg' },
        { id: 'gel-soak-off', service: 'Gel Nail Soak Off', price: 1700, image: '/nails-images/gel-nail-soak-off.jpg' },
        { id: 'normal-color', service: 'Normal Color', price: 1100, image: '/nails-images/normal-colour.jpg' },
        { id: 'gel-color-express', service: 'Gel Color (Express Mani)', price: 2300, image: '/nails-images/gel-colour-express.jpg' },
        { id: 'nail-art', service: 'Nail Art Rein Stone/Sticker/ Each', price: 180, image: '/nails-images/nail-art-rein-stone-sticker.jpg' }
      ]
    },
    {
      name: 'Manicure & Pedicure',
      image: '/manicure.jpg',
      subServices: [
        { id: 'luxury-pedi', service: 'Luxury Pedicure-Massage ', price: 8100, image: '/manicure-images/luxury-pedicure-massage-chair.jpg' },
        { id: 'premium-pedi', service: 'Premium Pedicure', price: 6800, image: '/manicure-images/premium-pedicure.jpg' },
        { id: 'classic-mani', service: 'Classic Manicure', price: 2300, image: '/manicure-images/classic-manicure.jpg' },
        { id: 'classic-pedi', service: 'Classic Pedicure', price: 2300, image: '/manicure-images/classic-pedicure.jpg' },
        { id: 'spa-mani', service: 'Spa Manicure', price: 4400, image: '/manicure-images/spa-manicure.jpg' },
        { id: 'spa-pedi', service: 'Spa Pedicure', price: 4800, image: '/manicure-images/spa-pedicure.jpg' },
        { id: 'soak-up-pedi', service: 'Soak Up Pedicure', price: 5800, image: '/manicure-images/soak-up-pedicure.jpg' }
      ]
    },
    {
      name: 'Waxing',
      image: '/waxing.jpg',
      subServices: [
        { id: 'full-body', service: 'Full Body', price: 5900, image: '/waxing-images/full-body.jpg' },
        { id: 'stomach', service: 'Stomach', price: 950, image: '/waxing-images/stomach.jpg' },
        { id: 'half-leg', service: 'Half Leg', price: 1450, image: '/waxing-images/half-legs.jpg' },
        { id: 'half-arms', service: 'Half Arms', price: 1350, image: '/waxing-images/half-arms.jpg' },
        { id: 'classic-full-legs', service: 'Classic Full Legs', price: 2200, image: '/waxing-images/classic-full-legs.jpg' },
        { id: 'classic-full-arms', service: 'Classic Full Arms', price: 1800, image: '/waxing-images/classic-full-arms.jpg' }
      ]
    }
  ]);

  const handleImageChange = (e, isNewService = true) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isNewService) {
          setNewService(prev => ({
            ...prev,
            image: file,
            imagePreview: e.target.result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddService = () => {
    if (newService.service && newService.price && newService.category) {
      const categoryIndex = services.findIndex(service => service.name === newService.category);
      
      if (categoryIndex !== -1) {
        const newId = Date.now().toString(); 
        const updatedServices = [...services];
        updatedServices[categoryIndex].subServices.push({
          id: newId,
          service: newService.service,
          price: parseInt(newService.price),
          image: newService.imagePreview || '/salon logo.jpg'
        });
        setServices(updatedServices);
      } else if (newService.category !== 'new') {
        const newCategory = {
          name: newService.category,
          image: newService.imagePreview || '/salon logo.jpg',
          subServices: [{
            id: Date.now().toString(),
            service: newService.service,
            price: parseInt(newService.price),
            image: newService.imagePreview || '/salon logo.jpg'
          }]
        };
        setServices([...services, newCategory]);
      }
      
      setNewService({ service: '', price: '', category: '', image: null, imagePreview: null });
      setShowAddForm(false);
    }
  };

  const handleCancelAdd = () => {
    setNewService({ service: '', price: '', category: '', image: null, imagePreview: null });
    setShowAddForm(false);
  };

  const handleDeleteSubService = (mainIndex, subServiceId) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      setServices(prevServices =>
        prevServices.map((ms, msIndex) =>
          msIndex === mainIndex
            ? {
                ...ms,
                subServices: ms.subServices.filter(ss => ss.id !== subServiceId)
              }
            : ms
        )
      );
    }
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.src = '/salon logo.jpg'; // Fallback to salon logo if image fails to load
    e.target.style.opacity = '1'; // Ensure fallback image is visible
  };

  const getImageSrc = (imagePath) => {
    if (!imagePath) return '/salon logo.jpg';
    // Split the path to encode only the filename part
    const pathParts = imagePath.split('/');
    const filename = pathParts.pop();
    const encodedFilename = encodeURIComponent(filename);
    return pathParts.join('/') + '/' + encodedFilename;
  };

  return (
    <div className="section-content">
      <div className="services-header">
        <h2>Services Management</h2>
        <button 
          className="add-service-btn" 
          onClick={() => setShowAddForm(true)}
        >
          <FiPlus size={16} />
          Add New Service
        </button>
      </div>
      
      {showAddForm && (
        <div className="add-service-form">
          <h3>Add New Service</h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Service Name"
              value={newService.service}
              onChange={(e) => setNewService({...newService, service: e.target.value})}
              className="form-input"
            />
            <input
              type="number"
              placeholder="Price (Rs.)"
              value={newService.price}
              onChange={(e) => setNewService({...newService, price: e.target.value})}
              className="form-input price-input"
            />
            <select
              value={newService.category}
              onChange={(e) => setNewService({...newService, category: e.target.value})}
              className="form-input"
            >
              <option value="">Select Category</option>
              {services.map((service, index) => (
                <option key={index} value={service.name}>{service.name}</option>
              ))}
              <option value="new">Create New Category</option>
            </select>
            {newService.category === 'new' && (
              <input
                type="text"
                placeholder="New Category Name"
                value={newService.newCategory || ''}
                onChange={(e) => setNewService({...newService, newCategory: e.target.value, category: e.target.value})}
                className="form-input"
              />
            )}
          </div>
          
          <div className="image-upload-section">
            <label className="image-upload-label">
              <FiImage size={20} />
              Upload Service Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, true)}
                className="image-input"
              />
            </label>
            {newService.imagePreview && (
              <div className="image-preview">
                <img src={newService.imagePreview} alt="Service preview" />
                <button 
                  type="button"
                  className="remove-image-btn"
                  onClick={() => setNewService({...newService, image: null, imagePreview: null})}
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button 
              className="save-service-btn" 
              onClick={handleAddService}
            >
              <FiSave size={16} />
              Add Service
            </button>
            <button 
              className="cancel-service-btn" 
              onClick={handleCancelAdd}
            >
              <FiX size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="services-container">
        {services.map((mainService, mainIndex) => (
          <div key={mainIndex} className="main-service-card">
            <div className="main-service-header">
              <div className="service-header-left">
                {mainService.image && (
                  <div className="main-service-image">
                    <img 
                      src={getImageSrc(mainService.image)} 
                      alt={mainService.name} 
                      onError={handleImageError}
                    />
                  </div>
                )}
                <div className="service-header-text">
                  <h3>{mainService.name}</h3>
                  <span className="service-count">{mainService.subServices.length} services</span>
                </div>
              </div>
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
                      {subService.image && (
                        <div className="sub-service-image">
                          <img 
                            src={getImageSrc(subService.image)} 
                            alt={subService.service} 
                            onError={handleImageError}
                          />
                        </div>
                      )}
                      <div className="service-info">
                        <h4>{subService.service}</h4>
                        <p className="service-price">Rs. {subService.price}</p>
                      </div>
                      <div className="service-actions">
                        <button
                          className="edit-service-btn"
                          onClick={() => setEditingService(subService.id)}
                          title="Edit Service"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          className="delete-service-btn"
                          onClick={() => handleDeleteSubService(mainIndex, subService.id)}
                          title="Delete Service"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
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
