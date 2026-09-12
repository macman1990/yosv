import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BlogPost, BlogPlatform } from '../../types/portfolio';
import { BlogPostModal } from './BlogPostModal';
import { sanitizeExternalUrl } from '../../lib/security';
import {
  Search,
  FileText,
  Youtube,
  Video,
  Instagram,
  Linkedin,
  Clock,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Filter,
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { data, language, t } = usePortfolio();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const posts = useMemo(() => data.blogPosts || [], [data.blogPosts]);

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Must be published
      if (!post.published) return false;

      // Platform filter
      if (platformFilter !== 'all') {
        if (platformFilter === 'articles' && post.type !== 'article') return false;
        if (platformFilter !== 'articles' && post.platform !== platformFilter) return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && post.category !== categoryFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleEn = (post.title.en || '').toLowerCase();
        const titleAr = (post.title.ar || '').toLowerCase();
        const excerptEn = (post.excerpt.en || '').toLowerCase();
        const excerptAr = (post.excerpt.ar || '').toLowerCase();
        const tags = (post.tags || []).join(' ').toLowerCase();

        return (
          titleEn.includes(query) ||
          titleAr.includes(query) ||
          excerptEn.includes(query) ||
          excerptAr.includes(query) ||
          tags.includes(query) ||
          post.platform.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [posts, platformFilter, categoryFilter, searchQuery]);

  const getPlatformIcon = (platform: BlogPlatform) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-3.5 h-3.5 text-red-500" />;
      case 'tiktok':
        return <Video className="w-3.5 h-3.5 text-cyan-400" />;
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5 text-pink-400" />;
      case 'linkedin':
        return <Linkedin className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-[var(--color-accent)]" />;
    }
  };

  const getPlatformBadgeColor = (platform: BlogPlatform) => {
    switch (platform) {
      case 'youtube':
        return 'border-red-500/30 text-red-400 bg-red-500/10';
      case 'tiktok':
        return 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10';
      case 'instagram':
        return 'border-pink-500/30 text-pink-400 bg-pink-500/10';
      case 'linkedin':
        return 'border-sky-500/30 text-sky-400 bg-sky-500/10';
      default:
        return 'border-emerald-500/30 text-[var(--color-accent)] bg-[var(--color-accent)]/10';
    }
  };

  const categories = data.blogCategories || [];

  return (
    <section id="blog" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-transparent">
      {/* Background architectural glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border)] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--color-accent)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('blog.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne tracking-tight text-[var(--foreground)]">
              {t('blog.title')}
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blog.searchPlaceholder')}
                className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-xs sm:text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: t('blog.all') },
              { id: 'articles', label: t('blog.articlesOnly') },
              { id: 'youtube', label: 'YouTube' },
              { id: 'tiktok', label: 'TikTok' },
              { id: 'linkedin', label: 'LinkedIn' },
            ].map((tab) => {
              const active = platformFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPlatformFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    active
                      ? 'bg-[var(--color-accent)] text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-[var(--surface-muted)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)] border border-[var(--border)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Category Dropdown/Filter if categories exist */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
              <Filter className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[var(--surface-muted)] border border-[var(--border)] rounded-lg px-2.5 py-1.5 text-[var(--muted)] text-xs focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
              >
                <option value="all" className="bg-[var(--surface)]">{t('blog.all')}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug} className="bg-[var(--surface)]">
                    {cat.name[language] || cat.name.en}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
            <p className="text-[var(--muted)] text-sm">{t('blog.noPostsFound')}</p>
            {(searchQuery || platformFilter !== 'all' || categoryFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setPlatformFilter('all');
                  setCategoryFilter('all');
                }}
                className="text-xs text-[var(--color-accent)] hover:underline font-mono"
              >
                {t('blog.clearSearch')}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const title = post.title[language] || post.title.en || post.title.ar;
              const excerpt = post.excerpt[language] || post.excerpt.en || post.excerpt.ar;

              return (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group relative flex flex-col justify-between rounded-2xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--color-accent)] transition-all duration-300 overflow-hidden cursor-pointer shadow-lg"
                >
                  {/* Thumbnail / Cover */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
                    <img
                      src={sanitizeExternalUrl(post.thumbnail || post.coverImage)}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Platform Tag */}
                    <div className="absolute top-3 start-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider border backdrop-blur-md ${getPlatformBadgeColor(
                          post.platform
                        )}`}
                      >
                        {getPlatformIcon(post.platform)}
                        <span>{post.platform}</span>
                      </span>
                    </div>

                    {/* Featured Ribbon */}
                    {post.featured && (
                      <div className="absolute top-3 end-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-[var(--color-accent)] text-black font-bold shadow-md">
                          {t('blog.featuredPost')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted-foreground)]">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.publishedAt}</span>
                        </span>
                        {post.readingTime && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readingTime}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-syne text-[var(--foreground)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2 leading-snug">
                        {title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                      <span className="text-[var(--muted-foreground)]">
                        {post.author || 'Youssef Mohamed'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[var(--color-accent)] group-hover:translate-x-1 group-hover:rtl:-translate-x-1 transition-transform font-bold">
                        {post.type === 'article' ? t('blog.readArticle') : t('blog.openPost')}
                        <ArrowUpRight className="w-3.5 h-3.5 rtl-flip" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      <BlogPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onSelectPost={(p) => setSelectedPost(p)}
      />
    </section>
  );
};
