
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const StartWriting: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here we would normally call an API to save the blog post
      // For now, we'll just simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Reset the form
      setTitle('');
      setContent('');
      setTags('');
      
      toast.success('Your post has been published successfully!');
    } catch (error) {
      toast.error('Failed to publish your post. Please try again.');
      console.error('Error publishing post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-blogsy py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blogsy-charcoal">Create a New Post</h1>
        
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title"
                  placeholder="Enter a descriptive title for your post"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px] resize-y"
                />
                <p className="text-sm text-blogsy-charcoal-light">
                  {content.split(/\s+/).filter(word => word.length > 0).length} words
                  {content.length > 0 && ` • Approximately ${Math.ceil(content.split(/\s+/).filter(word => word.length > 0).length / 200)} min read`}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input 
                  id="tags"
                  placeholder="e.g., Technology, Programming, Web Development"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default StartWriting;
