import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  comments: Array<{
    _id: string;
    content: string;
    user: {
      _id: string;
      name: string;
    };
  }>;
}

const Explore: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching blogs...');
      
      const response = await fetch('http://localhost:5000/api/blogs');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch blogs');
      }
      
      const data = await response.json();
      console.log('Fetched blogs:', data);
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }
      
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(error instanceof Error ? error.message : 'Failed to load blogs');
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container-blogsy py-8">
          <div className="text-center">Loading blogs...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container-blogsy py-8">
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
            <Button onClick={fetchBlogs} className="mt-4">
              Try Again
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-blogsy py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blogsy-charcoal">Explore Blogs</h1>
          <Input
            type="search"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center text-blogsy-charcoal-light py-8">
            No blogs found. Be the first to write one!
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <Card key={blog._id} className="flex flex-col">
                <CardContent className="flex-grow pt-6">
                  <h2 className="text-xl font-semibold mb-2 text-blogsy-charcoal">
                    {blog.title}
                  </h2>
                  <p className="text-blogsy-charcoal-light mb-4">
                    {truncateContent(blog.content)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blogsy-teal/10 text-blogsy-teal rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-blogsy-charcoal-light">
                    By {blog.author?.name || 'Unknown'} • {formatDate(blog.createdAt)}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <Button asChild className="w-full">
                    <Link to={`/blog/${blog._id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
