import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Import default images as fallbacks
import skinImg from './skin.jpg';
import hairImg from './hair.jpg';
import dressingImg from './dressing.jpg';
import nailsImg from './nails.jpg';
import manicureImg from './manicure.jpg';
import waxingImg from './waxing.jpg';
import consultImg from './consultation.jpg';

const defaultImages = {
  'haircut': hairImg,
  'skin-treatments': skinImg,
  'dressings': dressingImg,
  'nails': nailsImg,
  'manicure-pedicure': manicureImg,
  'waxing': waxingImg,
  'consultations': consultImg
};

const Services = () => {
  const navigate = useNavigate();
  const [serviceCards, setServiceCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/services');
      const data = await response.json();
      
      console.log('📊 Services API Response:', data);
      
      if (data.success) {
        // Transform API data to match existing component structure
        const transformedServices = data.data.map(service => ({
          slug: service.slug,
          title: service.category,
          desc: service.description || `Expert ${service.category.toLowerCase()} services tailored to your needs.`,
          image: defaultImages[service.slug] || service.categoryImage || defaultImages['consultations']
        }));
        
        console.log('🎯 Transformed Services for Display:', transformedServices);
        
        console.log('🎯 Transformed Services for Display:', transformedServices);
        
        // Add consultations service (static)
        transformedServices.push({
          slug: 'consultations',
          title: 'Consultations',
          desc: 'Talk to our experts, ask questions about treatments, suitability & pricing.',
          image: consultImg
        });
        
        console.log('✅ Final Service Cards:', transformedServices);
        setServiceCards(transformedServices);
      } else {
        setError('Failed to fetch services');
        // Fallback to static data
        setServiceCards(getStaticServices());
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to connect to server');
      // Fallback to static data
      setServiceCards(getStaticServices());
    } finally {
      setLoading(false);
    }
  };

  // Fallback static services
  const getStaticServices = () => [
    { slug: 'haircut', title: 'Haircut & Styling', desc: 'Professional haircuts and trendy styles tailored to suit your personality and occasion.', image: hairImg },
    { slug: 'skin-treatments', title: 'Skin Treatments', desc: 'Refreshing facials and advanced skin care to keep your skin fresh, glowing, and healthy.', image: skinImg },
    { slug: 'dressings', title: 'Dressings', desc: 'Expert saree draping and outfit styling for weddings, parties, and special events.', image: dressingImg },
    { slug: 'nails', title: 'Nail Care', desc: 'Stylish nail grooming and creative designs that give your nails a perfect finish.', image: nailsImg },
    { slug: 'manicure-pedicure', title: 'Manicure & Pedicure', desc: 'Relaxing hand and foot care treatments for soft, clean, and polished results.', image: manicureImg },
    { slug: 'waxing', title: 'Waxing', desc: 'Smooth and silky skin with safe, hygienic, and gentle waxing services.', image: waxingImg },
    { slug: 'consultations', title: 'Consultations', desc: 'Talk to our experts, ask questions about treatments, suitability & pricing.', image: consultImg }
  ];

  useEffect(() => {
    fetchServices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleBookNow = () => {
		// Check if user is authenticated
		const token = localStorage.getItem('token');
		const customer = localStorage.getItem('customer');
		
		// User must have BOTH token AND customer data to be considered authenticated
		if (!token || !customer) {
			// User is not authenticated, show alert and redirect to login
			alert('Please login to book an appointment. You will be redirected to the login page.');
			navigate('/login', { 
				state: { 
					redirectTo: '/booking',
					message: 'Please login to book an appointment'
				}
			});
		} else {
			// User is authenticated, proceed to booking
			navigate('/booking');
		}
	};

	return (
		<div>
			<Header />
			<main className="container page-content">
				<div className="section-title">
					<h2 style={{ fontWeight: 700, textAlign: 'center' }}>Our Services</h2>
					<p style={{ fontWeight: 700, textAlign: 'center', marginTop: 12 }}>
						"Our salon offers a complete range of beauty and grooming services including haircuts, styling, coloring, skin and facial treatments, manicures, pedicures, relaxing spa therapies, bridal and groom packages, as well as essential care like waxing, threading, and beard grooming – everything you need to look and feel your best."
					</p>
				</div>

				{loading && (
					<div style={{ textAlign: 'center', padding: '50px' }}>
						<p>Loading services...</p>
					</div>
				)}

				{error && !loading && (
					<div style={{ textAlign: 'center', padding: '20px', color: 'orange' }}>
						<p>⚠️ {error} - Showing default services</p>
					</div>
				)}



				<section className="services-grid" style={{ marginTop: 30 }}>
					{serviceCards.map(card => (
						<div key={card.slug} className="service-card">
							<div
								className="service-photo"
								aria-hidden
								style={{
									backgroundColor: '#f0f0f0',
									height: 160,
									borderRadius: 8,
									backgroundImage: `url(${card.image})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center'
								}}
							/>
							<h4 style={{ marginTop: 12 }}>{card.title}</h4>
							<p style={{ color: '#666', whiteSpace: 'pre-line' }}>{card.desc}</p>
							<div style={{ marginTop: 12 }} className="actions">
								{card.slug === 'consultations' ? (
									<a 
										href="https://wa.me/94706631214" 
										target="_blank" 
										rel="noopener noreferrer" 
										className="btn"
									>
										View Service
									</a>
								) : (
									<Link to={`/services/${card.slug}`} className="btn">View Service</Link>
								)}
							</div>
						</div>
					))}
				</section>

				<div style={{ textAlign: 'center', marginTop: 28 }}>
					<button onClick={handleBookNow} className="book-now-btn book-now-wide">BOOK NOW</button>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Services;
