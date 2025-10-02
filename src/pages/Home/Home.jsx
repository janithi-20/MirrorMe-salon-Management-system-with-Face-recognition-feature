import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import Brands from './Brands';

const Home = () => (
  <div className="App">
    <Header />
    <Hero />
    <Features />
    <Testimonials />
    <Brands />
    <Footer />
  </div>
);

export default Home;
