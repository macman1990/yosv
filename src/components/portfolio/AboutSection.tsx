import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { User, FileText, Quote, Award, MapPin, CheckCircle, Flame } from 'lucide-react';
import { getResponsiveImageUrl, sanitizeExternalUrl } from '../../lib/security';

export const AboutSection: React.FC = () => {
  const { data, isClientMode, language, t } = usePortfolio();
  const profile = data.profile;

  const longBio = profile.longBio[language] || profile.longBio.en;
  const philosophy = profile.philosophy[language] || profile.philosophy.en;
  const location = profile.location[language] || profile.location.en;

  const skills = (data.skills || [])
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="section-shell space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-4 reveal">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-accent)]"
          >
            <User className="w-3.5 h-3.5" />
            {t('about.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-[-0.05em]">
            {isClientMode
              ? (language === 'ar' ? 'شريك إبداعي يركز على الوضوح والإيقاع' : 'A creative partner for clarity and momentum')
              : t('about.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6 reveal reveal-delay-1">
            <div className="glass-card overflow-hidden border border-[var(--border)] group">
              <img
                src={getResponsiveImageUrl(profile.photoUrl, 480)}
                alt={profile.name[language] || profile.name.en}
                width={480}
                height={600}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-black/30 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {location}
                </div>
                <div className="flex items-end justify-between gap-3 text-white">
                  <div>
                    <h4 className="text-xl font-bold font-syne tracking-[-0.04em]">
                      {profile.name[language] || profile.name.en}
                    </h4>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/70 font-mono">
                      {profile.yearsExperience}+ {t('about.yearsExp')}
                    </p>
                  </div>
                  {profile.cvUrl && (
                    <a
                      href={sanitizeExternalUrl(profile.cvUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-black"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      CV
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="glass-card border border-[var(--border)] p-5 sm:p-6 text-start">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-accent)]">
                <Quote className="w-4 h-4" />
                {t('about.philosophy')}
              </div>
              <p className="text-sm text-[var(--foreground)] italic leading-relaxed">"{philosophy}"</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 text-start reveal reveal-delay-2">
            <div className="space-y-4">
              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                {longBio}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 border-y border-[var(--border)] py-4 sm:grid-cols-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{language === 'ar' ? 'الموقع' : 'Based in'}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{location}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{language === 'ar' ? 'الخبرة' : 'Experience'}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{profile.yearsExperience}+ {language === 'ar' ? 'سنوات' : 'years'}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{language === 'ar' ? 'طريقة العمل' : 'Working style'}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{language === 'ar' ? 'دقيق وإنساني' : 'Precise, human'}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-[var(--border)] pt-5">
              <div className="flex items-center justify-between gap-3">
                <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  <Flame className="w-4 h-4" />
                  {language === 'ar' ? 'مهارات السرد وما بعد الإنتاج' : 'Core Storytelling & Post-Production Skills'}
                </h4>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted)]">
                  {skills.length} {language === 'ar' ? 'مهارات' : 'disciplines'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill) => {
                  const skillName = skill.name[language] || skill.name.en;
                  return (
                    <div
                      key={skill.id}
                      className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--card-shadow)]"
                    >
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="max-w-[180px] truncate font-semibold text-[var(--foreground)]">
                          {skillName}
                        </span>
                        <span className="font-mono font-bold text-[var(--color-accent)]">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%`, backgroundColor: 'var(--color-accent)' }}
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
