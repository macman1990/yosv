import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { BlogPost, BlogCategory, BlogPlatform, BlogPostType } from '../../../types/portfolio';
import { getSafeEmbedUrl, sanitizeExternalUrl } from '../../../lib/security';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Youtube,
  Video,
  Instagram,
  Linkedin,
  Eye,
  CheckCircle,
  XCircle,
  Sparkles,
  Tag,
  Calendar,
  Save,
  X,
  Globe,
  FolderPlus,
} from 'lucide-react';

export const AdminBlogTab: React.FC = () => {
  const { data, updateData, language, t } = usePortfolio();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'ar'>('en');
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  // New Category State
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');

  const blogPosts = data.blogPosts || [];
  const blogCategories = data.blogCategories || [];

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: `new-post-${Date.now().toString().slice(-4)}`,
      type: 'article',
      platform: 'article',
      title: { en: 'New Editorial Article', ar: 'مقال جديد' },
      excerpt: { en: 'Short preview description...', ar: 'مقدمة المقال...' },
      content: {
        en: '## Heading 1\n\nWrite your markdown content here...',
        ar: '## عنوان رئيسي\n\nاكتب محتوى المقال هنا...',
      },
      coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      category: blogCategories[0]?.slug || 'video-editing',
      tags: ['Editing', 'Workflow'],
      publishedAt: new Date().toISOString().split('T')[0],
      readingTime: '3 min read',
      author: 'Youssef Mohamed',
      featured: false,
      published: true,
      viewsCount: 0,
    };
    setEditingPost(newPost);
    setIsCreating(true);
  };

  const handleSavePost = () => {
    if (!editingPost) return;

    // Auto compute safe embed URL if external URL provided and not manually set
    let embedUrl = editingPost.embedUrl;
    if (!embedUrl && editingPost.externalUrl) {
      embedUrl = getSafeEmbedUrl(editingPost.externalUrl, editingPost.platform) || undefined;
    }

    const postToSave: BlogPost = {
      ...editingPost,
      embedUrl,
    };

    let updatedPosts: BlogPost[];
    if (isCreating) {
      updatedPosts = [postToSave, ...blogPosts];
    } else {
      updatedPosts = blogPosts.map((p) => (p.id === postToSave.id ? postToSave : p));
    }

    updateData({ blogPosts: updatedPosts });
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm(language === 'ar' ? 'هل تريد حذف هذا المنشور؟' : 'Are you sure you want to delete this post?')) {
      const updated = blogPosts.filter((p) => p.id !== id);
      updateData({ blogPosts: updated });
    }
  };

  const handleTogglePublish = (post: BlogPost) => {
    const updated = blogPosts.map((p) =>
      p.id === post.id ? { ...p, published: !p.published } : p
    );
    updateData({ blogPosts: updated });
  };

  const handleToggleFeatured = (post: BlogPost) => {
    const updated = blogPosts.map((p) =>
      p.id === post.id ? { ...p, featured: !p.featured } : p
    );
    updateData({ blogPosts: updated });
  };

  const handleAddCategory = () => {
    if (!newCatNameEn.trim()) return;
    const slug = newCatSlug.trim() || newCatNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory: BlogCategory = {
      id: `cat-${Date.now()}`,
      name: { en: newCatNameEn, ar: newCatNameAr || newCatNameEn },
      slug,
      order: blogCategories.length + 1,
      visible: true,
    };
    updateData({ blogCategories: [...blogCategories, newCategory] });
    setNewCatNameEn('');
    setNewCatNameAr('');
    setNewCatSlug('');
  };

  const handleDeleteCategory = (id: string) => {
    const updated = blogCategories.filter((c) => c.id !== id);
    updateData({ blogCategories: updated });
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
        return <FileText className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-syne text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span>{t('admin.blog.title')}</span>
          </h2>
          <p className="text-xs text-zinc-400">
            {t('admin.blog.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowCategoryManager(!showCategoryManager)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <FolderPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('admin.blog.manageCategories')}</span>
          </button>

          <button
            type="button"
            onClick={handleCreateNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black shadow-md transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('admin.blog.newPost')}</span>
          </button>
        </div>
      </div>

      {/* Category Manager Dropdown/Panel */}
      {showCategoryManager && (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold font-syne text-white uppercase tracking-wider">
            {t('admin.blog.categoriesList')}
          </h3>

          <div className="flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-200"
              >
                <span>{cat.name.en} / {cat.name.ar}</span>
                <span className="text-zinc-500">({cat.slug})</span>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Name (EN)"
              value={newCatNameEn}
              onChange={(e) => setNewCatNameEn(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-500"
            />
            <input
              type="text"
              placeholder="Name (AR)"
              value={newCatNameAr}
              onChange={(e) => setNewCatNameAr(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-500"
            />
            <input
              type="text"
              placeholder="slug (e.g. creative-direction)"
              value={newCatSlug}
              onChange={(e) => setNewCatSlug(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-500"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
            >
              Add Category
            </button>
          </div>
        </div>
      )}

      {/* Posts Table / List */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.01]">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs font-mono">
            <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="p-4 text-start">Post / Title</th>
                <th className="p-4 text-start">Type & Platform</th>
                <th className="p-4 text-start">Category</th>
                <th className="p-4 text-start">Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No articles or content posts yet. Click "+ New Post" to publish your first piece.
                  </td>
                </tr>
              ) : (
                blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Title + Thumbnail */}
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={post.thumbnail || post.coverImage}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-black/50 border border-white/10 shrink-0"
                      />
                      <div className="space-y-0.5 max-w-xs sm:max-w-md">
                        <div className="font-semibold text-white font-sans text-sm truncate">
                          {post.title[language] || post.title.en}
                        </div>
                        <div className="text-[11px] text-zinc-500 truncate">
                          /blog/{post.slug}
                        </div>
                      </div>
                    </td>

                    {/* Platform */}
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] uppercase">
                        {getPlatformIcon(post.platform)}
                        <span>{post.platform}</span>
                      </span>
                    </td>

                    {/* Category */}
                    <td className="p-4 text-zinc-300 capitalize">
                      {post.category}
                    </td>

                    {/* Published Date */}
                    <td className="p-4 text-zinc-400">
                      {post.publishedAt}
                    </td>

                    {/* Status & Featured */}
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(post)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                            post.published
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30'
                          }`}
                        >
                          {post.published ? t('admin.blog.published') : t('admin.blog.draft')}
                        </button>
                        {post.featured && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                            ★
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-end">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPost(post);
                            setIsCreating(false);
                          }}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          title={t('admin.blog.editPost')}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                          title={t('admin.blog.deletePost')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          EDIT / CREATE POST MODAL DRAWER
          ======================================================== */}
      {editingPost && (
        <div className="fixed inset-0 z-[90000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b0c12] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0e1017]">
              <div className="flex items-center gap-3">
                <span className="font-bold font-syne text-base text-white">
                  {isCreating ? t('admin.blog.newPost') : t('admin.blog.editPost')}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  ID: {editingPost.id}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSavePost}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black shadow-md transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{t('admin.save')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form Fields Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs">
              {/* Type and Platform Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{t('admin.blog.postType')}</label>
                  <select
                    value={editingPost.type}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        type: e.target.value as BlogPostType,
                        platform: e.target.value === 'article' ? 'article' : editingPost.platform,
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="article" className="bg-[#12131a]">{t('admin.blog.typeArticle')}</option>
                    <option value="social_post" className="bg-[#12131a]">{t('admin.blog.typeSocialPost')}</option>
                    <option value="curated_video" className="bg-[#12131a]">Curated Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{t('admin.blog.platform')}</label>
                  <select
                    value={editingPost.platform}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, platform: e.target.value as BlogPlatform })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="article" className="bg-[#12131a]">Article (Editorial)</option>
                    <option value="youtube" className="bg-[#12131a]">YouTube</option>
                    <option value="tiktok" className="bg-[#12131a]">TikTok</option>
                    <option value="instagram" className="bg-[#12131a]">Instagram</option>
                    <option value="linkedin" className="bg-[#12131a]">LinkedIn</option>
                    <option value="other" className="bg-[#12131a]">Other / External</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{t('admin.blog.category')}</label>
                  <select
                    value={editingPost.category}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, category: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    {blogCategories.map((c) => (
                      <option key={c.id} value={c.slug} className="bg-[#12131a]">
                        {c.name.en} ({c.name.ar})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slug and Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 mb-1 font-mono">{t('admin.blog.slug')}</label>
                  <input
                    type="text"
                    value={editingPost.slug}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, slug: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{t('admin.blog.publishedDate')}</label>
                  <input
                    type="date"
                    value={editingPost.publishedAt}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, publishedAt: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Bilingual Tab Switcher for Content & Title */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono uppercase text-zinc-400 text-[11px] font-bold">
                    Bilingual Content (EN / AR)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('en')}
                      className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                        activeLangTab === 'en'
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLangTab('ar')}
                      className={`px-3 py-1 rounded-lg font-mono transition-colors ${
                        activeLangTab === 'ar'
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      العربية
                    </button>
                  </div>
                </div>

                {/* Title and Excerpt */}
                <div className="space-y-3" dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}>
                  <div>
                    <label className="block text-zinc-400 mb-1 font-mono">
                      {t('admin.blog.postTitle')} ({activeLangTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={editingPost.title[activeLangTab] || ''}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          title: { ...editingPost.title, [activeLangTab]: e.target.value },
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-mono">
                      {t('admin.blog.postExcerpt')} ({activeLangTab.toUpperCase()})
                    </label>
                    <textarea
                      rows={2}
                      value={editingPost.excerpt[activeLangTab] || ''}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          excerpt: { ...editingPost.excerpt, [activeLangTab]: e.target.value },
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Markdown Content (For Articles) */}
                  {editingPost.type === 'article' && (
                    <div>
                      <label className="block text-zinc-400 mb-1 font-mono">
                        {t('admin.blog.markdownContent')} ({activeLangTab.toUpperCase()})
                      </label>
                      <textarea
                        rows={8}
                        value={
                          editingPost.content
                            ? editingPost.content[activeLangTab] || ''
                            : ''
                        }
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            content: {
                              en: editingPost.content?.en || '',
                              ar: editingPost.content?.ar || '',
                              [activeLangTab]: e.target.value,
                            },
                          })
                        }
                        placeholder="# Heading&#10;&#10;Paragraph text with **bold** or *italic*..."
                        className="w-full font-mono bg-white/5 border border-white/10 rounded-xl p-3 text-zinc-200 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* External URL & Embed URL (for Videos & Social) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{t('admin.blog.externalUrl')}</label>
                  <input
                    type="url"
                    value={editingPost.externalUrl || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, externalUrl: e.target.value })
                    }
                    placeholder="https://youtube.com/watch?v=... or TikTok URL"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">Embed URL (Optional)</label>
                  <input
                    type="url"
                    value={editingPost.embedUrl || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, embedUrl: e.target.value })
                    }
                    placeholder="https://www.youtube-nocookie.com/embed/..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Cover Image & Thumbnail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{t('admin.blog.coverImage')}</label>
                  <input
                    type="url"
                    value={editingPost.coverImage || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, coverImage: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">Reading Time / Duration</label>
                  <input
                    type="text"
                    value={editingPost.readingTime || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, readingTime: e.target.value })
                    }
                    placeholder="e.g. 4 min read or 02:45"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Tags & Views */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">{t('admin.blog.tags')}</label>
                  <input
                    type="text"
                    value={(editingPost.tags || []).join(', ')}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">Author</label>
                  <input
                    type="text"
                    value={editingPost.author || 'Youssef Mohamed'}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, author: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Checkboxes: Published & Featured */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/10 font-mono">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPost.published}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, published: e.target.checked })
                    }
                    className="rounded bg-white/5 border-white/20 text-emerald-500 focus:ring-0"
                  />
                  <span>{t('admin.blog.published')}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPost.featured}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, featured: e.target.checked })
                    }
                    className="rounded bg-white/5 border-white/20 text-amber-500 focus:ring-0"
                  />
                  <span>{t('admin.blog.featured')}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
