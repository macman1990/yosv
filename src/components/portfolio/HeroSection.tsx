import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { sanitizeExternalUrl } from '../../lib/security';
import {
  Play,
  Sparkles,
  ArrowDown,
  Award,
  Cpu,
  TrendingUp,
  Linkedin,
  Mail,
  Youtube,
  Video,
  Instagram,
  Globe,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreWork?: () => void;
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onContactClick }) => {
  const { data, language, t, setActiveVideoProject } = usePortfolio();
  const profile = data.profile;
  const shouldReduceMotion = useReducedMotion();

  const name = profile.name[language] || profile.name.en;
  const title = profile.title[language] || profile.title.en;
  const tagline = profile.shortTagline[language] || profile.shortTagline.en;
  const bio = profile.shortBio[language] || profile.shortBio.en;

  // Grab the primary featured showreel project (or first project)
  const featuredProject =
    (data.projects || []).find((p) => p.featured && p.status === 'published') ||
    data.projects?.[0] ||
    null;

  const handleOpenReel = () => {
    if (featuredProject) {
      setActiveVideoProject(featuredProject);
    } else if (onExploreWork) {
      onExploreWork();
    } else {
      const workEl = document.getElementById('work');
      workEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'tiktok':
        return <Video className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const visibleSocialLinks = (data.socialLinks || []).filter((s) => s.visible && s.url);
  const statsList = (data.stats || []).filter((s) => s.visible).slice(0, 3);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[130px] opacity-40"
          style={{ background: 'var(--accent-glow)' }}
        />
      </div>

      <div className="section-shell relative z-10">
        <div className="glass-card reveal p-4 sm:p-6 md:p-8 lg:p-10 border border-[var(--border)] bg-[var(--surface)]/70">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 text-start"
            >
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--muted)]"
              >
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                {profile.availableForWork ? t('hero.badge') : 'In Post-Production'}
              </motion.div>

              <div className="space-y-4">
                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.55 }}
                  className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted)] font-mono"
                >
                  {title}
                </motion.p>
                <motion.h1
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.7 }}
                  className="max-w-[700px] text-4xl sm:text-6xl lg:text-[5rem] leading-[0.94] tracking-[-0.06em] font-black font-syne text-[var(--foreground)]"
                >
                  {name}
                </motion.h1>
                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.65 }}
                  className="max-w-xl text-lg sm:text-2xl text-[var(--foreground)]/90 leading-tight"
                >
                  {tagline}
                </motion.p>
                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.65 }}
                  className="max-w-xl text-sm sm:text-base text-[var(--muted)] leading-relaxed"
                >
                  {bio}
                </motion.p>
              </div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.6 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <button
                  type="button"
                  onClick={handleOpenReel}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--color-accent)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black shadow-[0_20px_35px_-18px_rgba(63,124,255,0.65)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Play className="h-4 w-4 fill-black group-hover:scale-110 transition-transform" />
                  {t('hero.viewWork')}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onContactClick) {
                      onContactClick();
                    } else {
                      const contactEl = document.getElementById('contact');
                      contactEl?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-hover)]"
                >
                  <Sparkles className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                  {t('hero.contactMe')}
                </button>
              </motion.div>

              {visibleSocialLinks.length > 0 && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.5 }}
                  className="flex items-center gap-3 pt-1 text-[var(--muted)]"
                >
                  {visibleSocialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={sanitizeExternalUrl(social.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--foreground)] hover:border-[var(--border-hover)]"
                      title={social.label}
                      aria-label={social.label}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 18, scale: 0.98 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="glass-panel overflow-hidden rounded-[32px] border border-[var(--border)] p-2.5">
                {featuredProject ? (
                  <div className="relative overflow-hidden rounded-[26px]">
                    <img
                      src={featuredProject.thumbnail}
                      alt={featuredProject.title[language] || featuredProject.title.en}
                      className="h-[360px] w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-[430px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="mb-3 flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/80">
                        <span>{featuredProject.client}</span>
                        <span>{featuredProject.date}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-semibold text-white">{featuredProject.title[language] || featuredProject.title.en}</h2>
                          <p className="text-xs text-white/70">{featuredProject.platform}</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleOpenReel}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/15 text-white backdrop-blur-md transition-transform duration-300 hover:scale-105"
                          aria-label="Play featured reel"
                        >
                          <Play className="h-4 w-4 fill-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {statsList.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {statsList.map((stat, idx) => (
                    <motion.div
                      key={stat.id || idx}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={{ delay: 0.32 + idx * 0.08, duration: 0.5 }}
                      className="glass-panel rounded-2xl p-3 text-center"
                    >
                      <div className="mb-1 flex items-center justify-center gap-1 text-[var(--color-accent)]">
                        {idx === 0 ? <Award className="w-3.5 h-3.5" /> : idx === 1 ? <Cpu className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                        <span className="font-mono text-lg font-bold text-[var(--foreground)]">
                          {stat.number}{stat.suffix}
                        </span>
                      </div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                        {stat.label[language] || stat.label.en}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="pt-8 text-center">
          <button
            type="button"
            onClick={() => {
              if (onExploreWork) onExploreWork();
              else {
                const workEl = document.getElementById('work');
                workEl?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex flex-col items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors group"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
            <ArrowDown className="h-4 w-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
