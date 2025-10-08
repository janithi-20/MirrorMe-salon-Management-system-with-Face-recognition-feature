import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import consultBg from './consultation.jpg'; 

const Consultation = () => {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');

	const PHONE = 'YOUR_PHONE_NUMBER'; 

	const sendWhatsApp = () => {
		const text = encodeURIComponent(`Hi, I want a consultation. Name: ${name || ''} - ${message || ''}`);
		window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank');
	};

	const submitForm = (e) => {
		e.preventDefault();
		sendWhatsApp();
	};

	return (
		<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header />
			<main style={{ flex: 1, backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${consultBg})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '4rem 1rem' }}>
				<div style={{ maxWidth: 920, margin: '0 auto', background: 'rgba(255,255,255,0.92)', padding: 24, borderRadius: 12 }}>
					<h2>Beauty Consultation</h2>
					<p>Talk to our experts, ask questions about treatments, suitability & pricing.</p>

					<div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
						<button className="btn" onClick={() => setOpen(true)}>Start Consultation</button>
						<button className="btn" style={{ background: '#25D366' }} onClick={sendWhatsApp}>Chat on WhatsApp</button>
						<Link to="/services" className="btn" style={{ background: '#666' }}>Back to Services</Link>
					</div>
				</div>
			</main>

			<Footer />

			{open && (
				<div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', zIndex: 80 }}>
					<div style={{ width: 480, maxWidth: '95%', background: '#fff', borderRadius: 10, padding: 18 }}>
						<h3 style={{ marginTop: 0 }}>Quick Consultation</h3>
						<form onSubmit={submitForm}>
							<div style={{ marginBottom: 10 }}>
								<label style={{ display: 'block', fontWeight: 600 }}>Your name</label>
								<input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' }} />
							</div>
							<div style={{ marginBottom: 10 }}>
								<label style={{ display: 'block', fontWeight: 600 }}>Message / Question</label>
								<textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' }} />
							</div>
							<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
								<button type="button" className="btn" style={{ background: '#666' }} onClick={() => setOpen(false)}>Cancel</button>
								<button type="submit" className="btn">Send via WhatsApp</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Consultation;

