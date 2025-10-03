import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dressingBg from './dressing.jpg';

// Dressing & Make-Up sub-services (as requested)
const services = [
	{ id: 'full-early', service: 'Full Dressing (Early Morning) Add on Before 8.30am', price: 2500 },
	{ id: 'full-derma', service: 'Full Dressing Derma', price: 6500 },
	{ id: 'full-mac', service: 'Full Dressing Mac', price: 10300 },
	{ id: 'saree', service: 'Saree Draping', price: 2000 },
	{ id: 'makeup-mac', service: 'Make-Up (Mac)', price: 8000 },
	{ id: 'makeup-derma', service: 'Make-Up (Derma)', price: 4200 },
	{ id: 'hairstyle', service: 'Hair Style', price: 3100 },
	{ id: 'addon-lashes', service: 'Add-on Eye Lashes', price: 1800 }
];

function formatCurrency(v){
	return 'LKR ' + v.toLocaleString();
}

const Dressings = () => {
	const navigate = useNavigate();

	const goToBooking = (svc) => {
		const booking = {
			service: 'Dressings & Make-Up',
			subServiceLabel: svc.service,
			subServicePrice: svc.price,
			total: svc.price
		};
		navigate('/booking', { state: { booking } });
	};

	return (
		<div
			style={{
				backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${dressingBg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				padding: '3.5rem 1rem'
			}}
		>
			<div className="service-page container" style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem 1.75rem', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.15)', maxWidth: 900 }}>
				<h2 style={{ marginTop: 0 }}>Dressings & Make-Up</h2>
				<p><strong>Available sub-services:</strong></p>

				<div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 600 }}>
					{services.map(s => (
						<button
							key={s.id}
							type="button"
							onClick={() => goToBooking(s)}
							className="dressing-btn"
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

export default Dressings;
