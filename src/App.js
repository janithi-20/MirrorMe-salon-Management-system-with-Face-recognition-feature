import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page-level components
import Home from './pages/Home/Home';
import Services from './pages/services/Services';
import Haircut from './pages/services/Haircut';
import SkinTreatments from './pages/services/SkinTreatments';
import Dressings from './pages/services/Dressings';
import Nails from './pages/services/Nails';
import Waxing from './pages/services/Waxing';
import ManicurePedicure from './pages/services/ManicurePedicure';
import Login from './login,signup/Login';
import Register from './login,signup/Register';
import Booking from './booking/Booking';
import FaceRecognition from './pages/FaceRecognition/FaceRecognition';
import Profile from './pages/Profile/Profile';
import Payment from './pages/payment/payment';
import Bill from './pages/bill/bill';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/booking" element={<Booking />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/payment" element={<Payment />} />
				<Route path="/bill" element={<Bill />} />
				<Route path="/face-recognition" element={<FaceRecognition />} />
				<Route path="/services" element={<Services />} />
				<Route path="/services/haircut" element={<Haircut />} />
				<Route path="/services/skin-treatments" element={<SkinTreatments />} />
				<Route path="/services/dressings" element={<Dressings />} />
				<Route path="/services/nails" element={<Nails />} />
				<Route path="/services/waxing" element={<Waxing />} />
				<Route path="/services/manicure-pedicure" element={<ManicurePedicure />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
