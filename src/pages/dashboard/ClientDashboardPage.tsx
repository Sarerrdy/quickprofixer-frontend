import React from 'react';
import ClientDashboard from '../../components/dashboard/client/ClientDashboard';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ClientDashboardPage: React.FC = () => (
 <div>
    <Header />
    <ClientDashboard userType="client" />
    <Footer />
  </div>
);

export default ClientDashboardPage;