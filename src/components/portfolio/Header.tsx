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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="section-shell">
        <div
          className={`glass-nav flex items-center justify-between rounded-full px-3 sm:px-4 transition-all duration-500 ${
            scrolled ? 'h-16 opacity-100' : 'h-20 opacity-95'
          }`}
        >
          <a
            href="#"
            className="group flex items-center gap-2.5 text-[var(--foreground)] transition-opacity hover:opacity-90"
          >
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] p-[1px] shadow-sm">
              <div className="w-full h-full bg-[var(--surface)] rounded-[11px] flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-[var(--color-accent)] fill-[var(--color-accent)] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-base tracking-[-0.08em] text-[var(--foreground)] font-syne flex items-center gap-1">
                {name.split(' ')[0]}
                <span className="text-[var(--color-accent)]">.</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-[0.22em] text-[var(--muted)] mt-0.5">
                Studio
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center justify-center gap-1 p-1 rounded-full bg-[var(--surface-muted)]/80 border border-[var(--border-subtle)]">
            {navItems.map((item) => {
              const label = item.label[language] || item.label.en;
              return (
                <a
                  key={item.id}
                  href={item.target}
                  className="px-4 py-2 text-[11px] font-medium text-[var(--muted)] hover:text-[var(--foreground)] rounded-full transition-all duration-300 hover:bg-[var(--surface)]"
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-2.5">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="#contact"
              className="glass-button inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] bg-[var(--color-accent)] text-black shadow-sm hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t('hero.contactMe')}
            </a>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitcher compact />
            <ThemeToggle compact />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-[var(--surface-muted)] text-[var(--foreground)] hover:bg-[var(--surface-elevated)] border border-[var(--border)]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="section-shell sm:hidden mt-2">
          <div className="glass-panel rounded-3xl p-4 border border-[var(--border)] shadow-[var(--card-shadow)]">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const label = item.label[language] || item.label.en;
                return (
                  <a
                    key={item.id}
                    href={item.target}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-2xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors"
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
            <div className="pt-3 mt-3 border-t border-[var(--border)]">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.16em] bg-[var(--color-accent)] text-black"
              >
                {t('hero.contactMe')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
