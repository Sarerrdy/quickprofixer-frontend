import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './pages/account/LoginForm';
import RegisterForm from './pages/account/RegisterForm';
// import FixerProfile from './pages/FixerProfile';
import CreateProfile from './pages/account/CreateProfile'; // Import the CreateProfile component
// import DashboardPage from './pages/dashboardPage'; // <-- Add this import
import Header from './components/layout/Header';
import FixerDashboardPage from './pages/dashboard/FixerDashboardPage';
import ClientDashboardPage from './pages/dashboard/ClientDashboardPage';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    {/* <Header /> Ensure Header is within the BrowserRouter */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      {/* <Route path="/fixer/profile" element={<FixerProfile />} /> */}
      <Route path="/create-profile" element={<CreateProfile />} /> {/* Add the CreateProfile route */}
      {/* <Route path="/DashboardPage" element={<DashboardPage userType="client" />} /> */}
      <Route path="/dashboard/fixer" element={<FixerDashboardPage />} />
      <Route path="/dashboard/client" element={<ClientDashboardPage />} />
  
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;