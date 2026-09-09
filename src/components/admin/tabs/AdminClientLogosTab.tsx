import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';

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

  const updateLogo = (id: string, field: string, value: string | boolean | number) => {
    setLogos((prev) => prev.map((logo) => (logo.id === id ? { ...logo, [field]: value } : logo)));
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
                <button type="button" onClick={() => removeLogo(logo.id)} className="text-zinc-400 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Name</label>
                  <input value={logo.name} onChange={(e) => updateLogo(logo.id, 'name', e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Image URL</label>
                  <input value={logo.logoUrl} onChange={(e) => updateLogo(logo.id, 'logoUrl', e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Visible</label>
                  <button type="button" onClick={() => updateLogo(logo.id, 'visible', !logo.visible)} className={`w-full rounded-xl border px-3 py-2.5 text-sm transition ${logo.visible ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' : 'border-white/10 bg-black/40 text-zinc-400'}`}>
                    {logo.visible ? (language === 'ar' ? 'مرئي' : 'Visible') : (language === 'ar' ? 'مخفي' : 'Hidden')}
                  </button>
                </div>
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
