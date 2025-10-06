import React, { useState } from 'react';
import { FiPlus, FiSave, FiX, FiTrash2 } from 'react-icons/fi';
import './BrandManage.css';

const BrandManagement = () => {
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: 'Keune',
      description: 'Premium hair care products',
      image: '/keune.png'
    },
    {
      id: 2,
      name: 'Jeval',
      description: 'Professional hair care products',
      image: '/jeval.png'
    },
    {
      id: 3,
      name: 'Dreamron',
      description: 'Professional cosmetic and beauty products',
      image: '/dreamron.jpeg'
    },
    {
      id: 4,
      name: 'L\'Oreal',
      description: 'Professional Makeup, Skin care & Hair Products',
      image: '/loreal.png'
    }
  ]);

  const [newBrand, setNewBrand] = useState({ name: '', description: '', image: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddBrand = () => {
    if (newBrand.name && newBrand.description) {
      const brandToAdd = {
        id: Date.now(), 
        ...newBrand
      };
      setBrands([...brands, brandToAdd]);
      setNewBrand({ name: '', description: '', image: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteBrand = (brandId) => {
    setBrands(brands.filter(brand => brand.id !== brandId));
  };

  return (
    <div className="brand-management">
      <h2>Brands Management</h2>
                    
      <div className="brands-management-controls">
        <button 
          className="add-brand-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FiPlus size={16} />
          {showAddForm ? 'Cancel' : 'Add New Brand'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-brand-form">
          <h3>Add New Brand</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Brand Name:</label>
              <input
                type="text"
                value={newBrand.name}
                onChange={(e) => setNewBrand({...newBrand, name: e.target.value})}
                placeholder="Enter brand name"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={newBrand.description}
                onChange={(e) => setNewBrand({...newBrand, description: e.target.value})}
                placeholder="Enter brand description"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Image Path:</label>
              <input
                type="text"
                value={newBrand.image}
                onChange={(e) => setNewBrand({...newBrand, image: e.target.value})}
                placeholder="e.g., /brand-logo.png"
                className="form-input"
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="save-brand-btn" onClick={handleAddBrand}>
              <FiSave size={16} />
              Add Brand
            </button>
            <button 
              className="cancel-brand-btn" 
              onClick={() => {
                setShowAddForm(false);
                setNewBrand({ name: '', description: '', image: '' });
              }}
            >
              <FiX size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="brand-grid">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-item">
            <div className="brand-actions">
              <button
                className="delete-brand-btn"
                onClick={() => handleDeleteBrand(brand.id)}
                title="Delete Brand"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <img src={brand.image} alt={brand.name} className="brand-logo" />
            <h4>{brand.name}</h4>
            <p>{brand.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandManagement;
