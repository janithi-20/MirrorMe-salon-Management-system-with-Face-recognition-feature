import React, { useState, useEffect } from 'react';
import './Team.css';

const Team = () => {
	const [members, setMembers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Static fallback data
	const staticMembers = [
		{ name: 'Lewis Fernandiz', specialization: 'Hair Stylist', experience: '5+ years experience', photo: '/Lewis.jpg' },
		{ name: 'Angela Diano', specialization: 'Junior Hair Stylist', experience: '1+ years experience', photo: '/Angela.jpg' },
		{ name: 'Kylie Nellina', specialization: 'Nail Artist', experience: '3 years experience', photo: '/Kylie.jpg' },
		{ name: 'Shalini Neha', specialization: 'Massage Therapist', experience: '5 years experience', photo: '/Shalini.jpg' },
		{ name: 'Ethan Kal', specialization: 'Color Specialist', experience: '5+ years experience', photo: '/Ethan.jpg' },
		{ name: 'Marie De Zoya', specialization: 'Skincare Specialist', experience: '4+ years experience', photo: '/Marie.jpg' },
	];

	// Fetch team members from API
	const fetchTeamMembers = async () => {
		try {
			setLoading(true);
			const response = await fetch('/team');
			const data = await response.json();
			
			console.log('👥 Team API Response:', data);
			
			if (data.success) {
				// Transform API data to match existing component structure
				const transformedMembers = data.data.map(member => ({
					name: member.name,
					specialization: member.specialization,
					experience: member.experience,
					photo: member.image
				}));
				
				console.log('✅ Transformed Team Members:', transformedMembers);
				setMembers(transformedMembers);
			} else {
				setError('Failed to fetch team members');
				// Fallback to static data
				setMembers(staticMembers);
			}
		} catch (error) {
			console.error('Error fetching team members:', error);
			setError('Failed to connect to server');
			// Fallback to static data
			setMembers(staticMembers);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTeamMembers();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (loading) {
		return (
			<section id="team" className="team">
				<div className="container">
					<div className="section-title">
						<p style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
							Loading team members...
						</p>
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section id="team" className="team">
				<div className="container">
					<div className="section-title">
						<p style={{ textAlign: 'center', padding: '20px', color: 'orange' }}>
							⚠️ {error} - Showing default team
						</p>
					</div>
				</div>
			</section>
		);
	}

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
