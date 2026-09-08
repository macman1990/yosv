import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X,
  Sparkles,
  Target,
  Compass,
  Scissors,
  BookOpen,
  ArrowRight,
  Quote,
  TrendingUp,
  Play,
} from 'lucide-react';

export const CaseStudyModal: React.FC = () => {
  const { activeCaseStudyProject, setActiveCaseStudyProject, setActiveVideoProject, language, t } =
    usePortfolio();

  if (!activeCaseStudyProject || !activeCaseStudyProject.caseStudy?.enabled) return null;

  const cs = activeCaseStudyProject.caseStudy;
  const projectTitle = activeCaseStudyProject.title[language] || activeCaseStudyProject.title.en;

  const challenge = cs.challenge[language] || cs.challenge.en;
  const strategy = cs.strategy[language] || cs.strategy.en;
  const editing = cs.editingApproach[language] || cs.editingApproach.en;
  const storytelling = cs.storytellingApproach[language] || cs.storytellingApproach.en;
  const clientFeedback = cs.clientFeedback
    ? cs.clientFeedback[language] || cs.clientFeedback.en
    : null;

  return (
    <div className="fixed inset-0 z-[99990] flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col glass-panel rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-start">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)] bg-[var(--surface-muted)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span
              className="p-2 rounded-xl border"
              style={{
                backgroundColor: 'var(--accent-muted)',
                borderColor: 'var(--color-accent)',
                color: 'var(--color-accent)',
              }}
            >
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <p
                className="text-[11px] uppercase tracking-widest font-mono font-semibold"
                style={{ color: 'var(--color-accent)' }}
              >
                {t('case.title')}
              </p>
              <h2 className="text-lg md:text-xl font-bold text-[var(--foreground)] tracking-tight">
                {projectTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const current = activeCaseStudyProject;
                setActiveCaseStudyProject(null);
                setTimeout(() => setActiveVideoProject(current), 150);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[var(--color-accent)] text-black shadow-md hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              Watch Video
            </button>
            <button
              onClick={() => setActiveCaseStudyProject(null)}
              className="p-2 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] transition-colors cursor-pointer"
              title={t('case.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Key Metrics row */}
          {cs.metrics && cs.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)]">
              {cs.metrics.map((metric, i) => (
                <div key={i} className="text-center space-y-1">
                  <span
                    className="text-2xl sm:text-3xl font-black font-mono tracking-tight"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {metric.value}
                  </span>
                  <p className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                    {metric.label[language] || metric.label.en}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Challenge & Strategy 2-Col Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2.5 text-rose-500">
                <Target className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  {t('case.challenge')}
                </h3>
              </div>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{challenge}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2.5" style={{ color: 'var(--color-accent)' }}>
                <Compass className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  {t('case.strategy')}
                </h3>
              </div>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{strategy}</p>
            </div>
          </div>

          {/* Editing and Storytelling Deep-Dives */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-500">
                <Scissors className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  {t('case.editing')}
                </h3>
              </div>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{editing}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2.5 text-amber-500">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  {t('case.storytelling')}
                </h3>
              </div>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">{storytelling}</p>
            </div>
          </div>

          {/* Before & After comparison card if available */}
          {cs.beforeAfter && (
            <div className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)] font-mono flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                {t('case.beforeAfter')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl glass-panel space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--surface-muted)] text-[var(--muted)] uppercase tracking-wider border border-[var(--border)]">
                    Raw / Before
                  </span>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {cs.beforeAfter.beforeDesc[language] || cs.beforeAfter.beforeDesc.en}
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl border space-y-2"
                  style={{
                    backgroundColor: 'var(--accent-muted)',
                    borderColor: 'var(--color-accent)',
                  }}
                >
                  <span
                    className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--color-accent)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    Engineered / After
                  </span>
                  <p className="text-xs text-[var(--foreground)] leading-relaxed">
                    {cs.beforeAfter.afterDesc[language] || cs.beforeAfter.afterDesc.en}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Client Feedback Quote */}
          {clientFeedback && (
            <div
              className="p-6 rounded-2xl border flex items-start gap-4"
              style={{
                backgroundColor: 'var(--accent-muted)',
                borderColor: 'var(--color-accent)',
              }}
            >
              <Quote className="w-8 h-8 shrink-0 opacity-70" style={{ color: 'var(--color-accent)' }} />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest font-mono font-semibold" style={{ color: 'var(--color-accent)' }}>
                  {t('case.clientVoice')}
                </p>
                <p className="text-sm text-[var(--foreground)] italic leading-relaxed">{clientFeedback}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)] bg-[var(--surface-muted)]">
          <p className="text-xs text-[var(--muted-foreground)] font-mono">
            Directing & Post-Production Case Study
          </p>
          <button
            onClick={() => setActiveCaseStudyProject(null)}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] transition-colors cursor-pointer"
          >
            {t('case.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
