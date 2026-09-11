import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, Category } from '../../types/portfolio';
import { getAspectRatioClass } from '../../lib/videoHelper';
import { Play, Sparkles, ExternalLink, Film, CheckCircle2, Layers } from 'lucide-react';

export const FeaturedWorkSection: React.FC = () => {
  const { data, language, t, setActiveVideoProject, setActiveCaseStudyProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const categories: Category[] = (data.categories || [])
    .filter((c) => c.visible)
    .sort((a, b) => a.order - b.order);

  const projects: Project[] = (data.projects || [])
    .filter((p) => p.status === 'published')
    .sort((a, b) => a.order - b.order);

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const displayMode = data.appearance?.projectDisplayMode || 'view-more';
  const initialCount = Math.max(1, Number(data.appearance?.projectsInitialCount || 6));
  const expandedCount = Math.max(initialCount, Number(data.appearance?.projectsExpandedCount || 12));
  const visibleProjects = displayMode === 'view-more' ? (expanded ? filteredProjects.slice(0, expandedCount) : filteredProjects.slice(0, initialCount)) : filteredProjects;
  const desktopColumns = data.appearance?.desktopColumns === 2 ? 2 : data.appearance?.desktopColumns === 4 ? 4 : 3;
  const tabletColumns = data.appearance?.tabletColumns === 1 ? 1 : data.appearance?.tabletColumns === 3 ? 3 : 2;
  const columnsClass = desktopColumns === 2 ? 'xl:grid-cols-2' : desktopColumns === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3';
  const tabletClass = tabletColumns === 1 ? 'md:grid-cols-1' : tabletColumns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  const renderProjectCard = (project: Project, compact = false) => {
    const title = project.title[language] || project.title.en;
    const subtitle = project.subtitle[language] || project.subtitle.en;
    const results = project.results ? project.results[language] || project.results.en : null;
    const isHovered = hoveredProjectId === project.id;

    return (
      <article
        key={project.id}
        data-cursor="video"
        onMouseEnter={() => setHoveredProjectId(project.id)}
        onMouseLeave={() => setHoveredProjectId(null)}
        className={`group relative flex flex-col overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--border-hover)] reveal ${compact ? 'min-h-[310px]' : ''}`}
      >
        <div className={`relative w-full overflow-hidden bg-black ${getAspectRatioClass(project.aspectRatio)}`}>
          <img
            src={project.thumbnail}
            alt={title}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              isHovered && project.previewVideoUrl ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {project.previewVideoUrl && isHovered && (
            <video
              src={project.previewVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

          <div className="absolute inset-x-3 top-3 flex items-center justify-between z-10">
            <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              {project.platform}
            </span>
            {project.featured && (
              <span className="rounded-full bg-[var(--color-accent)] px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-black font-bold">
                Featured
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveVideoProject(project)}
            className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-black shadow-lg transition-all duration-300 z-10 opacity-90 group-hover:scale-100 scale-90"
            aria-label={`Play ${title}`}
          >
            <Play className="h-5 w-5 fill-black" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div className="space-y-3 text-start">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              <span style={{ color: 'var(--color-accent)' }}>{project.client}</span>
              <span>{project.date}</span>
            </div>

            <h3 className={`font-bold text-[var(--foreground)] leading-tight ${compact ? 'text-base' : 'text-lg sm:text-xl'}`}>
              {title}
            </h3>

            {!compact && (
              <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>

          {results && !compact && (
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-[11px] text-[var(--foreground)]">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-accent)' }} />
              <span>{results}</span>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {project.toolsUsed?.slice(0, compact ? 2 : 3).map((tool, idx) => (
              <span
                key={idx}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.14em] text-[var(--muted)]"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
            <button
              type="button"
              onClick={() => setActiveVideoProject(project)}
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              {t('work.watchVideo')}
            </button>

            {project.caseStudy?.enabled && (
              <button
                type="button"
                onClick={() => setActiveCaseStudyProject(project)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--foreground)]"
              >
                <Sparkles className="h-3 w-3" style={{ color: 'var(--color-accent)' }} />
                {t('work.viewCaseStudy')}
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 h-80 w-80 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/5 blur-[120px] pointer-events-none" />

      <div className="section-shell space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 reveal">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-accent)]"
          >
            <Film className="w-3.5 h-3.5" />
            {t('work.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-[-0.05em]">
            {t('work.title')}
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
            {t('work.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pb-2 reveal reveal-delay-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const name = cat.name[language] || cat.name.en;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--color-accent)] text-black shadow-sm'
                    : 'bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)]'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="glass-card py-16 text-center border border-[var(--border)] reveal">
            <Film className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-3" />
            <p className="text-[var(--muted)] text-sm">{t('work.empty')}</p>
          </div>
        ) : displayMode === 'carousel' ? (
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-6 min-w-max">
              {visibleProjects.map((project) => (
                <div key={project.id} className="w-[320px] shrink-0">
                  {renderProjectCard(project)}
                </div>
              ))}
            </div>
          </div>
        ) : displayMode === 'horizontal' ? (
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-4 min-w-max">
              {visibleProjects.map((project) => (
                <div key={project.id} className="w-[280px] shrink-0">
                  {renderProjectCard(project, true)}
                </div>
              ))}
            </div>
          </div>
        ) : displayMode === 'featured-secondary' ? (
          <div className="space-y-6">
            {visibleProjects.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>{renderProjectCard(visibleProjects[0])}</div>
                <div className="grid grid-cols-1 gap-6">
                  {visibleProjects.slice(1, 5).map((project) => (
                    <div key={project.id}>{renderProjectCard(project, true)}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : displayMode === 'compact' ? (
          <div className={`grid grid-cols-1 ${tabletClass} ${columnsClass} gap-4`}>
            {visibleProjects.map((project) => renderProjectCard(project, true))}
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${tabletClass} ${columnsClass} gap-6 sm:gap-8`}>
            {visibleProjects.map((project) => renderProjectCard(project))}
          </div>
        )}

        {displayMode === 'view-more' && filteredProjects.length > initialCount && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--foreground)]"
            >
              {expanded ? 'Show Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
