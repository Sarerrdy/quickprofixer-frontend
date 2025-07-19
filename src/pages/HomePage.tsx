import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/tab/HeroSection';
import ServicesSection from '../components/tab/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/layout/Footer';
import TabsControl from '../components/tab/TabsControl';

const HomePage: React.FC = () => {
  const [serviceType, setServiceType] = React.useState<string>('');
  const [serviceTypeId, setServiceTypeId] = React.useState<number | null>(null);

  return (
    <div>
      <Header />
      <HeroSection />
      <TabsControl />
      <br />
      <br />
      {/* Uncomment the ServicesSection when ready to use */}
      {/* <ServicesSection
        serviceType={serviceType}
        setServiceType={setServiceType}
        setServiceTypeId={setServiceTypeId} // if needed
      /> */}
      {/* <TestimonialsSection /> */}
      <Footer />
    </div>
  );
};

export default HomePage;