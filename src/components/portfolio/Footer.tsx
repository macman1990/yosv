import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Play, Lock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, language, t, setShowAdminLogin } = usePortfolio();
  const profile = data.profile;
  const name = profile.name[language] || profile.name.en;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)] pt-16 pb-12 overflow-hidden text-[var(--muted)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 text-start">
          {/* Brand Info */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg border flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--accent-muted)',
                  borderColor: 'var(--color-accent)',
                  color: 'var(--color-accent)',
                }}
              >
                <Play className="w-3.5 h-3.5" style={{ fill: 'var(--color-accent)' }} />
              </div>
              <span className="font-extrabold text-lg text-[var(--foreground)] font-syne tracking-tight">
                {name}
              </span>
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed font-light">
              {profile.shortBio[language] || profile.shortBio.en}
            </p>
          </div>

          {/* Nav quick links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a href="#work" className="hover:text-[var(--foreground)] transition-colors">
              {t('nav.work')}
            </a>
            <a href="#services" className="hover:text-[var(--foreground)] transition-colors">
              {t('nav.services')}
            </a>
            <a href="#tools" className="hover:text-[var(--foreground)] transition-colors">
              {t('nav.skills')}
            </a>
            <a href="#experience" className="hover:text-[var(--foreground)] transition-colors">
              {t('nav.experience')}
            </a>
            <a href="#blog" className="hover:text-[var(--foreground)] transition-colors">
              {t('nav.blog') || 'Blog'}
            </a>
            <a href="#contact" className="hover:text-[var(--foreground)] transition-colors">
              {t('nav.contact')}
            </a>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] transition-colors shrink-0 cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom copyright & Subtle hidden admin trigger */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[var(--muted-foreground)]">
          <p>© {new Date().getFullYear()} {name}. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <span>{t('footer.builtWith')}</span>

            {/* Subtle, almost hidden admin trigger */}
            <button
              type="button"
              onClick={() => setShowAdminLogin(true)}
              className="opacity-40 hover:opacity-100 transition-opacity p-1 rounded text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
              title="Ctrl + Shift + A"
              aria-label="Security Access"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
