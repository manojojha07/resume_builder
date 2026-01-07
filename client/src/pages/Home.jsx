import React from 'react';
import Banner from '../components/home/Banner';
import HeroSection from '../components/home/Hero';
import Feature from '../components/home/feature';
import Testmonials from '../components/home/Testmonials';
import Action from '../components/home/Action';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div>
      <Banner />
      <HeroSection />
      <Feature />
      <Testmonials />
      <Action />
      <Footer />
    </div>
  );
};

export default Home;
