import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Import images now co-located in services folder
import skinImg from './skin.jpg';
import hairImg from './hair.jpg';
import dressingImg from './dressing.jpg';
import nailsImg from './nails.jpg';
import manicureImg from './manicure.jpg';
import waxingImg from './waxing.jpg';
import consultImg from './consultation.jpg';

const serviceCards = [
	{ slug: 'haircut', title: 'Haircut & Styling', desc: 'Professional haircuts and trendy styles tailored to suit your personality and occasion.', image: hairImg },
	{ slug: 'skin-treatments', title: 'Skin Treatments', desc: 'Refreshing facials and advanced skin care to keep your skin fresh, glowing, and healthy.', image: skinImg },
	{ slug: 'dressings', title: 'Dressings', desc: 'Expert saree draping and outfit styling for weddings, parties, and special events.', image: dressingImg },
	{ slug: 'nails', title: 'Nail Care', desc: 'Stylish nail grooming and creative designs that give your nails a perfect finish.', image: nailsImg },
	{ slug: 'manicure-pedicure', title: 'Manicure & Pedicure', desc: 'Relaxing hand and foot care treatments for soft, clean, and polished results.', image: manicureImg },
	{ slug: 'waxing', title: 'Waxing', desc: 'Smooth and silky skin with safe, hygienic, and gentle waxing services.', image: waxingImg }
	 , { slug: 'consultations', title: 'Consultations', desc: 'Talk to our experts, ask questions about treatments, suitability & pricing.', image: consultImg }

];

const Services = () => {
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
							<div style={{ marginTop: 12 }}>
								<Link to={`/services/${card.slug}`} className="btn">View Service</Link>
							</div>
						</div>
					))}
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Services;
