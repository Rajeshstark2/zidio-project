import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  coverImage,
  author,
  date,
  readTime,
  slug,
}) => {
  return (
    <article className="card-blogsy overflow-hidden flex flex-col h-full">
      <Link to={`/blog/${slug}`} className="block overflow-hidden rounded-lg mb-4">
        <img
          src={coverImage || '/placeholder.svg'}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            console.error('Image failed to load:', coverImage);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </Link>
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          <Link to={`/blog/${slug}`} className="text-blogsy-charcoal hover:text-blogsy-teal">
            {title}
          </Link>
        </h3>
        <p className="text-blogsy-charcoal-light mb-4 line-clamp-3">{excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm text-blogsy-charcoal-light">{author.name}</span>
          </div>
          <div className="text-xs text-blogsy-charcoal-light">
            <span>{date}</span>
            <span className="mx-1">•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
