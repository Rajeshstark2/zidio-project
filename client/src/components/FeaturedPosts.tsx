
import React from 'react';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample blog data
const featuredBlogs = [
  {
    id: '1',
    title: 'How to Become a Better Writer in 30 Days',
    excerpt: 'Discover the daily habits and practices that will dramatically improve your writing skills and help you find your unique voice.',
    coverImage: '/placeholder.svg',
    author: {
      name: 'Emma Roberts',
      avatar: '/placeholder.svg',
    },
    date: 'May 5, 2025',
    readTime: '8 min read',
    slug: 'how-to-become-better-writer',
  },
  {
    id: '2',
    title: 'The Future of Content Creation with AI Tools',
    excerpt: 'Explore how artificial intelligence is transforming the landscape of content creation and what it means for writers and creators.',
    coverImage: '/placeholder.svg',
    author: {
      name: 'Michael Chen',
      avatar: '/placeholder.svg',
    },
    date: 'May 3, 2025',
    readTime: '6 min read',
    slug: 'future-content-creation-ai',
  },
  {
    id: '3',
    title: 'Why Deep Work Matters More Than Ever',
    excerpt: 'In a world full of distractions, the ability to focus deeply is becoming a rare and valuable skill. Learn how to master it.',
    coverImage: '/placeholder.svg',
    author: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
    },
    date: 'April 29, 2025',
    readTime: '10 min read',
    slug: 'deep-work-matters',
  },
];

const FeaturedPosts: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-blogsy">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <h2 className="text-blogsy-charcoal mb-4 md:mb-0">Featured Articles</h2>
          <Link to="/blogs" className="text-blogsy-teal hover:text-blogsy-teal-light font-medium">
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              coverImage={blog.coverImage}
              author={blog.author}
              date={blog.date}
              readTime={blog.readTime}
              slug={blog.slug}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-white text-blogsy-teal border border-blogsy-teal hover:bg-blogsy-teal hover:text-white">
            Load more articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
