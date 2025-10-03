import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import nailsBg from './nails.jpg';

// Nail services (note: 'Gel Individual' provided twice; keeping one instance)
const services = [
	{ id: 'gel-individual', service: 'Gel Individual', price: 900 },
	{ id: 'gel-soak-off', service: 'Gel Nail Soak Off', price: 1700 },
	{ id: 'normal-color', service: 'Normal Color', price: 1100 },
	{ id: 'gel-color-express', service: 'Gel Color (Express Mani)', price: 2300 },
	{ id: 'nail-art', service: 'Nail Art Rein Stone/Sticker/ Each', price: 180 }
];

function formatCurrency(v){
	return 'LKR ' + v.toLocaleString();
}

const Nails = () => {
	const navigate = useNavigate();

	const goToBooking = (svc) => {
		const booking = {
			service: 'Nails',
			subServiceLabel: svc.service,
			subServicePrice: svc.price,
			total: svc.price
		};
		navigate('/booking', { state: { booking } });
	};

	return (
		<div
			style={{
				backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${nailsBg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				padding: '3.5rem 1rem'
			}}
		>
			<div className="service-page container" style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem 1.75rem', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.15)', maxWidth: 880 }}>
				<h2 style={{ marginTop: 0 }}>Nails</h2>
				<p><strong>Care & Style:</strong> Choose a nail service and continue to book your appointment.</p>

				<div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 560 }}>
					{services.map(s => (
						<button
							key={s.id}
							type="button"
							onClick={() => goToBooking(s)}
							className="nails-btn"
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

export default Nails;
