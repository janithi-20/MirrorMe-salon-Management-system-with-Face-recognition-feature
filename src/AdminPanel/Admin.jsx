import React, { useState } from 'react';
import { FiScissors, FiMessageSquare, FiCalendar, FiUsers, FiTag, FiSettings, FiGrid, FiClock, FiStar, FiTrendingUp, FiDollarSign, FiActivity } from 'react-icons/fi';
import ServiceManagement from './serviceManage';
import TeamManagement from './TeamManage';
import FeedbackManagement from './FeedbackManage';
import AppointmentManagement from './AppointmentManage';
import BrandManagement from './BrandManage';
import './Admin.css';

  //Feedback management
  const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

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
    { title: 'Booking Value', value: 'Rs. 140,900', change: '+5%', color: '#3b82f6', icon: FiDollarSign },
    { title: 'Invoice Value', value: 'Rs. 95,000', change: '+12%', color: '#10b981', icon: FiActivity },
    { title: 'Taken Services', value: '230 ', change: '+8%', color: '#f59e0b', icon: FiScissors },
  ];

  // Enhanced analytics data
  const bookingTrend = [
    { day: 'Mon', newClients: 12, returningClients: 8 },
    { day: 'Tue', newClients: 15, returningClients: 12 },
    { day: 'Wed', newClients: 8, returningClients: 18 },
    { day: 'Thu', newClients: 22, returningClients: 14 },
    { day: 'Fri', newClients: 28, returningClients: 20 },
    { day: 'Sat', newClients: 18, returningClients: 16 },
  ];

  const bookingChannels = {
    totalBookings: 156,
    online: 78,
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

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2>Dashboard Overview</h2>
            
            {/* Sales Summary Cards */}
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="stat-card enhanced" style={{ borderLeft: `4px solid ${stat.color}` }}>
                    <div className="stat-header">
                      <div className="stat-icon" style={{ color: stat.color }}>
                        <IconComponent size={24} />
                      </div>
                      <span className="stat-change positive">{stat.change}</span>
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-title">{stat.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts and Analytics Row */}
            <div className="analytics-row">
              {/* Booking Trend Chart */}
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
                      <div className="pie-legend-color online"></div>
                      <div className="pie-legend-text">
                        <span className="pie-legend-label">Online bookings (App)</span>
                        <span className="pie-legend-value">{bookingChannels.online}</span>
                      </div>
                    </div>
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
                <div className="status-bar-container">
                  <div className="status-bar">
                    <div className="status-segment booked" style={{ width: `${(bookingStatus.booked / 156) * 100}%` }}></div>
                    <div className="status-segment confirmed" style={{ width: `${(bookingStatus.confirmed / 156) * 100}%` }}></div>
                    <div className="status-segment done" style={{ width: `${(bookingStatus.done / 156) * 100}%` }}></div>
                    <div className="status-segment cancelled" style={{ width: `${(bookingStatus.cancelled / 156) * 100}%` }}></div>
                  </div>
                  <div className="status-legend">
                    <div className="status-legend-item">
                      <div className="status-color booked"></div>
                      <span>Booked</span>
                      <strong>{bookingStatus.booked}</strong>
                    </div>
                    <div className="status-legend-item">
                      <div className="status-color confirmed"></div>
                      <span>Confirmed</span>
                      <strong>{bookingStatus.confirmed}</strong>
                    </div>
                    <div className="status-legend-item">
                      <div className="status-color done"></div>
                      <span>Done</span>
                      <strong>{bookingStatus.done}</strong>
                    </div>
                    <div className="status-legend-item">
                      <div className="status-color cancelled"></div>
                      <span>Cancelled</span>
                      <strong>{bookingStatus.cancelled}</strong>
                    </div>
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
              <div className="setting-item">
                <h4>Business Hours</h4>
                <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                <button className="edit-btn">Edit</button>
              </div>
              <div className="setting-item">
                <h4>Contact Information</h4>
                <p>Phone: (+94) 121-234-567</p>
                <button className="edit-btn">Edit</button>
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
