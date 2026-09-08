import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import { renderSafeMarkdown, sanitizeExternalUrl, getSafeEmbedUrl } from '../../lib/security';
import {
  X,
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
  Eye,
  Globe,
} from 'lucide-react';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSelectPost?: (post: BlogPost) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose, onSelectPost }) => {
  const { data, language, t } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<'en' | 'ar'>(language);

  useEffect(() => {
    setActiveLang(language);
  }, [language, post]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const currentTitle = post.title[activeLang] || post.title.en || post.title.ar;
  const currentExcerpt = post.excerpt[activeLang] || post.excerpt.en || post.excerpt.ar;
  const currentContent = post.content ? (post.content[activeLang] || post.content.en || post.content.ar || '') : '';
  const safeEmbed = post.embedUrl || (post.externalUrl ? getSafeEmbedUrl(post.externalUrl, post.platform) : null);

  const handleShare = () => {
    const postUrl = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getPlatformIcon = (platform: string) => {
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

  // Find 2 related posts
  const related = (data.blogPosts || [])
    .filter((p) => p.id !== post.id && p.published)
    .slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-[80000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col glass-panel rounded-2xl shadow-2xl overflow-hidden my-auto text-[var(--foreground)]"
        onClick={(e) => e.stopPropagation()}
        dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--surface-elevated)]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--muted)]">
              {getPlatformIcon(post.platform)}
              <span className="capitalize">{post.platform}</span>
            </span>

            {/* Language toggle for article content if both exist */}
            {post.type === 'article' && post.content?.ar && post.content?.en && (
              <button
                type="button"
                onClick={() => setActiveLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] transition-colors"
                title="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>{activeLang === 'en' ? 'العربية' : 'English'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              title={t('blog.shareArticle')}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? t('blog.linkCopied') : t('blog.shareArticle')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Title and Metadata */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] font-syne leading-tight">
              {currentTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[var(--muted)] font-mono">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>{post.author || 'Youssef Mohamed'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--muted)]" />
                <span>{post.publishedAt}</span>
              </span>
              {post.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--muted)]" />
                  <span>{post.readingTime}</span>
                </span>
              )}
              {post.viewsCount && (
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[var(--muted)]" />
                  <span>{post.viewsCount.toLocaleString()} {t('blog.views')}</span>
                </span>
              )}
            </div>

            {currentExcerpt && (
              <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed italic border-s-2 border-emerald-500/60 ps-4 py-1">
                {currentExcerpt}
              </p>
            )}
          </div>

          {/* Embedded Media or Cover Image */}
          {safeEmbed ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--border)] bg-black shadow-lg">
              <iframe
                src={safeEmbed}
                title={currentTitle}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : post.coverImage || post.thumbnail ? (
            <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-xl overflow-hidden border border-[var(--border)] bg-black/40">
              <img
                src={post.coverImage || post.thumbnail}
                alt={currentTitle}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : null}

          {/* External link action button if platform is external */}
          {post.externalUrl && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-[var(--border)]">
              <div className="p-2.5 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[var(--foreground)]">
                  {t('blog.watchOn')} <span className="capitalize">{post.platform}</span>
                </h4>
                <p className="text-xs text-[var(--muted)] font-mono truncate max-w-md">
                  {post.externalUrl}
                </p>
              </div>
              <a
                href={sanitizeExternalUrl(post.externalUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--color-accent)] hover:bg-emerald-400 text-black transition-colors"
              >
                {t('blog.openPost')}
              </a>
            </div>
          )}

          {/* Article Markdown Content */}
          {post.type === 'article' && currentContent && (
            <div
              className="prose dark:prose-invert max-w-none text-[var(--foreground)] text-sm sm:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: renderSafeMarkdown(currentContent) }}
            />
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[var(--muted-foreground)] me-1" />
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Articles Section */}
          {related.length > 0 && (
            <div className="pt-8 border-t border-[var(--border)] space-y-4">
              <h3 className="text-base font-bold font-syne text-[var(--foreground)] uppercase tracking-wider">
                {t('blog.relatedPosts')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (onSelectPost) onSelectPost(rel);
                    }}
                    className="p-4 rounded-xl glass-panel hover:border-[var(--color-accent)]/50 transition-all cursor-pointer group"
                  >
                    <div className="text-xs text-[var(--color-accent)] font-mono mb-1 capitalize">
                      {rel.platform} • {rel.publishedAt}
                    </div>
                    <h4 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                      {rel.title[activeLang] || rel.title.en}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
