import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gelExpress from './nails image/gel colour express.jpg';
import gelIndividual from './nails image/gel individual.jpg';
import gelSoak from './nails image/gel nail soak off.jpg';
import nailArt from './nails image/nail art rein stone-sticker.jpg';
import normalColor from './nails image/normal colour.jpg';

const services = [
	{ id: 'gel-individual', service: 'Gel Individual', price: 900, img: gelIndividual },
	{ id: 'gel-soak-off', service: 'Gel Nail Soak Off', price: 1700, img: gelSoak },
	{ id: 'normal-color', service: 'Normal Color', price: 1100, img: normalColor },
	{ id: 'gel-color-express', service: 'Gel Color (Express Mani)', price: 2300, img: gelExpress },
	{ id: 'nail-art', service: 'Nail Art Rein Stone/Sticker/ Each', price: 1800, img: nailArt }
];

function formatCurrency(v){
	return 'LKR ' + v.toLocaleString();
}

const Nails = () => {
	const placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#f2f2f2"/></svg>');

	return (
		<div
			style={{
				padding: '3.5rem 1rem'
			}}
		>
			<div className="service-page container" style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem 1.75rem', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.15)', maxWidth: 880 }}>
				<h2 style={{ marginTop: 0 }}>Nails</h2>
				<p><strong>Available sub-services:</strong></p>

				<div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, maxWidth: 880 }}>
					{services.map(s => (
						<div key={s.id} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 10, border: '1px solid #e6e6e6', background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
							<img src={s.img || placeholder} alt={s.service} onError={(e) => { if (e.currentTarget.src !== placeholder) e.currentTarget.src = placeholder; }} style={{ height: 140, width: '100%', objectFit: 'cover' }} />
							<div style={{ padding: '12px 14px', textAlign: 'left' }}>
								<div style={{ fontWeight: 700 }}>{s.service}</div>
								<div style={{ marginTop: 6, color: '#666' }}>{formatCurrency(s.price)}</div>
							</div>
						</div>
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
