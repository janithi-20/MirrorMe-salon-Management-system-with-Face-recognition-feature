import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa6';
import FeedbackModal from '../../components/FeedbackModal';
import './Feedback.css';

const Feedback = () => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const testimonials = [
		{
			text: 'They remember my preferences and service history, which makes me feel valued.',
			name: 'Sonali De Silva',
			role: (
				<span>
					<FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
				</span>
			),
		},
		{
			text: 'The face recognition feature is a game-changer! It speeds up check-in and adds a personal touch.',
			name: 'Michael Fernando',
			role: (
				<span>
					<FaStar /><FaStar /><FaStar /><FaStarHalf />
				</span>
			),
		},
		{
			text: 'Booking appointments online is so easy and convenient compared to calling.',
			name: 'Jessica Perera',
			role: (
				<span>
					<FaStar /><FaStar /><FaStar /><FaStar />
				</span>
			),
		},
	];

	return (
		<section id="feedback" className="feedback">
			<div className="container">
				<div className="section-title">
					<h2>Your Happiness, Our Success</h2>
					<p>Hear from our valuable customers who had a great experience with Mirror Me Salon</p>
				</div>

				<div className="team-grid">
					{testimonials.map((t, index) => (
						<div key={index} className="team-card">
							<p className="team-text">"{t.text}"</p>
							<div className="team-author">
								<div className="author-avatar">{t.name.charAt(0)}</div>
								<div className="author-details">
									<h4>{t.name}</h4>
									<p>{t.role}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="feedback-short">
					<button className="feedback-btn" onClick={() => setIsModalOpen(true)}>
						Submit your feedback
					</button>
				</div>

				<FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			</div>
		</section>
	);
};

export default Feedback;

