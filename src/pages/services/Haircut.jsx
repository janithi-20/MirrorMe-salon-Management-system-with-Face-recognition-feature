import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import hairBg from './hair.jpg';
import blowdryLong from './haircut images/blowdry long hair.jpg';
import blowdryMedium from './haircut images/blowdry medium hair.jpg';
import blowdryShort from './haircut images/blowdry short hair.jpg';
import braidingShort from './haircut images/braiding short.jpg';
import advRestyle from './haircut images/cut & restyle advance.jpg';
import regRestyle from './haircut images/cut & restyle regular.jpg';
import fringeCut from './haircut images/fringe cut.jpg';
import hairWash from './haircut images/hair wash.jpg';
import trimImg from './haircut images/trim.jpg';

// Haircut & Styling sub-services (as requested)
const services = [
	{ id: 'adv-restyle', service: 'Cut & Re-Style (Advance)', price: 4000, img: advRestyle },
	{ id: 'fringe', service: 'Fringe Cut', price: 1000, img: fringeCut },
	{ id: 'trim', service: 'Trim', price: 1400, img: trimImg },
	{ id: 'reg-restyle', service: 'Cut & Re-Style (Regular)', price: 2900, img: regRestyle },
	{ id: 'wash-blast', service: 'Hair Wash & Blast Dry', price: 2000, img: hairWash },
	{ id: 'blow-short', service: 'Blow Dry - Short', price: 2400, img: blowdryShort },
	{ id: 'blow-medium', service: 'Blow Dry - Medium', price: 3900, img: blowdryMedium },
	{ id: 'blow-long', service: 'Blow Dry - Long', price: 4500, img: blowdryLong },
	{ id: 'braid-short', service: 'Braiding Per Strand - Short', price: 1300, img: braidingShort }
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

					<div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
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

export default Haircut;
