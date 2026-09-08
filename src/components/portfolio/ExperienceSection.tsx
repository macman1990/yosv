import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Experience } from '../../types/portfolio';
import { Briefcase, Calendar, MapPin, CheckCircle2, Trophy } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  const experiences: Experience[] = (data.experience || [])
    .filter((e) => e.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
            <Briefcase className="w-3.5 h-3.5" />
            {t('timeline.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
            {t('timeline.title')}
          </h2>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-s border-[var(--border)] ms-4 md:ms-8 space-y-10">
          {experiences.map((exp) => {
            const position = exp.position[language] || exp.position.en;
            const description = exp.description[language] || exp.description.en;

            return (
              <div key={exp.id} className="relative ps-6 md:ps-8 group">
                {/* Timeline node dot */}
                <div
                  className="absolute -start-3 top-1.5 w-6 h-6 rounded-full bg-[var(--surface)] border-2 flex items-center justify-center shadow-xs"
                  style={{ borderColor: 'var(--color-accent)' }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                </div>

                {/* Experience Card */}
                <div className="p-6 md:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300 space-y-4 shadow-[var(--card-shadow)] text-start">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--foreground)] transition-colors font-syne">
                        {position}
                      </h3>
                      <p
                        className="text-sm font-semibold font-mono"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.startDate} — {exp.currentPosition ? t('timeline.present') : exp.endDate}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[var(--muted)] leading-relaxed">{description}</p>

                  {/* Responsibilities list */}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-mono uppercase tracking-wider text-[var(--muted-foreground)] font-bold">
                        {t('timeline.responsibilities')}:
                      </p>
                      <ul className="space-y-1.5">
                        {exp.responsibilities.map((resp, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-[var(--foreground)] leading-relaxed"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                            <span>{resp[language] || resp.en}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Achievements if any */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5" />
                        {t('timeline.achievements')}:
                      </p>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((ach, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-[var(--foreground)] leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{ach[language] || ach.en}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tools used tags */}
                  {exp.tools && exp.tools.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--border-subtle)]">
                      {exp.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[var(--surface-muted)] text-[var(--muted)] border border-[var(--border-subtle)]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
