import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Home from './pages/Home/Home';
import Services from './pages/services/Services';
import ServiceDetail from './pages/services/ServiceDetail';
import VerifyEmail from './pages/verifyEmail/VerifyEmail.jsx';
import Login from './login,signup/Login';
import Register from './login,signup/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Booking from './booking/Booking';
import FaceRecognition from './pages/FaceRecognition/FaceRecognition';
import Profile from './pages/Profile/Profile';
import Payment from './pages/payment/payment';
import Bill from './pages/bill/bill';
import NotificationPage from './pages/Home/notification';

import Team from './pages/Team/Team';
import Admin from './AdminPanel/Admin';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/face-recognition" element={<FaceRecognition />} />
  <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );

}

export default App;
