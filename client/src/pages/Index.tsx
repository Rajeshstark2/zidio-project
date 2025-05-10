
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedPosts from '@/components/FeaturedPosts';
import Features from '@/components/Features';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <FeaturedPosts />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
