import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FeedbackModal from '../../components/FeedbackModal';
import './Feedback.css';

const Feedback = () => {
	const { isUserAuthenticated, user, loginUser } = useAuth();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [testimonials, setTestimonials] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Static fallback testimonials
	const staticTestimonials = [
		{
			text: 'They remember my preferences and service history, which makes me feel valued.',
			name: 'Sonali De Silva',
			rating: 5,
		},
		{
			text: 'The face recognition feature is a game-changer! It speeds up check-in and adds a personal touch.',
			name: 'Michael Fernando',
			rating: 3.5,
		},
		{
			text: 'Booking appointments online is so easy and convenient compared to calling.',
			name: 'Jessica Perera',
			rating: 4,
		},
	];

	// Fetch approved feedback from API
	const fetchApprovedFeedback = async () => {
		try {
			setLoading(true);
			const response = await fetch('http://localhost:5000/feedback?limit=6');
			const data = await response.json();
			
			console.log('💬 Approved Feedback Response:', data);
			
			if (data.success && data.data.length > 0) {
				// Transform API data to match existing component structure
				const transformedTestimonials = data.data.map(feedback => ({
					text: feedback.message,
					name: feedback.name,
					rating: feedback.rating
				}));
				
				console.log('✅ Transformed Testimonials:', transformedTestimonials);
				setTestimonials(transformedTestimonials);
			} else {
				// Fallback to static testimonials
				setTestimonials(staticTestimonials);
			}
		} catch (error) {
			console.error('Error fetching approved feedback:', error);
			setError('Failed to load testimonials');
			// Fallback to static testimonials
			setTestimonials(staticTestimonials);
		} finally {
			setLoading(false);
		}
	};

	// Render star rating
	const renderStars = (rating) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 !== 0;
		
		for (let i = 0; i < fullStars; i++) {
			stars.push(<FaStar key={i} />);
		}
		
		if (hasHalfStar) {
			stars.push(<FaStarHalf key="half" />);
		}
		
		return <span>{stars}</span>;
	};

	// Handle feedback button click with authentication check
	const handleFeedbackClick = () => {
		console.log('📝 Feedback button clicked. Auth state:', { isUserAuthenticated, user: user ? `${user.firstName} ${user.lastName}` : null });
		
		if (isUserAuthenticated && user) {
			// User is logged in, open feedback modal
			setIsModalOpen(true);
		} else {
			// User is not logged in, redirect to login page
			console.log('⚠️ User not authenticated, redirecting to login');
			navigate('/login', {
				state: {
					redirectTo: '/',
					message: 'Please log in to submit your feedback.',
					openFeedbackModal: true
				}
			});
		}
	};

	useEffect(() => {
		fetchApprovedFeedback();
		
		// Listen for feedback modal trigger after login
		const handleOpenFeedbackModal = () => {
			console.log('🎉 Opening feedback modal after login');
			setIsModalOpen(true);
		};
		
		// Listen for logout events to update state
		const handleUserLoggedOut = () => {
			console.log('👋 User logged out, updating feedback component state');
			// Close modal if open
			setIsModalOpen(false);
		};
		
		window.addEventListener('openFeedbackModal', handleOpenFeedbackModal);
		window.addEventListener('userLoggedOut', handleUserLoggedOut);
		
		// Cleanup event listeners
		return () => {
			window.removeEventListener('openFeedbackModal', handleOpenFeedbackModal);
			window.removeEventListener('userLoggedOut', handleUserLoggedOut);
		};
	}, []);

	if (loading) {
		return (
			<section id="feedback" className="feedback">
				<div className="container">
					<div className="section-title">
						<h2>Your Happiness, Our Success</h2>
						<p>Loading testimonials...</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section id="feedback" className="feedback">
			<div className="container">
				<div className="section-title">
					<h2>Your Happiness, Our Success</h2>
					<p>Hear from our valuable customers who had a great experience with Mirror Me Salon</p>
					{error && (
						<p style={{ color: 'orange', fontSize: '14px' }}>
							⚠️ {error} - Showing default testimonials
						</p>
					)}
				</div>

				<div className="team-grid">
					{testimonials.map((t, index) => (
						<div key={index} className="team-card">
							<p className="team-text">"{t.text}"</p>
							<div className="team-author">
								<div className="author-avatar">{t.name.charAt(0)}</div>
								<div className="author-details">
									<h4>{t.name}</h4>
									<p>{renderStars(t.rating)}</p>
								</div>
							</div>
						</div>
					))}
				</div>

			<div className="feedback-short">
				<button className="feedback-btn" onClick={handleFeedbackClick}>
					Submit your feedback
				</button>


			</div>				<FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			</div>
		</section>
	);
};

export default Feedback;

