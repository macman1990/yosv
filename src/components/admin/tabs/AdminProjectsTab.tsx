import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Project, VideoPlatform, AspectRatio } from '../../../types/portfolio';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Star,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Film,
  Sparkles,
  Save,
  X,
  Play,
} from 'lucide-react';

export const AdminProjectsTab: React.FC = () => {
  const { data, saveData, addToast, language } = usePortfolio();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<'basic' | 'video' | 'caseStudy'>('basic');

  const projects = [...(data.projects || [])].sort((a, b) => a.order - b.order);

  const handleCreateNew = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: { en: 'New Video Project', ar: 'مشروع فيديو جديد' },
      subtitle: { en: 'Commercial Post-Production', ar: 'إنتاج إعلاني' },
      description: {
        en: 'A high-yield video production edit crafted with dynamic pacing and sound design.',
        ar: 'مشروع فيديو تم تحريره بأسلوب سينمائي مبتكر وهندسة صوتية متقدمة.',
      },
      category: 'short-form',
      client: 'Brand Partner',
      date: '2025',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80',
      previewVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
      fullVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      aspectRatio: '16:9',
      autoplay: false,
      muted: true,
      loop: false,
      controls: true,
      toolsUsed: ['Premiere Pro', 'After Effects'],
      skills: ['Editing', 'Sound Design'],
      tags: ['Commercial', 'Dynamic'],
      featured: false,
      status: 'published',
      order: projects.length + 1,
      results: { en: '2.4M Views • +45% Retention', ar: '2.4 مليون مشاهدة • +45% زيادة الاحتفاظ' },
      caseStudy: {
        enabled: true,
        challenge: { en: 'High drop-off in the first 3 seconds.', ar: 'نسبة انخفاض عالية في أول 3 ثوانٍ.' },
        strategy: { en: 'Re-engineered the cold-open with an audio hook.', ar: 'إعادة هندسة المشهد الافتتاحي بخطاف صوتي.' },
        editingApproach: { en: 'Micro-cuts matching the musical beat.', ar: 'تقطيعات سريعة متناغمة مع الإيقاع الموسيقي.' },
        storytellingApproach: { en: 'Open loop narrative technique.', ar: 'تقنية الحلقة المفتوحة لسرد القصة.' },
        metrics: [{ label: { en: 'View Duration', ar: 'مدة المشاهدة' }, value: '+68%' }],
      },
    };
    setEditingProject(newProj);
    setActiveFormTab('basic');
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;

    const existingIndex = projects.findIndex((p) => p.id === editingProject.id);
    let updatedProjects: Project[];

    if (existingIndex >= 0) {
      updatedProjects = [...projects];
      updatedProjects[existingIndex] = editingProject;
    } else {
      updatedProjects = [...projects, editingProject];
    }

    const updatedData = { ...data, projects: updatedProjects };
    await saveData(updatedData);
    setEditingProject(null);
    addToast('Project saved successfully!', 'success');
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Delete this project permanently?')) return;
    const filtered = projects.filter((p) => p.id !== id);
    await saveData({ ...data, projects: filtered });
    addToast('Project deleted', 'info');
  };

  const handleDuplicateProject = async (proj: Project) => {
    const duplicated: Project = {
      ...proj,
      id: `proj-${Date.now()}`,
      title: {
        en: `${proj.title.en} (Copy)`,
        ar: `${proj.title.ar} (نسخة)`,
      },
      order: projects.length + 1,
    };
    const updated = [...projects, duplicated];
    await saveData({ ...data, projects: updated });
    addToast('Project duplicated', 'success');
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const newArr = [...projects];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    // update orders
    newArr.forEach((p, idx) => {
      p.order = idx + 1;
    });

    await saveData({ ...data, projects: newArr });
  };

  const handleToggleFeatured = async (id: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    await saveData({ ...data, projects: updated });
  };

  const handleToggleStatus = async (id: string) => {
    const updated = projects.map((p) =>
      p.id === id
        ? {
            ...p,
            status: (p.status === 'published' ? 'draft' : 'published') as 'published' | 'draft',
          }
        : p
    );
    await saveData({ ...data, projects: updated });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Projects & Video Library</h2>
          <p className="text-xs text-zinc-400">
            Total {projects.length} project showcases in portfolio
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects List Table / Cards */}
      <div className="space-y-3">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="p-4 rounded-2xl bg-[#12141c] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              {/* Thumbnail preview */}
              <div className="w-16 h-12 rounded-lg bg-black overflow-hidden relative shrink-0 border border-white/10">
                <img
                  src={proj.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{proj.title.en}</h4>
                  {proj.featured && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase ${
                      proj.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  {proj.client} • {proj.platform} ({proj.aspectRatio}) • {proj.category}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 self-end md:self-center">
              <button
                type="button"
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-20"
                title="Move Up"
              >
                <MoveUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === projects.length - 1}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-20"
                title="Move Down"
              >
                <MoveDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleToggleFeatured(proj.id)}
                className={`p-2 rounded-lg border ${
                  proj.featured
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-white/5 border-transparent text-zinc-400 hover:text-white'
                }`}
                title="Toggle Featured"
              >
                <Star className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleToggleStatus(proj.id)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                title="Toggle Published / Draft"
              >
                {proj.status === 'published' ? (
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleDuplicateProject(proj)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                title="Duplicate"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setEditingProject(proj)}
                className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                title="Edit Project"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProject(proj.id)}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25"
                title="Delete Project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editing / Modal Drawer */}
      {editingProject && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#0e0f14] border border-white/15 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#12141a]">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Film className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">
                  {editingProject.id.startsWith('proj-') ? 'Edit Project' : 'New Project'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tab Switch */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10 bg-black/40 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveFormTab('basic')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeFormTab === 'basic'
                    ? 'bg-emerald-500 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                1. Info & Content
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('video')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeFormTab === 'video'
                    ? 'bg-emerald-500 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                2. Video & Media
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('caseStudy')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  activeFormTab === 'caseStudy'
                    ? 'bg-emerald-500 text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                3. Case Study Builder
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 overflow-y-auto space-y-4">
              {activeFormTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Title (English) *</label>
                      <input
                        type="text"
                        value={editingProject.title.en}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            title: { ...editingProject.title, en: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">العنوان (عربي) *</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={editingProject.title.ar}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            title: { ...editingProject.title, ar: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Subtitle (English)</label>
                      <input
                        type="text"
                        value={editingProject.subtitle.en}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            subtitle: { ...editingProject.subtitle, en: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">العنوان الفرعي (عربي)</label>
                      <input
                        type="text"
                        dir="rtl"
                        value={editingProject.subtitle.ar}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            subtitle: { ...editingProject.subtitle, ar: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, category: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14161f] border border-white/10 text-white text-xs"
                      >
                        <option value="short-form">Short-Form (Reels / TikTok)</option>
                        <option value="youtube">YouTube Long-Form</option>
                        <option value="motion-graphics">Motion Graphics</option>
                        <option value="color-grading">Color Grading</option>
                        <option value="script-writing">Script Writing</option>
                        <option value="sound-design">Sound Design</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Client / Brand</label>
                      <input
                        type="text"
                        value={editingProject.client}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, client: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Year / Date</label>
                      <input
                        type="text"
                        value={editingProject.date}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, date: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400">Key Results / Metric Pill</label>
                    <input
                      type="text"
                      value={editingProject.results?.en || ''}
                      placeholder="e.g. 5.2M Views • +72% Retention Rate"
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          results: {
                            en: e.target.value,
                            ar: editingProject.results?.ar || e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400">
                      Tools Used (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={editingProject.toolsUsed?.join(', ') || ''}
                      placeholder="Premiere Pro, DaVinci Resolve, Blender"
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          toolsUsed: e.target.value.split(',').map((s) => s.trim()),
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>
              )}

              {activeFormTab === 'video' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Video Platform</label>
                      <select
                        value={editingProject.platform}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            platform: e.target.value as VideoPlatform,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14161f] border border-white/10 text-white text-xs"
                      >
                        <option value="youtube">YouTube</option>
                        <option value="vimeo">Vimeo</option>
                        <option value="tiktok">TikTok</option>
                        <option value="instagram">Instagram Reel</option>
                        <option value="direct">Direct MP4 URL / Cloud Storage</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-zinc-400">Aspect Ratio</label>
                      <select
                        value={editingProject.aspectRatio}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            aspectRatio: e.target.value as AspectRatio,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14161f] border border-white/10 text-white text-xs"
                      >
                        <option value="16:9">16:9 (Standard YouTube / Widescreen)</option>
                        <option value="9:16">9:16 (Vertical Reel / TikTok / Shorts)</option>
                        <option value="21:9">21:9 (Cinematic Ultra-Wide)</option>
                        <option value="4:5">4:5 (Instagram Portrait)</option>
                        <option value="1:1">1:1 (Square)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400">
                      Thumbnail Image URL *
                    </label>
                    <input
                      type="url"
                      value={editingProject.thumbnail}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, thumbnail: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400">
                      Full Video Stream URL (YouTube, Vimeo, or MP4) *
                    </label>
                    <input
                      type="url"
                      value={editingProject.fullVideoUrl || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, fullVideoUrl: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-400">
                      Preview Video URL (Plays muted on card hover)
                    </label>
                    <input
                      type="url"
                      value={editingProject.previewVideoUrl || ''}
                      placeholder="https://example.com/preview.mp4"
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, previewVideoUrl: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>
              )}

              {activeFormTab === 'caseStudy' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <input
                      type="checkbox"
                      id="cs-enabled"
                      checked={editingProject.caseStudy?.enabled || false}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          caseStudy: {
                            enabled: e.target.checked,
                            challenge: editingProject.caseStudy?.challenge || { en: '', ar: '' },
                            strategy: editingProject.caseStudy?.strategy || { en: '', ar: '' },
                            editingApproach: editingProject.caseStudy?.editingApproach || { en: '', ar: '' },
                            storytellingApproach: editingProject.caseStudy?.storytellingApproach || { en: '', ar: '' },
                          },
                        })
                      }
                      className="w-4 h-4 accent-emerald-500"
                    />
                    <label htmlFor="cs-enabled" className="text-xs font-bold text-white">
                      Enable In-Depth Case Study Modal for this project
                    </label>
                  </div>

                  {editingProject.caseStudy?.enabled && (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">The Challenge (EN)</label>
                        <textarea
                          rows={2}
                          value={editingProject.caseStudy.challenge?.en || ''}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              caseStudy: {
                                ...editingProject.caseStudy!,
                                challenge: {
                                  ...editingProject.caseStudy!.challenge,
                                  en: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">Creative Strategy (EN)</label>
                        <textarea
                          rows={2}
                          value={editingProject.caseStudy.strategy?.en || ''}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              caseStudy: {
                                ...editingProject.caseStudy!,
                                strategy: {
                                  ...editingProject.caseStudy!.strategy,
                                  en: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-zinc-400">Editing Approach (EN)</label>
                        <textarea
                          rows={2}
                          value={editingProject.caseStudy.editingApproach?.en || ''}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              caseStudy: {
                                ...editingProject.caseStudy!,
                                editingApproach: {
                                  ...editingProject.caseStudy!.editingApproach,
                                  en: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-[#12141a]">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProject}
                className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black shadow-md"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
