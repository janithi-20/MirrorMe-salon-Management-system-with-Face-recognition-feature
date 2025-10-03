import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import manicureBg from './manicure.jpg';

// Manicure & Pedicure sub-services list
const services = [
	{ id: 'luxury-pedi', service: 'Luxury Pedicure-Massage Chair', price: 8100 },
	{ id: 'premium-pedi', service: 'Premium Pedicure', price: 6800 },
	{ id: 'classic-mani', service: 'Classic Manicure', price: 2300 },
	{ id: 'classic-pedi', service: 'Classic Pedicure', price: 2300 },
	{ id: 'spa-mani', service: 'Spa Manicure', price: 4400 },
	{ id: 'spa-pedi', service: 'Spa Pedicure', price: 4800 },
	{ id: 'soak-up-pedi', service: 'Soak Up Pedicure', price: 5800 }
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

				<div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 640 }}>
					{services.map(s => (
						<button
							key={s.id}
							type="button"
							onClick={() => goToBooking(s)}
							className="mani-pedi-btn"
							style={{
								padding: '12px 16px',
								borderRadius: 8,
								border: '2px solid #ccc',
								background: '#fff',
								cursor: 'pointer',
								textAlign: 'left',
								fontSize: '.85rem',
								lineHeight: 1.3,
								boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
							}}
						>
							<span style={{ display: 'block', fontWeight: 600 }}>{s.service}</span>
							<span style={{ opacity: 0.7 }}>{formatCurrency(s.price)}</span>
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
