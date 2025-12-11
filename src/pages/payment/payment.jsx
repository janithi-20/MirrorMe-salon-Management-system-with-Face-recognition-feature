import React, { useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Payment = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const booking = location.state?.booking;

	// Card input state and formatter
	const [cardNumber, setCardNumber] = useState('');
	const [cardName, setCardName] = useState('');
	const nameInputRef = useRef(null);

	// Expiry and CVV state
	const [expiry, setExpiry] = useState('');
	const [expiryError, setExpiryError] = useState('');
	const prevDigitsRef = useRef('');
	const expiryInputRef = useRef(null);
	const [cvv, setCvv] = useState('');

	const handleCardNumberChange = (e) => {
		// Keep only digits, limit to 16
		const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
		// Insert a space every 4 digits
		const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
		setCardNumber(formatted);
	};

	const handleExpiryChange = (e) => {
		// keep only digits and limit to 4 (MMYY)
		const raw = e.target.value || '';
		const digits = raw.replace(/\D/g, '').slice(0, 4);
		const prevDigits = prevDigitsRef.current || '';
		const prevLen = prevDigits.length;
		const newLen = digits.length;

		// If user is deleting (backspace) -> allow natural deletion without forcing '/' insertion
		if (newLen < prevLen) {
			if (newLen === 0) {
				setExpiry('');
				setExpiryError('');
				if (expiryInputRef.current) expiryInputRef.current.setCustomValidity('');
				prevDigitsRef.current = digits;
				return;
			}
			if (newLen <= 2) {
				setExpiry(digits);
				if (newLen === 2) {
					const mmNum = parseInt(digits, 10);
					if (isNaN(mmNum) || mmNum < 1 || mmNum > 12) {
						setExpiryError('Enter a valid month (01-12)');
						if (expiryInputRef.current) {
							expiryInputRef.current.setCustomValidity('Enter a valid month (01-12)');
							expiryInputRef.current.reportValidity();
						}
					} else {
						setExpiryError('');
						if (expiryInputRef.current) expiryInputRef.current.setCustomValidity('');
					}
				} else {
					setExpiryError('');
					if (expiryInputRef.current) expiryInputRef.current.setCustomValidity('');
				}
				prevDigitsRef.current = digits;
				return;
			}
			// newLen is 3 or 4 while deleting (unlikely) - format as MM/YY
			const mm = digits.slice(0, 2);
			const yy = digits.slice(2);
			const mmNum = parseInt(mm, 10);
			setExpiry(mm + '/' + yy);
			if (isNaN(mmNum) || mmNum < 1 || mmNum > 12) {
				setExpiryError('Enter a valid month (01-12)');
				if (expiryInputRef.current) {
					expiryInputRef.current.setCustomValidity('Enter a valid month (01-12)');
					expiryInputRef.current.reportValidity();
				}
			} else {
				setExpiryError('');
				if (expiryInputRef.current) expiryInputRef.current.setCustomValidity('');
			}
			prevDigitsRef.current = digits;
			return;
		}

		// Insertion or normal typing
		if (newLen <= 2) {
			if (newLen === 2) {
				const mmNum = parseInt(digits, 10);
				const mm = digits.padStart(2, '0');
				setExpiry(mm + '/');
				if (isNaN(mmNum) || mmNum < 1 || mmNum > 12) {
					setExpiryError('Enter a valid month (01-12)');
					if (expiryInputRef.current) {
						expiryInputRef.current.setCustomValidity('Enter a valid month (01-12)');
						expiryInputRef.current.reportValidity();
					}
				} else {
					setExpiryError('');
					if (expiryInputRef.current) expiryInputRef.current.setCustomValidity('');
				}
			} else {
				setExpiry(digits);
				setExpiryError('');
				if (expiryInputRef.current) expiryInputRef.current.setCustomValidity('');
			}
			prevDigitsRef.current = digits;
			return;
		}

		// 3 or 4 digits -> format MM/YY and validate month
		const mm = digits.slice(0, 2);
		const mmNum = parseInt(mm, 10);
		setExpiry(mm + '/' + digits.slice(2));
		if (isNaN(mmNum) || mmNum < 1 || mmNum > 12) {
			setExpiryError('Enter a valid month (01-12)');
			if (expiryInputRef.current) {
				expiryInputRef.current.setCustomValidity('Enter a valid month (01-12)');
				expiryInputRef.current.reportValidity();
			}
		} else {
			setExpiryError('');
			if (expiryInputRef.current) expiryInputRef.current.setCustomValidity('');
		}
		prevDigitsRef.current = digits;
	};

	const handleCvvChange = (e) => {
		const digits = e.target.value.replace(/\D/g, '').slice(0, 3);
		setCvv(digits);
	};

	const handleCvvKeyDown = (e) => {
		// Prevent entering more digits when already at max length and no selection
		const isDigit = /^[0-9]$/.test(e.key);
		if (!isDigit) return;
		const target = e.target;
		const selectionLength = Math.max(target.selectionEnd - target.selectionStart, 0);
		if (cvv.length - selectionLength >= 3) {
			e.preventDefault();
		}
	};

	const handleCvvPaste = (e) => {
		const pasted = (e.clipboardData || window.clipboardData).getData('text') || '';
		const digits = pasted.replace(/\D/g, '').slice(0, 3);
		if (digits) {
			setCvv((prev) => {
				// compute remaining capacity considering current selection
				const target = e.target;
				const selectionLength = Math.max(target.selectionEnd - target.selectionStart, 0);
				const available = Math.max(3 - (prev.length - selectionLength), 0);
				return (prev.slice(0, target.selectionStart) + digits.slice(0, available) + prev.slice(target.selectionEnd)).slice(0, 3);
			});
		}
		e.preventDefault();
	};

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
						

						<form onSubmit={(e)=>{ e.preventDefault(); if (expiryError) return; handleConfirm(); }} style={{ marginTop: 12 }}>
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
								<input
									required
									type="text"
									placeholder="Name on Card"
									value={cardName}
									onChange={(e) => {
										// Allow letters and spaces only; remove other characters
										const filtered = e.target.value.replace(/[^A-Za-z\s]/g, '');
										// collapse multiple spaces and trim start
										const cleaned = filtered.replace(/\s{2,}/g, ' ');
										setCardName(cleaned);
										// clear custom validity as user types
										if (nameInputRef.current) nameInputRef.current.setCustomValidity('');
									}}
									onBlur={() => {
										const value = cardName.trim();
										if (!/^[A-Za-z ]+$/.test(value)) {
											if (nameInputRef.current) {
												nameInputRef.current.setCustomValidity('Please enter a valid name (letters and spaces only)');
												nameInputRef.current.reportValidity();
											}
										} else {
											if (nameInputRef.current) nameInputRef.current.setCustomValidity('');
										}
									}}
									ref={nameInputRef}
									pattern="[A-Za-z ]+"
									title="Only letters and spaces"
									style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbb' }}
								/>
							</div>
							<div style={{ marginBottom: 14 }}>
								<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Card Number</label>
								<input
									required
									inputMode="numeric"
									maxLength={19}
									placeholder="XXXX XXXX XXXX XXXX"
									value={cardNumber}
									onChange={handleCardNumberChange}
									style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbb', letterSpacing: 1 }}
								/>
							</div>
							<div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
								<div style={{ flex: '1 1 140px' }}>
										<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Expire Date</label>
												<input required ref={expiryInputRef} type="text" placeholder="MM/YY" value={expiry} onChange={handleExpiryChange} maxLength={5} title="Format MM/YY" aria-invalid={!!expiryError} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbb' }} />
								</div>
									<div style={{ flex: '1 1 120px' }}>
										<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>CVV</label>
													<input required type="text" inputMode="numeric" maxLength={3} placeholder="CVV" value={cvv} onChange={handleCvvChange} onKeyDown={handleCvvKeyDown} onPaste={handleCvvPaste} pattern="\d{3}" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #bbb' }} /> 
									</div>
							</div>
							<div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
								<button type="submit" className="btn">Confirm</button>
								<Link to="/booking" className="btn" style={{ background: '#666' }}>Back</Link>
							</div>
						</form>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Payment;
