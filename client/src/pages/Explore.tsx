
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Link } from 'react-router-dom';
import { Book, MessageSquare } from 'lucide-react';

// Temporary data until we connect to the backend
const DUMMY_ARTICLES = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to set up a new project with React and TypeScript to build type-safe applications.',
    author: 'Jane Smith',
    date: '2024-01-15',
    readTime: 5,
    tags: ['React', 'TypeScript', 'Web Development'],
    commentCount: 8,
  },
  {
    id: '2',
    title: 'Mastering Tailwind CSS: From Beginner to Pro',
    excerpt: 'Discover the power of utility-first CSS with Tailwind and build beautiful interfaces faster than ever.',
    author: 'Mark Johnson',
    date: '2024-01-12',
    readTime: 7,
    tags: ['CSS', 'Tailwind', 'Web Design'],
    commentCount: 12,
  },
  {
    id: '3',
    title: 'The Future of JavaScript: What to Expect in 2025',
    excerpt: 'Explore the upcoming features and advancements that will shape the JavaScript ecosystem in 2025.',
    author: 'Alex Chen',
    date: '2024-01-10',
    readTime: 10,
    tags: ['JavaScript', 'Web Development', 'Programming'],
    commentCount: 15,
  },
  {
    id: '4',
    title: 'Building a RESTful API with Node.js and Express',
    excerpt: 'Learn how to design and implement a robust REST API using Node.js and Express framework.',
    author: 'Sarah Williams',
    date: '2024-01-08',
    readTime: 8,
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    commentCount: 6,
  },
];

const Explore: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-blogsy py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blogsy-charcoal">Explore Articles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_ARTICLES.map((article) => (
            <Card key={article.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="bg-blogsy-teal/10 text-blogsy-teal text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <CardTitle className="text-xl hover:text-blogsy-teal transition-colors">
                    <Link to={`/blog/${article.id}`}>{article.title}</Link>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-2 flex-grow">
                <p className="text-blogsy-charcoal-light">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="pt-4 flex flex-col items-start gap-2 text-sm text-blogsy-charcoal-light">
                <div className="flex justify-between w-full">
                  <span>By {article.author}</span>
                  <span>{article.date}</span>
                </div>
                <div className="flex justify-between w-full">
                  <span className="flex items-center gap-1">
                    <Book size={16} />
                    {article.readTime} min read
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={16} />
                    {article.commentCount} comments
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
