import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiX, FiPlus, FiImage, FiTrash2, FiLoader } from 'react-icons/fi';
import './serviceManage.css';

// Import service images
import skinImg from '../pages/services/skin.jpg';
import hairImg from '../pages/services/hair.jpg';
import dressingImg from '../pages/services/dressing.jpg';
import nailsImg from '../pages/services/nails.jpg';
import manicureImg from '../pages/services/manicure.jpg';
import waxingImg from '../pages/services/waxing.jpg';
import consultImg from '../pages/services/consultation.jpg';

const defaultServiceImages = {
  'haircut': hairImg,
  'skin-treatments': skinImg,
  'dressings': dressingImg,
  'nails': nailsImg,
  'manicure-pedicure': manicureImg,
  'waxing': waxingImg,
  'consultations': consultImg
};

const ServiceManagement = () => {
  const [editingService, setEditingService] = useState(null);
  const [editingValues, setEditingValues] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newService, setNewService] = useState({
    service: '',
    price: '',
    category: '',
    image: null,
    imagePreview: null
  });
  const [services, setServices] = useState([]);

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/services/admin/all');
      const data = await response.json();
      
      if (data.success) {
        // Transform API data to match existing component structure
        const transformedServices = data.data.map(service => ({
          _id: service._id,
          name: service.category,
          slug: service.slug,
          image: defaultServiceImages[service.slug] || service.categoryImage || '/salon-logo.jpg',
          description: service.description,
          displayOrder: service.displayOrder,
          isActive: service.isActive,
          subServices: service.subServices.map(subService => ({
            id: subService._id,
            service: subService.name,
            price: subService.price,
            image: subService.image,
            isActive: subService.isActive
          }))
        }));
        setServices(transformedServices);
      } else {
        setError('Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
  
  const handleAddService = async () => {
    if (newService.service && newService.price && newService.category) {
      try {
        setLoading(true);
        
        const existingServiceIndex = services.findIndex(service => service.name === newService.category);
        
        if (existingServiceIndex !== -1) {
          // Adding sub-service to existing category
          const serviceId = services[existingServiceIndex]._id;
          const response = await fetch(`/services/${serviceId}/sub-services`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: newService.service,
              price: parseInt(newService.price),
              image: newService.imagePreview || '/salon-logo.jpg'
            })
          });
          
          const data = await response.json();
          
          if (data.success) {
            await fetchServices(); // Refresh the services
            alert('Sub-service added successfully!');
          } else {
            alert('Failed to add sub-service: ' + data.message);
          }
        } else if (newService.category !== 'new') {
          // Creating new service category
          const slug = newService.category.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
          const response = await fetch('/services', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              category: newService.category,
              slug: slug,
              description: `${newService.category} services`,
              categoryImage: newService.imagePreview || '/salon-logo.jpg',
              subServices: [{
                name: newService.service,
                price: parseInt(newService.price),
                image: newService.imagePreview || '/salon-logo.jpg'
              }]
            })
          });
          
          const data = await response.json();
          
          if (data.success) {
            await fetchServices(); // Refresh the services
            alert('New service category created successfully!');
          } else {
            alert('Failed to create service category: ' + data.message);
          }
        }
        
        setNewService({ service: '', price: '', category: '', image: null, imagePreview: null });
        setShowAddForm(false);
      } catch (error) {
        console.error('Error adding service:', error);
        alert('Failed to add service. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelAdd = () => {
    setNewService({ service: '', price: '', category: '', image: null, imagePreview: null });
    setShowAddForm(false);
  };

  const handleDeleteSubService = async (mainIndex, subServiceId) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      try {
        setLoading(true);
        const serviceId = services[mainIndex]._id;
        
        const response = await fetch(`/services/${serviceId}/sub-services/${subServiceId}`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
          await fetchServices(); // Refresh the services
          alert('Service deleted successfully!');
        } else {
          alert('Failed to delete service: ' + data.message);
        }
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.src = '/salon-logo.jpg'; // Fallback to salon logo if image fails to load
    e.target.style.opacity = '1'; // Ensure fallback image is visible
  };

  // Update service name/price
  const handleUpdateSubService = async (serviceId, subServiceId, field, value, originalValue) => {
    // Check if value actually changed
    if (value === originalValue || value === originalValue?.toString()) {
      return; // No change, don't make API call
    }

    try {
      const response = await fetch(`/services/${serviceId}/sub-services/${subServiceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [field]: field === 'price' ? parseInt(value) : value })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state instead of refetching
        setServices(prevServices => 
          prevServices.map(service => {
            if (service._id === serviceId) {
              return {
                ...service,
                subServices: service.subServices.map(subService => {
                  if (subService.id === subServiceId) {
                    return {
                      ...subService,
                      [field === 'name' ? 'service' : field]: field === 'price' ? parseInt(value) : value
                    };
                  }
                  return subService;
                })
              };
            }
            return service;
          })
        );
      } else {
        alert('Failed to update service: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service. Please try again.');
    }
  };

  // Handle starting edit mode
  const startEditing = (subServiceId, name, price) => {
    setEditingService(subServiceId);
    setEditingValues({
      name: name,
      price: price
    });
  };

  // Handle saving edits
  const saveEdits = async (serviceId, subServiceId, originalName, originalPrice) => {
    const newName = editingValues.name;
    const newPrice = editingValues.price;
    
    // Save name if changed
    if (newName !== originalName) {
      await handleUpdateSubService(serviceId, subServiceId, 'name', newName, originalName);
    }
    
    // Save price if changed
    if (newPrice !== originalPrice && newPrice !== originalPrice?.toString()) {
      await handleUpdateSubService(serviceId, subServiceId, 'price', newPrice, originalPrice);
    }
    
    // Exit edit mode
    setEditingService(null);
    setEditingValues({});
  };

  const getImageSrc = (imagePath) => {
    if (!imagePath) return '/salon-logo.jpg';
    // Split the path to encode only the filename part
    const pathParts = imagePath.split('/');
    const filename = pathParts.pop();
    const encodedFilename = encodeURIComponent(filename);
    return pathParts.join('/') + '/' + encodedFilename;
  };

  if (loading) {
    return (
      <div className="section-content">
        <div className="loading-container" style={{ textAlign: 'center', padding: '50px' }}>
          <FiLoader className="spinner" size={32} />
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-content">
        <div className="error-container" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <p>Error: {error}</p>
          <button onClick={fetchServices} className="btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-content">
      <div className="services-header">
        <h2>Services Management</h2>
        <button 
          className="add-service-btn" 
          onClick={() => setShowAddForm(true)}
          disabled={loading}
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
              {mainService.subServices.filter(subService => subService.isActive).map((subService) => (
                <div key={subService.id} className="sub-service-item">
                  {editingService === subService.id ? (
                    <div className="edit-service-form">
                      <input
                        type="text"
                        value={editingValues.name || subService.service}
                        className="edit-input"
                        onChange={(e) => setEditingValues(prev => ({ ...prev, name: e.target.value }))}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            saveEdits(mainService._id, subService.id, subService.service, subService.price);
                          }
                        }}
                        autoFocus
                      />
                      <input
                        type="number"
                        value={editingValues.price || subService.price}
                        className="edit-input price-input"
                        onChange={(e) => setEditingValues(prev => ({ ...prev, price: e.target.value }))}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            saveEdits(mainService._id, subService.id, subService.service, subService.price);
                          }
                        }}
                      />
                      <div className="edit-actions">
                        <button
                          className="save-btn"
                          onClick={() => saveEdits(mainService._id, subService.id, subService.service, subService.price)}
                        >
                          <FiSave size={16} />
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => {
                            setEditingService(null);
                            setEditingValues({});
                          }}
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
                            onError={(e) => {
                              console.log('Image failed to load:', e.target.src);
                              e.target.src = '/salon-logo.jpg';
                            }}
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
                          onClick={() => startEditing(subService.id, subService.service, subService.price)}
                          title="Edit Service"
                          disabled={loading}
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          className="delete-service-btn"
                          onClick={() => handleDeleteSubService(mainIndex, subService.id)}
                          title="Delete Service"
                          disabled={loading}
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
