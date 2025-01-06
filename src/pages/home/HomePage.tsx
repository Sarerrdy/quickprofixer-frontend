import React from 'react';
import Header from '../../components/layout/Header';
import HeroSection from '../../components/home/HeroSection';
import ServicesSection from '../../components/home/ServicesSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import Footer from '../../components/layout/Footer';
import TabsControl from '../../components/home/TabsControl';

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