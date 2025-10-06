import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import skinBg from './skin.jpg';
import faceshaving from './skin images/faceshaving.jpg';
import upperthreading from './skin images/upperthreading.jpg';
import galvanic from './skin images/galvanic.webp';
import cleanup from './skin images/cleanup.jpg';
import brighting from './skin images/brightingcleanup.jpg';
import basiccleaning from './skin images/basiccleaning.jpg';

const services = [
	{ id: 'face-shave', service: 'Face Shaving', price: 4400, img: faceshaving },
	{ id: 'upper-thread', service: 'Upper Threading', price: 200, img: upperthreading },
	{ id: 'galvanic', service: 'Galvanic Treatment', price: 1400, img: galvanic },
	{ id: 'classic-clean', service: 'Classic Clean Up', price: 3800, img: cleanup },
	{ id: 'brightening', service: 'Brightening Clean Up', price: 6800, img: brighting },
	{ id: 'basic-clean', service: 'Basic Clean Up', price: 9800, img: basiccleaning }
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
		<div style={{
			backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${skinBg})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			padding: '3.5rem 1rem'
		}}>
			<div className="service-page container" style={{ background: 'rgba(255,255,255,0.92)', padding: '2rem 1.75rem', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.15)', maxWidth: 920 }}>
				<h2 style={{ marginTop: 0 }}>Skin Treatments</h2>
				<p style={{ marginTop: 12, fontWeight: 700 }}>Available sub-services:</p>

				<div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
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

export default SkinTreatments;

