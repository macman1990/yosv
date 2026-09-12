import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Testimonial } from '../../types/portfolio';
import { MessageSquare, Star, Quote } from 'lucide-react';
import { getResponsiveImageUrl, sanitizeExternalUrl } from '../../lib/security';

export const TestimonialsSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  const testimonials: Testimonial[] = [...(data.testimonials || [])]
    .filter((t) => t.visible)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-white/[0.01]">
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
            <MessageSquare className="w-3.5 h-3.5" />
            {t('testimonials.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((test) => {
            const pos = test.position?.[language] || test.position?.en || 'Client';
            const quote = test.testimonial?.[language] || test.testimonial?.en || '';

            return (
              <div
                key={test.id}
                className="p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-[var(--card-shadow)] text-start"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: test.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-sm text-[var(--foreground)] italic leading-relaxed">
                    "{quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-3">
                  {test.photo ? (
                    <img
                      src={getResponsiveImageUrl(test.photo, 128)}
                      alt={test.clientName}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover border shrink-0"
                      style={{ borderColor: 'var(--color-accent)' }}
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)] flex items-center justify-center font-bold shrink-0">
                      {test.clientName[0]}
                    </div>
                  )}

                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-[var(--foreground)] truncate">{test.clientName}</h4>
                    <p className="text-xs text-[var(--muted)] truncate">
                      {pos} • <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>{test.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
