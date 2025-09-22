import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import skinImg from '../../components/skin.jpg';
import hairImg from '../../components/hair.jpg';
import dressingImg from '../../components/dressing.jpg';
import nailsImg from '../../components/nails.jpg';
import manicureImg from '../../components/manicure.jpg';
import waxingImg from '../../components/waxing.jpg';

const services = [
  {
    slug: 'haircut',
    title: 'Haircut & Styling',
    desc: 'Professional haircuts and trendy styles tailored to suit your personality and occasion.'
  },
  {
    slug: 'skin-treatments',
    title: 'Skin Treatments',
    desc: 'Refreshing facials and advancved skin care to keep your skin fresh, glowing, and healthy.'
  },
  {
    slug: 'dressings',
    title: 'Dressings',
    desc: 'Expert saree draping and outfit styling for weddings, parties, and special events.'
  },
  {
    slug: 'nails',
    title: 'Nail Care',
    desc: 'Stylish nail grooming and creative designs that give your nails a perfect finish.'
  },
  {
    slug: 'manicure-pedicure',
    title: 'Manicure & Pedicure',
    desc: 'Relaxing hand and foot care treatments for soft, clean, and polished results.'
  },
  {
    slug: 'waxing',
    title: 'Waxing',
    desc: 'Smooth and silky skin with safe, hygienic, and gentle waxing services.'
  }
];

const Services = () => {
  return (
    <div>
      <Header />
      <main className="container" style={{ padding: '3rem 0' }}>
        <div className="section-title">
          <h2 style={{ fontWeight: 700, textAlign: 'center' }}>Our Services</h2>
          <p style={{ fontWeight: 700, textAlign: 'center', marginTop: 12 }}>
            "Our salon offers a complete range of beauty and grooming services including haircuts, styling, coloring, skin and facial treatments, manicures, pedicures, relaxing spa therapies, bridal and groom packages, as well as essential care like waxing, threading, and beard grooming – everything you need to look and feel your best."
          </p>
        </div>

        <section className="services-grid" style={{ marginTop: 30 }}>
          {services.map((s) => (
            <div key={s.slug} className="service-card">
              <div
                className="service-photo"
                aria-hidden
                style={{
                  backgroundColor: '#f0f0f0',
                  height: 160,
                  borderRadius: 8,
                  backgroundImage: s.slug === 'skin-treatments' ? `url(${skinImg})` : s.slug === 'haircut' ? `url(${hairImg})` : s.slug === 'dressings' ? `url(${dressingImg})` : s.slug === 'nails' ? `url(${nailsImg})` : s.slug === 'manicure-pedicure' ? `url(${manicureImg})` : s.slug === 'waxing' ? `url(${waxingImg})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <h4 style={{ marginTop: 12 }}>{s.title}</h4>
              <p style={{ color: '#666', whiteSpace: 'pre-line' }}>{s.desc}</p>
              <div style={{ marginTop: 12 }}>
                <Link to={`/services/${s.slug}`} className="btn">View Service</Link>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
