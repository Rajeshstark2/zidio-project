import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

const MyBlogs: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please sign in to view your blogs');
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-blogsy py-12">
        <h1 className="text-3xl font-bold mb-8">My Blogs</h1>
        {/* We'll add the blog list here later */}
        <div className="text-center text-blogsy-charcoal-light">
          You haven't written any blogs yet. Start writing your first blog!
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBlogs; 