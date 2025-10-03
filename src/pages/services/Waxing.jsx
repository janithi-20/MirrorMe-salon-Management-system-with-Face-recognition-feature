import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import waxingBg from './waxing.jpg';

// Waxing sub-services list
const services = [
	{ id: 'full-body', service: 'Full Body', price: 5900 },
	{ id: 'stomach', service: 'Stomach', price: 950 },
	{ id: 'half-leg', service: 'Half Leg', price: 1450 },
	{ id: 'half-arms', service: 'Half Arms', price: 1350 },
	{ id: 'classic-full-legs', service: 'Classic Full Legs', price: 2200 },
	{ id: 'classic-full-arms', service: 'Classic Full Arms', price: 1800 }
];

function formatCurrency(v){
	return 'LKR ' + v.toLocaleString();
}

const Waxing = () => {
	const navigate = useNavigate();

	const goToBooking = (svc) => {
		const booking = {
			service: 'Waxing',
			subServiceLabel: svc.service,
			subServicePrice: svc.price,
			total: svc.price
		};
		navigate('/booking', { state: { booking } });
	};

	return (
		<div
			style={{
				backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${waxingBg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				padding: '3.5rem 1rem'
			}}
		>
			<div className="service-page container" style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem 1.75rem', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.15)', maxWidth: 880 }}>
				<h2 style={{ marginTop: 0 }}>Waxing</h2>
				<p><strong>Smooth & Clean:</strong> Select a waxing service to continue booking.</p>

				<div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 560 }}>
					{services.map(s => (
						<button
							key={s.id}
							type="button"
							onClick={() => goToBooking(s)}
							className="waxing-btn"
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

export default Waxing;
