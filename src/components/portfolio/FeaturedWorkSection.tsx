import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, Category } from '../../types/portfolio';
import { getAspectRatioClass } from '../../lib/videoHelper';
import { Play, Sparkles, ExternalLink, Film, CheckCircle2, Layers } from 'lucide-react';

export const FeaturedWorkSection: React.FC = () => {
  const { data, language, t, setActiveVideoProject, setActiveCaseStudyProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

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

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-[130px] pointer-events-none" />

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
            <Film className="w-3.5 h-3.5" />
            {t('work.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
            {t('work.title')}
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed transition-colors duration-300">
            {t('work.subtitle')}
          </p>
        </div>

        {/* Dynamic Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const name = cat.name[language] || cat.name.en;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--color-accent)] text-black shadow-sm font-bold scale-102'
                    : 'bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-[var(--surface)] border border-[var(--border)]">
            <Film className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-3" />
            <p className="text-[var(--muted)] text-sm">{t('work.empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => {
              const title = project.title[language] || project.title.en;
              const subtitle = project.subtitle[language] || project.subtitle.en;
              const results = project.results
                ? project.results[language] || project.results.en
                : null;
              const isHovered = hoveredProjectId === project.id;
              const isVertical = project.aspectRatio === '9:16' || project.aspectRatio === '4:5';

              return (
                <div
                  key={project.id}
                  data-cursor="video"
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className={`project-card group relative flex flex-col rounded-2xl md:rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300 overflow-hidden shadow-[var(--card-shadow)] ${
                    isVertical ? 'lg:col-span-1' : ''
                  }`}
                >
                  {/* Thumbnail / Video Preview Stage */}
                  <div
                    className={`relative w-full overflow-hidden bg-black ${getAspectRatioClass(
                      project.aspectRatio
                    )}`}
                  >
                    {/* Poster Image */}
                    <img
                      src={project.thumbnail}
                      alt={title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                        isHovered && project.previewVideoUrl ? 'opacity-0' : 'opacity-100'
                      }`}
                    />

                    {/* Muted Preview Video on Hover */}
                    {project.previewVideoUrl && isHovered && (
                      <video
                        src={project.previewVideoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-300"
                      />
                    )}

                    {/* Dark gradient overlay for readability over video/image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-[var(--foreground)] border border-white/20">
                        {project.platform}
                      </span>
                      {project.featured && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--color-accent)] text-black shadow-xs font-bold">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Center Play Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setActiveVideoProject(project)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[var(--color-accent)] hover:opacity-95 text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300 cursor-pointer z-10"
                      aria-label={`Play ${title}`}
                    >
                      <Play className="w-6 h-6 fill-black" />
                    </button>
                  </div>

                  {/* Card Content Information */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 text-start">
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                        <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>{project.client}</span>
                        <span>{project.date}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] group-hover:opacity-90 transition-opacity leading-snug">
                        {title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                        {subtitle}
                      </p>
                    </div>

                    {/* Metrics pill if present */}
                    {results && (
                      <div
                        className="flex items-start gap-2 p-2.5 rounded-xl text-[11px] border text-start"
                        style={{
                          backgroundColor: 'var(--accent-muted)',
                          borderColor: 'var(--border)',
                          color: 'var(--foreground)',
                        }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                        <span className="line-clamp-1">{results}</span>
                      </div>
                    )}

                    {/* Tools badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {project.toolsUsed?.slice(0, 3).map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--surface-muted)] border border-[var(--border-subtle)] text-[var(--muted)]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveVideoProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-80 cursor-pointer"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        <Play className="w-3 h-3" style={{ fill: 'var(--color-accent)' }} />
                        {t('work.watchVideo')}
                      </button>

                      {project.caseStudy?.enabled && (
                        <button
                          type="button"
                          onClick={() => setActiveCaseStudyProject(project)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] text-[var(--foreground)] border border-[var(--border)] transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                          {t('work.viewCaseStudy')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
