import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { MediaAsset } from '../../../types/portfolio';
import { Image as ImageIcon, Video, Plus, Copy, Trash2, Check, ExternalLink } from 'lucide-react';

export const AdminMediaLibraryTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'other'>('all');

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<'image' | 'video'>('image');

  const mediaList = [...(data.media || [])]
    .filter((asset) => {
      const matchesFilter = filter === 'all' ? true : asset.type === filter || (filter === 'other' && !['image', 'video'].includes(asset.type));
      const query = search.trim().toLowerCase();
      const matchesSearch = !query || asset.name.toLowerCase().includes(query) || asset.url.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => (b.uploadedAt || '').localeCompare(a.uploadedAt || ''));

  const handleAddMedia = async () => {
    if (!newUrl.trim()) {
      addToast('Please enter a valid URL', 'error');
      return;
    }

    const asset: MediaAsset = {
      id: `media-${Date.now()}`,
      name: newTitle.trim() || (newType === 'video' ? 'Video Asset' : 'Image Asset'),
      url: newUrl.trim(),
      type: newType,
      size: '2.4 MB',
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    const updated = [asset, ...mediaList];
    await saveData({ ...data, media: updated });
    setShowAddModal(false);
    setNewTitle('');
    setNewUrl('');
    addToast('Asset added to library!', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Remove this asset from media library?')) return;
    const filtered = mediaList.filter((m) => m.id !== id);
    await saveData({ ...data, media: filtered });
    addToast('Media asset deleted', 'info');
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    addToast('Media URL copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Media Library</h2>
          <p className="text-xs text-zinc-400">
            Catalog of video clips, poster thumbnails, client logos, and production stills
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search assets..."
          className="w-full sm:max-w-xs px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'image' | 'video' | 'other')}
          className="px-3 py-2 rounded-xl bg-[#14161f] border border-white/10 text-white text-xs"
        >
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaList.map((asset) => {
          const isCopied = copiedId === asset.id;
          return (
            <div
              key={asset.id}
              className="p-3 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col justify-between space-y-3 group"
            >
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
                {asset.type === 'video' ? (
                  <video
                    src={asset.url}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                )}
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-black/70 text-emerald-400 border border-emerald-500/30">
                  {asset.type}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white truncate">{asset.name}</h4>
                <p className="text-[10px] font-mono text-zinc-500 truncate">{asset.uploadedAt}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => handleCopy(asset.url, asset.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(asset.id)}
                  className="p-1 rounded-lg text-rose-400 hover:text-rose-300"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1015] border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Add Media URL</h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Media Title</label>
                <input
                  type="text"
                  placeholder="e.g. Nike Commercial 4K Still"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Asset Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as 'image' | 'video')}
                  className="w-full px-3 py-2 rounded-xl bg-[#14161f] border border-white/10 text-white text-xs"
                >
                  <option value="image">Image / Poster</option>
                  <option value="video">Direct MP4 Video</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Direct URL *</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddMedia}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-500 hover:bg-emerald-400 text-black"
              >
                Add Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
