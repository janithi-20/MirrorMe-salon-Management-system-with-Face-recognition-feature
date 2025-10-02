import React from 'react';
import './Features.css';

const Features = () => {
  const team = [
    { title: 'Lewis Fernandiz', description: 'Salon Manager/Director', photo: '/Lewis.jpg' },
    { title: 'Angela Diano', description: 'Assistant Stylist/Junior Stylist', photo: '/Angela.jpg' },
    { title: 'Kylie Nellina', description: 'Nail Technician', photo: '/Kylie.jpg' },
    { title: 'Shalini Neha', description: 'Massage Therapist', photo: '/Shalini.jpg' },
    { title: 'Ethan Kal', description: 'Color Specialist', photo: '/Ethan.jpg' },
    { title: 'Marie De Zoya', description: 'Skincare Specialist', photo: '/Marie.jpg' },
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title">
          <h2>Our Team</h2>
          <p>Each of our team members have different strengths and years of experience.</p>
        </div>
        <div className="features-grid">
          {team.map((member, index) => (
            <div key={index} className="feature-card">
              {member.photo && (
                <img src={member.photo} alt={member.title} className="member-photo" />
              )}
              <h3>{member.title}</h3>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
