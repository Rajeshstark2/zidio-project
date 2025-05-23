<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface Blog {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
}

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blog, setBlog] = useState<Blog>({
    _id: '',
    title: '',
    content: '',
    tags: [],
    imageUrl: ''
  });

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/blogs/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }

      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to load blog');
      navigate('/my-blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`http://localhost:8000/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: blog.title,
          content: blog.content,
          tags: blog.tags,
          imageUrl: blog.imageUrl
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      toast.success('Blog updated successfully');
      navigate('/my-blogs');
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
    } finally {
      setSaving(false);
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setBlog(prev => ({ ...prev, tags }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container-blogsy py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

=======
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EditBlog: React.FC = () => {
>>>>>>> 4c346d197a3c837735338faf67828bd20ebf8bea
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-blogsy py-8">
<<<<<<< HEAD
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blogsy-charcoal">Edit Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={blog.title}
                  onChange={(e) => setBlog(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={blog.content}
                  onChange={(e) => setBlog(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your blog content here..."
                  className="min-h-[300px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={blog.tags.join(', ')}
                  onChange={handleTagsChange}
                  placeholder="e.g., technology, programming, web development"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Cover Image URL</Label>
                <Input
                  id="imageUrl"
                  value={blog.imageUrl}
                  onChange={(e) => setBlog(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/my-blogs')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
=======
        <h1 className="text-3xl font-bold text-blogsy-charcoal mb-4">Edit Blog (Coming Soon)</h1>
        <p className="text-blogsy-charcoal-light">This page will allow you to edit your blog post in the future.</p>
>>>>>>> 4c346d197a3c837735338faf67828bd20ebf8bea
      </main>
      <Footer />
    </div>
  );
};

export default EditBlog; 