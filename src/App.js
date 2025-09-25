import React from 'react';
import './App.css';

// Icons
import { FaStar, FaStarHalf } from "react-icons/fa6";

// Modal
import FeedbackModal from './components/FeedbackModal';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
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
import FaceRecognition from './pages/FaceRecognition/FaceRecognition';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Hero Component
import Profile from './pages/Profile/Profile.js';
import Payment from './pages/payment/payment';
import Bill from './pages/bill/bill';

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// FaceRecognitionButton Component
const FaceRecognitionButton = () => {
  const handleFaceRecognition = () => {
    alert('Face Recognition feature would be activated here!');
    console.log('Face recognition button clicked');
  };

  return (
    <button className="face-recognition-btn" onClick={handleFaceRecognition}>
      <span className="text">Face Recognition</span>
    </button>
  );
};


// Hero Component - UPDATED
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Salon Management System with Face Recognition</h1>
        <p>This is a digital solution designed to enhance the operations of salons by reducing the communication gap between customers and salon. This system will be used by both customers and admins via mobile app and through website.This System is unique with a feature that scans a customer's facial outline to make intelligent recommendations to its matching hair color, the shape of the eyebrow, and hair cuts using AI powered face detection technology.</p>
        <div className="hero-buttons">
          <a href="/face-recognition" className="btn">Face Recognition</a>
        <h1 className="hero-heading">
          Experience The Elegance Of<br />
          <span className="second-line">Mirror Me Salon</span>
        </h1>

        <p>Where expert care meets luxurious services for a transformative beauty experience. Discover personalized styling, skincare, and more.</p>
        
        {/* Face Recognition Section - ADDED */}
        <div className="face-recognition-section">
          <FaceRecognitionButton />
        </div>


// Hero Component
const Hero = () => (
  <section className="hero">
    <div className="container">
      <h1 className="hero-heading">
        Experience The Elegance Of<br />
        <span className="second-line">Mirror Me Salon</span>
      </h1>
      <p>
        Where expert care meets luxurious services for a transformative beauty
        experience. Discover personalized styling, skincare, and more.
      </p>
      <div className="face-recognition-section">
        <FaceRecognitionButton />
      </div>
    </div>
  </section>
);


// Features (Our Team) Component
const Features = () => {
  const team = [
    { title: "Lewis Fernandiz", description: "Salon Manager/Director", photo: '/Lewis.jpg' },
    { title: "Angela Diano", description: "Assistant Stylist/Junior Stylist", photo: '/Angela.jpg' },
    { title: "Kylie Nellina", description: "Nail Technician", photo: '/Kylie.jpg' },
    { title: "Shalini Neha", description: "Massage Therapist", photo: '/Shalini.jpg' },
    { title: "Ethan Kal", description: "Color Specialist", photo: '/Ethan.jpg' },
    { title: "Marie De Zoya", description: "Skincare Specialist", photo: '/Marie.jpg' }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title">
          <h2>Our Team</h2>
          <p>Each of our team members have different strengths and years of experience.</p>
          <p className="team-description">
            Our stylists and therapists combine years of hands-on experience with up-to-date techniques 
            and a passion for customer satisfaction. Browse the profiles below to learn more about their 
            specialties and book with confidence.
          </p>
        </div>
        <div className="features-grid">
          {team.map((member, index) => (
            <div key={index} className="feature-card">
              {member.photo && (
                <img src={member.photo} alt={member.title} className="member-photo" />
              )}
              <h3>{member.title}</h3>
              <p>{member.description}</p>
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
      text: "They remember my preferences and service history, which makes me feel valued.",
      name: "Sonali De Silva",
      role: <span><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
    },
    {
      text: "The face recognition feature is a game-changer! It speeds up check-in and adds a personal touch.",
      name: "Michael Fernando",
      role: <span><FaStar /><FaStar /><FaStar /><FaStarHalf /></span>
    },
    {
      text: "Booking appointments online is so easy and convenient compared to calling.",
      name: "Jessica Perera",
      role: <span><FaStar /><FaStar /><FaStar /><FaStar /></span>
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Your Happiness, Our Success</h2>
          <p>Hear from our valuable customers who had a great experience with Mirror Me Salon</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.name.charAt(0)}</div>
                <div className="author-details">
                  <h4>{t.name}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="feedback-short">
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            Submit your feedback
          </button>
        </div>
        <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );




// CTA Component
const CTA = () => {
  // You can implement CTA content here if needed
  return null;
};


// Brands Component
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


// Main App Component with Routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bill" element={<Bill />} />

        {/* Services Routes */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/haircut" element={<Haircut />} />
        <Route path="/services/skin-treatments" element={<SkinTreatments />} />
        <Route path="/services/dressings" element={<Dressings />} />
        <Route path="/services/nails" element={<Nails />} />
        <Route path="/services/waxing" element={<Waxing />} />
        <Route path="/services/manicure-pedicure" element={<ManicurePedicure />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
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
  <Route path="/face-recognition" element={<FaceRecognition />} />
  <Route path="/payment" element={<Payment />} />
  <Route path="/bill" element={<Bill />} />

        {/* Add other routes here for multi-page site */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
