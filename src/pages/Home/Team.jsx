import React from 'react';
import './Team.css';

// Our Team section: image above name and specialization
const Team = () => {
const members = [
	{ name: 'Lewis Fernandiz', specialization: 'Great service and friendly staff!', photo: '/Lewis.jpg' },
	{ name: 'Angela Diano', specialization: 'Loved the ambiance and the haircut!', photo: '/Angela.jpg' },
	{ name: 'Kylie Nellina', specialization: 'The nail art was amazing!', photo: '/Kylie.jpg' },
	{ name: 'Shalini Neha', specialization: 'Best massage I have ever had!', photo: '/Shalini.jpg' },
	{ name: 'Ethan Kal', specialization: 'Color Specialist', photo: '/Ethan.jpg' },
	{ name: 'Marie De Zoya', specialization: 'Skincare Specialist', photo: '/Marie.jpg' },
];

	return (
		<section id="team" className="team">
			<div className="container">
				<div className="section-title">
				</div>
				
			</div>
		</section>
	);
};

export default Team;
