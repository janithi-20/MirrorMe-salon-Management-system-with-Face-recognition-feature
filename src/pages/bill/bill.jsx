import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Bill = () => {
	const location = useLocation();
	const booking = location.state?.booking || {};

	const customerName = booking.name || 'Customer';
	// derive separate date and time strings
	let dateStr = '—';
	let timeStr = '—';
	if (booking.datetime) {
		const dt = String(booking.datetime);
		if (dt.includes('T')) {
			const [d, t] = dt.split('T');
			const parts = d.split('-');
			if (parts.length === 3) dateStr = `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
			timeStr = (t || '').slice(0, 5);
		} else {
			dateStr = dt;
		}
	} else {
		if (booking.date) dateStr = booking.date;
		if (booking.time) timeStr = booking.time;
	}

	const staff = booking.staff || '-';
	const items = Array.isArray(booking.items) ? booking.items : [];
	const total = typeof booking.subtotal === 'number' ? booking.subtotal : items.reduce((s, it) => s + Number(it.price || 0), 0);

	// Receipt number: prefer an explicit stored receiptNumber; otherwise ALWAYS generate RCP-YYYYMMDD-<4digits>
	const receiptNumber = booking.receiptNumber || (() => {
		const dt = booking.datetime ? new Date(booking.datetime) : new Date();
		const y = dt.getFullYear();
		const m = String(dt.getMonth() + 1).padStart(2, '0');
		const d = String(dt.getDate()).padStart(2, '0');
		const rand = Math.floor(Math.random() * 9000) + 1000;
		return `RCP-${y}${m}${d}-${rand}`;
	})();

	const subject = encodeURIComponent('Your Salon Receipt');
	const bodyLines = [
		`Hello ${customerName},`,
		'',
		'Thank you for your visit. Here are your receipt details:',
		`Date: ${dateStr}`,
		`Time: ${timeStr}`,
		`Staff: ${staff}`,
		'',
		'Services:',
		...items.map(it => `- ${it.service} | ${it.label} : LKR ${Number(it.price || 0).toLocaleString()}`),
		'',
		`Total: LKR ${Number(total).toLocaleString()}`,
		'',
		'Best regards,',
		'Salon Team'
	];
	const mailtoHref = `mailto:?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

	// helper to generate rows HTML for print window
	const makeRowsHtml = () => items.map((it, idx) => `
		<tr>
			<td style="padding:12px 8px;vertical-align:top">
				<div style="font-weight:600">${it.service || ''}</div>
				<div style="color:#666;font-size:12px;margin-top:6px">${it.label || ''}</div>
			</td>
			<td style="text-align:center;padding:12px 8px;vertical-align:top">1</td>
			<td style="text-align:right;padding:12px 8px;vertical-align:top">LKR ${Number(it.price || 0).toLocaleString()}</td>
		</tr>
	`).join('');

	const handlePrint = () => {
		const rows = makeRowsHtml();
		const markup = `<!doctype html>
			<html>
			<head>
				<meta charset="utf-8" />
				<title>Receipt</title>
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<style>
					body{font-family: 'Helvetica Neue', Arial, sans-serif;color:#111;margin:0;background:#fff}
					.page{width:210mm;min-height:297mm;padding:18mm;box-sizing:border-box}
					.card{max-width:800px;margin:0 auto;background:#fff;padding:18px;border-radius:8px}
					.header{display:flex;justify-content:space-between;align-items:flex-start}
					.logo{display:flex;align-items:center;gap:12px}
					.badge{width:56px;height:56px;border-radius:50%;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
					.company{font-size:13px;color:#222}
					.receipt-title{font-size:28px;font-weight:700;color:#222}
					.meta{margin-top:18px;display:flex;justify-content:space-between}
					table{width:100%;border-collapse:collapse;margin-top:18px}
					thead th{background:#111;color:#fff;padding:10px 12px;text-align:left;font-size:13px}
					tbody td{border-bottom:1px solid #f0f0f0;padding:12px 8px;vertical-align:top}
					.totals{margin-top:18px;display:flex;justify-content:flex-end}
					.totals .block{min-width:240px}
					.totals .row{display:flex;justify-content:space-between;padding:6px 0}
					.totals .row.total{font-weight:800;font-size:16px}
					.note{margin-top:22px;color:#666;font-size:12px}
					@media print{ body{background:#fff} .page{padding:12mm} }
				</style>
			</head>
			<body>
				<div class="page">
					<div class="card">
						<div class="header">
							<div class="logo">
								<div class="badge"><img src="/salon logo.jpg" alt="" style="height:36px;object-fit:contain;vertical-align:middle" onerror="this.style.display='none'"/></div>
								<div class="company"><div style="font-weight:700">Mirror Me Salon</div><div style="font-size:12px;color:#666;margin-top:6px">123 Elegance Street, Colombo</div><div style="font-size:12px;color:#666">+94 77 123 4567</div></div>
							</div>
							<div style="text-align:right">
								<div class="receipt-title">RECEIPT</div>
								<div style="margin-top:8px;color:#666;font-size:13px">Receipt : ${receiptNumber}</div>
								<div style="color:#666;font-size:13px;margin-top:6px">Date: ${dateStr}</div>
								<div style="color:#666;font-size:13px;margin-top:4px">Time: ${timeStr}</div>
							</div>
						</div>
						<div class="meta"><div class="left"></div><div class="right"></div></div>
						<table>
							<thead>
								<tr>
									<th style="width:65%">Item & Description</th>
									<th style="width:10%;text-align:center">Qty</th>
									<th style="width:25%;text-align:right">Amount</th>
								</tr>
							</thead>
							<tbody>
								${rows}
							</tbody>
						</table>
						<div class="totals">
							<div class="block">
								<div class="row"><div>Sub Total</div><div>LKR ${Number(total).toLocaleString()}</div></div>
								<div class="row total"><div>Total</div><div>LKR ${Number(total).toLocaleString()}</div></div>
							</div>
						</div>
						<div class="note">Notes<br/>Thank you for your visit.</div>
					</div>
				</div>
			</body>
			</html>`;

		const w = window.open('', '_blank', 'noopener,noreferrer');
		if (!w) { window.print(); return; }
		w.document.open(); w.document.write(markup); w.document.close(); w.focus(); setTimeout(()=>w.print(), 400);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Header />
			<main style={{ flex: 1 }}>
				<div style={{ minHeight: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6rem 1.2rem' }}>
					<div style={{ width: '100%', maxWidth: 800 }}>
						<div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
								<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
									<div style={{ width: 56, height: 56, borderRadius: '50%', background: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<img src="/salon logo.jpg" alt="logo" style={{ height: 36, objectFit: 'contain' }} onError={(e) => (e.target.style.display = 'none')} />
									</div>
									<div>
										<div style={{ fontWeight: 700 }}>Mirror Me Salon</div>
										<div style={{ color: '#666', fontSize: 12 }}>123 Elegance Street, Colombo</div>
										<div style={{ color: '#666', fontSize: 12 }}>+94 77 123 4567</div>
									</div>
								</div>
								<div style={{ textAlign: 'right' }}>
									<div style={{ fontSize: 28, fontWeight: 700 }}>RECEIPT</div>
									<div style={{ color: '#666', marginTop: 8 }}>Receipt : {receiptNumber}</div>
									<div style={{ color: '#666' }}>Date: {dateStr}</div>
									<div style={{ color: '#666', marginTop: 4 }}>Time: {timeStr}</div>
								</div>
							</div>

							<div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
								<div style={{ textAlign: 'right' }}>
									<div><strong>Staff:</strong> {staff}</div>
								</div>
							</div>

							<div style={{ marginTop: 18 }}>
								<table style={{ width: '100%', borderCollapse: 'collapse' }}>
									<thead>
										<tr style={{ background: '#111', color: '#fff' }}>
											<th style={{ padding: '10px 12px', textAlign: 'left' }}>Item & Description</th>
											<th style={{ width: 80, textAlign: 'center' }}>Qty</th>
											<th style={{ width: 160, textAlign: 'right' }}>Amount</th>
										</tr>
									</thead>
									<tbody>
										{items.map((it, idx) => (
											<tr key={it.id || idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
												<td style={{ padding: '12px 8px' }}>
													<div style={{ fontWeight: 600 }}>{it.service}</div>
													<div style={{ color: '#666', fontSize: 12, marginTop: 6 }}>{it.label}</div>
												</td>
												<td style={{ textAlign: 'center' }}>1</td>
												<td style={{ textAlign: 'right', fontWeight: 700 }}>LKR {Number(it.price || 0).toLocaleString()}</td>
											</tr>
										))}
									</tbody>
								</table>

								<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
									<div style={{ minWidth: 240 }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
											<div>Sub Total</div>
											<div>LKR {Number(total).toLocaleString()}</div>
										</div>
										<div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontWeight: 800, fontSize: 16 }}>
											<div>Total</div>
											<div>LKR {Number(total).toLocaleString()}</div>
										</div>
									</div>
								</div>

								{/* Receipt ID shown under payment totals */}
								<div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
									<div style={{ textAlign: 'right', color: '#444', fontSize: 13 }}>
										<div><strong>Receipt ID:</strong> {receiptNumber}</div>
									</div>
								</div>

								<div style={{ marginTop: 22, color: '#666', fontSize: 13 }}>Thank you for visiting. We look forward to serving you again!</div>

								<div style={{ marginTop: 12, display: 'flex', gap: 12, justifyContent: 'center' }}>
									<button onClick={handlePrint} className="btn" style={{ minWidth: 140 }}>Print / Download</button>
									<a href={mailtoHref} className="btn" style={{ minWidth: 140, textDecoration: 'none', textAlign: 'center', lineHeight: 1.2 }}>Send Email</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Bill;