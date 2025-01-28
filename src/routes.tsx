import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginForm from './pages/account/LoginForm';
import RegisterForm from './pages/account/RegisterForm';
import FixerProfile from './pages/fixer/FixerProfile';
import CreateProfile from './pages/account/CreateProfile'; // Import the CreateProfile component
import Header from './components/layout/Header';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    {/* <Header /> Ensure Header is within the BrowserRouter */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/fixer/profile" element={<FixerProfile />} />
      <Route path="/create-profile" element={<CreateProfile />} /> {/* Add the CreateProfile route */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;