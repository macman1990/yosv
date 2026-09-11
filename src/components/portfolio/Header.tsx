import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ThemeToggle } from '../common/ThemeToggle';
import { Menu, X, Play, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { data, language, t } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#work');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = (data.navItems || []).filter((i) => i.visible).sort((a, b) => a.order - b.order);
  const name = data.profile.name[language] || data.profile.name.en;
  const showStartProject = data.siteFeatures?.startProject === true && data.siteFeatures?.projectInquiry === true;

  useEffect(() => {
    const targets = navItems
      .map((item) => item.target)
      .filter((target): target is string => Boolean(target && target.startsWith('#')));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-15% 0px -55% 0px',
      }
    );

    targets.forEach((target) => {
      const el = document.querySelector(target) as HTMLElement | null;
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <header id="main-header" className="fixed inset-x-0 top-0 z-50 transition-all duration-500">
      <div className="section-shell">
        <div
          className={`nav-shell ${scrolled ? 'nav-shell-scrolled' : ''}`}
          style={{
            transform: mobileMenuOpen ? 'translateY(0)' : undefined,
          }}
        >
          <a
            href="#"
            className="group flex items-center gap-2.5 text-[var(--foreground)] transition-opacity hover:opacity-90"
          >
            <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] p-[1px] shadow-[0_8px_24px_rgba(63,124,255,0.22)]">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[var(--surface)]">
                <Play className="h-3.5 w-3.5 fill-[var(--color-accent)] text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="flex items-center gap-1 font-syne text-base font-extrabold tracking-[-0.08em] text-[var(--foreground)]">
                {name.split(' ')[0]}
                <span className="text-[var(--color-accent)]">.</span>
              </span>
              <span className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--muted)]">
                Studio
              </span>
            </div>
          </a>

          <nav className="hidden items-center justify-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface-muted)]/75 p-1 lg:flex">
            {navItems.map((item) => {
              const label = item.label[language] || item.label.en;
              const isActive = activeSection === item.target;

              return (
                <a
                  key={item.id}
                  href={item.target}
                  aria-current={isActive ? 'page' : undefined}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 sm:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            {showStartProject && <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-black shadow-[0_16px_40px_rgba(63,124,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(63,124,255,0.34)]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {t('hero.contactMe')}
            </a>}
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <LanguageSwitcher compact />
            <ThemeToggle compact />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] transition-all duration-300 hover:bg-[var(--surface-elevated)]"
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="section-shell sm:hidden">
        <div className={`mobile-panel ${mobileMenuOpen ? 'mobile-panel-open' : ''}`}>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const label = item.label[language] || item.label.en;
              const isActive = activeSection === item.target;

              return (
                <a
                  key={item.id}
                  href={item.target}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[var(--surface-muted)] text-[var(--foreground)]'
                      : 'text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-[var(--border)] pt-4">
            {showStartProject && <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full rounded-2xl bg-[var(--color-accent)] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-black"
            >
              {t('hero.contactMe')}
            </a>}
          </div>
        </div>
      </div>
    </header>
  );
};
