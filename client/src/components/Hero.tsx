import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleStartWriting = () => {
    navigate('/write');
  };

  const handleExploreArticles = () => {
    navigate('/blogs');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-gray-50">
      <div className="container-blogsy">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-10 space-y-6 pb-10 md:pb-0">
            <h1 className="font-bold text-blogsy-charcoal leading-tight">
              Where <span className="text-blogsy-teal">ideas</span> find their voice
            </h1>
            <p className="text-lg md:text-xl text-blogsy-charcoal-light">
              Join Blogsy — the modern platform for readers and writers to discover, share, and engage with stories that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blogsy-teal hover:bg-blogsy-teal-light text-white"
                onClick={handleStartWriting}
              >
                Start writing
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blogsy-teal text-blogsy-teal hover:bg-blogsy-teal hover:text-white"
                onClick={handleExploreArticles}
              >
                Explore articles
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blogsy-teal/10 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blogsy-teal/5 rounded-full"></div>
              <img 
                src="/placeholder.svg" 
                alt="People writing and reading blogs" 
                className="w-full h-auto rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
