import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Service } from '../../types/portfolio';
import {
  Film,
  Smartphone,
  Feather,
  Palette,
  Sparkles,
  Headphones,
  Zap,
  ArrowRight,
  Layers,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Film: <Film className="w-5 h-5 text-[var(--color-accent)]" />,
  Smartphone: <Smartphone className="w-5 h-5 text-cyan-400" />,
  Feather: <Feather className="w-5 h-5 text-amber-400" />,
  Palette: <Palette className="w-5 h-5 text-purple-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-pink-400" />,
  Headphones: <Headphones className="w-5 h-5 text-[var(--color-accent)]" />,
  Zap: <Zap className="w-5 h-5 text-amber-300" />,
};

export const ServicesSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  const services: Service[] = (data.services || [])
    .filter((s) => s.visible && s.status !== 'draft')
    .sort((a, b) => a.order - b.order);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border"
            style={{
              backgroundColor: 'var(--accent-muted)',
              borderColor: 'var(--color-accent)',
              color: 'var(--color-accent)',
            }}
          >
            <Layers className="w-3.5 h-3.5" />
            {t('services.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
            {t('services.title')}
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed transition-colors duration-300">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const title = service.title[language] || service.title.en;
            const description = service.description[language] || service.description.en;
            const ctaText = service.ctaText
              ? service.ctaText[language] || service.ctaText.en
              : t('services.inquire');

            return (
              <div
                key={service.id}
                className="group relative p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-[var(--card-shadow)] hover:-translate-y-1 text-start"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                    {ICON_MAP[service.icon] || <Film className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />}
                  </div>

                  <h3 className="text-xl font-bold text-[var(--foreground)] transition-colors font-syne">
                    {title}
                  </h3>

                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)]">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border-subtle)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    <span>{ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
