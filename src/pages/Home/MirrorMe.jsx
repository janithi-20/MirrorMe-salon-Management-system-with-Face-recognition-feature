import React from 'react';
import { Link } from 'react-router-dom';
import './MirrorMe.css';

const FaceRecognitionButton = () => (
  <Link to="/face-recognition" className="face-recognition-btn">
    <span className="text">Face Recognition</span>
  </Link>
);

const MirrorMe = () => (
  <section id="about" className="hero">
    <img
      className="hero-video"
      src="/homepage.jpg"
      alt="Homepage"
    />

    <div className="container">
      <h1 className="hero-heading">
        Experience The Elegance Of<br />
        <span className="second-line">Mirror Me Salon</span>
      </h1>
      <p>
        Where expert care meets luxurious services for a transformative beauty experience.
        Discover personalized styling, skincare, and more.
      </p>
      <div className="face-recognition-section">
        <FaceRecognitionButton />
      </div>
    </div>
  </section>
);

export default MirrorMe;
