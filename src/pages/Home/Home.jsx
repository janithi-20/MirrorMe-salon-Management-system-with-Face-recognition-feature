import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MirrorMe from './MirrorMe';
import Brands from './Brands';
import Feedback from './Feedback';

const Home = () => (
  <div className="App">
    <Header />
  <MirrorMe />
    <Brands />
    <Feedback />
    <Footer />
  </div>
);

export default Home;
