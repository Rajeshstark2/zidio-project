import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Bookmark, Share } from 'lucide-react';
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

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:8000/api/blogs/${slug}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError(error instanceof Error ? error.message : 'Failed to load blog');
      toast.error('Failed to load blog');
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container-blogsy py-12">
          <div className="text-center">Loading blog...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container-blogsy py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blogsy-charcoal">Article not found</h1>
            <p className="mt-4 text-blogsy-charcoal-light">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/blogs">Browse Articles</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBookmark = () => {
    toast.success("Article bookmarked successfully!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Article header */}
        <div className="bg-white border-b">
          <div className="container-blogsy py-6">
            <div className="mb-6">
              <Button variant="ghost" className="mb-4" asChild>
                <Link to="/blogs" className="flex items-center text-blogsy-charcoal hover:text-blogsy-teal">
                  <ArrowLeft size={16} className="mr-1" />
                  Back to articles
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold text-blogsy-charcoal mb-4">{blog.title}</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="/placeholder.svg" alt={blog.author.name} />
                    <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-blogsy-charcoal">{blog.author.name}</p>
                    <p className="text-sm text-blogsy-charcoal-light">
                      {formatDate(blog.createdAt)} · {calculateReadTime(blog.content)}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleBookmark}>
                    <Bookmark size={16} className="mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share size={16} className="mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article cover image */}
        <div className="w-full h-64 md:h-96 bg-gray-100 overflow-hidden">
          <img 
            src={blog.imageUrl || '/placeholder.svg'} 
            alt={blog.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        
        {/* Article content */}
        <div className="container-blogsy py-8">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none prose-headings:text-blogsy-charcoal prose-a:text-blogsy-teal hover:prose-a:text-blogsy-teal-light">
                {blog.content}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
