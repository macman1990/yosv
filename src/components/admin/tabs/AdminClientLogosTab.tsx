import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Save, Plus, Trash2, GripVertical, ArrowDown, ArrowUp } from 'lucide-react';
import { ClientLogo } from '../../../types/portfolio';

export const AdminClientLogosTab: React.FC = () => {
  const { data, updateData, language, addToast } = usePortfolio();
  const [logos, setLogos] = useState(data.clientLogos || []);

  const addLogo = () => {
    setLogos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: 'New client',
        logoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80',
        websiteUrl: 'https://example.com',
        visible: true,
        order: prev.length + 1,
      },
    ]);
  };

  const updateLogo = <K extends keyof ClientLogo>(id: string, field: K, value: ClientLogo[K]) => {
    setLogos((prev) => prev.map((logo) => (logo.id === id ? { ...logo, [field]: value } : logo)));
  };

  const moveLogo = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= logos.length) return;
    const next = [...logos];
    [next[index], next[target]] = [next[target], next[index]];
    setLogos(next.map((logo, logoIndex) => ({ ...logo, order: logoIndex + 1 })));
  };

  const removeLogo = (id: string) => {
    setLogos((prev) => prev.filter((logo) => logo.id !== id));
  };

  const handleSave = async () => {
    const next = {
      ...data,
      clientLogos: logos,
      siteFeatures: {
        ...data.siteFeatures,
        clientLogos: logos.length > 0,
      },
    };

    const ok = await updateData(next);
    if (ok) {
      addToast(language === 'ar' ? 'تم حفظ شعارات العملاء.' : 'Client logos saved.', 'success');
    } else {
      addToast(language === 'ar' ? 'فشل حفظ شعارات العملاء.' : 'Failed to save client logos.', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">{language === 'ar' ? 'شعارات العملاء' : 'Client Logos'}</h2>
          <p className="text-xs text-zinc-400">{language === 'ar' ? 'قائمة المتعاونين أو العلامات التجارية الموثوقة.' : 'Trusted-by brands and collaboration list.'}</p>
        </div>
        <button type="button" onClick={addLogo} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white">
          <Plus className="h-4 w-4" />
          {language === 'ar' ? 'إضافة' : 'Add'}
        </button>
      </div>

      <div className="space-y-3">
        {logos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-6 text-sm text-zinc-400">
            {language === 'ar' ? 'لا توجد شعارات بعد.' : 'No client logos yet.'}
          </div>
        ) : (
          logos.map((logo) => (
            <div key={logo.id} className="rounded-2xl border border-white/10 bg-[#12141c] p-3">
              <div className="flex items-center justify-between gap-2 pb-3">
                <div className="flex items-center gap-2 text-zinc-400">
                  <GripVertical className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">{language === 'ar' ? 'شعار' : 'Logo'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveLogo(logos.indexOf(logo), -1)} disabled={logos.indexOf(logo) === 0} className="rounded-lg p-1.5 text-zinc-400 hover:text-white disabled:opacity-30" aria-label={language === 'ar' ? 'تحريك الشعار لأعلى' : 'Move logo up'}><ArrowUp className="h-4 w-4" /></button>
                  <button type="button" onClick={() => moveLogo(logos.indexOf(logo), 1)} disabled={logos.indexOf(logo) === logos.length - 1} className="rounded-lg p-1.5 text-zinc-400 hover:text-white disabled:opacity-30" aria-label={language === 'ar' ? 'تحريك الشعار لأسفل' : 'Move logo down'}><ArrowDown className="h-4 w-4" /></button>
                  <button type="button" onClick={() => removeLogo(logo.id)} className="rounded-lg p-1.5 text-zinc-400 hover:text-red-400" aria-label={language === 'ar' ? 'حذف الشعار' : 'Remove logo'}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'الاسم' : 'Name'}</label>
                  <input value={logo.name} onChange={(e) => updateLogo(logo.id, 'name', e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'رابط الصورة' : 'Image URL'}</label>
                  <input value={logo.logoUrl} onChange={(e) => updateLogo(logo.id, 'logoUrl', e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'رابط الموقع (اختياري)' : 'Website URL (optional)'}</label>
                  <input value={logo.websiteUrl || ''} onChange={(e) => updateLogo(logo.id, 'websiteUrl', e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'الحالة' : 'Visibility'}</label>
                  <button type="button" aria-pressed={logo.visible} onClick={() => updateLogo(logo.id, 'visible', !logo.visible)} className={`w-full rounded-xl border px-3 py-2.5 text-sm transition ${logo.visible ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-white/10 bg-black/40 text-zinc-400'}`}>
                    {logo.visible ? (language === 'ar' ? 'مرئي' : 'Visible') : (language === 'ar' ? 'مخفي' : 'Hidden')}
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-2.5">
                <img src={logo.logoUrl} alt="" className="h-12 w-20 rounded-lg border border-white/10 bg-white/5 object-contain" />
                <span className="text-xs text-zinc-400">{language === 'ar' ? 'معاينة الشعار' : 'Logo preview'}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
        <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black">
          <Save className="h-4 w-4" />
          {language === 'ar' ? 'حفظ' : 'Save'}
        </button>
      </div>
    </div>
  );
};
