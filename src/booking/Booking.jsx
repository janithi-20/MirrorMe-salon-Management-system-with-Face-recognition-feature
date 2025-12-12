import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Booking.css';
import ServiceIndex from '../data/serviceIndex'; // Fallback static data

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

	// Dynamic services state
	const [serviceData, setServiceData] = useState(ServiceIndex);
	const [servicesLoading, setServicesLoading] = useState(true);
	
	// Fetch services from API
	const fetchServices = async () => {
		try {
			setServicesLoading(true);
			const response = await fetch('/services');
			const data = await response.json();
			
			if (data.success) {
				// Transform API data to match ServiceIndex structure
				const transformedServices = data.data.map(service => ({
					key: service.category,
					id: service.slug,
					subs: service.subServices
						.filter(subService => subService.isActive) // Only active sub-services
						.map(subService => ({
							id: subService._id,
							label: subService.name,
							price: subService.price
						}))
				}));
				setServiceData(transformedServices);
			} else {
				console.log('Failed to fetch services, using static data');
			}
		} catch (error) {
			console.error('Error fetching services:', error);
			// Keep static data as fallback
		} finally {
			setServicesLoading(false);
		}
	}; 

	// Check if user is authenticated and fetch services
	useEffect(() => {
		const checkAuthentication = () => {
			const token = localStorage.getItem('token');
			const customer = localStorage.getItem('customer');
			
			// User must have BOTH token AND customer data to be considered authenticated
			if (!token || !customer) {
				// User is not authenticated, redirect to login
				alert('Please login to book an appointment. You will be redirected to the login page.');
				navigate('/login', { 
					state: { 
						redirectTo: '/booking',
						message: 'Please login to book an appointment'
					}
				});
				return;
			}
		};

		checkAuthentication();
		fetchServices(); // Fetch dynamic services
	}, [navigate]);

	const [datetime, setDatetime] = useState('');
	const [staff, setStaff] = useState('Any');

	// multi-item cart (each item represents one sub-service; qty is fixed to 1)
	const [items, setItems] = useState(incoming ? [{ id: Date.now(), service: incoming?.service || incoming?.serviceLabel || 'Service', label: incoming?.subServiceLabel || '', subId: incoming?.subServiceId || null, price: incoming?.subServicePrice || incoming?.price || 0 }] : []);

	// subtotal is sum of item prices (qty is always 1)
	const subtotal = useMemo(() => items.reduce((s, it) => s + Number(it.price || 0), 0), [items]);

	// adding UI state
	const [adding, setAdding] = useState(false);
	// Force explicit selection: start empty so user must pick main and sub
	const [addMain, setAddMain] = useState('');
	const [addSub, setAddSub] = useState('');

	// view-text dropdown state & refs
	const [mainOpen, setMainOpen] = useState(false);
	const [subOpen, setSubOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const mainRef = useRef(null);
	const subRef = useRef(null);


	// Mobile detection
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		const onDocClick = (e) => {
			if (mainRef.current && !mainRef.current.contains(e.target)) setMainOpen(false);
			if (subRef.current && !subRef.current.contains(e.target)) setSubOpen(false);
		};
		document.addEventListener('click', onDocClick);
		return () => document.removeEventListener('click', onDocClick);
	}, []);

	// Close dropdowns when any dropdown is open (for mobile)
	useEffect(() => {
		if ((mainOpen || subOpen) && isMobile) {
			document.body.style.overflow = 'hidden'; // Prevent background scrolling on mobile
		} else {
			document.body.style.overflow = 'unset';
		}
		
		// Cleanup on unmount
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [mainOpen, subOpen, isMobile]);

	const openAdd = () => { setAdding(true); setAddMain(''); setAddSub(''); };
	const cancelAdd = () => setAdding(false);
	const confirmAdd = () => {
		if (!addMain) return alert('Please select a main service');
		if (!addSub) return alert('Please select a sub-service');
		const main = serviceData.find(s => s.key === addMain);
		const sub = main?.subs?.find(x => x.id === addSub);
		if (!main || !sub) return alert('Select a valid main and sub-service');
		// qty is fixed to 1 and price is fixed from serviceData
		// prevent adding same sub-service twice
		if (items.find(x => x.subId === sub.id)) return alert('This sub-service is already added');
		const it = { id: Date.now() + Math.random(), service: main.key, label: sub.label, subId: sub.id, price: sub.price };
		setItems(prev => [...prev, it]);
		setAdding(false);
	};

	const removeItem = (id) => setItems(prev => prev.filter(it => it.id !== id));

	// convenience selected objects for display
	const selectedMainObj = serviceData.find(s => s.key === addMain);
	const selectedSubObj = selectedMainObj?.subs?.find(x => x.id === addSub);

	// Staff conflict check helper (can be used for on-change checks and on-submit)
	const checkStaffConflict = async (forStaff, forDatetime) => {
		try {
			const useStaff = forStaff || staff;
			const useDatetime = forDatetime || datetime;

			// If user selected 'Any' staff, skip the conflict check
			if (!useStaff || useStaff === 'Any') return null;
			if (!useDatetime) return null;

			// derive date string (YYYY-MM-DD) and hour from datetime-local value
			const selected = new Date(useDatetime);
			if (isNaN(selected.getTime())) return null;
			const selDate = selected.toISOString().split('T')[0];
			const selHour = selected.getHours();

			const resp = await fetch('http://localhost:5000/dashboard/bookings');
			if (!resp.ok) return null;
			const data = await resp.json();
			const bookings = data.bookings || [];

			// Find a booking with same staff, same date, and same hour (exclude cancelled bookings)
			for (const b of bookings) {
				try {
					if (!b.staff) continue;
					if (b.staff !== useStaff) continue;
					if (b.status === 'cancelled') continue;
					if (b.date !== selDate) continue;

					// parse booking.time to get hour
					let bHour = null;
					if (b.time) {
						const parts = String(b.time).split(':');
						if (parts.length >= 1) bHour = parseInt(parts[0], 10);
					} else if (b.datetime) {
						const dbdt = new Date(b.datetime);
						if (!isNaN(dbdt.getTime())) bHour = dbdt.getHours();
					}

					if (bHour === null) continue;
					if (bHour === selHour) {
						return b; // conflict found
					}
				} catch (err) {
					continue;
				}
			}

			return null;
		} catch (err) {
			console.error('Error checking staff conflicts:', err);
			return null;
		}
	};

	// Debounced effect: when staff or datetime changes, check for conflicts and dispatch event for Header
	useEffect(() => {
		let mounted = true;
		let timer = null;
		const runCheck = async () => {
			const conflict = await checkStaffConflict();
			if (!mounted) return;
			if (conflict) {
				const otherTime = conflict.time || (conflict.datetime ? new Date(conflict.datetime).toLocaleTimeString() : 'unknown');
				// Do NOT include the booked customer's name in the public message
				const msg = `${staff} already has a booking on ${conflict.date} at ${otherTime}.`;
				try {
					window.dispatchEvent(new CustomEvent('staffBookingConflict', { detail: { message: msg, conflict } }));
				} catch (e) {
					// fallback
					const evt = document.createEvent('CustomEvent'); evt.initCustomEvent('staffBookingConflict', true, true, { message: msg, conflict }); window.dispatchEvent(evt);
				}
			} else {
				try {
					window.dispatchEvent(new CustomEvent('staffBookingConflict', { detail: null }));
				} catch (e) {
					const evt = document.createEvent('CustomEvent'); evt.initCustomEvent('staffBookingConflict', true, true, null); window.dispatchEvent(evt);
				}
			}
		};

		// debounce 600ms
		timer = setTimeout(runCheck, 600);
		return () => { mounted = false; if (timer) clearTimeout(timer); };
	}, [staff, datetime]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (items.length === 0) return alert('Add at least one service');

		try {
			// Get customer info from localStorage
			const customerData = JSON.parse(localStorage.getItem('customer') || '{}');
			
			const bookingData = {
				items,
				// send ISO datetime to backend to avoid locale parsing issues
				datetime: datetime ? new Date(datetime).toISOString() : datetime,
				staff,
				subtotal: Number(subtotal) || 0,
				customerInfo: customerData
			};

			// Submit booking to backend
			const response = await fetch('http://localhost:5000/bookings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify(bookingData)
			});

			const result = await response.json();

			if (response.ok) {
				// Booking created successfully
				try {
					// Dispatch a client-side event so other parts of the app (notifications) can update live
					const evtDetail = { booking: result.booking };
					try {
						window.dispatchEvent(new CustomEvent('bookingCreated', { detail: evtDetail }));
					} catch (e) {
						const evt = document.createEvent('CustomEvent'); evt.initCustomEvent('bookingCreated', true, true, evtDetail); window.dispatchEvent(evt);
					}
				} catch (e) {
					console.warn('Could not dispatch bookingCreated event', e);
				}

				// navigate to payment with the booking data
				navigate('/payment', { 
					state: { 
						booking: { ...bookingData, bookingId: result.booking.bookingId }
					}
				});
			} else {
				alert(result.message || 'Failed to create booking. Please try again.');
			}
		} catch (error) {
			console.error('Booking submission error:', error);
			alert('Unable to create booking. Please make sure you are connected to the internet and try again.');
		}
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
										className="mobile-select"
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
							<div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
									<h3 style={{ margin: 0 }}>Selected Services</h3>
									<div>
										{!adding && <button type="button" className="btn" onClick={openAdd}>+ Add service</button>}
									</div>
								</div>

								{adding && (
									<div className="service-selection-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, padding: 12, background: '#fff', borderRadius: 8 }}>
										{/* Main service as form-style read-only input */}
										<div ref={mainRef} style={{ position: 'relative' }}>
											<label style={{ fontSize: 12 }}>Main Service</label>
											<div className="form-group" style={{ marginTop: 6 }}>
												<input
													type="text"
													placeholder="Select the service"
													value={addMain}
													readOnly
													onClick={() => { setMainOpen(o => !o); setSubOpen(false); }}
													style={{ width: '100%', padding: '0.85rem 1rem', border: '2px solid #ddd', borderRadius: 8, fontWeight: 700, cursor: 'pointer', background: '#fff' }}
												/>
											</div>
											{mainOpen && (
												<>
													<div 
														className="mobile-dropdown-backdrop"
														style={{ 
															position: 'fixed', 
															top: 0, 
															left: 0, 
															right: 0, 
															bottom: 0, 
															background: 'rgba(0,0,0,0.5)', 
															zIndex: 39,
															display: isMobile ? 'block' : 'none'
														}}
														onClick={() => setMainOpen(false)}
													/>
													<div className="service-dropdown-menu" style={{ position: 'absolute', zIndex: 40, left: 0, right: 0, marginTop: 8, background: '#fff', border: '1px solid #eee', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', maxHeight: 240, overflow: 'auto' }}>
														{servicesLoading ? (
															<div style={{ padding: 12, textAlign: 'center', color: '#666' }}>Loading services...</div>
														) : (
															serviceData.map(s => (
																<div key={s.key} className="service-dropdown-item" onClick={() => { setAddMain(s.key); setAddSub(''); setMainOpen(false); setSubOpen(true); }} style={{ padding: 12, borderBottom: '1px solid #f4f4f4', cursor: 'pointer' }}>{s.key}</div>
															))
														)}
													</div>
												</>
											)}
										</div>
										{/* Sub-service as form-style read-only input */}
										<div ref={subRef} style={{ position: 'relative' }}>
											<label style={{ fontSize: 12 }}>Sub-service</label>
											<div className="form-group" style={{ marginTop: 6 }}>
												<input
													type="text"
													placeholder="Select sub-service"
													value={selectedSubObj ? `${selectedSubObj.label} — LKR ${selectedSubObj.price.toLocaleString()}` : ''}
													readOnly
													onClick={() => { if (!addMain) return; setSubOpen(o => !o); setMainOpen(false); }}
													style={{ width: '100%', padding: '0.85rem 1rem', border: '2px solid #ddd', borderRadius: 8, fontWeight: 600, cursor: addMain ? 'pointer' : 'not-allowed', background: '#fff', color: addMain ? '#222' : '#999' }}
												/>
											</div>
											{subOpen && addMain && (
												<>
													<div 
														className="mobile-dropdown-backdrop"
														style={{ 
															position: 'fixed', 
															top: 0, 
															left: 0, 
															right: 0, 
															bottom: 0, 
															background: 'rgba(0,0,0,0.5)', 
															zIndex: 39,
															display: isMobile ? 'block' : 'none'
														}}
														onClick={() => setSubOpen(false)}
													/>
													<div className="service-dropdown-menu" style={{ position: 'absolute', zIndex: 40, left: 0, right: 0, marginTop: 8, background: '#fff', border: '1px solid #eee', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', maxHeight: 240, overflow: 'auto' }}>
														{serviceData.find(s => s.key === addMain)?.subs?.map(sub => (
															<div key={sub.id} className="service-dropdown-item" onClick={() => { setAddSub(sub.id); setSubOpen(false); }} style={{ padding: 12, borderBottom: '1px solid #f4f4f4', cursor: 'pointer' }}>
																{sub.label} — LKR {sub.price.toLocaleString()}
															</div>
														)) || (
															<div style={{ padding: 12, textAlign: 'center', color: '#666' }}>No sub-services available</div>
														)}
													</div>
												</>
											)}
										</div>
										<div className="service-action-buttons" style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
											<div className="service-price-display" style={{ fontWeight: 700, fontSize: 16, marginRight: 8 }}>{selectedSubObj ? 'LKR ' + selectedSubObj.price.toLocaleString() : ''}</div>
											<button type="button" className="btn service-add-btn" onClick={confirmAdd}>Add</button>
											<button type="button" className="btn service-cancel-btn" onClick={cancelAdd}>Cancel</button>
										</div>
									</div>
								)}

								<div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
									{items.length === 0 && !adding && <div style={{ padding: 16, background: '#fff', borderRadius: 8 }}>No services yet. Click "Add service" to add one.</div>}

									{items.map(it => (
										<div key={it.id} style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: 12, alignItems: 'center', padding: 12, background: '#fff', borderRadius: 8 }}>
											<div>
												<div style={{ fontWeight: 700 }}>{it.service}</div>
												<div style={{ marginTop: 6, color: '#666' }}>{it.label}</div>
											</div>
											<div style={{ textAlign: 'right' }}>
												<div style={{ padding: 8, borderRadius: 6, border: '1px solid #eee', background: '#fafafa', display: 'inline-block', minWidth: 120 }}>{'LKR ' + Number(it.price || 0).toLocaleString()}</div>
												<div>
													<button type="button" className="booking-remove-btn" onClick={() => removeItem(it.id)} title="Cancel" style={{ marginTop: 8 }}>Cancel</button>
												</div>
											</div>
										</div>
									))}
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
									<div>
										<div style={{ fontSize: 14, color: '#666' }}>Subtotal</div>
										<div style={{ fontWeight: 700, fontSize: 18 }}>{'LKR ' + subtotal.toLocaleString()}</div>
									</div>
									<div style={{ textAlign: 'right' }}>
										<button type="submit" className="oval-book">Proceed to payment</button>
									</div>
								</div>
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
