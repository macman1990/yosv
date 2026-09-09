import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CustomCursor } from './components/common/CustomCursor';
import { ToastContainer } from './components/common/ToastContainer';
import { VideoPlayerModal } from './components/common/VideoPlayerModal';
import { CaseStudyModal } from './components/common/CaseStudyModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Header } from './components/portfolio/Header';
import { BlogHubPage } from './components/portfolio/BlogHubPage';
import { Footer } from './components/portfolio/Footer';
import { SplashScreen } from './components/common/SplashScreen';

// Portfolio Sections
import { HeroSection } from './components/portfolio/HeroSection';
import { FeaturedWorkSection } from './components/portfolio/FeaturedWorkSection';
import { ServicesSection } from './components/portfolio/ServicesSection';
import { AboutSection } from './components/portfolio/AboutSection';
import { ExperienceSection } from './components/portfolio/ExperienceSection';
import { EducationCertificationsSection } from './components/portfolio/EducationCertificationsSection';
import { ToolsSection } from './components/portfolio/ToolsSection';
import { ContentCreationSection } from './components/portfolio/ContentCreationSection';
import { BlogSection } from './components/portfolio/BlogSection';
import { TestimonialsSection } from './components/portfolio/TestimonialsSection';
import { ContactSection } from './components/portfolio/ContactSection';
import { CustomSectionsRenderer } from './components/portfolio/CustomSectionsRenderer';
import { PricingSection } from './components/portfolio/PricingSection';

const PortfolioApp: React.FC = () => {
  const { data, isAdminMode, language, showAdminLogin, setShowAdminLogin } = usePortfolio();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [showSplash, setShowSplash] = useState(true);

  const showStartProject = data.siteFeatures?.startProject ?? true;
  const showPackages = data.siteFeatures?.packages ?? true;
  const showTestimonials = data.siteFeatures?.testimonials ?? true;
  const showBlog = data.siteFeatures?.blog ?? true;
  const showContentHub = data.siteFeatures?.contentHub ?? true;

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowSplash(false), 1800);
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
        <CustomCursor />
        <ToastContainer />
        <AdminLoginModal />
        <BlogHubPage
          initialSlug={slug}
          onNavigateHome={() => {
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-accent)]/30 selection:text-[var(--foreground)]"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <SplashScreen visible={showSplash} />
      <CustomCursor />
      <ToastContainer />
      <VideoPlayerModal />
      <CaseStudyModal />
      <AdminLoginModal />

      {isAdminMode ? (
        <AdminDashboard />
      ) : (
        <div className="relative flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow pt-16 sm:pt-20">
            <HeroSection />
            <FeaturedWorkSection />
            <ServicesSection />
            <AboutSection />
            <ExperienceSection />
            <EducationCertificationsSection />
            <ToolsSection />
            {showContentHub && <ContentCreationSection />}
            {showBlog && <BlogSection />}
            {showTestimonials && <TestimonialsSection />}
            <CustomSectionsRenderer />
            {showPackages && <PricingSection />}
            {showStartProject && <ContactSection />}
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
