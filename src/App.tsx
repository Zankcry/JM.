import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SmokeEffect } from './components/SmokeEffect';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden bg-theme-bg text-theme-text font-inter selection:bg-theme-accent/30 selection:text-theme-text">
        <SmokeEffect />
        
        {/* Background Gradients */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-7rem] h-72 w-72 -translate-x-1/2 rounded-full bg-theme-accent/10 blur-3xl transition-colors duration-300 ease-out" />
          <div className="absolute right-[-6rem] top-1/3 h-96 w-96 rounded-full bg-theme-link/10 blur-3xl transition-colors duration-300 ease-out" />
          <div className="absolute bottom-[-8rem] left-[-4rem] h-80 w-80 rounded-full bg-theme-accent-strong/10 blur-3xl transition-colors duration-300 ease-out" />
        </div>

        {/* Decorative Lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[4.9375rem] top-0 z-50 hidden h-[calc(50%-6.5rem)] w-px bg-gradient-to-b from-theme-border/50 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[4.9375rem] bottom-0 z-50 hidden h-[calc(50%-6.5rem)] w-px bg-gradient-to-t from-theme-border/50 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed right-[4.9375rem] top-0 z-50 hidden h-[calc(40%-6rem)] w-px bg-gradient-to-b from-theme-border/50 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed right-[4.9375rem] bottom-0 z-50 hidden h-[calc(40%-6rem)] w-px bg-gradient-to-t from-theme-border/50 to-transparent lg:block"
        />

        <Navbar />

        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-16 pt-32 sm:px-8 lg:px-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}