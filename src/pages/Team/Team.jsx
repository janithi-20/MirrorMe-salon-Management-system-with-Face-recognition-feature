import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TeamGrid from '../Home/Team';
import './team.css';

const Team = () => {
  return (
    <div className="page-content team-page">
      <Header />
      <section className="container">
        <div className="section-title" style={{ marginTop: 20,  marginBottom: 5}}>
          <h2>Our Team</h2>
          <p>Our talented team is the heart of our success, our professionals are dedicated to delivering exceptional beauty services. Each team member brings a wealth of experience and a passion for excellence, ensuring you receive personalized care and outstanding results. We take pride in our friendly, skilled staff who are here to make your salon experience unforgettable. Meet the professionals behind MirroMe Salon.</p>
        </div>
      </section>
      <TeamGrid />
      <Footer />
    </div>
  );
};

export default Team;
