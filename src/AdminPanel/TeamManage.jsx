import React, { useState } from 'react';
import { FiEdit2, FiSave, FiX, FiPlus, FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import './TeamManage.css';

const TeamManagement = () => {
  const [editingStaff, setEditingStaff] = useState(null);
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: 'Lewis Fernandiz',
      position: 'Hair Stylist',
      experience: '5+ years experience',
      email: 'lewis@mirrorme.com',
      phone: '+94 77 123 4567',
      address: 'Colombo 03',
      salary: 85000,
      joinDate: '2019-03-15',
      status: 'active',
      specialties: ['Hair Cutting', 'Hair Styling', 'Hair Washing'],
      image: '/Lewis.jpg'
    },
    {
      id: 2,
      name: 'Angela Diano',
      position: 'Junior Hair Stylist',
      experience: '1+ years experience',
      email: 'angela@mirrorme.com',
      phone: '+94 77 234 5678',
      address: 'Colombo 07',
      salary: 45000,
      joinDate: '2024-01-10',
      status: 'active',
      specialties: ['Hair Cutting', 'Hair Washing'],
      image: '/Angela.jpg'
    },
    {
      id: 3,
      name: 'Kylie Nellina',
      position: 'Nail Artist',
      experience: '3 years experience',
      email: 'kylie@mirrorme.com',
      phone: '+94 77 345 6789',
      address: 'Colombo 05',
      salary: 55000,
      joinDate: '2022-06-01',
      status: 'active',
      specialties: ['Nail Art', 'Manicure', 'Pedicure', 'Gel Nails'],
      image: '/Kylie.jpg'
    },
    {
      id: 4,
      name: 'Shalini Neha',
      position: 'Massage Therapist',
      experience: '5 years experience',
      email: 'shalini@mirrorme.com',
      phone: '+94 77 456 7890',
      address: 'Colombo 04',
      salary: 65000,
      joinDate: '2020-09-12',
      status: 'active',
      specialties: ['Body Massage', 'Face Massage', 'Relaxation Therapy'],
      image: '/Shalini.jpg'
    },
    {
      id: 5,
      name: 'Ethan Kal',
      position: 'Color Specialist',
      experience: '5+ years experience',
      email: 'ethan@mirrorme.com',
      phone: '+94 77 567 8901',
      address: 'Colombo 06',
      salary: 75000,
      joinDate: '2019-11-20',
      status: 'active',
      specialties: ['Hair Coloring', 'Highlights', 'Hair Treatments'],
      image: '/Ethan.jpg'
    },
    {
      id: 6,
      name: 'Marie De Zoya',
      position: 'Skincare Specialist',
      experience: '4+ years experience',
      email: 'marie@mirrorme.com',
      phone: '+94 77 678 9012',
      address: 'Colombo 08',
      salary: 70000,
      joinDate: '2021-02-28',
      status: 'active',
      specialties: ['Facial Treatments', 'Skin Analysis', 'Anti-aging Treatments'],
      image: '/Marie.jpg'
    }
  ]);
  return (
    <div className="section-content">
      <h2>Team Management</h2>
      <div className="staff-stats">
        <div className="staff-stat">
          <span className="stat-number">{staffMembers.filter(s => s.status === 'active').length}</span>
          <span className="stat-label">Active Staff</span>
        </div>
        <div className="staff-stat">
          <span className="stat-number">{staffMembers.length}</span>
          <span className="stat-label">Total Staff</span>
        </div>
        <div className="staff-stat">
          <span className="stat-number">Rs. {staffMembers.reduce((total, staff) => total + staff.salary, 0).toLocaleString()}</span>
          <span className="stat-label">Monthly Payroll</span>
        </div>
        <div className="staff-stat">
          <span className="stat-number">{Math.round(staffMembers.reduce((total, staff) => total + parseFloat(staff.experience), 0) / staffMembers.length * 10) / 10}</span>
          <span className="stat-label">Avg Experience (Years)</span>
        </div>
      </div>
      
      <div className="staff-management-controls">
        <button className="add-staff-btn">
          <FiPlus size={16} />
          Add New Staff Member
        </button>
      </div>
      
      <div className="staff-grid">
        {staffMembers.map((staff) => (
          <div key={staff.id} className="staff-card">
            {editingStaff === staff.id ? (
              <div className="edit-staff-form">
                <div className="staff-image-section">
                  <img src={staff.image} alt={staff.name} className="staff-avatar" />
                </div>
                
                <div className="edit-form-grid">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      defaultValue={staff.name}
                      className="edit-input"
                      onBlur={(e) => {
                        setStaffMembers(prevStaff =>
                          prevStaff.map(s =>
                            s.id === staff.id ? { ...s, name: e.target.value } : s
                          )
                        );
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Position:</label>
                    <input
                      type="text"
                      defaultValue={staff.position}
                      className="edit-input"
                      onBlur={(e) => {
                        setStaffMembers(prevStaff =>
                          prevStaff.map(s =>
                            s.id === staff.id ? { ...s, position: e.target.value } : s
                          )
                        );
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Experience:</label>
                    <input
                      type="text"
                      defaultValue={staff.experience}
                      className="edit-input"
                      onBlur={(e) => {
                        setStaffMembers(prevStaff =>
                          prevStaff.map(s =>
                            s.id === staff.id ? { ...s, experience: e.target.value } : s
                          )
                        );
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      defaultValue={staff.email}
                      className="edit-input"
                      onBlur={(e) => {
                        setStaffMembers(prevStaff =>
                          prevStaff.map(s =>
                            s.id === staff.id ? { ...s, email: e.target.value } : s
                          )
                        );
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      defaultValue={staff.phone}
                      className="edit-input"
                      onBlur={(e) => {
                        setStaffMembers(prevStaff =>
                          prevStaff.map(s =>
                            s.id === staff.id ? { ...s, phone: e.target.value } : s
                          )
                        );
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Address:</label>
                    <input
                      type="text"
                      defaultValue={staff.address}
                      className="edit-input"
                      onBlur={(e) => {
                        setStaffMembers(prevStaff =>
                          prevStaff.map(s =>
                            s.id === staff.id ? { ...s, address: e.target.value } : s
                          )
                        );
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Salary (Rs.):</label>
                    <input
                      type="number"
                      defaultValue={staff.salary}
                      className="edit-input"
                      onBlur={(e) => {
                        setStaffMembers(prevStaff =>
                          prevStaff.map(s =>
                            s.id === staff.id ? { ...s, salary: parseInt(e.target.value) || 0 } : s
                          )
                        );
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      defaultValue={staff.status}
                      className="edit-input"
                      onChange={(e) => {
                        setStaffMembers(prevStaff =>
                          prevStaff.map(s =>
                            s.id === staff.id ? { ...s, status: e.target.value } : s
                          )
                        );
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="on-leave">On Leave</option>
                    </select>
                  </div>
                </div>
                
                <div className="specialties-section">
                  <label>Specialties:</label>
                  <div className="specialties-tags">
                    {staff.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
                
                <div className="edit-actions">
                  <button
                    className="save-btn"
                    onClick={() => setEditingStaff(null)}
                  >
                    <FiSave size={16} />
                    Save Changes
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditingStaff(null)}
                  >
                    <FiX size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="staff-display">
                <div className="staff-header">
                  <img src={staff.image} alt={staff.name} className="staff-avatar" />
                  <div className="staff-basic-info">
                    <h3>{staff.name}</h3>
                    <p className="staff-position">{staff.position}</p>
                    <span className={`status-badge ${staff.status}`}>
                      {staff.status === 'active' ? 'Active' : staff.status === 'inactive' ? 'Inactive' : 'On Leave'}
                    </span>
                  </div>
                  <button
                    className="edit-staff-btn"
                    onClick={() => setEditingStaff(staff.id)}
                  >
                    <FiEdit2 size={16} />
                  </button>
                </div>
                
                <div className="staff-details">
                  <div className="detail-item">
                    <FiMail className="detail-icon" />
                    <span>{staff.email}</span>
                  </div>
                  <div className="detail-item">
                    <FiPhone className="detail-icon" />
                    <span>{staff.phone}</span>
                  </div>
                  <div className="detail-item">
                    <FiMapPin className="detail-icon" />
                    <span>{staff.address}</span>
                  </div>
                  <div className="detail-item">
                    <FiClock className="detail-icon" />
                    <span>{staff.experience}</span>
                  </div>
                </div>
                
                <div className="staff-salary">
                  <span className="salary-label">Monthly Salary:</span>
                  <span className="salary-amount">Rs. {staff.salary.toLocaleString()}</span>
                </div>
                
                <div className="staff-specialties">
                  <span className="specialties-label">Specialties:</span>
                  <div className="specialties-tags">
                    {staff.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
                
                <div className="staff-join-date">
                  <span>Joined: {new Date(staff.joinDate).toLocaleDateString()}</span>
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
