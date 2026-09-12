import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { getResponsiveImageUrl, sanitizeExternalUrl } from '../../lib/security';
import { ContentItem } from '../../types/portfolio';
import { Video, Youtube, Eye, ExternalLink, BookOpen, Sparkles, Film } from 'lucide-react';

export const ContentCreationSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  const contentItems: ContentItem[] = (data.contentItems || [])
    .filter((item) => item.visible && item.status !== 'draft')
    .sort((a, b) => a.order - b.order);

  if (contentItems.length === 0) return null;

  return (
    <section id="content" className="py-24 relative overflow-hidden">
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
            <Video className="w-3.5 h-3.5" />
            {t('content.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
            {t('content.title')}
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed transition-colors duration-300">
            {t('content.subtitle')}
          </p>
        </div>

        {/* Content Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {contentItems.map((item) => {
            const title = item.title[language] || item.title.en;
            const description = item.description[language] || item.description.en;

            return (
              <div
                key={item.id}
                className="group relative rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[var(--card-shadow)] text-start"
              >
                {/* Media banner if present */}
                {item.thumbnail && (
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src={getResponsiveImageUrl(item.thumbnail, 640)}
                      alt={title}
                      loading="lazy"
                      width={640}
                      height={360}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 start-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-bold bg-black/75 backdrop-blur-md text-[var(--foreground)] border border-white/20">
                      {item.type}
                    </div>
                    {item.views && (
                      <div className="absolute bottom-3 end-3 flex items-center gap-1 text-[11px] font-mono text-[var(--foreground)] bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                        <Eye className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                        <span>{item.views}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-[var(--muted-foreground)] uppercase tracking-wider">
                      {item.date}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--foreground)] transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span
                      className="text-xs font-mono uppercase flex items-center gap-1.5 font-semibold"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.platform}
                    </span>
                    {item.mediaUrl && (
                      <a
                        href={sanitizeExternalUrl(item.mediaUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                      >
                        <span>{t('content.readWatch')}</span>
                        <ExternalLink className="w-3.5 h-3.5 rtl-flip" />
                      </a>
                    )}
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
