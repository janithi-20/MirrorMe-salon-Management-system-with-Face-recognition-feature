import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import manicureBg from './manicure.jpg';
import luxuryPedi from './manicure pedicure/luxury pedicure massage chair.jpg';
import premiumPedi from './manicure pedicure/premium pedicure.jpg';
import classicMani from './manicure pedicure/classic manicure.jpg';
import classicPedi from './manicure pedicure/classic pedicure.jpg';
import spaMani from './manicure pedicure/spa manicure.jpg';
import spaPedi from './manicure pedicure/spa pedicure.jpg';
import soakUpPedi from './manicure pedicure/soak up pedicure.jpg';

// Manicure & Pedicure sub-services with images
const services = [
	{ id: 'luxury-pedi', service: 'Luxury Pedicure - Massage Chair', price: 8100, img: luxuryPedi },
	{ id: 'premium-pedi', service: 'Premium Pedicure', price: 6800, img: premiumPedi },
	{ id: 'classic-mani', service: 'Classic Manicure', price: 2300, img: classicMani },
	{ id: 'classic-pedi', service: 'Classic Pedicure', price: 2300, img: classicPedi },
	{ id: 'spa-mani', service: 'Spa Manicure', price: 4400, img: spaMani },
	{ id: 'spa-pedi', service: 'Spa Pedicure', price: 4800, img: spaPedi },
	{ id: 'soak-up-pedi', service: 'Soak Up Pedicure', price: 5800, img: soakUpPedi }
];

function formatCurrency(v){
	return 'LKR ' + v.toLocaleString();
}

const ManicurePedicure = () => {
	const navigate = useNavigate();

	const goToBooking = (svc) => {
		const booking = {
			service: 'Manicure & Pedicure',
			subServiceLabel: svc.service,
			subServicePrice: svc.price,
			total: svc.price
		};
		navigate('/booking', { state: { booking } });
	};

	return (
		<div
			style={{
				backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${manicureBg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				padding: '3.5rem 1rem'
			}}
		>
			<div className="service-page container" style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem 1.75rem', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.15)', maxWidth: 940 }}>
				<h2 style={{ marginTop: 0 }}>Manicure & Pedicure</h2>
				<p><strong>What we do:</strong> Relax with our soothing manicure and pedicure treatments. They leave your hands and feet soft, clean, and refreshed.</p>

				<div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, maxWidth: 940 }}>
					{services.map(s => (
						<button key={s.id} type="button" onClick={() => goToBooking(s)} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 10, border: '1px solid #e6e6e6', background: '#fff', cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
							<div style={{ height: 140, backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
							<div style={{ padding: '12px 14px', textAlign: 'left' }}>
								<div style={{ fontWeight: 700 }}>{s.service}</div>
								<div style={{ marginTop: 6, color: '#666' }}>{formatCurrency(s.price)}</div>
							</div>
						</button>
					))}
				</div>

				<div style={{ marginTop: 24 }}>
					<Link to="/services" className="btn">Back to Services</Link>
				</div>
			</div>
		</div>
	);
};

export default ManicurePedicure;
