import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { User, FileText, Quote, Award, MapPin, CheckCircle, Flame } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data, language, t } = usePortfolio();
  const profile = data.profile;

  const shortBio = profile.shortBio[language] || profile.shortBio.en;
  const longBio = profile.longBio[language] || profile.longBio.en;
  const philosophy = profile.philosophy[language] || profile.philosophy.en;
  const location = profile.location[language] || profile.location.en;

  const skills = (data.skills || [])
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
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
            <User className="w-3.5 h-3.5" />
            {t('about.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
            {t('about.title')}
          </h2>
        </div>

        {/* 2-Column Grid: Photo & Bio + Philosophy & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Photo Card & Quick Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--card-shadow)] group">
              <img
                src={profile.photoUrl}
                alt={profile.name[language] || profile.name.en}
                className="w-full aspect-[4/5] object-cover filter saturate-105 group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Tag overlay */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10 text-start">
                <div
                  className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border w-fit"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)',
                  }}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center justify-between text-[var(--foreground)]">
                  <div>
                    <h4 className="text-xl font-bold font-syne text-[var(--foreground)]">
                      {profile.name[language] || profile.name.en}
                    </h4>
                    <p className="text-xs text-[var(--muted)] font-mono">
                      {profile.yearsExperience}+ {t('about.yearsExp')}
                    </p>
                  </div>
                  {profile.cvUrl && (
                    <a
                      href={profile.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors shadow-md"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      CV
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Editorial Philosophy Callout */}
            <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-[var(--card-shadow)] space-y-3 text-start">
              <div
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold"
                style={{ color: 'var(--color-accent)' }}
              >
                <Quote className="w-4 h-4" />
                {t('about.philosophy')}
              </div>
              <p className="text-sm text-[var(--foreground)] italic leading-relaxed">
                "{philosophy}"
              </p>
            </div>
          </div>

          {/* Right Column: In-depth Biography and Dynamic Skills */}
          <div className="lg:col-span-7 space-y-8 text-start">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[var(--foreground)] font-syne">
                {shortBio}
              </h3>
              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                {longBio}
              </p>
            </div>

            {/* Dynamic Skills with Retention & Level Meters */}
            <div className="space-y-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center justify-between">
                <h4
                  className="text-sm font-bold uppercase tracking-widest font-mono flex items-center gap-2"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <Flame className="w-4 h-4" />
                  {language === 'ar' ? 'مهارات السرد وما بعد الإنتاج' : 'Core Storytelling & Post-Production Skills'}
                </h4>
                <span className="text-xs font-mono text-[var(--muted)]">
                  {skills.length} {language === 'ar' ? 'مهارات' : 'Disciplines'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill) => {
                  const skillName = skill.name[language] || skill.name.en;
                  return (
                    <div
                      key={skill.id}
                      className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors space-y-2.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[var(--foreground)] truncate max-w-[180px]">
                          {skillName}
                        </span>
                        <span className="font-mono font-bold" style={{ color: 'var(--color-accent)' }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[var(--surface-muted)] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: 'var(--color-accent)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
