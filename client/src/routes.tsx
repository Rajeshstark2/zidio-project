import { Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Explore from './pages/Explore';
import StartWriting from './pages/StartWriting';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BlogDetail from './pages/BlogDetail';
import MyBlogs from './pages/MyBlogs';

const queryClient = new QueryClient();

const AppRoutes = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blogs" element={<Explore />} />
        <Route path="/write" element={<StartWriting />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppRoutes; 