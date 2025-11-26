import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiX, FiPlus, FiMail, FiPhone, FiMapPin, FiClock, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import './TeamManage.css';

const TeamManagement = () => {
  const [editingStaff, setEditingStaff] = useState(null);
  const [editingValues, setEditingValues] = useState({}); // For controlled editing
  const [showAddForm, setShowAddForm] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ 
    totalMembers: 0, 
    activeMembers: 0, 
    onLeaveMembers: 0, 
    totalPayroll: 0 
  });
  const [newStaff, setNewStaff] = useState({
    name: '',
    position: '',
    specialization: '',
    experience: '',
    email: '',
    phone: '',
    address: '',
    salary: 0,
    joinDate: '',
    status: 'active',
    specialties: [],
    image: '',
    bio: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch team members from API
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/team/admin/all');
      const data = await response.json();
      
      console.log('👥 Admin Team API Response:', data);
      
      if (data.success) {
        setStaffMembers(data.data);
      } else {
        setError('Failed to fetch team members');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Fetch team stats
  const fetchTeamStats = async () => {
    try {
      const response = await fetch('/team/admin/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching team stats:', error);
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
        setNewStaff(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Remove image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setNewStaff(prev => ({ ...prev, image: '' }));
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  // Add new team member
  const addTeamMember = async () => {
    if (!newStaff.name) {
      alert('Please enter a name');
      return;
    }

    try {
      const response = await fetch('/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStaff)
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Team member added:', data.data);
        await fetchTeamMembers(); // Refresh the list
        await fetchTeamStats(); // Refresh stats
        setNewStaff({
          name: '',
          position: '',
          specialization: '',
          experience: '',
          email: '',
          phone: '',
          address: '',
          salary: 0,
          joinDate: '',
          status: 'active',
          specialties: [],
          image: '',
          bio: ''
        });
        setImageFile(null);
        setImagePreview(null);
        // Reset file input
        const fileInput = document.getElementById('image-upload');
        if (fileInput) fileInput.value = '';
        setShowAddForm(false);
        alert('Team member added successfully!');
      } else {
        alert(`Failed to add team member: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding team member:', error);
      alert('Failed to add team member. Please try again.');
    }
  };

  // Update team member
  const updateTeamMember = async (staffId) => {
    try {
      const response = await fetch(`/team/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingValues)
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Team member updated:', data.data);
        await fetchTeamMembers(); // Refresh the list
        await fetchTeamStats(); // Refresh stats
        setEditingStaff(null);
        setEditingValues({});
        alert('Team member updated successfully!');
      } else {
        alert(`Failed to update team member: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating team member:', error);
      alert('Failed to update team member. Please try again.');
    }
  };

  // Delete team member
  const handleDeleteStaff = async (staffId) => {
    if (!window.confirm('Are you sure you want to delete this staff member? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/team/${staffId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Team member deleted');
        await fetchTeamMembers(); // Refresh the list
        await fetchTeamStats(); // Refresh stats
        alert('Team member deleted successfully!');
      } else {
        alert(`Failed to delete team member: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member. Please try again.');
    }
  };

  // Start editing a staff member
  const startEditing = (staff) => {
    setEditingStaff(staff._id);
    setEditingValues({
      name: staff.name,
      position: staff.position,
      specialization: staff.specialization,
      experience: staff.experience,
      email: staff.email,
      phone: staff.phone,
      address: staff.address,
      salary: staff.salary,
      bio: staff.bio || ''
    });
  };

  // Handle input change during editing
  const handleEditInputChange = (field, value) => {
    setEditingValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    fetchTeamMembers();
    fetchTeamStats();
  }, []);

  if (loading) {
    return (
      <div className="section-content">
        <h2>Team Management</h2>
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <FiRefreshCw className="spin" size={24} />
          <p>Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-content">
      <h2>Team Management</h2>
      <div className="staff-stats">
        <div className="staff-stat">
          <span className="stat-number">{stats.totalMembers || stats.activeMembers || staffMembers.length}</span>
          <span className="stat-label">Total Staff</span>
        </div>
        <div className="staff-stat">
          <span className="stat-number">Rs. {(stats.totalPayroll || 0).toLocaleString()}</span>
          <span className="stat-label">Monthly Payroll</span>
        </div>
      </div>

      {error && (
        <div style={{ padding: '10px', margin: '10px 0', backgroundColor: '#ffe6e6', color: '#d63384', borderRadius: '5px', border: '1px solid #f5c6cb' }}>
          ⚠️ {error} - Some features may not work properly.
        </div>
      )}
      
      <div className="staff-management-controls">
        {!showAddForm ? (
          <button className="add-staff-btn" onClick={() => setShowAddForm(true)}>
            <FiPlus size={16} />
            Add New Staff Member
          </button>
        ) : null}
        <button 
          className="refresh-btn" 
          onClick={() => { fetchTeamMembers(); fetchTeamStats(); }}
          style={{ marginLeft: '10px', padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          <FiRefreshCw size={16} />
          Refresh
        </button>
      </div>

      {showAddForm && (
        <div className="modal-backdrop" onClick={() => setShowAddForm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Staff Member</h3>
            <div className="modal-form-grid">
              <div className="form-group">
                <label>Name *</label>
                <input 
                  value={newStaff.name} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))} 
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label>Position *</label>
                <input 
                  value={newStaff.position} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="e.g., Hair Stylist, Nail Artist"
                />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <input 
                  value={newStaff.specialization} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, specialization: e.target.value }))}
                  placeholder="e.g., Hair Cutting, Manicure"
                />
              </div>
              <div className="form-group">
                <label>Experience</label>
                <input 
                  value={newStaff.experience} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g., 3+ years experience"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email"
                  value={newStaff.email} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="employee@mirrorme.com"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input 
                  value={newStaff.phone} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+94 77 123 4567"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input 
                  value={newStaff.address} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="City, District"
                />
              </div>
              <div className="form-group">
                <label>Salary (Rs.)</label>
                <input 
                  type="number" 
                  value={newStaff.salary} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, salary: parseInt(e.target.value) || 0 }))}
                  placeholder="50000"
                />
              </div>
              <div className="form-group">
                <label>Join Date</label>
                <input 
                  type="date" 
                  value={newStaff.joinDate} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, joinDate: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Upload Image</label>
                <div className="image-upload-container">
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="image-upload-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="image-upload-button">
                    {imagePreview ? 'Change Image' : 'Choose Image'}
                  </label>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" className="preview-image" />
                      <button 
                        type="button" 
                        className="remove-image-btn"
                        onClick={removeImage}
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Bio</label>
                <textarea 
                  value={newStaff.bio} 
                  onChange={(e) => setNewStaff(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Brief bio about the team member..."
                  rows={3}
                  style={{ width: '100%', minHeight: '60px', resize: 'vertical' }}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="save-btn"
                onClick={addTeamMember}
              >
                <FiSave size={16} /> Save
              </button>
              <button 
                className="cancel-btn" 
                onClick={() => { 
                  setShowAddForm(false); 
                  setNewStaff({
                    name: '',
                    position: '',
                    specialization: '',
                    experience: '',
                    email: '',
                    phone: '',
                    address: '',
                    salary: 0,
                    joinDate: '',
                    status: 'active',
                    specialties: [],
                    image: '',
                    bio: ''
                  });
                  setImageFile(null);
                  setImagePreview(null);
                  // Reset file input
                  const fileInput = document.getElementById('image-upload');
                  if (fileInput) fileInput.value = ''; 
                }}
              >
                <FiX size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
  )}
      <div className="staff-grid">
        {staffMembers.map((staff) => (
          <div key={staff._id} className="staff-card">
            {editingStaff === staff._id ? (
              <div className="edit-staff-form">
                <div className="staff-image-section">
                  <img src={staff.image || '/default-avatar.jpg'} alt={staff.name} className="staff-avatar" />
                </div>
                
                <div className="edit-form-grid">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      value={editingValues.name || ''}
                      className="edit-input"
                      onChange={(e) => handleEditInputChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Position:</label>
                    <input
                      type="text"
                      value={editingValues.position || ''}
                      className="edit-input"
                      onChange={(e) => handleEditInputChange('position', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Specialization:</label>
                    <input
                      type="text"
                      value={editingValues.specialization || ''}
                      className="edit-input"
                      onChange={(e) => handleEditInputChange('specialization', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Experience:</label>
                    <input
                      type="text"
                      value={editingValues.experience || ''}
                      className="edit-input"
                      onChange={(e) => handleEditInputChange('experience', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={editingValues.email || ''}
                      className="edit-input"
                      onChange={(e) => handleEditInputChange('email', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      value={editingValues.phone || ''}
                      className="edit-input"
                      onChange={(e) => handleEditInputChange('phone', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Address:</label>
                    <input
                      type="text"
                      value={editingValues.address || ''}
                      className="edit-input"
                      onChange={(e) => handleEditInputChange('address', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Salary (Rs.):</label>
                    <input
                      type="number"
                      value={editingValues.salary || 0}
                      className="edit-input"
                      onChange={(e) => handleEditInputChange('salary', parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Bio:</label>
                    <textarea
                      value={editingValues.bio || ''}
                      className="edit-input"
                      onChange={(e) => handleEditInputChange('bio', e.target.value)}
                      rows={3}
                      style={{ minHeight: '60px', resize: 'vertical' }}
                    />
                  </div>
                </div>
                
                <div className="edit-actions">
                  <button
                    className="save-btn"
                    onClick={() => updateTeamMember(staff._id)}
                  >
                    <FiSave size={16} />
                    Save Changes
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      setEditingStaff(null);
                      setEditingValues({});
                    }}
                  >
                    <FiX size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="staff-display">
                <div className="staff-header">
                  <img src={staff.image || '/default-avatar.jpg'} alt={staff.name} className="staff-avatar" />
                  <div className="staff-basic-info">
                    <h3>{staff.name}</h3>
                    <p className="staff-position">{staff.position}</p>
                    {staff.specialization && (
                      <p className="staff-specialization">{staff.specialization}</p>
                    )}
                  </div>
                  <div className="staff-actions">
                    <button
                      className="edit-staff-btn"
                      onClick={() => startEditing(staff)}
                      title="Edit Staff"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      className="delete-staff-btn"
                      onClick={() => handleDeleteStaff(staff._id)}
                      title="Delete Staff"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="staff-details">
                  {staff.email && (
                    <div className="detail-item">
                      <FiMail className="detail-icon" />
                      <span>{staff.email}</span>
                    </div>
                  )}
                  {staff.phone && (
                    <div className="detail-item">
                      <FiPhone className="detail-icon" />
                      <span>{staff.phone}</span>
                    </div>
                  )}
                  {staff.address && (
                    <div className="detail-item">
                      <FiMapPin className="detail-icon" />
                      <span>{staff.address}</span>
                    </div>
                  )}
                  {staff.experience && (
                    <div className="detail-item">
                      <FiClock className="detail-icon" />
                      <span>{staff.experience}</span>
                    </div>
                  )}
                </div>
                
                {staff.bio && (
                  <div className="staff-bio">
                    <p>{staff.bio}</p>
                  </div>
                )}
                
                {staff.salary && (
                  <div className="staff-salary">
                    <span className="salary-label">Monthly Salary:</span>
                    <span className="salary-amount">Rs. {staff.salary.toLocaleString()}</span>
                  </div>
                )}
                
                {staff.joinDate && (
                  <div className="staff-join-date">
                    <span>Joined: {new Date(staff.joinDate).toLocaleDateString()}</span>
                  </div>
                )}
                
                <div className="staff-status">
                  <span className={`status-badge ${staff.status}`}>
                    {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
