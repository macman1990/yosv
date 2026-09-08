import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CustomSection, CustomSectionBlock } from '../../types/portfolio';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

export const CustomSectionsRenderer: React.FC = () => {
  const { data, language } = usePortfolio();

  const customSections: CustomSection[] = (data.customSections || [])
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  if (customSections.length === 0) return null;

  return (
    <>
      {customSections.map((section) => {
        const title = section.title[language] || section.title.en;
        const subtitle = section.subtitle
          ? section.subtitle[language] || section.subtitle.en
          : null;
        const badge = section.badge ? section.badge[language] || section.badge.en : null;

        return (
          <section
            key={section.id}
            id={section.id}
            className="py-24 relative overflow-hidden"
            style={{ backgroundColor: section.backgroundColor || 'transparent' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                {badge && (
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border"
                    style={{
                      backgroundColor: 'var(--accent-muted)',
                      borderColor: 'var(--color-accent)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {badge}
                  </div>
                )}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed transition-colors duration-300">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Dynamic Blocks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.blocks?.map((block: CustomSectionBlock) => {
                  const blockTitle = block.title
                    ? block.title[language] || block.title.en
                    : null;
                  const blockContent = block.content
                    ? block.content[language] || block.content.en
                    : null;

                  return (
                    <div
                      key={block.id}
                      className="p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all space-y-4 shadow-[var(--card-shadow)] text-start"
                    >
                      {block.mediaUrl && (
                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black mb-2">
                          <img
                            src={block.mediaUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {blockTitle && (
                        <h3 className="text-xl font-bold text-[var(--foreground)] font-syne">
                          {blockTitle}
                        </h3>
                      )}

                      {blockContent && (
                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                          {blockContent}
                        </p>
                      )}

                      {block.link && (
                        <a
                          href={block.link}
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-bold transition-opacity hover:opacity-80 pt-2"
                          style={{ color: 'var(--color-accent)' }}
                        >
                          <span>Explore More</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl-flip" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};
