
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="container-blogsy">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-blogsy-charcoal mb-4 block">
              Blogsy
            </Link>
            <p className="text-blogsy-charcoal-light mb-6 max-w-md">
              A modern blogging platform where ideas find their voice. Share your stories, engage with a community of readers and writers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blogsy-charcoal">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blogsy-charcoal-light hover:text-blogsy-teal">Home</Link></li>
              <li><Link to="/blogs" className="text-blogsy-charcoal-light hover:text-blogsy-teal">Explore</Link></li>
              <li><Link to="/about" className="text-blogsy-charcoal-light hover:text-blogsy-teal">About</Link></li>
              <li><Link to="/contact" className="text-blogsy-charcoal-light hover:text-blogsy-teal">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blogsy-charcoal">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-blogsy-charcoal-light hover:text-blogsy-teal">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-blogsy-charcoal-light hover:text-blogsy-teal">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-blogsy-charcoal-light hover:text-blogsy-teal">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blogsy-charcoal-light text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Blogsy. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-blogsy-charcoal-light hover:text-blogsy-teal">Twitter</a>
            <a href="#" className="text-blogsy-charcoal-light hover:text-blogsy-teal">Instagram</a>
            <a href="#" className="text-blogsy-charcoal-light hover:text-blogsy-teal">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
