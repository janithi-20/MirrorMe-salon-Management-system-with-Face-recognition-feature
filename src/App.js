import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { FiCalendar, FiUsers, FiBarChart2, FiCreditCard, FiPhone, FiBox } from 'react-icons/fi';

const Hero = () => (
  <section className="hero">
    <div className="container">
      <h1>Salon Management System with Face Recognition</h1>
      <p>This is a digital solution designed to enhance the operations of salons by reducing the communication gap between customers and salon. This system will be used by both customers and admins via mobile app and through website. This System is unique with a feature that scans a customer's facial outline to make intelligent recommendations to its matching hair color, the shape of the eyebrow, and hair cuts using AI powered face detection technology.</p>
      <div className="hero-buttons">
        <a href="#demo" className="btn">Face Recognition</a>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    { icon: <FiCalendar size={28} />, title: 'Appointment Management', description: 'Easily book, reschedule, and manage appointments with our intuitive calendar system.' },
    { icon: <FiUsers size={28} />, title: 'Staff Management', description: 'Assign staff, track performance, and manage schedules all in one place.' },
    { icon: <FiBarChart2 size={28} />, title: 'Business Analytics', description: 'Get insights into your business performance with detailed reports and analytics.' },
    { icon: <FiCreditCard size={28} />, title: 'Payment Processing', description: 'Accept multiple payment methods and streamline your checkout process.' },
    { icon: <FiPhone size={28} />, title: 'Client Database', description: 'Maintain detailed client records, preferences, and history for personalized service.' },
    { icon: <FiBox size={28} />, title: 'Inventory Tracking', description: 'Keep track of your products and supplies with automated inventory management.' }
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

const Testimonials = () => {
  const testimonials = [
    { text: 'SalonPro has transformed how we manage our salon. Booking is easier, clients are happier, and our revenue has increased by 30%!', name: 'Sarah Johnson', role: 'Owner, Elite Beauty Salon' },
    { text: 'The inventory management feature alone has saved us countless hours. Now we never run out of our most popular products.', name: 'Michael Chen', role: 'Manager, Luxe Hair Studio' },
    { text: "Our clients love the automated reminders and easy booking system. It's made our operations so much smoother.", name: 'Jessica Williams', role: 'Stylist, Style & Smile Salon' }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>What Our Clients Say</h2>
          <p>Hear from salon owners who have transformed their business with SalonPro</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            import React from 'react';
            import './App.css';
            import Header from './components/Header';
            import Footer from './components/Footer';
            import { FiCalendar, FiUsers, FiBarChart2, FiCreditCard, FiPhone, FiBox } from 'react-icons/fi';

            const Hero = () => (
              <section className="hero">
                <div className="container">
                  <h1>Salon Management System with Face Recognition</h1>
                  <p>This is a digital solution designed to enhance the operations of salons by reducing the communication gap between customers and salon. This system will be used by both customers and admins via mobile app and through website. This System is unique with a feature that scans a customer's facial outline to make intelligent recommendations to its matching hair color, the shape of the eyebrow, and hair cuts using AI powered face detection technology.</p>
                  <div className="hero-buttons">
                    <a href="#demo" className="btn">Face Recognition</a>
                  </div>
                </div>
              </section>
            );

            const Features = () => {
              const features = [
                { icon: <FiCalendar size={28} />, title: 'Appointment Management', description: 'Easily book, reschedule, and manage appointments with our intuitive calendar system.' },
                { icon: <FiUsers size={28} />, title: 'Staff Management', description: 'Assign staff, track performance, and manage schedules all in one place.' },
                { icon: <FiBarChart2 size={28} />, title: 'Business Analytics', description: 'Get insights into your business performance with detailed reports and analytics.' },
                { icon: <FiCreditCard size={28} />, title: 'Payment Processing', description: 'Accept multiple payment methods and streamline your checkout process.' },
                { icon: <FiPhone size={28} />, title: 'Client Database', description: 'Maintain detailed client records, preferences, and history for personalized service.' },
                { icon: <FiBox size={28} />, title: 'Inventory Tracking', description: 'Keep track of your products and supplies with automated inventory management.' }
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

            const Testimonials = () => {
              const testimonials = [
                { text: 'SalonPro has transformed how we manage our salon. Booking is easier, clients are happier, and our revenue has increased by 30%!', name: 'Sarah Johnson', role: 'Owner, Elite Beauty Salon' },
                { text: 'The inventory management feature alone has saved us countless hours. Now we never run out of our most popular products.', name: 'Michael Chen', role: 'Manager, Luxe Hair Studio' },
                { text: "Our clients love the automated reminders and easy booking system. It's made our operations so much smoother.", name: 'Jessica Williams', role: 'Stylist, Style & Smile Salon' }
              ];

              return (
                <section id="testimonials" className="testimonials">
                  <div className="container">
                    <div className="section-title">
                      <h2>What Our Clients Say</h2>
                      <p>Hear from salon owners who have transformed their business with SalonPro</p>
                    </div>
                    <div className="testimonials-grid">
                      {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card">
                          <p className="testimonial-text">"{t.text}"</p>
                          <div className="testimonial-author">
                            <div className="author-avatar">{t.name.charAt(0)}</div>
                            <div className="author-details"><h4>{t.name}</h4><p>{t.role}</p></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            };

            const CTA = () => (
              <section className="cta">
                <div className="container">
                  <h2>Ready to Transform Your Salon Business?</h2>
                  <p>Join thousands of salon owners who are already using SalonPro to streamline their operations and boost revenue.</p>
                  <a href="#signup" className="btn">Get Started Today</a>
                </div>
              </section>
            );

            export default function App() {
              return (
                <div className="App">
                  <Header />
                  <Hero />
                  <Features />
                  <Testimonials />
                  <CTA />
                  <Footer />
                </div>
              );
            }
                <div className="author-details"><h4>{t.name}</h4><p>{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CTA = () => (
  <section className="cta">
    <div className="container">
      <h2>Ready to Transform Your Salon Business?</h2>
      <p>Join thousands of salon owners who are already using SalonPro to streamline their operations and boost revenue.</p>
      <a href="#signup" className="btn">Get Started Today</a>
    </div>
  </section>
);

// Main App Component
export default function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Header />
      {/* Other components */}
      <Footer />
    </div>
  );
};

export default App;
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
import Profile from './pages/Profile/Profile.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// FaceRecognitionButton Component
const FaceRecognitionButton = () => {
  const handleFaceRecognition = () => {
    // Add your face recognition functionality here
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
        <h1 className="hero-heading">
          Experience The Elegance Of<br />
          <span className="second-line">Mirror Me Salon</span>
        </h1>

        <p>Where expert care meets luxurious services for a transformative beauty experience. Discover personalized styling, skincare, and more.</p>
        
        {/* Face Recognition Section - ADDED */}
        <div className="face-recognition-section">
          <FaceRecognitionButton />
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
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;