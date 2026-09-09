import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { Play, Lock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, language, t, setShowAdminLogin } = usePortfolio();
  const profile = data.profile;
  const name = profile.name[language] || profile.name.en;
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden pt-16 pb-12 text-[var(--muted)]">
      <div className="section-shell">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card border border-[var(--border)] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md space-y-3 text-start">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-xl border"
                  style={{ backgroundColor: 'var(--accent-muted)', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                >
                  <Play className="w-3.5 h-3.5" style={{ fill: 'var(--color-accent)' }} />
                </div>
                <span className="text-lg font-extrabold tracking-[-0.06em] text-[var(--foreground)] font-syne">
                  {name}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--muted)]">
                {profile.shortBio[language] || profile.shortBio.en}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[10px] font-mono uppercase tracking-[0.18em]">
              <a href="#work" className="hover:text-[var(--foreground)] transition-colors">{t('nav.work')}</a>
              <a href="#services" className="hover:text-[var(--foreground)] transition-colors">{t('nav.services')}</a>
              <a href="#tools" className="hover:text-[var(--foreground)] transition-colors">{t('nav.skills')}</a>
              <a href="#experience" className="hover:text-[var(--foreground)] transition-colors">{t('nav.experience')}</a>
              <a href="#blog" className="hover:text-[var(--foreground)] transition-colors">{t('nav.blog') || 'Blog'}</a>
              <a href="#contact" className="hover:text-[var(--foreground)] transition-colors">{t('nav.contact')}</a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors shrink-0"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-6 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {name}. {t('footer.rights')}</p>
            <div className="flex items-center gap-4">
              <span>{t('footer.builtWith')}</span>
              <button
                type="button"
                onClick={() => setShowAdminLogin(true)}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-1.5 opacity-60 transition-opacity hover:opacity-100"
                title="Ctrl + Shift + A"
                aria-label="Security Access"
              >
                <Lock className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
