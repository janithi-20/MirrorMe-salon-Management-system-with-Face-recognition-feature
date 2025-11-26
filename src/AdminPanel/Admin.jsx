import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiScissors, FiMessageSquare, FiCalendar, FiUsers, FiTag, FiSettings, FiGrid, FiClock, FiLogOut } from 'react-icons/fi';
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
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const { isAdminAuthenticated, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/dashboard/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const result = await response.json();
      if (result.success) {
        console.log('✅ Dashboard data received:', result.data);
        console.log('📊 Booking channels:', result.data.bookingChannels);
        console.log('📈 Booking status:', result.data.bookingStatus);
        console.log('⏰ Upcoming bookings:', result.data.upcomingBookings);
        setDashboardData(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch settings from API
  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/settings/admin', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Transform API response to simple key-value structure for state management
          const transformedSettings = {};
          
          // Transform businessHours
          if (result.data.businessHours) {
            transformedSettings.businessHours = {};
            Object.keys(result.data.businessHours).forEach(key => {
              transformedSettings.businessHours[key] = result.data.businessHours[key].value;
            });
          }
          
          // Transform contact
          if (result.data.contact) {
            transformedSettings.contact = {};
            Object.keys(result.data.contact).forEach(key => {
              transformedSettings.contact[key] = result.data.contact[key].value;
            });
          }
          
          setSettings(prev => ({ ...prev, ...transformedSettings }));
          console.log('✅ Admin settings loaded from API');
        }
      }
    } catch (err) {
      console.error('❌ Error fetching settings:', err);
      // Keep default settings if API fails
    }
  };

  // Redirect to login if not authenticated as admin
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/login');
    } else {
      fetchDashboardData();
      fetchSettings();
    }
  }, [isAdminAuthenticated, navigate]);

  // Logout function
  const handleLogout = () => {
    logoutAdmin();
    navigate('/login');
  };

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: FiGrid },
    { id: 'services', name: 'Services', icon: FiScissors },
    { id: 'staff', name: 'Team', icon: FiUsers },
    { id: 'feedback', name: 'Feedback', icon: FiMessageSquare },
    { id: 'appointments', name: 'Appointment History', icon: FiCalendar },
    { id: 'brands', name: 'Brands', icon: FiTag },
    { id: 'settings', name: 'Settings', icon: FiSettings },
  ];

  // Settings helper functions
  const handleEditSetting = (category, field) => {
    setEditingSettings(prev => ({
      ...prev,
      [`${category}-${field}`]: settings[category][field]
    }));
  };

  const handleSaveSetting = async (category, field) => {
    const key = `${category}-${field}`;
    const newValue = editingSettings[key];
    
    console.log(`🔄 Attempting to save setting: ${field} = ${newValue}`);
    
    try {
      // Save to backend - use the correct URL format with key parameter
      const response = await fetch(`http://localhost:5000/settings/admin/${field}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: newValue
        })
      });

      console.log(`📡 Response status: ${response.status}`);
      const result = await response.json();
      console.log(`📡 Response data:`, result);

      if (response.ok) {
        if (result.success) {
          // Update local state
          setSettings(prev => ({
            ...prev,
            [category]: {
              ...prev[category],
              [field]: newValue
            }
          }));
          
          // Clear editing state
          setEditingSettings(prev => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
          });
          
          console.log(`✅ Setting ${category}.${field} saved successfully`);
        } else {
          throw new Error(result.message || 'Failed to save setting');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${result.message || 'Failed to save setting'}`);
      }
    } catch (error) {
      console.error('❌ Error saving setting:', error);
      alert('Failed to save setting. Please try again.');
    }
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
        if (loading) {
          return (
            <div className="dashboard-content">
              <h2>Dashboard Overview</h2>
              <div className="loading-message">Loading dashboard data...</div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="dashboard-content">
              <h2>Dashboard Overview</h2>
              <div className="error-message">
                Error loading dashboard data: {error}
                <button onClick={fetchDashboardData} className="retry-btn">Retry</button>
              </div>
            </div>
          );
        }

        if (!dashboardData) {
          return (
            <div className="dashboard-content">
              <h2>Dashboard Overview</h2>
              <div className="no-data-message">Loading dashboard data...</div>
            </div>
          );
        }

        // Debug: Log current dashboard data
        console.log('🎯 Current dashboardData:', dashboardData);
        console.log('📊 bookingChannels:', dashboardData.bookingChannels);
        console.log('📈 bookingStatus:', dashboardData.bookingStatus);

        // Prepare stats data for rendering
        const stats = [
          { title: 'Registered Customers', value: dashboardData.stats.totalCustomers.toString(), color: '#3b82f6' },
          { title: 'Invoice Value', value: `Rs. ${dashboardData.stats.totalRevenue.toLocaleString()}`, color: '#10b981' },
          { title: 'Number of Bookings', value: dashboardData.stats.totalBookings.toString(), color: '#f59e0b' },
        ];

        return (
          <div className="dashboard-content" key={Date.now()}>
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
                  {dashboardData.bookingTrend.map((day, index) => (
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
                      <div className="pie-total">{dashboardData.bookingChannels?.totalBookings || 0}</div>
                      <div className="pie-label">Bookings</div>
                    </div>
                  </div>
                  <div className="pie-legend">
                    <div className="pie-legend-item">
                      <div className="pie-legend-color in-person"></div>
                      <div className="pie-legend-text">
                        <span className="pie-legend-label">Online bookings (website)</span>
                        <span className="pie-legend-value">{dashboardData.bookingChannels?.online || 0}</span>
                      </div>
                    </div>
                    <div className="pie-legend-item">
                      <div className="pie-legend-color walk-in"></div>
                      <div className="pie-legend-text">
                        <span className="pie-legend-label">Walk-in bookings</span>
                        <span className="pie-legend-value">{dashboardData.bookingChannels?.walkIn || 0}</span>
                      </div>
                    </div>
                    <div className="pie-legend-item">
                      <div className="pie-legend-color google"></div>
                      <div className="pie-legend-text">
                        <span className="pie-legend-label">Through phone</span>
                        <span className="pie-legend-value">{dashboardData.bookingChannels?.phone || 0}</span>
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
                  {dashboardData.upcomingBookings.length > 0 ? (
                    dashboardData.upcomingBookings.map((booking) => (
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
                    ))
                  ) : (
                    <div className="no-bookings">No upcoming bookings for today</div>
                  )}
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
                    <div className="status-value">{dashboardData.bookingStatus?.booked || 0}</div>
                  </div>                  <div className="status-box confirmed">
                    <div className="status-box-header">
                      <span className="status-label">Confirmed</span>
                    </div>
                    <div className="status-value">{dashboardData.bookingStatus?.confirmed || 0}</div>
                  </div>
                  
                  <div className="status-box done">
                    <div className="status-box-header">
                      <span className="status-label">Done</span>
                    </div>
                    <div className="status-value">{dashboardData.bookingStatus?.completed || 0}</div>
                  </div>
                  
                  <div className="status-box cancelled">
                    <div className="status-box-header">
                      <span className="status-label">Cancelled</span>
                    </div>
                    <div className="status-value">{dashboardData.bookingStatus?.cancelled || 0}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="recent-activities">
              <h3>Recent Activities</h3>
              <div className="activity-list">
                {dashboardData.recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <FiClock className="activity-icon" />
                    <div className="activity-details">
                      <p>{activity.message}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
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
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <FiLogOut className="logout-icon" />
              Logout
            </button>
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
