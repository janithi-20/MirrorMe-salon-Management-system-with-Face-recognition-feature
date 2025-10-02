// AppClean.js - pristine replacement while original App.js is corrupted
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaStar, FaStarHalf } from 'react-icons/fa';

import Header from './components/Header';
import Footer from './components/Footer';
import FeedbackModal from './components/FeedbackModal';

import Booking from './booking/Booking';
import Login from './pages/login/Login';
import Register from './login,signup/Register';
import Profile from './pages/Profile/Profile';
import Payment from './pages/payment/payment';
import Bill from './pages/bill/bill';
import FaceRecognition from './pages/FaceRecognition/FaceRecognition';

import Services from './pages/services/Services';
import Haircut from './pages/services/Haircut';
import SkinTreatments from './pages/services/SkinTreatments';
import Dressings from './pages/services/Dressings';
import Waxing from './pages/services/Waxing';
import Nails from './pages/services/Nails';
import ManicurePedicure from './pages/services/ManicurePedicure';

import './App.css';

const FaceRecognitionButton = () => (
  <button className="face-recognition-button" onClick={() => alert('Face Recognition feature coming soon!')}>
    Try Face Recognition
  </button>
);

const Hero = () => (
  <section className="hero">
    <video className="hero-video" autoPlay loop muted playsInline>
      <source src="/homepage.mp4" type="video/mp4" />
    </video>
    <div className="hero-overlay" />
    <div className="hero-content container">
      <h1>Welcome to <span style={{ color: '#e91e63' }}>MirrorME</span></h1>
      <p>Where Beauty Meets Innovation</p>
      <div className="hero-buttons">
        <a href="#features" className="btn btn-primary">Explore Features</a>
        <FaceRecognitionButton />
      </div>
    </div>
  </section>
);

const Features = () => {
  const team = [
    { name: 'Shalini', role: 'Owner', img: '/Shalini.jpg' },
    { name: 'Angela', role: 'Hairstylist', img: '/Angela.jpg' },
    { name: 'Lewis', role: 'Barber', img: '/Lewis.jpg' },
    { name: 'Marie', role: 'Skincare Specialist', img: '/Marie.jpg' },
    { name: 'Ethan', role: 'Massage & Wellness', img: '/Ethan.jpg' },
    { name: 'Kylie', role: 'Makeup Artist', img: '/Kylie.jpg' }
  ];
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title">
          <h2>Meet Our Team</h2>
          <p><strong>Our professionals are here to bring out the best version of you.</strong></p>
        </div>
        <div className="features-grid">
          {team.map((member, idx) => (
            <div key={idx} className="feature-card">
              <img src={member.img} alt={member.name} />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const testimonials = [
    { name: 'Emily Carter', role: 'Regular Client', img: '/Angela.jpg', text: 'MirrorME transformed my look! The staff is incredibly skilled.' },
    { name: 'James Wilson', role: 'First-Time Visitor', img: '/Kylie.jpg', text: 'A luxurious and relaxing experience. Loved every moment!' },
    { name: 'Sophia Martinez', role: 'Loyal Member', img: '/Lewis.jpg', text: 'Consistently outstanding service and stunning results.' }
  ];
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Testimonials</h2>
          <p><strong>What our clients say about their MirrorME experience.</strong></p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-image">
                <img src={t.img} alt={t.name} />
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="rating">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
              </div>
              <h4>{t.name}</h4>
              <small>{t.role}</small>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button className="btn" onClick={() => setIsModalOpen(true)}>Submit your feedback</button>
        </div>
        <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
};

const Brands = () => {
  const brands = [
    { name: 'KEUNE', logo: '/keune.png' },
    { name: 'LOREAL', logo: '/loreal.png' },
    { name: 'jEVAL', logo: '/jeval.png' },
    { name: 'Dreamron', logo: '/dreamron.jpeg' }
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

function AppClean() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/face" element={<FaceRecognition />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/haircut" element={<Haircut />} />
        <Route path="/services/skin" element={<SkinTreatments />} />
        <Route path="/services/dressings" element={<Dressings />} />
        <Route path="/services/waxing" element={<Waxing />} />
        <Route path="/services/nails" element={<Nails />} />
        <Route path="/services/manicure-pedicure" element={<ManicurePedicure />} />
      </Routes>
    </Router>
  );
}

export default AppClean;
