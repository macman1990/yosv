import React, { Suspense, useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CustomCursor } from './components/common/CustomCursor';
import { ToastContainer } from './components/common/ToastContainer';
import { VideoPlayerModal } from './components/common/VideoPlayerModal';
import { CaseStudyModal } from './components/common/CaseStudyModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Header } from './components/portfolio/Header';
import { Footer } from './components/portfolio/Footer';
import { SplashScreen } from './components/common/SplashScreen';
import { BackgroundSystem } from './components/common/BackgroundSystem';
import { getSectionDefinition, getClientSectionOrder, isSectionEnabled, normalizeSectionOrder, SectionRenderBoundary } from './lib/sectionRegistry';

const LazyAdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));
const LazyBlogHubPage = React.lazy(() => import('./components/portfolio/BlogHubPage').then((module) => ({ default: module.BlogHubPage })));

const PortfolioApp: React.FC = () => {
  const { data, isAdminMode, isClientMode, language, showAdminLogin, setShowAdminLogin } = usePortfolio();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const mobileOrTouch = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const timeout = window.setTimeout(() => setShowSplash(false), mobileOrTouch ? 600 : 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  // Synchronize route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut for studio admin login (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setShowAdminLogin(!showAdminLogin);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAdminLogin, setShowAdminLogin]);

  // If path starts with /blog, render the standalone Content Hub & Publication view
  if (currentPath.startsWith('/blog')) {
    const slug = currentPath.replace('/blog/', '').replace('/blog', '').trim() || undefined;
    return (
      <div
        className="min-h-screen transition-colors duration-300 bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-accent)]/30 selection:text-[var(--foreground)]"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <BackgroundSystem />
        <CustomCursor />
        <ToastContainer />
        <AdminLoginModal />
        <Suspense fallback={null}>
          <LazyBlogHubPage
            initialSlug={slug}
            onNavigateHome={() => {
              window.history.pushState({}, '', '/');
              setCurrentPath('/');
            }}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-accent)]/30 selection:text-[var(--foreground)]"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <BackgroundSystem />
      <SplashScreen visible={showSplash} />
      <CustomCursor />
      <ToastContainer />
      <VideoPlayerModal />
      <CaseStudyModal />
      <AdminLoginModal />

      {isAdminMode ? (
        <Suspense fallback={null}>
          <LazyAdminDashboard />
        </Suspense>
      ) : (
        <div className="relative flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow pt-16 sm:pt-20">
            {(isClientMode ? getClientSectionOrder(data.sectionOrder) : normalizeSectionOrder(data.sectionOrder)).map((item) => {
              const section = getSectionDefinition(item.id);
              if (!section || item.visible === false || !isSectionEnabled(data, section)) return null;
              return (
                React.createElement(SectionRenderBoundary, { key: section.id, children: section.render() })
              );
            })}
          </main>
          
          <Footer />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <AdminAuthProvider>
        <PortfolioApp />
      </AdminAuthProvider>
    </PortfolioProvider>
  );
}
