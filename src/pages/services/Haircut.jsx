import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import hairBg from './hair.jpg';

// Haircut & Styling sub-services (as requested)
const services = [
	{ id: 'adv-restyle', service: 'Cut & Re-Style (Advance)', price: 4000 },
	{ id: 'fringe', service: 'Fringe Cut', price: 1000 },
	{ id: 'trim', service: 'Trim', price: 1400 },
	{ id: 'reg-restyle', service: 'Cut & Re-Style (Regular)', price: 2900 },
	{ id: 'wash-blast', service: 'Hair Wash & Blast Dry', price: 2000 },
	{ id: 'blow-short', service: 'Blow Dry - Short', price: 2400 },
	{ id: 'blow-medium', service: 'Blow Dry - Medium', price: 3900 },
	{ id: 'blow-long', service: 'Blow Dry - Long', price: 4500 },
	{ id: 'braid-short', service: 'Braiding Per Strand - Short', price: 1300 }
];

function formatCurrency(v){
	return 'LKR ' + v.toLocaleString();
}

const Haircut = () => {
	const navigate = useNavigate();

	const goToBooking = (svc) => {
		const booking = {
			service: 'Haircut & Styling',
			subServiceLabel: svc.service,
			subServicePrice: svc.price,
			total: svc.price
		};
		navigate('/booking', { state: { booking } });
	};

	return (
		<div
			style={{
				backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${hairBg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				padding: '3.5rem 1rem'
			}}
		>
			<div className="service-page container" style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem 1.75rem', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.15)', maxWidth: 860 }}>
				<h2 style={{ marginTop: 0 }}>Haircut & Styling</h2>
				<p><strong>Available sub-services:</strong></p>

				<div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 500 }}>
					{services.map(s => (
						<button
							key={s.id}
							type="button"
							onClick={() => goToBooking(s)}
							className="haircut-btn"
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

export default Haircut;
