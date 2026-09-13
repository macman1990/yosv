import React, { useMemo, useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ServicePackage } from '../../../types/portfolio';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const AdminPricingTab: React.FC = () => {
  const { data, saveData, addToast, language } = usePortfolio();
  const tx = (en: string, ar: string) => language === 'ar' ? ar : en;
  const [editing, setEditing] = useState<ServicePackage | null>(null);

  const packages = useMemo(
    () => [...(data.servicePackages || [])].sort((a, b) => a.order - b.order),
    [data.servicePackages]
  );

  const handleCreateNew = () => {
    const next: ServicePackage = {
      id: `package-${Date.now()}`,
      name: { en: 'Signature Package', ar: 'باقة مميزة' },
      tagline: { en: 'For brands that need consistent content momentum', ar: 'للماركات التي تحتاج إلى زخم مستمر في المحتوى' },
      description: {
        en: 'A strategic content package for creators and teams that want consistent publishing without sacrificing quality.',
        ar: 'باقة محتوى استراتيجية للمبدعين والفِرَق التي ترغب في نشر منتظم بدون التضحية بالجودة.',
      },
      price: 650,
      currency: 'USD',
      billing: { en: 'per month', ar: 'شهرياً' },
      features: ['Monthly content planning', '2 short-form edits', 'Brand-safe captions'],
      ctaText: { en: 'Book package', ar: 'احجز الباقة' },
      featured: false,
      presentation: 'standard',
      order: packages.length + 1,
      visible: true,
      status: 'published',
    };
    setEditing(next);
  };

  const handleSave = async () => {
    if (!editing) return;
    const index = packages.findIndex((item) => item.id === editing.id);
    const updated = index >= 0 ? packages.map((item) => (item.id === editing.id ? editing : item)) : [...packages, editing];
    await saveData({ ...data, servicePackages: updated });
    setEditing(null);
    addToast(tx('Package saved successfully', 'تم حفظ الباقة بنجاح.'), 'success');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(tx('Delete this pricing package?', 'هل تريد حذف باقة التسعير هذه؟'))) return;
    const filtered = packages.filter((item) => item.id !== id);
    await saveData({ ...data, servicePackages: filtered });
    addToast(tx('Package removed', 'تم حذف الباقة.'), 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">{tx('Pricing & Service Packages', 'باقات التسعير والخدمات')}</h2>
          <p className="text-xs text-zinc-400">{tx('Create easy entry points for client work and retainers.', 'أنشئ عروضًا واضحة لأعمال العملاء والباقات المتكررة.')}</p>
        </div>
        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          {tx('New Package', 'باقة جديدة')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="rounded-2xl border border-white/10 bg-[#12141c] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">{pkg.featured ? tx('Featured', 'مميزة') : tx('Package', 'باقة')}</p>
                <h3 className="mt-2 text-lg font-bold text-white">{pkg.name.en}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setEditing(pkg)} aria-label={tx('Edit package', 'تعديل الباقة')} title={tx('Edit package', 'تعديل الباقة')} className="rounded-lg bg-white/5 p-1.5 text-zinc-300 hover:bg-white/10"><Edit2 className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => handleDelete(pkg.id)} aria-label={tx('Delete package', 'حذف الباقة')} title={tx('Delete package', 'حذف الباقة')} className="rounded-lg bg-rose-500/10 p-1.5 text-rose-400 hover:bg-rose-500/20"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>

            <div className="mb-3 flex items-end gap-2">
              <span className="text-3xl font-black text-white">{pkg.currency} {pkg.price}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">{pkg.billing.en}</span>
            </div>

            <p className="text-xs text-zinc-400">{pkg.tagline.en}</p>

            <ul className="mt-4 space-y-2 text-xs text-zinc-300">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0f1015] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">{tx('Package Editor', 'محرر الباقة')}</h3>
              <button type="button" onClick={() => setEditing(null)} className="text-zinc-400 hover:text-white"><X className="h-4 w-4" /></button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{tx('Name (EN)', 'الاسم (EN)')}</label>
                <input value={editing.name.en} onChange={(e) => setEditing({ ...editing, name: { ...editing.name, en: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">الاسم (AR)</label>
                <input dir="rtl" value={editing.name.ar} onChange={(e) => setEditing({ ...editing, name: { ...editing.name, ar: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{tx('Tagline (EN)', 'الشعار (EN)')}</label>
                <input value={editing.tagline.en} onChange={(e) => setEditing({ ...editing, tagline: { ...editing.tagline, en: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">الشعار (AR)</label>
                <input dir="rtl" value={editing.tagline.ar} onChange={(e) => setEditing({ ...editing, tagline: { ...editing.tagline, ar: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{tx('Description (EN)', 'الوصف (EN)')}</label>
                <textarea rows={3} value={editing.description.en} onChange={(e) => setEditing({ ...editing, description: { ...editing.description, en: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Price</label>
                <input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value || 0) })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Currency</label>
                <input value={editing.currency} onChange={(e) => setEditing({ ...editing, currency: e.target.value.toUpperCase() })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Presentation variant</label>
                <select value={editing.presentation || (editing.featured ? 'premium' : 'standard')} onChange={(e) => setEditing({ ...editing, presentation: e.target.value as ServicePackage['presentation'] })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white">
                  <option value="basic">Basic</option><option value="standard">Standard / Mid</option><option value="premium">Premium</option><option value="professional">Professional</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Billing (EN)</label>
                <input value={editing.billing.en} onChange={(e) => setEditing({ ...editing, billing: { ...editing.billing, en: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">الفوترة (AR)</label>
                <input dir="rtl" value={editing.billing.ar} onChange={(e) => setEditing({ ...editing, billing: { ...editing.billing, ar: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Features (one per line)</label>
                <textarea rows={4} value={editing.features.join('\n')} onChange={(e) => setEditing({ ...editing, features: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean) })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">CTA (EN)</label>
                <input value={editing.ctaText.en} onChange={(e) => setEditing({ ...editing, ctaText: { ...editing.ctaText, en: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">دعوة (AR)</label>
                <input dir="rtl" value={editing.ctaText.ar} onChange={(e) => setEditing({ ...editing, ctaText: { ...editing.ctaText, ar: e.target.value } })} className="w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#14161f] p-3 md:col-span-2">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Featured</p>
                </div>
                <button type="button" onClick={() => setEditing({ ...editing, featured: !editing.featured })} className={`rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] ${editing.featured ? 'bg-emerald-500 text-black' : 'bg-white/5 text-zinc-300'}`}>
                  {editing.featured ? 'Yes' : 'No'}
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-white/10 pt-4">
              <button type="button" onClick={() => setEditing(null)} className="rounded-xl px-4 py-2 text-xs text-zinc-400 hover:text-white">{tx('Cancel', 'إلغاء')}</button>
              <button type="button" onClick={handleSave} className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-emerald-400">{tx('Save Package', 'حفظ الباقة')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
