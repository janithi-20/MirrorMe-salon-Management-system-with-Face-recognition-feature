import React from 'react';
import './Team.css';

const Team = () => {
	const members = [
		{ name: 'Lewis Fernandiz', specialization: 'Hair Stylist', experience: '5+ years experience', photo: '/Lewis.jpg' },
		{ name: 'Angela Diano', specialization: 'Junior Hair Stylist', experience: '1+ years experience', photo: '/Angela.jpg' },
		{ name: 'Kylie Nellina', specialization: 'Nail Artist', experience: '3 years experience', photo: '/Kylie.jpg' },
		{ name: 'Shalini Neha', specialization: 'Massage Therapist', experience: '5 years experience', photo: '/Shalini.jpg' },
		{ name: 'Ethan Kal', specialization: 'Color Specialist', experience: '5+ years experience', photo: '/Ethan.jpg' },
		{ name: 'Marie De Zoya', specialization: 'Skincare Specialist', experience: '4+ years experience', photo: '/Marie.jpg' },
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
							<p className="member-experience">{m.experience}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Team;
