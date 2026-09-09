import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Save, CheckCircle2, X } from 'lucide-react';

export const AdminStartProjectTab: React.FC = () => {
  const { data, updateData, language, addToast } = usePortfolio();
  const [config, setConfig] = useState({
    enabled: typeof data.siteFeatures?.startProject === 'boolean' ? data.siteFeatures.startProject : true,
    ctaEn: data.contact?.ctaText?.en || 'Start a Project',
    ctaAr: data.contact?.ctaText?.ar || 'ابدأ مشروعًا',
    descriptionEn: 'Tell me what you’re building, the content goal, and the timeline.',
    descriptionAr: 'أخبرني ما الذي تود إنشاؤه، هدف المحتوى، والجدول الزمني.',
    destination: 'contact',
    opensInquiry: true,
    scrollsToContact: true,
    dedicatedPage: false,
  });

  const handleSave = async () => {
    const nextData = {
      ...data,
      siteFeatures: {
        ...data.siteFeatures,
        startProject: config.enabled,
      },
      contact: {
        ...data.contact,
        ctaText: {
          ...data.contact.ctaText,
          en: config.ctaEn,
          ar: config.ctaAr,
        },
      },
    };

    const ok = await updateData(nextData);
    if (ok) {
      addToast(language === 'ar' ? 'تم حفظ إعدادات ابدأ مشروعًا.' : 'Start a Project settings saved.', 'success');
    } else {
      addToast(language === 'ar' ? 'فشل حفظ الإعدادات.' : 'Failed to save settings.', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">{language === 'ar' ? 'ابدأ مشروعًا' : 'Start a Project'}</h2>
          <p className="text-xs text-zinc-400">{language === 'ar' ? 'إعداد زر التحويل العام ومحتوى الحث.' : 'Configure the public conversion CTA and its behavior.'}</p>
        </div>
        <button
          type="button"
          onClick={() => setConfig((prev) => ({ ...prev, enabled: !prev.enabled }))}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${config.enabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}
        >
          <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${config.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'نص الزر (EN)' : 'Button text (EN)'}</label>
          <input
            value={config.ctaEn}
            onChange={(e) => setConfig({ ...config, ctaEn: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'نص الزر (AR)' : 'Button text (AR)'}</label>
          <input
            dir="rtl"
            value={config.ctaAr}
            onChange={(e) => setConfig({ ...config, ctaAr: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'الوصف (EN)' : 'Description (EN)'}</label>
          <textarea
            rows={3}
            value={config.descriptionEn}
            onChange={(e) => setConfig({ ...config, descriptionEn: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'الوصف (AR)' : 'Description (AR)'}</label>
          <textarea
            dir="rtl"
            rows={3}
            value={config.descriptionAr}
            onChange={(e) => setConfig({ ...config, descriptionAr: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Destination</label>
          <select
            value={config.destination}
            onChange={(e) => setConfig({ ...config, destination: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white"
          >
            <option value="contact">Contact</option>
            <option value="inquiry">Inquiry Flow</option>
            <option value="custom">Dedicated Page</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">Status</label>
          <div className="flex h-[46px] items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{config.enabled ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { key: 'opensInquiry', label: 'Opens inquiry flow', labelAr: 'يفتح نموذج الاستفسار' },
          { key: 'scrollsToContact', label: 'Scrolls to contact', labelAr: 'ينزلق إلى التواصل' },
          { key: 'dedicatedPage', label: 'Dedicated page', labelAr: 'صفحة مخصصة' },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setConfig((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] as any }))}
            className={`rounded-2xl border p-3 text-left transition ${config[item.key as keyof typeof config] ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 bg-[#12141c]'}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-white">{language === 'ar' ? item.labelAr : item.label}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${config[item.key as keyof typeof config] ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
            </div>
          </button>
        ))}
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
