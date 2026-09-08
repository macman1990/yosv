import React from 'react';
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
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Cinematic Ambient Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[460px] rounded-full blur-[120px] opacity-30 transition-colors duration-500"
          style={{ backgroundColor: 'var(--accent-glow)' }}
        />
        <div className="absolute bottom-8 start-10 w-[360px] h-[360px] bg-[var(--surface-elevated)] rounded-full blur-[120px] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] shadow-xs">
          <span
            className="w-2 h-2 rounded-full animate-pulse shadow-xs"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--muted)] font-medium">
            {profile.availableForWork ? t('hero.badge') : 'In Post-Production'}
          </span>
        </div>

        {/* Hero Headline & Identity */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight font-syne text-[var(--foreground)] leading-[1.08]">
            {name}
          </h1>

          <div className="inline-block px-4 py-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-xs sm:text-sm font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
            {title}
          </div>

          <p className="text-lg sm:text-2xl font-medium text-[var(--foreground)]/90 max-w-3xl mx-auto leading-snug">
            {tagline}
          </p>

          <p className="text-sm sm:text-base text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            {bio}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleOpenReel}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider bg-[var(--color-accent)] hover:opacity-90 text-black shadow-sm hover:scale-102 transition-all duration-200 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider text-[var(--foreground)] bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
            {t('hero.contactMe')}
          </button>
        </div>

        {/* Social Quick Links */}
        {visibleSocialLinks.length > 0 && (
          <div className="flex items-center justify-center gap-4 pt-1 text-[var(--muted)]">
            {visibleSocialLinks.map((social) => (
              <a
                key={social.id}
                href={sanitizeExternalUrl(social.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors"
                title={social.label}
                aria-label={social.label}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        )}

        {/* Authentic Dynamic Stats Row */}
        {statsList.length > 0 && (
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {statsList.map((stat, idx) => (
              <div
                key={stat.id || idx}
                className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[var(--card-shadow)] flex flex-col items-center transition-colors duration-300"
              >
                <div className="flex items-center gap-1 mb-1 text-[var(--color-accent)]">
                  {idx === 0 ? <Award className="w-4 h-4" /> : idx === 1 ? <Cpu className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[var(--foreground)]">
                    {stat.number}{stat.suffix}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] font-medium text-center">
                  {stat.label[language] || stat.label.en}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Scroll / Explore Indicator */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => {
              if (onExploreWork) onExploreWork();
              else {
                const workEl = document.getElementById('work');
                workEl?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex flex-col items-center gap-1.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors group cursor-pointer"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">
              {t('hero.scroll')}
            </span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
