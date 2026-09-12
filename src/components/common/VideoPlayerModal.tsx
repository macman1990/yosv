import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { getNormalizedVideoConfig, getProjectVideo } from '../../lib/videoHelper';
import { ProfessionalVideoPlayer } from './ProfessionalVideoPlayer';
import { X, ExternalLink, Sparkles, Film, CheckCircle2, Award } from 'lucide-react';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideoProject, setActiveVideoProject, setActiveCaseStudyProject, language, t } =
    usePortfolio();

  if (!activeVideoProject) return null;

  const videoInfo = getProjectVideo(activeVideoProject);
  const videoConfig = getNormalizedVideoConfig(activeVideoProject);

  const title = activeVideoProject.title[language] || activeVideoProject.title.en;
  const subtitle = activeVideoProject.subtitle[language] || activeVideoProject.subtitle.en;
  const description = activeVideoProject.description[language] || activeVideoProject.description.en;
  const results = activeVideoProject.results
    ? activeVideoProject.results[language] || activeVideoProject.results.en
    : null;

  return (
    <div className="fixed inset-0 z-[99990] flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col glass-panel rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-start">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--surface-muted)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide border uppercase"
              style={{
                backgroundColor: 'var(--accent-muted)',
                borderColor: 'var(--color-accent)',
                color: 'var(--color-accent)',
              }}
            >
              <Film className="w-3 h-3" />
              {activeVideoProject.platform}
            </span>
            <h2 className="text-base md:text-lg font-bold text-[var(--foreground)] tracking-tight truncate max-w-md">
              {title}
            </h2>
          </div>
          <button
            onClick={() => setActiveVideoProject(null)}
            className="p-2 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage */}
        <div className="relative max-h-[58vh] w-full overflow-hidden bg-black">
          <ProfessionalVideoPlayer
            video={videoInfo}
            posterUrl={videoConfig.posterUrl}
            aspectRatio={videoConfig.aspectRatio}
            title={title}
            controls={videoConfig.controls}
            fullscreen={videoConfig.fullscreen}
          />
        </div>

        {/* Metadata & Details Scrollable Footer */}
        <div className="p-6 overflow-y-auto max-h-[34vh] border-t border-[var(--border)] bg-[var(--surface)] space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <p
                className="text-xs uppercase tracking-wider font-mono font-semibold"
                style={{ color: 'var(--color-accent)' }}
              >
                {activeVideoProject.client} • {activeVideoProject.date}
              </p>
              <h3 className="text-xl font-bold text-[var(--foreground)]">{title}</h3>
              <p className="text-sm text-[var(--muted)] max-w-2xl leading-relaxed">{subtitle}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeVideoProject.caseStudy?.enabled && (
                <button
                  type="button"
                  onClick={() => {
                    const current = activeVideoProject;
                    setActiveVideoProject(null);
                    setTimeout(() => setActiveCaseStudyProject(current), 150);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--color-accent)] text-black transition-all shadow-md hover:opacity-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('work.viewCaseStudy')}
                </button>
              )}
              {activeVideoProject.fullVideoUrl && (
                <a
                  href={activeVideoProject.fullVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[var(--foreground)] bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 rtl-flip" />
                  Source
                </a>
              )}
            </div>
          </div>

          {description && (
            <p className="text-sm text-[var(--foreground)] leading-relaxed bg-[var(--surface-muted)] p-3.5 rounded-xl border border-[var(--border)]">
              {description}
            </p>
          )}

          {results && (
            <div
              className="flex items-start gap-2.5 p-3 rounded-xl border text-xs font-medium"
              style={{
                backgroundColor: 'var(--accent-muted)',
                borderColor: 'var(--color-accent)',
                color: 'var(--foreground)',
              }}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
              <span>
                <strong className="uppercase tracking-wider font-mono mr-1" style={{ color: 'var(--color-accent)' }}>
                  {t('work.results')}:
                </strong>
                {results}
              </span>
            </div>
          )}

          {/* Tools & Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--muted-foreground)] font-mono">{t('work.toolsUsed')}:</span>
              {activeVideoProject.toolsUsed?.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--muted)]"
                >
                  {tool}
                </span>
              ))}
            </div>

            {activeVideoProject.credits && (
              <p className="text-xs text-[var(--muted)] italic">{activeVideoProject.credits}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
