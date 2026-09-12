import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ContentItem, VideoPlatform } from '../../../types/portfolio';
import { Plus, Trash2, Edit2, Video, X } from 'lucide-react';

export const AdminContentTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const contentItems = [...(data.contentItems || [])].sort((a, b) => a.order - b.order);

  const handleSave = async () => {
    if (!editingItem) return;
    const index = contentItems.findIndex((c) => c.id === editingItem.id);
    let updated: ContentItem[];
    if (index >= 0) {
      updated = [...contentItems];
      updated[index] = editingItem;
    } else {
      updated = [...contentItems, editingItem];
    }
    await saveData({ ...data, contentItems: updated });
    setEditingItem(null);
    addToast('Content item updated!', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this content item?')) return;
    const filtered = contentItems.filter((c) => c.id !== id);
    await saveData({ ...data, contentItems: filtered });
    addToast('Content item deleted', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Content Creator Hub</h2>
          <p className="text-xs text-zinc-400">
            Publish and manage YouTube essays, TikTok series, viral breakdowns, and scripts
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditingItem({
              id: `content-${Date.now()}`,
              type: 'youtube',
              title: { en: 'New Creator Video', ar: 'فيديو محتوى جديد' },
              description: {
                en: 'Deep dive analytical breakdown with motion graphic overlays.',
                ar: 'تحليل سينمائي عميق مع مؤثرات بصرية وتصميم حركي.',
              },
              thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
              mediaUrl: 'https://youtube.com',
              platform: 'youtube',
              date: '2025',
              views: '450K',
              order: contentItems.length + 1,
              visible: true,
              status: 'published',
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>New Content Piece</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contentItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              {item.thumbnail && (
                <div className="w-16 h-12 rounded-lg bg-black overflow-hidden relative shrink-0">
                  <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.platform} • {item.type}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{item.title.en}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5">
                  {item.description.en}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setEditingItem(item)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1015] border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Edit Content Piece</h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Title (EN)</label>
                <input
                  type="text"
                  value={editingItem.title.en}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      title: { ...editingItem.title, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Platform</label>
                  <select
                    value={editingItem.platform}
                    onChange={(e) => {
                      const value = e.target.value;
                      switch (value) {
                        case 'youtube':
                        case 'vimeo':
                        case 'tiktok':
                        case 'instagram':
                        case 'facebook':
                        case 'direct':
                        case 'embed':
                          setEditingItem({ ...editingItem, platform: value });
                          break;
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="direct">Direct</option>
                    <option value="embed">Embed</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Views Counter</label>
                  <input
                    type="text"
                    value={editingItem.views || ''}
                    placeholder="e.g. 1.2M"
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, views: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Thumbnail URL</label>
                <input
                  type="url"
                  value={editingItem.thumbnail || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, thumbnail: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Target Video/Article URL</label>
                <input
                  type="url"
                  value={editingItem.mediaUrl || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, mediaUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-500 hover:bg-emerald-400 text-black"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
