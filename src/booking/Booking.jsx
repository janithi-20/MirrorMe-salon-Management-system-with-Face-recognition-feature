import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Booking = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const servicesList = [
    { id: 'haircut', label: 'Haircut & Styling', price: 2900 },
    { id: 'skin', label: 'Skin Treatments', price: 3500 },
    { id: 'dressings', label: 'Dressings', price: 2500 },
    { id: 'nails', label: 'Nail care', price: 1800 },
    { id: 'waxing', label: 'Waxing', price: 1200 },
    { id: 'manicure', label: 'Manicure & Pedicure', price: 2000 }
  ];

  const [service, setService] = useState(servicesList[0].id);
  const [total, setTotal] = useState(servicesList[0].price);
  // Detailed sub-services per main category (labels + numeric price)
  const subServices = {
    haircut: [
      { id: 'hc_adv', label: 'Cut & Re-Style (Advance)', price: 4000 },
      { id: 'hc_fringe', label: 'Fringe Cut', price: 1000 },
      { id: 'hc_trim', label: 'Trim', price: 1400 },
      { id: 'hc_reg', label: 'Cut & Re-Style (Regular)', price: 2900 },
      { id: 'hc_wash', label: 'Hair Wash & Blast Dry', price: 2000 },
      { id: 'hc_bshort', label: 'Blow Dry - Short', price: 2400 },
      { id: 'hc_bmed', label: 'Blow Dry - Medium', price: 3900 },
      { id: 'hc_blong', label: 'Blow Dry - Long', price: 4500 },
      { id: 'hc_braid', label: 'Braiding Per Strand - Short', price: 1300 }
    ],
    skin: [
      { id: 'sk_face', label: 'Face Shaving', price: 4400 },
      { id: 'sk_thread', label: 'Low Upper Threading', price: 200 },
      { id: 'sk_cleanup', label: 'Classic Clean Up', price: 3800 },
      { id: 'sk_bright', label: 'Brightening Clean Up', price: 6800 },
      { id: 'sk_sothys', label: 'Sothys Hydra Moist Facial', price: 13300 }
    ],
    dressings: [
      { id: 'dr_full_early', label: 'Full Dressing (Early Morning)', price: 2500 },
      { id: 'dr_full_derma', label: 'Full Dressing Derma', price: 6500 },
      { id: 'dr_make_mac', label: 'Make-Up (Mac)', price: 8000 }
    ],
    nails: [
      { id: 'nl_classic', label: 'Classic Manicure', price: 2300 },
      { id: 'nl_gel', label: 'Gel Individual', price: 900 },
      { id: 'nl_acrylic', label: 'Acrylic Full Set', price: 8600 }
    ],
    waxing: [
      { id: 'wx_full', label: 'Full Body', price: 5900 },
      { id: 'wx_half_leg', label: 'Half Leg', price: 1450 },
      { id: 'wx_half_arm', label: 'Half Arms', price: 1350 }
    ],
    manicure: [
      { id: 'mp_classic', label: 'Classic Manicure', price: 2300 },
      { id: 'mp_spa', label: 'Spa Pedicure', price: 4800 },
      { id: 'mp_lux', label: 'Luxury Pedicure', price: 8100 }
    ]
  };

  const initialSub = subServices[servicesList[0].id][0];
  const [subService, setSubService] = useState(initialSub.id);
  const [datetime, setDatetime] = useState('');
  const [staff, setStaff] = useState('Any');

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceLabel = servicesList.find(s => s.id === service)?.label || service;
    const selectedSub = (subServices[service] || []).find(s => s.id === subService) || null;
    const booking = { 
      name, email, phone, service, serviceLabel, subService: selectedSub?.id || '', subServiceLabel: selectedSub?.label || '',
      datetime, staff, total: selectedSub ? selectedSub.price : total
    };
    // pass booking data to payment page
    navigate('/payment', { state: { booking } });
  };

  return (
    <div className="booking-page" style={{ backgroundImage: "url('/images/booking.jpg')" }}>
      <Header />

      <main className="booking-main container">
        <h2 className="booking-title">Book Appointment</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="grid-row">
            <div className="grid-cell">
              <label>Name</label>
              <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="grid-cell">
              <label>Email</label>
              <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid-cell">
              <label>Phone No.</label>
              <input type="tel" placeholder="07x xxx xxxx" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="grid-row">
            <div className="grid-cell select-cell">
              <label>Services</label>
              <select value={service} onChange={e => {
                const val = e.target.value;
                setService(val);
                const found = servicesList.find(s => s.id === val);
                setTotal(found ? found.price : 0);
              }}>
                {servicesList.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="grid-cell select-cell">
              <label>Sub-service</label>
              <select value={subService} onChange={e => {
                const val = e.target.value;
                setSubService(val);
                const found = (subServices[service] || []).find(x => x.id === val);
                if (found) setTotal(found.price);
              }}>
                {(subServices[service] || []).map(ss => (
                  <option key={ss.id} value={ss.id}>{ss.label} — LKR {ss.price.toLocaleString()}</option>
                ))}
              </select>
            </div>
            <div className="grid-cell">
              <label>Date/Time</label>
              <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} />
            </div>
            <div className="grid-cell">
              <label>Staff Member</label>
              <select value={staff} onChange={e => setStaff(e.target.value)}>
                <option>Any</option>
                <option>Stylist A</option>
                <option>Stylist B</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="oval-book">Book</button>
          </div>
        </form>
        <div style={{ marginTop: 12 }}>
          <strong>Selected service:</strong> {servicesList.find(s => s.id === service)?.label}
          <br />
          <strong>Selected sub-service:</strong> {(subServices[service] || []).find(x => x.id === subService)?.label}
          <br />
          <strong>Price:</strong> LKR {Number(total).toLocaleString()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
