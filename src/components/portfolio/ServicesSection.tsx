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
      <div className="section-shell space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 reveal">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-accent)]"
          >
            <Layers className="w-3.5 h-3.5" />
            {t('services.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-[-0.05em]">
            {t('services.title')}
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const title = service.title[language] || service.title.en;
            const description = service.description[language] || service.description.en;
            const ctaText = service.ctaText ? service.ctaText[language] || service.ctaText.en : t('services.inquire');

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between space-y-6 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7 shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--border-hover)] reveal"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] transition-transform duration-300 group-hover:scale-105">
                      {ICON_MAP[service.icon] || <Film className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--muted)]">
                      0{service.order}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[var(--foreground)] font-syne leading-tight">
                      {title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-[var(--border-subtle)] pt-4">
                  <div className="flex flex-wrap gap-2">
                    {service.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-opacity hover:opacity-80"
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
