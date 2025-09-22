import React from 'react';
import './App.css';
// icons
import { FiCalendar, FiUsers, FiBarChart2, FiCreditCard, FiPhone, FiBox } from 'react-icons/fi';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './login,signup/Login';
import Register from './login,signup/Register';
import Booking from './booking/Booking';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Hero Component
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Salon Management System with Face Recognition</h1>
        <p>This is a digital solution designed to enhance the operations of salons by reducing the communication gap between customers and salon. This system will be used by both customers and admins via mobile app and through website.This System is unique with a feature that scans a customer's facial outline to make intelligent recommendations to its matching hair color, the shape of the eyebrow, and hair cuts using AI powered face detection technology.</p>
        <div className="hero-buttons">
          <a href="#demo" className="btn">Face Recognition</a>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: <FiCalendar size={28} />,
      title: "Appointment Management",
      description: "Easily book, reschedule, and manage appointments with our intuitive calendar system."
    },
    {
      icon: <FiUsers size={28} />,
      title: "Staff Management",
      description: "Assign staff, track performance, and manage schedules all in one place."
    },
    {
      icon: <FiBarChart2 size={28} />,
      title: "Business Analytics",
      description: "Get insights into your business performance with detailed reports and analytics."
    },
    {
      icon: <FiCreditCard size={28} />,
      title: "Payment Processing",
      description: "Accept multiple payment methods and streamline your checkout process."
    },
    {
      icon: <FiPhone size={28} />,
      title: "Client Database",
      description: "Maintain detailed client records, preferences, and history for personalized service."
    },
    {
      icon: <FiBox size={28} />,
      title: "Inventory Tracking",
      description: "Keep track of your products and supplies with automated inventory management."
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title">
          <h2>Powerful Features</h2>
          <p>Everything you need to manage and grow your salon business efficiently</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      text: "SalonPro has transformed how we manage our salon. Booking is easier, clients are happier, and our revenue has increased by 30%!",
      name: "Sarah Johnson",
      role: "Owner, Elite Beauty Salon"
    },
    {
      text: "The inventory management feature alone has saved us countless hours. Now we never run out of our most popular products.",
      name: "Michael Chen",
      role: "Manager, Luxe Hair Studio"
    },
    {
      text: "Our clients love the automated reminders and easy booking system. It's made our operations so much smoother.",
      name: "Jessica Williams",
      role: "Stylist, Style & Smile Salon"
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>What Our Clients Say</h2>
          <p>Hear from salon owners who have transformed their business with SalonPro</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="author-details">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CTA = () => {
  return (
    <section className="cta">
      <div className="container">
        <h2>Ready to Transform Your Salon Business?</h2>
        <p>Join thousands of salon owners who are already using SalonPro to streamline their operations and boost revenue.</p>
        <a href="#signup" className="btn">Get Started Today</a>
      </div>
    </section>
  );
};

// Footer is now a separate component (src/components/Footer.jsx)

// Main App Component
const Home = () => (
  <div className="App">
    <Header />
    <Hero />
    <Features />
    <Testimonials />
    <CTA />
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        {/* Add other routes here for multi-page site */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;