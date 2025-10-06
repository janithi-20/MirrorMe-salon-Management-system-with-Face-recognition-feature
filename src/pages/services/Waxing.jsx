import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import waxingBg from './waxing.jpg';
import fullBodyImg from './waxing/full body.jpg';
import stomachImg from './waxing/stomach.jpg';
import halfLegsImg from './waxing/half legs.jpg';
import halfArmsImg from './waxing/half arms.jpg';
import classicFullLegsImg from './waxing/classic full legs.jpg';
import classicFullArmsImg from './waxing/classic full arms.jpg';

// Waxing sub-services list with images
const services = [
	{ id: 'full-body', service: 'Full Body', price: 5900, img: fullBodyImg },
	{ id: 'stomach', service: 'Stomach', price: 950, img: stomachImg },
	{ id: 'half-leg', service: 'Half Leg', price: 1450, img: halfLegsImg },
	{ id: 'half-arms', service: 'Half Arms', price: 1350, img: halfArmsImg },
	{ id: 'classic-full-legs', service: 'Classic Full Legs', price: 2200, img: classicFullLegsImg },
	{ id: 'classic-full-arms', service: 'Classic Full Arms', price: 1800, img: classicFullArmsImg }
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

					<div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, maxWidth: 880 }}>
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

export default Waxing;
