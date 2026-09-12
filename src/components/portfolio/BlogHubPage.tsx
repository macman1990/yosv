import React, { useState, useEffect, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BlogPost, BlogPlatform } from '../../types/portfolio';
import { BlogPostModal } from './BlogPostModal';
import { sanitizeExternalUrl, renderSafeMarkdown, getSafeEmbedUrl } from '../../lib/security';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ExternalLink,
  Tag,
  Youtube,
  Video,
  Instagram,
  Linkedin,
  FileText,
  Sparkles,
  Home,
  Globe,
} from 'lucide-react';

interface BlogHubPageProps {
  initialSlug?: string;
  onNavigateHome: () => void;
}

export const BlogHubPage: React.FC<BlogHubPageProps> = ({ initialSlug, onNavigateHome }) => {
  const { data, language, setLanguage, theme, toggleTheme, t } = usePortfolio();
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  // Sync with browser URL
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/blog' || path === '/blog/') {
        setActiveSlug(null);
      } else if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '').trim();
        setActiveSlug(slug || null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const posts = useMemo(() => data.blogPosts || [], [data.blogPosts]);

  // Active article if viewing detail page
  const activePost = useMemo(() => {
    if (!activeSlug) return null;
    return posts.find((p) => p.slug === activeSlug && p.published) || null;
  }, [posts, activeSlug]);

  // Update document title for SEO
  useEffect(() => {
    if (activePost) {
      const title = activePost.title[language] || activePost.title.en;
      document.title = `${title} | Youssef Mohamed Blog`;
    } else {
      document.title = 'Content Hub & Editorial | Youssef Mohamed';
    }
  }, [activePost, language]);

  const handleSelectPost = (post: BlogPost) => {
    setActiveSlug(post.slug);
    window.history.pushState({}, '', `/blog/${post.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setActiveSlug(null);
    window.history.pushState({}, '', '/blog');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getPlatformIcon = (platform: BlogPlatform) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500" />;
      case 'tiktok':
        return <Video className="w-4 h-4 text-cyan-400" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-sky-400" />;
      default:
        return <FileText className="w-4 h-4 text-[var(--color-accent)]" />;
    }
  };

  // Filtered posts for Hub view
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (!p.published) return false;
      if (platformFilter !== 'all') {
        if (platformFilter === 'articles' && p.type !== 'article') return false;
        if (platformFilter !== 'articles' && p.platform !== platformFilter) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const tEn = (p.title.en || '').toLowerCase();
        const tAr = (p.title.ar || '').toLowerCase();
        const ex = (p.excerpt.en || '').toLowerCase();
        const tags = (p.tags || []).join(' ').toLowerCase();
        return tEn.includes(q) || tAr.includes(q) || ex.includes(q) || tags.includes(q);
      }
      return true;
    });
  }, [posts, platformFilter, searchQuery]);

  return (
    <div
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col selection:bg-[var(--color-accent)]/30 selection:text-[var(--foreground)]"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Top Standalone Header */}
      <header className="sticky top-0 z-50 bg-[var(--glass-bg)] backdrop-blur-md border-b border-[var(--border)] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] transition-colors cursor-pointer"
          >
            {language === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{language === 'ar' ? 'الرئيسية' : 'Portfolio'}</span>
          </button>

          <span className="h-4 w-[1px] bg-white/10 hidden sm:inline-block" />

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold font-syne text-[var(--foreground)] tracking-wider uppercase">
              Youssef Mohamed <span className="text-[var(--color-accent)] font-mono text-xs font-normal">/ Blog</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="px-2.5 py-1 rounded-lg text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--surface-muted)] border border-[var(--border)] transition-colors"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {activePost ? (
          /* ========================================================
             DETAIL ARTICLE VIEW (/blog/[slug])
             ======================================================== */
          <article className="space-y-8 animate-in fade-in duration-300">
            {/* Back Button */}
            <button
              type="button"
              onClick={handleBackToHub}
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
            >
              {language === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{t('blog.backToHub')}</span>
            </button>

            {/* Header / Meta */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--color-accent)]">
                  {getPlatformIcon(activePost.platform)}
                  <span className="capitalize">{activePost.platform}</span>
                </span>
                <span className="text-xs text-[var(--muted-foreground)] font-mono">
                  {activePost.publishedAt}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-[var(--foreground)] leading-tight">
                {activePost.title[language] || activePost.title.en}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[var(--border)] text-xs text-[var(--muted)] font-mono">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>{activePost.author || 'Youssef Mohamed'}</span>
                  </span>
                  {activePost.readingTime && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--muted)]" />
                      <span>{activePost.readingTime}</span>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] text-[var(--foreground)] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? t('blog.linkCopied') : t('blog.shareArticle')}</span>
                </button>
              </div>

              {/* Excerpt */}
              {activePost.excerpt && (
                <p className="text-base sm:text-xl text-[var(--muted)] leading-relaxed italic border-s-2 border-emerald-500 ps-4 py-1">
                  {activePost.excerpt[language] || activePost.excerpt.en}
                </p>
              )}
            </div>

            {/* Media Cover or Embed */}
            {activePost.embedUrl && getSafeEmbedUrl(activePost.embedUrl, activePost.platform) ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border)] bg-black shadow-2xl">
                <iframe
                  src={getSafeEmbedUrl(activePost.embedUrl, activePost.platform) || undefined}
                  title={activePost.title[language] || activePost.title.en}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : activePost.coverImage || activePost.thumbnail ? (
              <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-[var(--border)] bg-black/40">
                <img
                  src={sanitizeExternalUrl(activePost.coverImage || activePost.thumbnail)}
                  alt={activePost.title[language] || activePost.title.en}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}

            {/* External URL Banner */}
            {activePost.externalUrl && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-[var(--border)] flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[var(--muted)] font-mono capitalize">
                    {t('blog.watchOn')} {activePost.platform}
                  </div>
                  <div className="text-sm font-semibold text-[var(--foreground)] truncate max-w-md">
                    {activePost.externalUrl}
                  </div>
                </div>
                <a
                  href={sanitizeExternalUrl(activePost.externalUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--color-accent)] hover:bg-emerald-400 text-black transition-colors shrink-0"
                >
                  {t('blog.openPost')}
                </a>
              </div>
            )}

            {/* Markdown content */}
            {activePost.type === 'article' && activePost.content && (
              <div
                className="prose dark:prose-invert max-w-none text-[var(--foreground)] text-base sm:text-lg leading-relaxed space-y-6 pt-4"
                dangerouslySetInnerHTML={{
                  __html: renderSafeMarkdown(
                    activePost.content[language] || activePost.content.en || activePost.content.ar || ''
                  ),
                }}
              />
            )}

            {/* Tags */}
            {activePost.tags && activePost.tags.length > 0 && (
              <div className="pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-[var(--muted-foreground)] me-1" />
                {activePost.tags.map((tg, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--muted)]"
                  >
                    #{tg}
                  </span>
                ))}
              </div>
            )}
          </article>
        ) : (
          /* ========================================================
             HUB LIST VIEW (/blog)
             ======================================================== */
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--color-accent)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('blog.badge')}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-[var(--foreground)]">
                {t('blog.title')}
              </h1>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                {t('blog.subtitle')}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: t('blog.all') },
                  { id: 'articles', label: t('blog.articlesOnly') },
                  { id: 'youtube', label: 'YouTube' },
                  { id: 'tiktok', label: 'TikTok' },
                  { id: 'linkedin', label: 'LinkedIn' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlatformFilter(item.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                      platformFilter === item.id
                        ? 'bg-[var(--color-accent)] text-black font-bold'
                        : 'bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('blog.searchPlaceholder')}
                  className="w-full ps-9 pe-3 py-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleSelectPost(post)}
                  className="group p-5 rounded-2xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--color-accent)] transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--muted-foreground)]">
                      <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] capitalize">
                        {getPlatformIcon(post.platform)}
                        <span>{post.platform}</span>
                      </span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <h2 className="text-lg font-bold font-syne text-[var(--foreground)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                      {post.title[language] || post.title.en}
                    </h2>

                    <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-2">
                      {post.excerpt[language] || post.excerpt.en}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)]">
                    <span>{post.readingTime || '2 min read'}</span>
                    <span className="text-[var(--color-accent)] font-bold group-hover:translate-x-1 group-hover:rtl:-translate-x-1 transition-transform">
                      {t('blog.readArticle')} →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
