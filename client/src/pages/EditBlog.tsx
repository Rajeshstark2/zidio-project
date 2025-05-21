import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EditBlog: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-blogsy py-8">
        <h1 className="text-3xl font-bold text-blogsy-charcoal mb-4">Edit Blog (Coming Soon)</h1>
        <p className="text-blogsy-charcoal-light">This page will allow you to edit your blog post in the future.</p>
      </main>
      <Footer />
    </div>
  );
};

export default EditBlog; 