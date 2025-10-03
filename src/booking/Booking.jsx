import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Booking.css';

// Minimal booking page: only date/time + optional staff and summary from incoming state
const Booking = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const incoming = location?.state?.booking || null;

	const [datetime, setDatetime] = useState('');
	const [staff, setStaff] = useState('Any');

	const total = incoming?.total || incoming?.subServicePrice || 0;

	const handleSubmit = (e) => {
		e.preventDefault();
		const booking = {
			serviceLabel: incoming?.service || incoming?.serviceLabel || 'Service',
			subServiceLabel: incoming?.subServiceLabel || '',
			datetime,
			staff,
			total
		};
		navigate('/payment', { state: { booking } });
	};

	return (
		<div className="booking-page">
			<Header />
			<main className="booking-main container" style={{ padding: '2rem 0 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<h2 className="booking-title" style={{ marginTop: '3.5rem', textAlign: 'center' }}>Book Appointment</h2>

				<form
					className="booking-form"
					onSubmit={handleSubmit}
					style={{
						width: '100%',
						maxWidth: 720,
						marginTop: '2.5rem',
						background: '#fff',
						padding: '2rem 2.25rem',
						borderRadius: 12,
						boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
					}}
				>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
							<div style={{ flex: '1 1 300px', minWidth: 300 }}>
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
										fontSize: '0.98rem',
										background: '#FFF9F4',
										boxShadow: '0 2px 6px rgba(139,94,52,0.15)',
										color: '#4a3a2a'
									}}
								/>
							</div>
							<div style={{ flex: '1 1 300px', minWidth: 300 }}>
								<label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Staff Member</label>
								<select
									value={staff}
									onChange={e => setStaff(e.target.value)}
									style={{
										width: '100%',
										padding: '0.85rem 1rem',
										border: '2px solid #8B5E34',
										borderRadius: 10,
										fontSize: '0.98rem',
										background: '#FFF9F4',
										boxShadow: '0 2px 6px rgba(139,94,52,0.15)',
										color: '#4a3a2a'
									}}
								>
									<option>Any</option>
									<option>Stylist A</option>
									<option>Stylist B</option>
								</select>
							</div>
						</div>
						<div style={{ textAlign: 'center', marginTop: '1rem' }}>
							<button type="submit" className="oval-book" style={{ minWidth: 180 }}>Book</button>
						</div>
					</div>
				</form>
			</main>
			<Footer />
		</div>
	);
};

export default Booking;
