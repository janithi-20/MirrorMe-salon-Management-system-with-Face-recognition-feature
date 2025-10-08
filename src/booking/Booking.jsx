import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Booking.css';

const STAFF = [
	'Any',
	'Lewis Fernandiz',
	'Angela Diano',
	'Kylie Nellina',
	'Shalini Neha',
	'Ethan Kal',
	'Marie De Zoya'
];

const Booking = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const incoming = location?.state?.booking || null; 

	const [datetime, setDatetime] = useState('');
	const [staff, setStaff] = useState('Any');

	const handleSubmit = (e) => {
		e.preventDefault();
		const booking = {
			serviceLabel: incoming?.service || incoming?.serviceLabel || '',
			subServiceLabel: incoming?.subServiceLabel || '',
			datetime,
			staff
		};
		navigate('/payment', { state: { booking } });
	};

	return (
		<div
			className="booking-page"
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Header />
			<main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '3rem 1rem 4rem' }}>
				<div style={{ width: '100%', maxWidth: 640 }}>
					<h2 style={{ textAlign: 'center', color: '#fff', marginTop: '3rem' }}>Book Appointment</h2>
					<div style={{ marginTop: '2.5rem', background: 'rgba(255,255,255,0.92)', padding: '2rem 2.25rem', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
						<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem', justifyContent: 'center' }}>
								<div style={{ flex: '1 1 260px', minWidth: 260 }}>
									<label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Date / Time</label>
									<input
										type="datetime-local"
										value={datetime}
										onChange={e => setDatetime(e.target.value)}
										required
										style={{
											width: '100%',
											padding: '0.85rem 1rem',
											border: '2px solid #8B5E34',
											borderRadius: 10,
											fontSize: '0.95rem',
											background: '#FFF9F4',
											boxShadow: '0 2px 6px rgba(139,94,52,0.15)',
											color: '#4a3a2a'
										}}
									/>
								</div>
								<div style={{ flex: '1 1 260px', minWidth: 260 }}>
									<label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Staff Member</label>
									<select
										value={staff}
										onChange={e => setStaff(e.target.value)}
										style={{
											width: '100%',
											padding: '0.85rem 1rem',
											border: '2px solid #8B5E34',
											borderRadius: 10,
											fontSize: '0.95rem',
											background: '#FFF9F4',
											boxShadow: '0 2px 6px rgba(139,94,52,0.15)',
											color: '#4a3a2a'
										}}
									>
										{STAFF.map(name => (
											<option key={name} value={name}>{name}</option>
										))}
									</select>
								</div>
							</div>
							<div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
								<button type="submit" className="oval-book" style={{ minWidth: 170 }}>Continue</button>
							</div>
						</form>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Booking;
