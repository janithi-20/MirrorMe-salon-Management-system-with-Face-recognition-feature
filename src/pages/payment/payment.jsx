import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import paymentBg from './payment.jpg';

const Payment = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const booking = location.state?.booking;

	const handleConfirm = () => {
		navigate('/bill', { state: { booking } });
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Header />
			<main style={{ flex: 1 }}>
				<div
					style={{
						minHeight: '100%',
						backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${paymentBg})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '6rem 1.25rem 3rem'
					}}
				>
					<div
						style={{
							width: '100%',
							maxWidth: 520,
							background: 'rgba(255,255,255,0.92)',
							backdropFilter: 'blur(4px)',
							padding: '2rem 2.25rem',
							borderRadius: 18,
							boxShadow: '0 10px 26px rgba(0,0,0,0.25)'
						}}
					>
						<h2 style={{ marginTop: 0, textAlign: 'center', letterSpacing: '.5px' }}>Payment</h2>
						{/* Booking summary intentionally removed per request */}

						<form onSubmit={(e)=>{ e.preventDefault(); handleConfirm(); }} style={{ marginTop: 12 }}>
							<div style={{ marginBottom: 14 }}>
								<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Bank Name</label>
								<input list="bank-list" required type="text" placeholder="Select a bank" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbb' }} />
								<datalist id="bank-list">
									<option value="Hatton National Bank" />
									<option value="Sampath Bank" />
									<option value="Peoples Bank" />
									<option value="Bank of Ceylon" />
									<option value="National Savings Bank" />
									<option value="Commercial Bank" />
								</datalist>
							</div>
							<div style={{ marginBottom: 14 }}>
								<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Card Holder Name</label>
								<input required type="text" placeholder="Name on Card" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbb' }} />
							</div>
							<div style={{ marginBottom: 14 }}>
								<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Card Number</label>
								<input required inputMode="numeric" maxLength={19} placeholder="XXXX XXXX XXXX XXXX" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbb', letterSpacing: 1 }} />
							</div>
							<div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
								<div style={{ flex: '1 1 140px' }}>
									<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Expire Date</label>
									<input required type="text" placeholder="MM/YY" pattern="^(0[1-9]|1[0-2])\/[0-9]{2}$" title="Format MM/YY" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbb' }} />
								</div>
								<div style={{ flex: '1 1 120px' }}>
									<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>CVV</label>
									<input required type="text" inputMode="numeric" maxLength={4} placeholder="CVV" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbb' }} /> 
								</div>
							</div>
							<div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
								<button type="submit" className="btn">Confirm</button>
								<Link to="/booking" className="btn" style={{ background: '#666' }}>Back</Link>
							</div>
						</form>

						{/* Action buttons moved into form */}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Payment;
