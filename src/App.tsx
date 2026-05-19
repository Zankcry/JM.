import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { SmokeEffect } from './components/SmokeEffect';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';
import AboutPage from './pages/AboutPage';
import PicsPage from './pages/PicsPage';
import { Footer } from './components/Footer';
import { TerminalProvider } from './context/TerminalContext';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
      }}
    >
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex flex-col flex-1"
      >
        <div className="mx-auto flex flex-1 w-full max-w-6xl flex-col px-5 pb-16 pt-32 sm:px-8 lg:px-12">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/pics" element={<PicsPage />} />
          </Routes>
        </div>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <TerminalProvider>
      <Router>
        <div className="relative min-h-screen overflow-hidden bg-theme-bg text-theme-text font-inter selection:bg-theme-accent/30 selection:text-theme-text flex flex-col">
          <SmokeEffect />

          {/* Background Gradients */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-[-7rem] h-72 w-72 -translate-x-1/2 rounded-full bg-theme-accent/10 blur-3xl transition-colors duration-300 ease-out" />
            <div className="absolute right-[-6rem] top-1/3 h-96 w-96 rounded-full bg-theme-link/10 blur-3xl transition-colors duration-300 ease-out" />
            <div className="absolute bottom-[-8rem] left-[-4rem] h-80 w-80 rounded-full bg-theme-accent-strong/10 blur-3xl transition-colors duration-300 ease-out" />
          </div>

          <Navbar />

          <AnimatedRoutes />
        </div>
      </Router>
    </TerminalProvider>
  );
}
