import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, GraduationCap, ExternalLink, ShieldCheck } from 'lucide-react';
import { sanitizeExternalUrl } from '../../lib/security';

export const EducationCertificationsSection: React.FC = () => {
  const { data, language, t } = usePortfolio();

  const certs = (data.certifications || []).filter((c) => c.visible);
  const education = (data.education || []).filter((e) => e.visible);

  if (certs.length === 0 && education.length === 0) return null;

  return (
    <section id="credentials" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Certifications Section */}
        {certs.length > 0 && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border"
                style={{
                  backgroundColor: 'var(--accent-muted)',
                  borderColor: 'var(--color-accent)',
                  color: 'var(--color-accent)',
                }}
              >
                <Award className="w-3.5 h-3.5" />
                {t('cert.badge')}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
                {t('cert.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certs.map((cert) => {
                const name = cert.name[language] || cert.name.en;
                const desc = cert.description[language] || cert.description.en;

                return (
                  <div
                    key={cert.id}
                    className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300 flex flex-col justify-between space-y-4 shadow-[var(--card-shadow)] text-start"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className="p-2 rounded-xl border"
                          style={{
                            backgroundColor: 'var(--accent-muted)',
                            borderColor: 'var(--color-accent)',
                            color: 'var(--color-accent)',
                          }}
                        >
                          <ShieldCheck className="w-5 h-5" />
                        </span>
                        <span className="text-[11px] font-mono text-[var(--muted-foreground)]">{cert.date}</span>
                      </div>

                      <h3 className="text-base font-bold text-[var(--foreground)] leading-snug">{name}</h3>
                      <p
                        className="text-xs font-mono font-semibold"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {cert.organization}
                      </p>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">{desc}</p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      {cert.credentialId && (
                        <span className="text-[10px] font-mono text-[var(--muted-foreground)] truncate max-w-[140px]">
                          ID: {cert.credentialId}
                        </span>
                      )}
                      {cert.credentialUrl && (
                        <a
                          href={sanitizeExternalUrl(cert.credentialUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-80"
                          style={{ color: 'var(--color-accent)' }}
                        >
                          <span>{t('cert.verify')}</span>
                          <ExternalLink className="w-3 h-3 rtl-flip" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-[var(--border)] text-start">
            <div
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-semibold"
              style={{ color: 'var(--color-accent)' }}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{language === 'ar' ? 'المؤهلات الأكاديمية' : 'Academic Foundation'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => {
                const inst = edu.institution[language] || edu.institution.en;
                const deg = edu.degree[language] || edu.degree.en;
                const field = edu.field[language] || edu.field.en;
                const desc = edu.description[language] || edu.description.en;

                return (
                  <div
                    key={edu.id}
                    className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] space-y-3 shadow-[var(--card-shadow)] text-start"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>{inst}</span>
                      <span className="text-[var(--muted-foreground)]">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground)]">{deg}</h3>
                    <p className="text-xs font-semibold text-[var(--muted)]">{field}</p>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
