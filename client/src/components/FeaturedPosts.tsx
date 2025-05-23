import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  tags: string[];
  createdAt: string;
  imageUrl?: string;
}

const FeaturedPosts: React.FC = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch('http://localhost:8000/api/blogs');
=======
      const response = await fetch('http://localhost:5000/api/blogs');
>>>>>>> 4c346d197a3c837735338faf67828bd20ebf8bea
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      console.log('Fetched blogs:', data); // Debug log
      // Get the 3 most recent blogs
      setFeaturedBlogs(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
      toast.error('Failed to load featured blogs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-blogsy">
          <div className="text-center">Loading featured articles...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-blogsy">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <h2 className="text-blogsy-charcoal mb-4 md:mb-0">Featured Articles</h2>
          <Link to="/blogs" className="text-blogsy-teal hover:text-blogsy-teal-light font-medium">
            View all articles →
          </Link>
        </div>

        {featuredBlogs.length === 0 ? (
          <div className="text-center text-blogsy-charcoal-light py-8">
            No articles yet. Be the first to write one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                title={blog.title}
                excerpt={blog.content}
                coverImage={blog.imageUrl || '/placeholder.svg'}
                author={{
                  name: blog.author?.name || 'Unknown',
                  avatar: '/placeholder.svg'
                }}
                date={formatDate(blog.createdAt)}
                readTime={calculateReadTime(blog.content)}
                slug={blog._id}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button 
            className="bg-white text-blogsy-teal border border-blogsy-teal hover:bg-blogsy-teal hover:text-white"
            asChild
          >
            <Link to="/blogs">View all articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
