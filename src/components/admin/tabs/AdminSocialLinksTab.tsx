import React, { useMemo, useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SocialLink } from '../../../types/portfolio';
import { Plus, Edit2, Trash2, X, ArrowUp, ArrowDown } from 'lucide-react';

const PLATFORM_OPTIONS = ['instagram', 'tiktok', 'youtube', 'linkedin', 'facebook', 'x', 'behance', 'github', 'website', 'email'];

export const AdminSocialLinksTab: React.FC = () => {
  const { data, saveData, addToast, language } = usePortfolio();
  const tx = (en: string, ar: string) => language === 'ar' ? ar : en;
  const [editing, setEditing] = useState<SocialLink | null>(null);

  const socialLinks = useMemo(
    () => [...(data.socialLinks || [])].sort((a, b) => a.order - b.order),
    [data.socialLinks]
  );

  const handleCreateNew = () => {
    const next: SocialLink = {
      id: `social-${Date.now()}`,
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com',
      icon: 'Linkedin',
      order: socialLinks.length + 1,
      visible: true,
    };
    setEditing(next);
  };

  const handleSave = async () => {
    if (!editing) return;
    const index = socialLinks.findIndex((item) => item.id === editing.id);
    const updated = index >= 0 ? socialLinks.map((item) => (item.id === editing.id ? editing : item)) : [...socialLinks, editing];
    await saveData({ ...data, socialLinks: updated });
    setEditing(null);
    addToast(tx('Social link saved', 'تم حفظ الرابط الاجتماعي.'), 'success');
  };

  const reorder = async (id: string, direction: 'up' | 'down') => {
    const next = [...socialLinks];
    const index = next.findIndex((item) => item.id === id);
    if (index < 0) return;
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= next.length) return;
    const temp = next[index];
    next[index] = next[swapIndex];
    next[swapIndex] = temp;
    next.forEach((item, idx) => { item.order = idx + 1; });
    await saveData({ ...data, socialLinks: next });
    addToast(tx('Link order updated', 'تم تحديث ترتيب الروابط.'), 'info');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(tx('Delete this social link?', 'هل تريد حذف هذا الرابط الاجتماعي؟'))) return;
    const filtered = socialLinks.filter((item) => item.id !== id);
    filtered.forEach((item, idx) => { item.order = idx + 1; });
    await saveData({ ...data, socialLinks: filtered });
    addToast(tx('Social link deleted', 'تم حذف الرابط الاجتماعي.'), 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">{tx('Social Links', 'الروابط الاجتماعية')}</h2>
          <p className="text-xs text-zinc-400">{tx('Expose public channels without exposing the CMS itself.', 'اعرض قنوات التواصل العامة دون كشف لوحة الإدارة.')}</p>
        </div>
        <button type="button" onClick={handleCreateNew} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-emerald-400">
          <Plus className="h-4 w-4" />
          {tx('New Link', 'رابط جديد')}
        </button>
      </div>

      <div className="space-y-3">
        {socialLinks.map((link) => (
          <div key={link.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#12141c] p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">{link.platform}</div>
              <div>
                <p className="text-sm font-semibold text-white">{link.label}</p>
                <p className="text-[11px] text-zinc-400">{link.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => reorder(link.id, 'up')} aria-label={tx('Move link up', 'تحريك الرابط لأعلى')} title={tx('Move up', 'تحريك لأعلى')} className="rounded-lg bg-white/5 p-1.5 text-zinc-300 hover:bg-white/10"><ArrowUp className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={() => reorder(link.id, 'down')} aria-label={tx('Move link down', 'تحريك الرابط لأسفل')} title={tx('Move down', 'تحريك لأسفل')} className="rounded-lg bg-white/5 p-1.5 text-zinc-300 hover:bg-white/10"><ArrowDown className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={() => setEditing(link)} aria-label={tx('Edit link', 'تعديل الرابط')} title={tx('Edit link', 'تعديل الرابط')} className="rounded-lg bg-white/5 p-1.5 text-zinc-300 hover:bg-white/10"><Edit2 className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={() => handleDelete(link.id)} aria-label={tx('Delete link', 'حذف الرابط')} title={tx('Delete link', 'حذف الرابط')} className="rounded-lg bg-rose-500/10 p-1.5 text-rose-400 hover:bg-rose-500/20"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/15 bg-[#0f1015] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">{tx('Edit Social Link', 'تعديل الرابط الاجتماعي')}</h3>
              <button type="button" onClick={() => setEditing(null)} className="text-zinc-400 hover:text-white"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{tx('Platform', 'المنصة')}</label>
                  <select value={editing.platform} onChange={(e) => setEditing({ ...editing, platform: e.target.value as SocialLink['platform'] })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white">
                    {PLATFORM_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{tx('Label', 'التسمية')}</label>
                  <input value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">URL</label>
                <input value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{tx('Icon Key', 'مفتاح الأيقونة')}</label>
                <input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#14161f] p-3">
                <span className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{tx('Visible on public site', 'ظاهر على الموقع العام')}</span>
                <button type="button" onClick={() => setEditing({ ...editing, visible: !editing.visible })} className={`rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] ${editing.visible ? 'bg-emerald-500 text-black' : 'bg-white/5 text-zinc-300'}`}>
                  {editing.visible ? tx('Visible', 'مرئي') : tx('Hidden', 'مخفي')}
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-white/10 pt-4">
              <button type="button" onClick={() => setEditing(null)} className="rounded-xl px-4 py-2 text-xs text-zinc-400 hover:text-white">{tx('Cancel', 'إلغاء')}</button>
              <button type="button" onClick={handleSave} className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-emerald-400">Save Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
