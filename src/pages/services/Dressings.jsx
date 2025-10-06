import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dressingBg from './dressing.jpg';
import eyeLashes from './dressing & makeup/eye lashes.jpg';
import fullDressing from './dressing & makeup/full dressing early morning.jpg';
import fullDressingMac from './dressing & makeup/full dessing mac.jpg';
import fullDressingDerma from './dressing & makeup/full dressing derma.jpg';
import mackupMac from './dressing & makeup/mackup mac.jpg';
import makupDerma from './dressing & makeup/makup derma.jpg';
import hairstyleImg from './dressing & makeup/hairstyle.jpg';
import saree from './dressing & makeup/saree drapping.jpg';

const services = [
    { id: 'full-early', service: 'Full Dressing (Early Morning)', price: 2500, img: fullDressing },
    { id: 'full-derma', service: 'Full Dressing Derma', price: 6500, img: fullDressingDerma },
    { id: 'full-mac', service: 'Full Dressing Mac', price: 10300, img: fullDressingMac },
    { id: 'saree', service: 'Saree Draping', price: 2000, img: saree },
    { id: 'makeup-mac', service: 'Make-Up (Mac)', price: 8000, img: mackupMac },
    { id: 'makeup-derma', service: 'Make-Up (Derma)', price: 4200, img: makupDerma },
    { id: 'hairstyle', service: 'Hair Style', price: 3100, img: hairstyleImg },
    { id: 'addon-lashes', service: 'Add-on Eye Lashes', price: 1800, img: eyeLashes }
];

function formatCurrency(v){
    return 'LKR ' + v.toLocaleString();
}

const Dressings = () => {
    const navigate = useNavigate();

    const goToBooking = (svc) => {
        const booking = {
            service: 'Dressings & Make-Up',
            subServiceLabel: svc.service,
            subServicePrice: svc.price,
            total: svc.price
        };
        navigate('/booking', { state: { booking } });
    };

    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${dressingBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '3.5rem 1rem'
        }}>
            <div className="service-page container" style={{ background: 'rgba(255,255,255,0.92)', padding: '2rem 1.75rem', borderRadius: 16, boxShadow: '0 6px 18px rgba(0,0,0,0.15)', maxWidth: 920 }}>
                <h2 style={{ marginTop: 0 }}>Dressings & Make-Up</h2>
                <p style={{ marginTop: 12, fontWeight: 700 }}>Available sub-services:</p>

                <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                    {services.map(s => (
                        <button key={s.id} type="button" onClick={() => goToBooking(s)} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 10, border: '1px solid #e6e6e6', background: '#fff', cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
                            <div style={{ height: 140, backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <div style={{ padding: '12px 14px', textAlign: 'left' }}>
                                <div style={{ fontWeight: 700 }}>{s.service}</div>
                                <div style={{ marginTop: 6, color: '#666' }}>{formatCurrency(s.price)}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: 24 }}>
                    <Link to="/services" className="btn">Back to Services</Link>
                </div>
            </div>
        </div>
    );
};

export default Dressings;
