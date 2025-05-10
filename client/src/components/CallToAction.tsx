
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-blogsy-teal text-white">
      <div className="container-blogsy text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start sharing your stories?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of writers who have already found their audience on Blogsy. Start writing today and let your voice be heard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-blogsy-teal hover:bg-gray-100">
            Create an account
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
