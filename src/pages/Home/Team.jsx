import React from 'react';
import './Team.css';

// Our Team section: image above name and specialization
const Team = () => {
	const members = [
		{ name: 'Lewis Fernandiz', specialization: 'Hair Stylist', photo: '/Lewis.jpg' },
		{ name: 'Angela Diano', specialization: 'Hair Stylist', photo: '/Angela.jpg' },
		{ name: 'Kylie Nellina', specialization: 'Nail Artist', photo: '/Kylie.jpg' },
		{ name: 'Shalini Neha', specialization: 'Massage Therapist', photo: '/Shalini.jpg' },
		{ name: 'Ethan Kal', specialization: 'Color Specialist', photo: '/Ethan.jpg' },
		{ name: 'Marie De Zoya', specialization: 'Skincare Specialist', photo: '/Marie.jpg' },
	];

	return (
		<section id="team" className="team">
			<div className="container">
				<div className="section-title">
				</div>
				<div className="features-grid">
					{members.map((m, idx) => (
						<div key={idx} className="feature-card team-card" style={{marginBottom: 20}}>
							<img className="member-photo" src={m.photo} alt={m.name} />
							<h3>{m.name}</h3>
							<p>{m.specialization}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Team;
