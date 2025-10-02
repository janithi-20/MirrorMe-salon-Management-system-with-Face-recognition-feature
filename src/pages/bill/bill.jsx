import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import billBg from './bill.jpg';

// Bill page expects booking details passed from payment (or booking) in location.state.booking
// Since customer name was previously removed from booking form, we'll fallback to a placeholder if absent.

const Bill = () => {
	const location = useLocation();
	const booking = location.state?.booking || {};

	const customerName = booking.name || 'Customer';
	const service = booking.service || 'Selected Service';
	const date = booking.date || '—';
	const time = booking.time || '—';
	const total = booking.subServicePrice || booking.total || 0;

	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Header />
			<main style={{ flex: 1 }}>
				<div
					style={{
						minHeight: '100%',
						backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${billBg})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '5rem 1.25rem 3rem'
					}}
				>
					<div
						style={{
							width: '100%',
							maxWidth: 560,
							background: 'rgba(255,255,255,0.94)',
							backdropFilter: 'blur(4px)',
							padding: '2.25rem 2.5rem',
							borderRadius: 20,
							boxShadow: '0 10px 28px rgba(0,0,0,0.25)',
							fontSize: '.95rem'
						}}
					>
						<h2 style={{ margin: '0 0 1.25rem', textAlign: 'center', letterSpacing: '.5px' }}>Bill / Receipt</h2>
						<div style={{ marginBottom: '1.25rem' }}>
							<Row label="Customer Name" value={customerName} />
							<Row label="Service" value={service} />
							<Row label="Date" value={date} />
							<Row label="Time" value={time} />
							<Row label="Total" value={`LKR ${Number(total).toLocaleString()}`} />
						</div>
						<div style={{ textAlign: 'center', fontSize: '.8rem', opacity: .7, marginBottom: 18 }}>
							Thank you for visiting. We look forward to serving you again!
						</div>
						<div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
							<button
								onClick={() => window.print()}
								className="btn"
								style={{ minWidth: 140 }}
							>
								Print / Download
							</button>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

const Row = ({ label, value }) => (
	<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e5e5e5' }}>
		<span style={{ fontWeight: 600 }}>{label}</span>
		<span>{value}</span>
	</div>
);

export default Bill;
