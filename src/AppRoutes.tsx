import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/Home').then(m => ({ default: m.Home })));
const Blog = lazy(() => import('./pages/Blog/Blog').then(m => ({ default: m.Blog })));
const BlogPostPage = lazy(() => import('./pages/BlogPost/BlogPost').then(m => ({ default: m.BlogPostPage })));
const Portfolio = lazy(() => import('./pages/Portfolio/Portfolio').then(m => ({ default: m.Portfolio })));
const Contact = lazy(() => import('./pages/Contact/Contact').then(m => ({ default: m.Contact })));
const TiktokLinks = lazy(() => import('./pages/TiktokLinks/TiktokLinks').then(m => ({ default: m.TiktokLinks })));
const ExtraLinks = lazy(() => import('./pages/ExtraLinks/ExtraLinks').then(m => ({ default: m.ExtraLinks })));
const Projects = lazy(() => import('./pages/Projects/Projects').then(m => ({ default: m.Projects })));
const NotFound = lazy(() => import('./pages/NotFound/NotFound').then(m => ({ default: m.NotFound })));

const LoadingFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: '#b1b4b8' }}>
    Loading...
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<TiktokLinks />} />
        <Route path="/extra-links" element={<ExtraLinks />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
