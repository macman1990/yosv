import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ThemeToggle } from '../common/ThemeToggle';
import { Menu, X, Play, Shield, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { data, language, t, setShowAdminLogin } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = (data.navItems || []).filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const name = data.profile.name[language] || data.profile.name.en;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 glass-panel'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-[var(--foreground)] transition-opacity hover:opacity-90"
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] p-[1px] shadow-xs">
            <div className="w-full h-full bg-[var(--surface)] rounded-[7px] flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-[var(--color-accent)] fill-[var(--color-accent)] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-[var(--foreground)] font-syne flex items-center gap-1">
              {name.split(' ')[0]}
              <span className="text-[var(--color-accent)]">.</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--muted)]">
              Creative Studio
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full glass-panel rounded-full">
          {navItems.map((item) => {
            const label = item.label[language] || item.label.en;
            return (
              <a
                key={item.id}
                href={item.target}
                className="px-4 py-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] rounded-full transition-all hover:bg-[var(--surface)]"
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* Controls: Language, Theme, Contact CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-accent)] hover:opacity-90 text-black transition-all shadow-xs hover:scale-102"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t('hero.contactMe')}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <LanguageSwitcher compact />
          <ThemeToggle compact />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[var(--surface-muted)] text-[var(--foreground)] hover:bg-[var(--surface-elevated)] border border-[var(--border)]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-[var(--surface)]/98 backdrop-blur-2xl border-b border-[var(--border)] p-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const label = item.label[language] || item.label.en;
              return (
                <a
                  key={item.id}
                  href={item.target}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors"
                >
                  {label}
                </a>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--color-accent)] text-black shadow-md font-bold"
            >
              {t('hero.contactMe')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
