import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

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

const MyBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id && token) {
      fetchMyBlogs();
    }
  }, [user, token]);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:8000/api/blogs/user/${user?._id}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch blogs');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setBlogs(data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      toast.error('Failed to load your blogs');
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

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  const handleDelete = async (blogId: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete blog');
      }
      toast.success('Blog deleted successfully');
      fetchMyBlogs();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container-blogsy py-8">
          <div className="text-center text-blogsy-charcoal-light py-8">
            <p>Please sign in to view your blogs.</p>
            <Button asChild className="mt-4">
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container-blogsy py-8">
          <div className="text-center">Loading your blogs...</div>
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
          <h1 className="text-3xl md:text-4xl font-bold text-blogsy-charcoal">My Blogs</h1>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/write">Write New Blog</Link>
            </Button>
            <Button variant="outline" onClick={fetchMyBlogs} disabled={loading}>
              Refresh
            </Button>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center text-blogsy-charcoal-light py-8">
            <p>You haven't written any blogs yet.</p>
            <Button asChild className="mt-4">
              <Link to="/write">Start Writing</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
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
                    Published on {formatDate(blog.createdAt)}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t flex gap-2">
                  <Button asChild className="w-full">
                    <Link to={`/blogs/${blog._id}`}>View Blog</Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate(`/edit/${blog._id}`)}>
                    Edit
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={() => handleDelete(blog._id)}>
                    Delete
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

export default MyBlogs; 