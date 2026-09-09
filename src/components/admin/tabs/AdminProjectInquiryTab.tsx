import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Save, CheckCircle2, X } from 'lucide-react';

export const AdminProjectInquiryTab: React.FC = () => {
  const { data, updateData, language, addToast } = usePortfolio();
  const [enabled, setEnabled] = useState(data.siteFeatures?.projectInquiry ?? true);
  const [briefEnabled, setBriefEnabled] = useState(data.siteFeatures?.projectBrief ?? true);
  const [required, setRequired] = useState(data.contact?.formFields?.projectBriefRequired ?? false);
  const [labelEn, setLabelEn] = useState(data.contact?.formFields?.briefLabelEn || 'Project brief URL');
  const [labelAr, setLabelAr] = useState(data.contact?.formFields?.briefLabelAr || 'رابط تفاصيل المشروع');
  const [placeholderEn, setPlaceholderEn] = useState(data.contact?.formFields?.briefPlaceholderEn || 'https://drive.google.com/...');
  const [placeholderAr, setPlaceholderAr] = useState(data.contact?.formFields?.briefPlaceholderAr || 'https://drive.google.com/...');

  const handleSave = async () => {
    const next = {
      ...data,
      siteFeatures: {
        ...data.siteFeatures,
        projectInquiry: enabled,
        projectBrief: briefEnabled,
      },
      contact: {
        ...data.contact,
        formFields: {
          ...data.contact.formFields,
          showProjectBrief: briefEnabled,
          projectBriefRequired: required,
          briefLabelEn: labelEn,
          briefLabelAr: labelAr,
          briefPlaceholderEn: placeholderEn,
          briefPlaceholderAr: placeholderAr,
        },
      },
    };

    const ok = await updateData(next);
    if (ok) {
      addToast(language === 'ar' ? 'تم حفظ إعدادات استفسارات المشاريع.' : 'Project inquiry settings saved.', 'success');
    } else {
      addToast(language === 'ar' ? 'فشل حفظ الإعدادات.' : 'Failed to save inquiry settings.', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">{language === 'ar' ? 'استفسارات المشاريع' : 'Project Inquiry'}</h2>
          <p className="text-xs text-zinc-400">{language === 'ar' ? 'النموذج العام لاستقبال الطلبات مع رابط تفاصيل المشروع.' : 'Public inquiry flow with a project brief URL field.'}</p>
        </div>
        <button
          type="button"
          onClick={() => setEnabled((prev) => !prev)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${enabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}
        >
          <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'نص حقل الرابط (EN)' : 'Field label (EN)'}</label>
          <input value={labelEn} onChange={(e) => setLabelEn(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'نص حقل الرابط (AR)' : 'Field label (AR)'}</label>
          <input dir="rtl" value={labelAr} onChange={(e) => setLabelAr(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'عنصر نائب (EN)' : 'Placeholder (EN)'}</label>
          <input value={placeholderEn} onChange={(e) => setPlaceholderEn(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'عنصر نائب (AR)' : 'Placeholder (AR)'}</label>
          <input dir="rtl" value={placeholderAr} onChange={(e) => setPlaceholderAr(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <button type="button" onClick={() => setBriefEnabled((prev) => !prev)} className={`rounded-2xl border p-3 text-left transition ${briefEnabled ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 bg-[#12141c]'}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-white">{language === 'ar' ? 'حقل رابط المشروع' : 'Project brief URL field'}</span>
            <span className={`h-2.5 w-2.5 rounded-full ${briefEnabled ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
          </div>
        </button>
        <button type="button" onClick={() => setRequired((prev) => !prev)} className={`rounded-2xl border p-3 text-left transition ${required ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 bg-[#12141c]'}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-white">{language === 'ar' ? 'مطلوب' : 'Required'}</span>
            <span className={`h-2.5 w-2.5 rounded-full ${required ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
          </div>
        </button>
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
