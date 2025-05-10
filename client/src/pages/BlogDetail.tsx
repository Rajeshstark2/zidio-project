
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MessageSquare, Bookmark, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Temporary data until we connect to the backend
const DUMMY_ARTICLES = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    content: `
      <p>React and TypeScript make a powerful combination for building robust web applications. This guide will help you set up your first React and TypeScript project.</p>
      
      <h2>Why Use TypeScript with React?</h2>
      <p>TypeScript adds static type checking to JavaScript, which helps catch errors early in the development process. When combined with React, it provides type safety for props, state, and other aspects of your components.</p>
      
      <h2>Setting Up Your Project</h2>
      <p>The easiest way to start a new React project with TypeScript is to use Create React App with the TypeScript template:</p>
      
      <pre><code>npx create-react-app my-app --template typescript</code></pre>
      
      <p>This command creates a new React application with TypeScript already configured. You'll notice that your component files have a .tsx extension instead of .jsx, and you'll also have some initial TypeScript configuration in the tsconfig.json file.</p>
      
      <h2>Creating Your First Component</h2>
      <p>Let's create a simple component to see how TypeScript works with React:</p>
      
      <pre><code>
      import React, { useState } from 'react';
      
      interface GreetingProps {
        name: string;
        enthusiasmLevel?: number;
      }
      
      const Greeting: React.FC<GreetingProps> = ({ name, enthusiasmLevel = 1 }) => {
        const [currentEnthusiasm, setCurrentEnthusiasm] = useState(enthusiasmLevel);
        
        const getExclamationMarks = (numChars: number) => Array(numChars + 1).join('!');
        
        return (
          <div>
            <div>
              Hello {name}{getExclamationMarks(currentEnthusiasm)}
            </div>
            <button onClick={() => setCurrentEnthusiasm(currentEnthusiasm + 1)}>
              Increase enthusiasm
            </button>
            <button onClick={() => setCurrentEnthusiasm(Math.max(0, currentEnthusiasm - 1))}>
              Decrease enthusiasm
            </button>
          </div>
        );
      };
      
      export default Greeting;
      </code></pre>
      
      <p>In this example, we've defined an interface called GreetingProps that specifies the types of props our component expects to receive. The enthusiasmLevel prop is marked as optional with the ? symbol, and we provide a default value of 1 in the function parameters.</p>
      
      <h2>Conclusion</h2>
      <p>TypeScript adds valuable type safety to your React applications, making them more robust and easier to maintain. As your application grows, you'll appreciate the additional confidence that comes from knowing your types are correct.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    author: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: 'January 15, 2024',
    readTime: '5 min read',
  }
];

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // In a real app, we'd fetch the blog post based on the slug
  // For now, we'll just get the first dummy article
  const article = DUMMY_ARTICLES.find(article => article.id === slug);
  
  if (!article) {
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
              <h1 className="text-3xl md:text-4xl font-bold text-blogsy-charcoal mb-4">{article.title}</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-blogsy-charcoal">{article.author.name}</p>
                    <p className="text-sm text-blogsy-charcoal-light">
                      {article.date} · {article.readTime}
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
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Article content */}
        <div className="container-blogsy py-8">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-blogsy-charcoal prose-a:text-blogsy-teal hover:prose-a:text-blogsy-teal-light" 
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
