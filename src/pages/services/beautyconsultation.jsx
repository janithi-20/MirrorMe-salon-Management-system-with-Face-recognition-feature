import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BeautyConsultation = () => {


	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		const onEsc = (e) => { if (e.key === 'Escape') setOpen(false); };
		window.addEventListener('keydown', onEsc);
		return () => window.removeEventListener('keydown', onEsc);
	}, []);

	const sendWhatsApp = () => {
		// Open the team's WhatsApp message link. We don't include or display any phone numbers here;
		// registration/back-end already captures customer phone numbers.
		window.open('https://wa.me/message/3LSVU3W662P2D1', '_blank', 'noopener,noreferrer');
		setOpen(false);
	};

		return (
			<div>
				<Header />

				<main className="container page-content">
					<div style={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
						<p style={{ color: '#444', maxWidth: 680, textAlign: 'center', lineHeight: 1.4 }}>
							Get a quick, personalised beauty consultation from our experts, ask about treatments, suitability, and pricing.
						</p>
						<button
							onClick={() => window.open('https://wa.me/message/3LSVU3W662P2D1', '_blank', 'noopener,noreferrer')}
							style={{
								background: '#d1842c',
								color: 'white',
								border: 'none',
								padding: '12px 20px',
								borderRadius: 8,
								cursor: 'pointer',
								fontSize: 16
							}}
						>
							Beauty Consultation
						</button>


					</div>
				</main>

			{open && (
				<div
					role="dialog"
					aria-modal="true"
					style={{
						position: 'fixed',
						inset: 0,
						background: 'rgba(0,0,0,0.45)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 9999,
						padding: 20
					}}
					onClick={() => setOpen(false)}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						style={{
							width: '100%',
							maxWidth: 560,
							background: '#fff',
							borderRadius: 10,
							padding: 18,
							boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
						}}
					>
						<h2 style={{ marginTop: 0 }}>Start a consultation</h2>

						<label style={{ display: 'block', marginBottom: 10 }}>
							Your name (optional)
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Your name"
								style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6, border: '1px solid #ddd' }}
							/>
						</label>

						<label style={{ display: 'block', marginBottom: 10 }}>
							Message (optional)
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Tell us what you'd like to know — treatments, skin/hair concerns, preferred budget..."
								rows={4}
								style={{ width: '100%', padding: 8, marginTop: 6, borderRadius: 6, border: '1px solid #ddd' }}
							/>
						</label>

						<div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
							<button
								onClick={() => setOpen(false)}
								style={{ padding: '8px 12px', borderRadius: 6, background: '#f2f2f2', border: 'none', cursor: 'pointer' }}
							>
								Cancel
							</button>

							<button
								onClick={sendWhatsApp}
								style={{ padding: '8px 12px', borderRadius: 6, background: '#25D366', color: '#fff', border: 'none', cursor: 'pointer' }}
							>
								Send on WhatsApp
							</button>
						</div>

												<p style={{ marginTop: 12, color: '#666', fontSize: 13 }}>
													If WhatsApp does not open, please ensure you have a WhatsApp client or use the web version.
												</p>
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
};

export default BeautyConsultation;


