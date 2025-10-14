import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Booking.css';
import ServiceIndex from '../data/serviceIndex';

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
	const mainRef = useRef(null);
	const subRef = useRef(null);

	useEffect(() => {
		const onDocClick = (e) => {
			if (mainRef.current && !mainRef.current.contains(e.target)) setMainOpen(false);
			if (subRef.current && !subRef.current.contains(e.target)) setSubOpen(false);
		};
		document.addEventListener('click', onDocClick);
		return () => document.removeEventListener('click', onDocClick);
	}, []);

	const openAdd = () => { setAdding(true); setAddMain(''); setAddSub(''); };
	const cancelAdd = () => setAdding(false);
	const confirmAdd = () => {
		if (!addMain) return alert('Please select a main service');
		if (!addSub) return alert('Please select a sub-service');
		const main = ServiceIndex.find(s => s.key === addMain);
		const sub = main?.subs?.find(x => x.id === addSub);
		if (!main || !sub) return alert('Select a valid main and sub-service');
		// qty is fixed to 1 and price is fixed from serviceIndex
		// prevent adding same sub-service twice
		if (items.find(x => x.subId === sub.id)) return alert('This sub-service is already added');
		const it = { id: Date.now() + Math.random(), service: main.key, label: sub.label, subId: sub.id, price: sub.price };
		setItems(prev => [...prev, it]);
		setAdding(false);
	};

	const removeItem = (id) => setItems(prev => prev.filter(it => it.id !== id));

	// convenience selected objects for display
	const selectedMainObj = ServiceIndex.find(s => s.key === addMain);
	const selectedSubObj = selectedMainObj?.subs?.find(x => x.id === addSub);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (items.length === 0) return alert('Add at least one service');
		const booking = { items, datetime, staff, subtotal };
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
							<div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
									<h3 style={{ margin: 0 }}>Selected Services</h3>
									<div>
										{!adding && <button type="button" className="btn" onClick={openAdd}>+ Add service</button>}
									</div>
								</div>

								{adding && (
									<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, padding: 12, background: '#fff', borderRadius: 8 }}>
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
												<div style={{ position: 'absolute', zIndex: 40, left: 0, right: 0, marginTop: 8, background: '#fff', border: '1px solid #eee', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', maxHeight: 240, overflow: 'auto' }}>
													{ServiceIndex.map(s => (
														<div key={s.key} onClick={() => { setAddMain(s.key); setAddSub(''); setMainOpen(false); setSubOpen(true); }} style={{ padding: 12, borderBottom: '1px solid #f4f4f4', cursor: 'pointer' }}>{s.key}</div>
													))}
												</div>
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
												<div style={{ position: 'absolute', zIndex: 40, left: 0, right: 0, marginTop: 8, background: '#fff', border: '1px solid #eee', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', maxHeight: 240, overflow: 'auto' }}>
													{ServiceIndex.find(s => s.key === addMain)?.subs?.map(sub => (
														<div key={sub.id} onClick={() => { setAddSub(sub.id); setSubOpen(false); }} style={{ padding: 12, borderBottom: '1px solid #f4f4f4', cursor: 'pointer' }}>{sub.label} — LKR {sub.price.toLocaleString()}</div>
													))}
												</div>
											)}
										</div>
										<div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
											<div style={{ fontWeight: 700, fontSize: 16, marginRight: 8 }}>{selectedSubObj ? 'LKR ' + selectedSubObj.price.toLocaleString() : ''}</div>
											<button type="button" className="btn" onClick={confirmAdd}>Add</button>
											<button type="button" className="btn" onClick={cancelAdd}>Cancel</button>
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
