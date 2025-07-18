import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/tab/HeroSection';
import ServicesSection from '../components/tab/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/layout/Footer';
import TabsControl from '../components/tab/TabsControl';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroSection />
	    <TabsControl />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default HomePage;