import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiScissors, FiMessageSquare, FiCalendar, FiUsers, FiTag, FiSettings, FiGrid, FiClock, FiStar, FiTrendingUp } from 'react-icons/fi';
import ServiceManagement from './serviceManage';
import TeamManagement from './TeamManage';
import FeedbackManagement from './FeedbackManage';
import AppointmentManagement from './AppointmentManage';
import BrandManagement from './BrandManage';
import './Admin.css';

  //Feedback management
  const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editingSettings, setEditingSettings] = useState({});
  const [settings, setSettings] = useState({
    businessHours: {
      weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
      weekends: 'Saturday - Sunday: 9:00 AM - 7:00 PM'
    },
    contact: {
      phone: '(+94) 121-234-567',
      email: 'info@mirrorme.lk',
      address: '123 Main Street, Colombo 03, Sri Lanka'
    }
  });
  const { isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated as admin
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/login');
    }
  }, [isAdminAuthenticated, navigate]);

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: FiGrid },
    { id: 'services', name: 'Services', icon: FiScissors },
    { id: 'staff', name: 'Team', icon: FiUsers },
    { id: 'feedback', name: 'Feedback', icon: FiMessageSquare },
    { id: 'appointments', name: 'Appointment History', icon: FiCalendar },
    { id: 'brands', name: 'Brands', icon: FiTag },
    { id: 'settings', name: 'Settings', icon: FiSettings },
  ];

  const stats = [
    { title: 'Registered Customers', value: '156', color: '#3b82f6' },
    { title: 'Invoice Value', value: 'Rs. 95,000', color: '#10b981' },
    { title: 'Number of Bookings', value: '89', color: '#f59e0b' },
  ];

  const bookingTrend = [
    { day: 'Mon', newClients: 12, returningClients: 8 },
    { day: 'Tue', newClients: 15, returningClients: 12 },
    { day: 'Wed', newClients: 8, returningClients: 18 },
    { day: 'Thu', newClients: 22, returningClients: 14 },
    { day: 'Fri', newClients: 28, returningClients: 20 },
    { day: 'Sat', newClients: 18, returningClients: 16 },
  ];

  const bookingChannels = {
    totalBookings: 78,
    inPerson: 52,
    walkIn: 18,
    google: 8
  };

  const bookingStatus = {
    booked: 8,
    confirmed: 52,
    done: 92,
    cancelled: 4
  };

  const upcomingBookings = [
    { 
      id: 1, 
      service: 'Brightening Clean Up (Ume Care)', 
      client: 'Ledner Tobin', 
      time: '12:45 PM', 
      status: 'confirmed',
    },
    { 
      id: 2, 
      service: 'Cut & Re-Style (Advance)', 
      client: 'Ashley Mackenzie', 
      time: '02:15 PM', 
      status: 'confirmed',
    },
    { 
      id: 3, 
      service: 'Full Dressing Derma', 
      client: 'Mackee Rose', 
      time: '02:15 PM', 
      status: 'confirmed',
    }
  ];

  // Settings helper functions
  const handleEditSetting = (category, field) => {
    setEditingSettings(prev => ({
      ...prev,
      [`${category}-${field}`]: settings[category][field]
    }));
  };

  const handleSaveSetting = (category, field) => {
    const key = `${category}-${field}`;
    const newValue = editingSettings[key];
    
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: newValue
      }
    }));
    
    setEditingSettings(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleCancelEdit = (category, field) => {
    const key = `${category}-${field}`;
    setEditingSettings(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleSettingChange = (category, field, value) => {
    const key = `${category}-${field}`;
    setEditingSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            
            {/* Sales Summary Cards */}
            <div className="stats-grid">
              {stats.map((stat, index) => {
                return (
                  <div key={index} className="stat-card enhanced" style={{ borderLeft: `4px solid ${stat.color}` }}>
                    <div className="stat-content">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-title">{stat.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            
            <div className="analytics-row">
              
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Booking Overview</h3>
                  <span className="chart-period">Last updated: 6 hours ago</span>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color new-clients"></div>
                    <span>New clients</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color returning-clients"></div>
                    <span>Returning clients</span>
                  </div>
                </div>
                <div className="bar-chart">
                  {bookingTrend.map((day, index) => (
                    <div key={index} className="bar-group">
                      <div className="bars">
                        <div 
                          className="bar new-clients-bar" 
                          style={{ height: `${day.newClients * 3}px` }}
                        ></div>
                        <div 
                          className="bar returning-clients-bar" 
                          style={{ height: `${day.returningClients * 3}px` }}
                        ></div>
                      </div>
                      <span className="bar-label">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Channels Pie Chart */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>Booking Highlights</h3>
                  <span className="chart-period">Last updated: 6 hours ago</span>
                </div>
                <div className="pie-chart-container">
                  <div className="pie-chart">
                    <div className="pie-center">
                      <div className="pie-total">{bookingChannels.totalBookings}</div>
                      <div className="pie-label">Bookings</div>
                    </div>
                  </div>
                  <div className="pie-legend">
                    <div className="pie-legend-item">
                      <div className="pie-legend-color in-person"></div>
                      <div className="pie-legend-text">
                        <span className="pie-legend-label">Online bookings (website)</span>
                        <span className="pie-legend-value">{bookingChannels.inPerson}</span>
                      </div>
                    </div>
                    <div className="pie-legend-item">
                      <div className="pie-legend-color walk-in"></div>
                      <div className="pie-legend-text">
                        <span className="pie-legend-label">Walk-in bookings</span>
                        <span className="pie-legend-value">{bookingChannels.walkIn}</span>
                      </div>
                    </div>
                    <div className="pie-legend-item">
                      <div className="pie-legend-color google"></div>
                      <div className="pie-legend-text">
                        <span className="pie-legend-label">Through phone</span>
                        <span className="pie-legend-value">{bookingChannels.google}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="analytics-row">
              {/* Upcoming Bookings */}
              <div className="chart-card upcoming-bookings">
                <div className="chart-header">
                  <h3>Upcoming Bookings</h3>
                </div>
                <div className="bookings-list">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="booking-item">
                      <div className="booking-details">
                        <div className="booking-service">{booking.service}</div>
                        <div className="booking-client">{booking.client}</div>
                      </div>
                      <div className="booking-time">
                        <div className="time">{booking.time}</div>
                        <div className="status">Today</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Status */}
              <div className="chart-card booking-status">
                <div className="chart-header">
                  <h3>Booking Status</h3>
                  <span className="chart-period">Last updated: 6 hours ago</span>
                </div>
                <div className="status-boxes-container">
                  <div className="status-box booked">
                    <div className="status-box-header">
                      <span className="status-label">Booked</span>
                    </div>
                    <div className="status-value">{bookingStatus.booked}</div>
                  </div>
                  
                  <div className="status-box confirmed">
                    <div className="status-box-header">
                      <span className="status-label">Confirmed</span>
                    </div>
                    <div className="status-value">{bookingStatus.confirmed}</div>
                  </div>
                  
                  <div className="status-box done">
                    <div className="status-box-header">
                      <span className="status-label">Done</span>
                    </div>
                    <div className="status-value">{bookingStatus.done}</div>
                  </div>
                  
                  <div className="status-box cancelled">
                    <div className="status-box-header">
                      <span className="status-label">Cancelled</span>
                    </div>
                    <div className="status-value">{bookingStatus.cancelled}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="recent-activities">
              <h3>Recent Activities</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <FiClock className="activity-icon" />
                  <div className="activity-details">
                    <p>New appointment scheduled for tomorrow</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <FiStar className="activity-icon" />
                  <div className="activity-details">
                    <p>New 5-star review received</p>
                    <span className="activity-time">4 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <FiUsers className="activity-icon" />
                  <div className="activity-details">
                    <p>Team member added new service</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <FiTrendingUp className="activity-icon" />
                  <div className="activity-details">
                    <p>Monthly revenue increased by 15%</p>
                    <span className="activity-time">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'services':
        return (
          <ServiceManagement />
        );
      case 'staff':
        return (
          <TeamManagement />
        );
      case 'feedback':
        return (
          <FeedbackManagement />
        );
      case 'appointments':
        return <AppointmentManagement />;

      case 'brands':
        return <BrandManagement />;
      case 'settings':
        return (
          <div className="section-content">
            <h2>Settings</h2>
            <div className="settings-grid">
              {/* Business Hours */}
              <div className="setting-category">
                <h3>Business Hours</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Weekdays</h4>
                    {editingSettings['businessHours-weekdays'] !== undefined ? (
                      <input
                        type="text"
                        value={editingSettings['businessHours-weekdays']}
                        onChange={(e) => handleSettingChange('businessHours', 'weekdays', e.target.value)}
                        className="setting-input"
                      />
                    ) : (
                      <p>{settings.businessHours.weekdays}</p>
                    )}
                  </div>
                  <div className="setting-actions">
                    {editingSettings['businessHours-weekdays'] !== undefined ? (
                      <>
                        <button 
                          className="save-btn"
                          onClick={() => handleSaveSetting('businessHours', 'weekdays')}
                        >
                          Save
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelEdit('businessHours', 'weekdays')}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditSetting('businessHours', 'weekdays')}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Weekends</h4>
                    {editingSettings['businessHours-weekends'] !== undefined ? (
                      <input
                        type="text"
                        value={editingSettings['businessHours-weekends']}
                        onChange={(e) => handleSettingChange('businessHours', 'weekends', e.target.value)}
                        className="setting-input"
                      />
                    ) : (
                      <p>{settings.businessHours.weekends}</p>
                    )}
                  </div>
                  <div className="setting-actions">
                    {editingSettings['businessHours-weekends'] !== undefined ? (
                      <>
                        <button 
                          className="save-btn"
                          onClick={() => handleSaveSetting('businessHours', 'weekends')}
                        >
                          Save
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelEdit('businessHours', 'weekends')}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditSetting('businessHours', 'weekends')}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="setting-category">
                <h3>Contact Information</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Phone</h4>
                    {editingSettings['contact-phone'] !== undefined ? (
                      <input
                        type="tel"
                        value={editingSettings['contact-phone']}
                        onChange={(e) => handleSettingChange('contact', 'phone', e.target.value)}
                        className="setting-input"
                      />
                    ) : (
                      <p>{settings.contact.phone}</p>
                    )}
                  </div>
                  <div className="setting-actions">
                    {editingSettings['contact-phone'] !== undefined ? (
                      <>
                        <button 
                          className="save-btn"
                          onClick={() => handleSaveSetting('contact', 'phone')}
                        >
                          Save
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelEdit('contact', 'phone')}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditSetting('contact', 'phone')}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Email</h4>
                    {editingSettings['contact-email'] !== undefined ? (
                      <input
                        type="email"
                        value={editingSettings['contact-email']}
                        onChange={(e) => handleSettingChange('contact', 'email', e.target.value)}
                        className="setting-input"
                      />
                    ) : (
                      <p>{settings.contact.email}</p>
                    )}
                  </div>
                  <div className="setting-actions">
                    {editingSettings['contact-email'] !== undefined ? (
                      <>
                        <button 
                          className="save-btn"
                          onClick={() => handleSaveSetting('contact', 'email')}
                        >
                          Save
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelEdit('contact', 'email')}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditSetting('contact', 'email')}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Address</h4>
                    {editingSettings['contact-address'] !== undefined ? (
                      <textarea
                        value={editingSettings['contact-address']}
                        onChange={(e) => handleSettingChange('contact', 'address', e.target.value)}
                        className="setting-textarea"
                        rows="2"
                      />
                    ) : (
                      <p>{settings.contact.address}</p>
                    )}
                  </div>
                  <div className="setting-actions">
                    {editingSettings['contact-address'] !== undefined ? (
                      <>
                        <button 
                          className="save-btn"
                          onClick={() => handleSaveSetting('contact', 'address')}
                        >
                          Save
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelEdit('contact', 'address')}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditSetting('contact', 'address')}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Mirror Me Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <IconComponent className="nav-icon" />
                <span>{item.name}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <h1>Salon Management System</h1>
          <div className="admin-user">
            <span>Welcome, Admin</span>
          </div>
        </div>

        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
