import React, { useState, useEffect } from 'react';
import { FiPlus, FiSave, FiX, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import './BrandManage.css';

const BrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBrand, setNewBrand] = useState({ name: '', description: '', image: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/brands/admin');
      const data = await response.json();
      
      if (data.success) {
        setBrands(data.data);
        console.log('✅ Admin brands loaded:', data.data.length);
      } else {
        throw new Error(data.message || 'Failed to fetch brands');
      }
    } catch (error) {
      console.error('❌ Error fetching brands:', error);
      alert('Failed to load brands. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setNewBrand({...newBrand, image: e.target.result});
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Remove image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setNewBrand({...newBrand, image: ''});
    // Reset file input
    const fileInput = document.getElementById('brand-image-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleAddBrand = async () => {
    if (!newBrand.name || !newBrand.description || !newBrand.image) {
      alert('Please fill in all fields and upload an image');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('http://localhost:5000/brands/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBrand)
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Brand created:', data.data.name);
        setBrands([data.data, ...brands]); // Add to beginning of list
        setNewBrand({ name: '', description: '', image: '' });
        setImageFile(null);
        setImagePreview(null);
        // Reset file input
        const fileInput = document.getElementById('brand-image-upload');
        if (fileInput) fileInput.value = '';
        setShowAddForm(false);
        alert('Brand added successfully!');
      } else {
        throw new Error(data.message || 'Failed to create brand');
      }
    } catch (error) {
      console.error('❌ Error creating brand:', error);
      alert('Error: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBrand = async (brandId, brandName) => {
    if (!window.confirm(`Are you sure you want to delete "${brandName}"? This will hide it from the frontend.`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/brands/admin/${brandId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        console.log('🗑️ Brand deleted:', brandName);
        // Update the brand's isActive status in the local state
        setBrands(brands.map(brand => 
          brand._id === brandId ? { ...brand, isActive: false } : brand
        ));
        alert('Brand deleted successfully!');
      } else {
        throw new Error(data.message || 'Failed to delete brand');
      }
    } catch (error) {
      console.error('❌ Error deleting brand:', error);
      alert('Error: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="brand-management">
        <h2>Brands Management</h2>
        <div className="loading-message">
          <FiRefreshCw className="loading-spinner" />
          Loading brands...
        </div>
      </div>
    );
  }

  return (
    <div className="brand-management">
      <h2>Brands Management</h2>
      <div className="brand-stats">
        <p>Total Brands: {brands.length} | Active: {brands.filter(b => b.isActive).length} | Inactive: {brands.filter(b => !b.isActive).length}</p>
      </div>
                    
      <div className="brands-management-controls">
        <button 
          className="add-brand-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={submitting}
        >
          <FiPlus size={16} />
          {showAddForm ? 'Cancel' : 'Add New Brand'}
        </button>
        <button 
          className="refresh-btn"
          onClick={fetchBrands}
          disabled={loading}
          title="Refresh brands list"
        >
          <FiRefreshCw size={16} />
          Refresh
        </button>
      </div>

      {showAddForm && (
        <div className="add-brand-form">
          <h3>Add New Brand</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Brand Name: *</label>
              <input
                type="text"
                value={newBrand.name}
                onChange={(e) => setNewBrand({...newBrand, name: e.target.value})}
                placeholder="Enter brand name"
                className="form-input"
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <label>Description: *</label>
              <input
                type="text"
                value={newBrand.description}
                onChange={(e) => setNewBrand({...newBrand, description: e.target.value})}
                placeholder="Enter brand description"
                className="form-input"
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <label>Brand Image: *</label>
              <div className="image-upload-container">
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-upload-input"
                  id="brand-image-upload"
                  disabled={submitting}
                />
                <label htmlFor="brand-image-upload" className="image-upload-button">
                  {imagePreview ? 'Change Image' : 'Choose Image'}
                </label>
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Brand Preview" className="preview-image" />
                    <button 
                      type="button" 
                      className="remove-image-btn"
                      onClick={removeImage}
                      title="Remove image"
                      disabled={submitting}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button 
              className="save-brand-btn" 
              onClick={handleAddBrand}
              disabled={submitting}
            >
              <FiSave size={16} />
              {submitting ? 'Adding...' : 'Add Brand'}
            </button>
            <button 
              className="cancel-brand-btn" 
              onClick={() => {
                setShowAddForm(false);
                setNewBrand({ name: '', description: '', image: '' });
                setImageFile(null);
                setImagePreview(null);
                // Reset file input
                const fileInput = document.getElementById('brand-image-upload');
                if (fileInput) fileInput.value = '';
              }}
              disabled={submitting}
            >
              <FiX size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="brand-grid">
        {brands.map((brand) => (
          <div key={brand._id} className={`brand-item ${!brand.isActive ? 'inactive' : ''}`}>
            <div className="brand-actions">
              <button
                className="delete-brand-btn"
                onClick={() => handleDeleteBrand(brand._id, brand.name)}
                title="Delete Brand"
                disabled={!brand.isActive}
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <img 
              src={brand.image} 
              alt={brand.name} 
              className="brand-logo"
              onError={(e) => {
                e.target.src = '/placeholder-brand.png';
              }}
            />
            <h4>{brand.name} {!brand.isActive && <span className="inactive-label">(Inactive)</span>}</h4>
            <p>{brand.description}</p>
            <small className="brand-meta">
              Added: {new Date(brand.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>

      {brands.length === 0 && (
        <div className="no-brands">
          <p>No brands found. Add your first brand to get started!</p>
        </div>
      )}
    </div>
  );
};

export default BrandManagement;
