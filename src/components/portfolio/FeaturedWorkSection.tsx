import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project, Category } from '../../types/portfolio';
import { getAspectRatioClass } from '../../lib/videoHelper';
import { Play, Sparkles, Film, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export const FeaturedWorkSection: React.FC = () => {
  const { data, language, t, setActiveVideoProject, setActiveCaseStudyProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselViewportRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = (data.categories || []).filter((category) => category.visible).sort((a, b) => a.order - b.order);
  const projects: Project[] = (data.projects || []).filter((project) => project.status === 'published' || project.visible === true).sort((a, b) => a.order - b.order);
  const filteredProjects = selectedCategory === 'all' ? projects : projects.filter((project) => project.category === selectedCategory);
  const appearance = data.appearance;
  const displayMode = appearance?.projectDisplayMode || 'view-more';
  const initialCount = Math.max(1, Number(appearance?.projectsInitialCount || 6));
  const expandedCount = Math.max(initialCount, Number(appearance?.projectsExpandedCount || 12));
  const viewMoreEnabled = appearance?.viewMoreEnabled !== false;
  const visibleCount = expanded ? expandedCount : initialCount;
  const visibleProjects = viewMoreEnabled ? filteredProjects.slice(0, visibleCount) : filteredProjects;
  const hasMore = viewMoreEnabled && visibleCount < filteredProjects.length;
  const canCollapse = viewMoreEnabled && expanded && filteredProjects.length > initialCount;
  const projectGap = Number(appearance?.projectGap ?? 24);
  const gapClass = projectGap > 32 ? 'gap-8' : projectGap > 16 ? 'gap-6' : 'gap-4';
  const desktopColumns = appearance?.desktopColumns === 2 ? 2 : appearance?.desktopColumns === 4 ? 4 : 3;
  const tabletColumns = appearance?.tabletColumns === 1 ? 1 : appearance?.tabletColumns === 3 ? 3 : 2;
  const mobileColumns = appearance?.mobileColumns === 2 ? 2 : appearance?.mobileColumns === 3 ? 3 : 1;
  const columnsClass = desktopColumns === 2 ? 'xl:grid-cols-2' : desktopColumns === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3';
  const tabletClass = tabletColumns === 1 ? 'md:grid-cols-1' : tabletColumns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  const mobileClass = mobileColumns === 2 ? 'grid-cols-2' : mobileColumns === 3 ? 'grid-cols-3' : 'grid-cols-1';
  const cardSize = appearance?.projectCardSize || 'standard';
  const cardWidth = cardSize === 'large' ? 'w-[min(82vw,420px)]' : cardSize === 'compact' ? 'w-[min(78vw,280px)]' : 'w-[min(80vw,340px)]';
  const featuredProjects = filteredProjects.filter((project) => project.featured).slice(0, Math.max(1, Number(appearance?.featuredCount ?? 1)));
  const featuredIds = new Set(featuredProjects.map((project) => project.id));
  const secondaryProjects = filteredProjects.filter((project) => !featuredIds.has(project.id)).slice(0, Math.max(1, Number(appearance?.secondaryCount ?? 4)));
  const featuredComposition = featuredProjects.length > 0 ? featuredProjects : filteredProjects.slice(0, Math.max(1, Number(appearance?.featuredCount ?? 1)));

  useEffect(() => {
    setExpanded(false);
    setCarouselIndex(0);
    carouselRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [selectedCategory, displayMode]);

  const scrollCarousel = useCallback((direction: 1 | -1, pauseAfterInteraction = true) => {
    const viewport = carouselRef.current;
    if (!viewport || visibleProjects.length === 0) return;
    const nextIndex = carouselIndex + direction;
    if (nextIndex < 0 || nextIndex >= visibleProjects.length) {
      if (appearance?.carouselLoop) {
        viewport.scrollTo({ left: direction > 0 ? 0 : viewport.scrollWidth, behavior: 'smooth' });
        setCarouselIndex(direction > 0 ? 0 : visibleProjects.length - 1);
      }
      return;
    }
    setCarouselIndex(nextIndex);
    viewport.scrollBy({ left: direction * viewport.clientWidth * 0.82, behavior: 'smooth' });
    if (pauseAfterInteraction) setIsCarouselPaused(true);
  }, [appearance?.carouselLoop, carouselIndex, visibleProjects.length]);

  useEffect(() => {
    if (displayMode !== 'carousel' || appearance?.carouselAutoplay !== true || isCarouselPaused || visibleProjects.length < 2) return;
    const interval = window.setInterval(() => scrollCarousel(1, false), 5000);
    return () => window.clearInterval(interval);
  }, [appearance?.carouselAutoplay, displayMode, isCarouselPaused, scrollCarousel, visibleProjects.length]);

  useEffect(() => {
    if (displayMode !== 'carousel' || !carouselViewportRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsCarouselPaused(!entry.isIntersecting), { threshold: 0.2 });
    observer.observe(carouselViewportRef.current);
    return () => observer.disconnect();
  }, [displayMode]);

  const renderProjectCard = (project: Project, compact = false) => {
    const title = project.title[language] || project.title.en;
    const subtitle = project.subtitle[language] || project.subtitle.en;
    const results = project.results ? project.results[language] || project.results.en : null;
    const isHovered = hoveredProjectId === project.id;

    if (compact) {
      return (
        <article key={project.id} className="group grid grid-cols-[96px_1fr_auto] items-center gap-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-hover)] sm:grid-cols-[132px_1fr_auto]">
          <div className={`relative overflow-hidden rounded-[var(--radius-sm)] bg-black ${getAspectRatioClass(project.aspectRatio)}`}>
            <img src={project.thumbnail} alt={title} loading="lazy" className="h-full w-full object-cover" />
            <button type="button" onClick={() => setActiveVideoProject(project)} className="absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-black" aria-label={`Play ${title}`}><Play className="h-3.5 w-3.5 fill-black" /></button>
          </div>
          <div className="min-w-0 space-y-1 text-start">
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[9px] font-mono uppercase tracking-[0.14em] text-[var(--muted-foreground)]"><span>{project.category}</span><span>{project.platform}</span><span>{project.client}</span><span>{project.date}</span></div>
            <h3 className="truncate text-sm font-bold text-[var(--foreground)]">{title}</h3>
            <div className="flex flex-wrap gap-1.5">{(project.tags || []).slice(0, 3).map((tag) => <span key={tag} className="text-[9px] text-[var(--muted)]">#{tag}</span>)}</div>
          </div>
          <button type="button" onClick={() => setActiveVideoProject(project)} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]" aria-label={`Watch ${title}`}><ExternalLink className="h-3.5 w-3.5" /><span className="hidden sm:inline">{t('work.watchVideo')}</span></button>
        </article>
      );
    }

    return (
      <article key={project.id} data-cursor="video" onMouseEnter={() => setHoveredProjectId(project.id)} onMouseLeave={() => setHoveredProjectId(null)} className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)] transition-all duration-[var(--motion-duration)] hover:-translate-y-1 hover:border-[var(--border-hover)] reveal">
        <div className={`relative w-full overflow-hidden bg-black ${getAspectRatioClass(project.aspectRatio)}`}>
          <img src={project.thumbnail} alt={title} loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isHovered && project.previewVideoUrl && project.autoplay !== false ? 'opacity-0' : 'opacity-100'}`} />
          {project.previewVideoUrl && isHovered && project.autoplay !== false && <video src={project.previewVideoUrl} autoPlay muted loop={project.loop} playsInline poster={project.thumbnail} className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-2"><span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">{project.platform}</span>{project.featured && <span className="rounded-full bg-[var(--color-accent)] px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-black font-bold">Featured</span>}</div>
          <button type="button" onClick={() => setActiveVideoProject(project)} className="absolute inset-0 z-10 m-auto flex h-14 w-14 scale-90 items-center justify-center rounded-full bg-[var(--color-accent)] text-black opacity-90 shadow-lg transition-all duration-300 group-hover:scale-100 focus-visible:scale-100" aria-label={`Play ${title}`}><Play className="h-5 w-5 fill-black" /></button>
        </div>
        <div className="flex flex-1 flex-col justify-between p-5 text-start sm:p-6">
          <div className="space-y-3"><div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]"><span style={{ color: 'var(--color-accent)' }}>{project.client}</span><span>{project.date}</span></div><h3 className="text-lg font-bold leading-tight text-[var(--foreground)] sm:text-xl">{title}</h3><p className="line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">{subtitle}</p></div>
          {results && <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-[11px] text-[var(--foreground)]"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--color-accent)' }} /><span>{results}</span></div>}
          <div className="mt-4 flex flex-wrap gap-2">{(project.toolsUsed || []).slice(0, 3).map((tool) => <span key={tool} className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.14em] text-[var(--muted)]">{tool}</span>)}</div>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4"><button type="button" onClick={() => setActiveVideoProject(project)} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]"><Play className="h-3.5 w-3.5 fill-current" />{t('work.watchVideo')}</button>{project.caseStudy?.enabled && <button type="button" onClick={() => setActiveCaseStudyProject(project)} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--foreground)]"><Sparkles className="h-3 w-3" style={{ color: 'var(--color-accent)' }} />{t('work.viewCaseStudy')}</button>}</div>
        </div>
      </article>
    );
  };

  const renderViewMore = () => (hasMore || canCollapse) && <div className="flex justify-center"><button type="button" onClick={() => setExpanded((value) => !value)} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]">{expanded ? (language === 'ar' ? 'عرض أقل' : 'Show Less') : (language === 'ar' ? appearance?.viewMoreLabelAr || 'المزيد' : appearance?.viewMoreLabelEn || 'View More')}</button></div>;

  const renderCarousel = () => <div ref={carouselViewportRef} onMouseEnter={() => setIsCarouselPaused(true)} onMouseLeave={() => setIsCarouselPaused(false)} className="relative"><div ref={carouselRef} tabIndex={0} onFocus={() => setIsCarouselPaused(true)} onKeyDown={(event) => { if (event.key === 'ArrowLeft') scrollCarousel(-1); if (event.key === 'ArrowRight') scrollCarousel(1); }} className={`flex ${gapClass} snap-x snap-mandatory overflow-x-auto pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]`} aria-label="Project carousel">{visibleProjects.map((project) => <div key={project.id} className={`${cardWidth} shrink-0 snap-start`}>{renderProjectCard(project)}</div>)}</div>{appearance?.showCarouselControls !== false && <div className="mt-3 flex justify-end gap-2"><button type="button" onClick={() => scrollCarousel(-1)} disabled={!appearance?.carouselLoop && carouselIndex === 0} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] disabled:opacity-40" aria-label="Previous projects"><ChevronLeft className="h-4 w-4" /></button><button type="button" onClick={() => scrollCarousel(1)} disabled={!appearance?.carouselLoop && carouselIndex >= visibleProjects.length - 1} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] disabled:opacity-40" aria-label="Next projects"><ChevronRight className="h-4 w-4" /></button></div>}</div>;

  return (
    <section id="work" className="relative overflow-hidden py-24"><div className="pointer-events-none absolute left-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/5 blur-[120px]" /><div className="section-shell space-y-10">
      <div className="mx-auto max-w-3xl space-y-4 text-center reveal"><div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-accent)]"><Film className="h-3.5 w-3.5" />{t('work.badge')}</div><h2 className="font-syne text-3xl font-black tracking-[-0.05em] text-[var(--foreground)] sm:text-4xl md:text-5xl">{t('work.title')}</h2><p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">{t('work.subtitle')}</p></div>
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2 reveal reveal-delay-1"><button type="button" onClick={() => setSelectedCategory('all')} className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all ${selectedCategory === 'all' ? 'bg-[var(--color-accent)] text-black' : 'border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)]'}`}>All Work</button>{categories.map((category) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all ${selectedCategory === category.id ? 'bg-[var(--color-accent)] text-black' : 'border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)]'}`}>{category.name[language] || category.name.en}</button>)}</div>
      {filteredProjects.length === 0 ? <div className="glass-card border border-[var(--border)] py-16 text-center"><Film className="mx-auto mb-3 h-12 w-12 text-[var(--muted-foreground)]" /><p className="text-sm text-[var(--muted)]">{t('work.empty')}</p></div> : displayMode === 'carousel' ? <>{renderCarousel()}{renderViewMore()}</> : displayMode === 'horizontal' ? <><div className={`flex ${gapClass} snap-x snap-mandatory overflow-x-auto pb-4`}>{visibleProjects.map((project) => <div key={project.id} className={`${cardWidth} shrink-0 snap-start`}>{renderProjectCard(project, true)}</div>)}</div>{renderViewMore()}</> : displayMode === 'featured-secondary' ? <><div className="space-y-6">{featuredComposition.length > 0 && <div className={`grid grid-cols-1 ${gapClass} lg:grid-cols-[1.25fr_0.75fr]`}><div>{renderProjectCard(featuredComposition[0])}</div><div className={`grid grid-cols-1 ${gapClass}`}>{secondaryProjects.map((project) => <div key={project.id}>{renderProjectCard(project, true)}</div>)}</div></div>}</div>{renderViewMore()}</> : displayMode === 'compact' ? <><div className={`grid grid-cols-1 ${gapClass}`}>{visibleProjects.map((project) => renderProjectCard(project, true))}</div>{renderViewMore()}</> : <><div className={`grid ${mobileClass} ${tabletClass} ${columnsClass} ${gapClass}`}>{visibleProjects.map((project) => renderProjectCard(project))}</div>{renderViewMore()}</>}
    </div></section>
  );
};