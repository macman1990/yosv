import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { SiteFeatureFlags } from '../../../types/portfolio';

const FEATURE_META: { key: keyof SiteFeatureFlags; en: string; ar: string; descriptionEn: string; descriptionAr: string }[] = [
  { key: 'startProject', en: 'Start a Project', ar: 'ابدأ مشروع', descriptionEn: 'Public inquiry CTA and conversion flow.', descriptionAr: 'زر طلب المشروع وتدفق التحويل العام.' },
  { key: 'projectBrief', en: 'Project Brief', ar: 'تفاصيل المشروع', descriptionEn: 'Project brief URL field in the inquiry flow.', descriptionAr: 'حقل رابط تفاصيل المشروع في نموذج الطلب.' },
  { key: 'availability', en: 'Availability Status', ar: 'حالة التوفر', descriptionEn: 'Show availability near the CTA area.', descriptionAr: 'عرض حالة التوفر بجانب منطقة الاتصال الرئيسية.' },
  { key: 'clientLogos', en: 'Trusted By', ar: 'عملاء وثقوا بي', descriptionEn: 'Show client logos and trust strip.', descriptionAr: 'عرض شريط عملاء موثوقين وشعاراتهم.' },
  { key: 'testimonials', en: 'Testimonials', ar: 'آراء العملاء', descriptionEn: 'Public testimonial cards and social proof.', descriptionAr: 'بطاقات آراء العملاء والدليل الاجتماعي العام.' },
  { key: 'packages', en: 'Packages', ar: 'الباقات', descriptionEn: 'Public pricing/package cards.', descriptionAr: 'بطاقات الأسعار والباقات العامة.' },
  { key: 'blog', en: 'Blog', ar: 'المدونة', descriptionEn: 'General blog and editorial posts.', descriptionAr: 'مقالات المدونة والتحرير العامة.' },
  { key: 'contentHub', en: 'Content Hub', ar: 'مركز المحتوى', descriptionEn: 'Content library and platform posts.', descriptionAr: 'مكتبة المحتوى والمنشورات عبر المنصات.' },
];

export const AdminFeatureFlagsTab: React.FC = () => {
  const { data, updateData, language } = usePortfolio();

  const handleToggle = async (key: keyof SiteFeatureFlags) => {
    await updateData({
      ...data,
      siteFeatures: {
        ...data.siteFeatures,
        [key]: !data.siteFeatures[key],
      },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-bold text-white font-syne">Feature Flags</h2>
        <p className="text-xs text-zinc-400">Turn public conversion and trust features on or off without deleting content.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {FEATURE_META.map((feature) => {
          const enabled = data.siteFeatures[feature.key];
          const label = language === 'ar' ? feature.ar : feature.en;
          const description = language === 'ar' ? feature.descriptionAr : feature.descriptionEn;

          return (
            <div key={feature.key} className="rounded-2xl border border-white/10 bg-[#12141c] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">{label}</h3>
                  <p className="text-xs text-zinc-400">{description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(feature.key)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${enabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                  aria-label={`${label} toggle`}
                >
                  <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
