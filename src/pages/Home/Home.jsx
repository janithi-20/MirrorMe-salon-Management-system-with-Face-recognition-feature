import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MirrorMe from './MirrorMe';
import Brands from './Brands';
import Feedback from './Feedback';
import Team from './Team';

const Home = () => (
  <div className="App">
    <Header />
  <MirrorMe />
    <Brands />
    <Feedback />
    <Team />
    <Footer />
  </div>
);

export default Home;
