import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-blogsy-teal" : "text-blogsy-charcoal";
  };

  return (
    <header className="py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="container-blogsy flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-blogsy-charcoal hover:text-blogsy-charcoal">
            Blogsy
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-blogsy-charcoal"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`hover:text-blogsy-teal ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/blogs" className={`hover:text-blogsy-teal ${isActive('/blogs')}`}>
            Explore
          </Link>
          <Link to="/write" className={`hover:text-blogsy-teal ${isActive('/write')}`}>
            Start Writing
          </Link>
          <Link to="/my-blogs" className={`hover:text-blogsy-teal ${isActive('/my-blogs')}`}>
            My Blogs
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-blogsy-charcoal">Welcome, {user?.name}</span>
              <Button variant="outline" className="border-blogsy-teal text-blogsy-teal hover:bg-blogsy-teal hover:text-white" onClick={logout}>
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" className="border-blogsy-teal text-blogsy-teal hover:bg-blogsy-teal hover:text-white" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button className="bg-blogsy-teal hover:bg-blogsy-teal-light text-white" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden animate-fade-in">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" className={`hover:text-blogsy-teal py-2 ${isActive('/')}`} onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/blogs" className={`hover:text-blogsy-teal py-2 ${isActive('/blogs')}`} onClick={toggleMenu}>
                Explore
              </Link>
              <Link to="/write" className={`hover:text-blogsy-teal py-2 ${isActive('/write')}`} onClick={toggleMenu}>
                Start Writing
              </Link>
              <Link to="/my-blogs" className={`hover:text-blogsy-teal py-2 ${isActive('/my-blogs')}`} onClick={toggleMenu}>
                My Blogs
              </Link>
              <hr className="my-2" />
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <div className="text-blogsy-charcoal py-2">Welcome, {user?.name}</div>
                  <Button variant="outline" className="w-full border-blogsy-teal text-blogsy-teal hover:bg-blogsy-teal hover:text-white" onClick={() => { logout(); toggleMenu(); }}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="w-full border-blogsy-teal text-blogsy-teal hover:bg-blogsy-teal hover:text-white" asChild>
                    <Link to="/signin" onClick={toggleMenu}>Sign In</Link>
                  </Button>
                  <Button className="w-full bg-blogsy-teal hover:bg-blogsy-teal-light text-white" asChild>
                    <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
