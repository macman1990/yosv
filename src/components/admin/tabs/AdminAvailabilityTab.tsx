import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AvailabilityStatusValue } from '../../../types/portfolio';
import { Save } from 'lucide-react';

export const AdminAvailabilityTab: React.FC = () => {
  const { data, updateData, language, addToast } = usePortfolio();
  const [visible, setVisible] = useState(typeof data.availability?.visible === 'boolean' ? data.availability.visible : true);
  const [status, setStatus] = useState(data.availability?.status ?? 'available');
  const [labelEn, setLabelEn] = useState(data.availability?.label?.en || 'Available for new projects');
  const [labelAr, setLabelAr] = useState(data.availability?.label?.ar || 'متاح لمشاريع جديدة');
  const [messageEn, setMessageEn] = useState(data.availability?.description?.en || 'Booking for select brand and social campaigns.');
  const [messageAr, setMessageAr] = useState(data.availability?.description?.ar || 'توجد فتحات لمشاريع العلامات التجارية والمحتوى الاجتماعي.');

  const statusLabels = {
    available: language === 'ar' ? 'متاح' : 'Available',
    limited: language === 'ar' ? 'التوفر محدود' : 'Limited Availability',
    booked: language === 'ar' ? 'غير متاح حالياً' : 'Currently Unavailable',
  } as const;

  const handleSave = async () => {
    const next = {
      ...data,
      siteFeatures: {
        ...data.siteFeatures,
        availability: visible,
      },
      availability: {
        ...data.availability,
        visible,
        status,
        label: { en: labelEn, ar: labelAr },
        description: { en: messageEn, ar: messageAr },
      },
    };

    const ok = await updateData(next);
    if (ok) {
      addToast(language === 'ar' ? 'تم حفظ حالة التوفر.' : 'Availability settings saved.', 'success');
    } else {
      addToast(language === 'ar' ? 'فشل حفظ حالة التوفر.' : 'Failed to save availability.', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">{language === 'ar' ? 'حالة التوفر' : 'Availability'}</h2>
          <p className="text-xs text-zinc-400">{language === 'ar' ? 'تحكم في حالة العمل المعروضة للمستخدمين.' : 'Control the public current work status.'}</p>
        </div>
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={language === 'ar' ? (visible ? 'إخفاء حالة التوفر' : 'إظهار حالة التوفر') : (visible ? 'Hide availability' : 'Show availability')}
          aria-pressed={visible}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${visible ? 'bg-emerald-500' : 'bg-zinc-700'}`}
        >
          <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${visible ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'الحالة' : 'Status'}</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as AvailabilityStatusValue)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white">
            <option value="available">{statusLabels.available}</option>
            <option value="limited">{statusLabels.limited}</option>
            <option value="booked">{statusLabels.booked}</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'العنوان (EN)' : 'Label (EN)'}</label>
          <input value={labelEn} onChange={(e) => setLabelEn(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'العنوان (AR)' : 'Label (AR)'}</label>
          <input dir="rtl" value={labelAr} onChange={(e) => setLabelAr(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'الرسالة (EN)' : 'Message (EN)'}</label>
          <textarea rows={3} value={messageEn} onChange={(e) => setMessageEn(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-400">{language === 'ar' ? 'الرسالة (AR)' : 'Message (AR)'}</label>
          <textarea dir="rtl" rows={3} value={messageAr} onChange={(e) => setMessageAr(e.target.value)} className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2" aria-live="polite">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">{language === 'ar' ? 'المعاينة العامة' : 'Public preview'}</p>
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <span className={`h-2.5 w-2.5 rounded-full ${status === 'available' ? 'bg-emerald-400' : status === 'limited' ? 'bg-amber-400' : 'bg-zinc-400'}`} />
          {statusLabels[status as AvailabilityStatusValue]}
        </div>
        <p className="text-xs leading-relaxed text-zinc-400">{language === 'ar' ? messageAr : messageEn}</p>
        <p className="text-[11px] text-zinc-500">{visible ? (language === 'ar' ? 'سيظهر بجانب مسار التواصل.' : 'Shown beside the contact path.') : (language === 'ar' ? 'مخفي عن الزوار.' : 'Hidden from visitors.')}</p>
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
