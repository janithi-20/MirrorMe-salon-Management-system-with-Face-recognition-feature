import React from 'react';
import './App.css';
// icons
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";

// Modal
import FeedbackModal from './components/FeedbackModal';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

import Login from './pages/login/Login';
import Services from './pages/services/Services';
import Haircut from './pages/services/Haircut';
import SkinTreatments from './pages/services/SkinTreatments';
import Dressings from './pages/services/Dressings';
import Nails from './pages/services/Nails';
import Waxing from './pages/services/Waxing';
import ManicurePedicure from './pages/services/ManicurePedicure';

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
      title: "Lewis Fernandiz",
      description: "Salon Manager/Director",
      photo: '/Lewis.jpg'
    },
    {
      title: "Angela Diano",
      description: "Assistant Stylist/Junior Stylist",
      photo: '/Angela.jpg'
    },
    {
      title: "Kylie Nellina",
      description: "Nail Technician",
      photo: '/Kylie.jpg'
    },
    {
      title: "Shalini Neha",
      description: "Massage Therapist",
      photo: '/Shalini.jpg'
    },
    {
      title: "Ethan Kal",
      description: "Color Specialist",
      photo: '/Ethan.jpg'
    },
    {
      title: "Marie De Zoya",
      description: "Skincare specialist",
      photo: '/Marie.jpg'
    }
  ];


  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title">
          <h2>Our Team</h2>
          <p>Each of our team members have different individual strengths, years of experience.</p>
          <p className="team-description">Our stylists and therapists combine years of hands-on experience with up-to-date techniques and a passion for customer satisfaction. Browse the profiles below to learn more about their specialties and book with confidence.</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
                {feature.photo && (
                <img src={feature.photo} alt={feature.title} className="member-photo" />
               )}

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
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const testimonials = [
    {
      text: "They remember my preferences and my service history, which is a great new feature. It makes me feel like they know me and what I like",
      name: "Sonali De Silva",
      role: (
        <span>
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </span>
      )
    },
    {
      text: " The face recognition feature is a game-changer! It speeds up the check-in process and adds a personal touch to the customer experience.",
      name: "Michael Fernando",
      role: (
        <span>
          <FaStar /><FaStar /><FaStar /><FaStarHalf />
        </span>
      )
    },
    {
      text: "I love how easy it is to book my appointments online. It's so convenient and a much more reliable way to schedule than having to call the salon.",
      name: "Jessica Perera",
      role: (
        <span>
          <FaStar /><FaStar /><FaStar /><FaStar />
        </span>
      )
    }
  ];


  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Your Happiness, Our Success</h2>
          <p>Hear from our valueble customers, who had a great experience with our "MirroeMe" Salon </p>
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
        <div className="feedback-short">
          <button className="btn" onClick={() => setIsModalOpen(true)}>Submit your feedback</button>
        </div>
        <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
};



// CTA Component
const CTA = () => {

// Brands Component
const Brands = () => {
  const brands = [
    { name: 'KEUNE', logo: 'https://via.placeholder.com/160x80?text=KEUNE' },
    { name: 'LOREAL', logo: 'https://via.placeholder.com/160x80?text=LOREAL' },
    { name: 'jEVAL', logo: 'https://via.placeholder.com/160x80?text=jEVAL' },
    { name: 'Dreamron', logo: 'https://via.placeholder.com/160x80?text=Dreamron' }
  ];


  return (
    <section id="brands" className="brands">
      <div className="container">
        <div className="section-title">
          <h2>Brands</h2>
          <p><strong>We partner with industry-leading brands to bring you the best salon products and treatments.</strong></p>
        </div>
        <div className="brands-grid">
          {brands.map((b, i) => (
            <div key={i} className="brand-card">
              <img src={b.logo} alt={b.name} style={{ maxWidth: '100%' }} />
              <h4 style={{ marginTop: 8 }}>{b.name}</h4>
            </div>
          ))}
        </div>
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
  <Brands />
  <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />

  <Route path="/services" element={<Services />} />
  <Route path="/services/haircut" element={<Haircut />} />
  <Route path="/services/skin-treatments" element={<SkinTreatments />} />
  <Route path="/services/dressings" element={<Dressings />} />
  <Route path="/services/nails" element={<Nails />} />
  <Route path="/services/waxing" element={<Waxing />} />
  <Route path="/services/manicure-pedicure" element={<ManicurePedicure />} />

  <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />

        {/* Add other routes here for multi-page site */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;