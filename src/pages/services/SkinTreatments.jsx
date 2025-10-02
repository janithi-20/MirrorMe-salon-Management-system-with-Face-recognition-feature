import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import skinBg from './skin.jpg';

// Skin treatment sub-services
const services = [
	{ id: 'face-shave', service: 'Face Shaving', price: 4400 },
	{ id: 'low-upper-thread', service: 'Low Upper Threading', price: 200 },
	{ id: 'galvanize', service: 'Add on - Galvanize Treatment', price: 1400 },
	{ id: 'classic-clean', service: 'Classic Clean Up', price: 3800 },
	{ id: 'brightening-ume', service: 'Brightening Clean Up (Ume Care)', price: 6800 },
	{ id: 'basic-sothys', service: 'Basic Clean Up (Sothys)', price: 9800 }
];

function formatCurrency(v){
	return 'LKR ' + v.toLocaleString();
}

const SkinTreatments = () => {
	const navigate = useNavigate();

	const goToBooking = (svc) => {
		const booking = {
			service: 'Skin Treatments',
			subServiceLabel: svc.service,
			subServicePrice: svc.price,
			total: svc.price
		};
		navigate('/booking', { state: { booking } });
	};

	return (
		<div
			style={{
				backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${skinBg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				padding: '3.5rem 1rem'
			}}
		>
			<div className="service-page container" style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem 1.75rem', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.15)', maxWidth: 920 }}>
				<h2 style={{ marginTop: 0 }}>Skin Treatments</h2>
				<p><strong>What we do:</strong> Our skin treatments are designed to refresh and brighten your complexion. From facials to advanced care, we help you achieve healthy, glowing skin.</p>

				<div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 620 }}>
					{services.map(s => (
						<button
							key={s.id}
							type="button"
							onClick={() => goToBooking(s)}
							className="skin-btn"
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

export default SkinTreatments;
