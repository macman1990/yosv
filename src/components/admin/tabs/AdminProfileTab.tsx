import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ProfileData, ContactSettings } from '../../../types/portfolio';
import { Save, User, FileText, MapPin, Mail, Phone } from 'lucide-react';

export const AdminProfileTab: React.FC = () => {
  const { data, saveData, addToast, language } = usePortfolio();
  const tx = (en: string, ar: string) => language === 'ar' ? ar : en;

  const [profile, setProfile] = useState<ProfileData>({ ...data.profile });
  const [contact, setContact] = useState<ContactSettings>({ ...data.contact });

  const handleSave = async () => {
    await saveData({ ...data, profile, contact });
    addToast(tx('Profile & Contact details updated!', 'تم تحديث بيانات الملف الشخصي والتواصل.'), 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">{tx('Identity & Biography Settings', 'إعدادات الهوية والسيرة')}</h2>
          <p className="text-xs text-zinc-400">{tx('Configure primary personal brand info, bilingual statements, and direct channels', 'اضبط معلومات العلامة الشخصية والبيانات الثنائية اللغة وقنوات التواصل المباشر')}</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{tx('Save Profile', 'حفظ الملف الشخصي')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Identification */}
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono">
            {tx('Identity & Naming', 'الهوية والتسمية')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">{tx('Full Name (English)', 'الاسم الكامل (الإنجليزية)')}</label>
              <input
                type="text"
                value={profile.name.en}
                onChange={(e) => setProfile({ ...profile, name: { ...profile.name, en: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">الاسم الكامل (عربي)</label>
              <input
                type="text"
                dir="rtl"
                value={profile.name.ar}
                onChange={(e) => setProfile({ ...profile, name: { ...profile.name, ar: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">{tx('Professional Title (EN)', 'المسمى المهني (EN)')}</label>
              <input
                type="text"
                value={profile.title.en}
                onChange={(e) => setProfile({ ...profile, title: { ...profile.title, en: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">المسمى المهني (عربي)</label>
              <input
                type="text"
                dir="rtl"
                value={profile.title.ar}
                onChange={(e) => setProfile({ ...profile, title: { ...profile.title, ar: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">{tx('Profile Image URL', 'رابط صورة الملف الشخصي')}</label>
              <input
                type="url"
                value={profile.photoUrl}
                onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">{tx('CV / Resume PDF URL', 'رابط ملف السيرة الذاتية PDF')}</label>
              <input
                type="url"
                value={profile.cvUrl || ''}
                onChange={(e) => setProfile({ ...profile, cvUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">{tx('Years Experience', 'سنوات الخبرة')}</label>
              <input
                type="number"
                min="0"
                value={profile.yearsExperience}
                onChange={(e) => setProfile({ ...profile, yearsExperience: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">{tx('Location', 'الموقع')}</label>
              <input
                type="text"
                value={profile.location.en}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    location: { en: e.target.value, ar: profile.location.ar },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono">
            {tx('Direct Booking & Channels', 'الحجز المباشر وقنوات التواصل')}
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">{tx('Primary Contact Email', 'البريد الإلكتروني الأساسي')}</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">{tx('WhatsApp Direct Number', 'رقم واتساب المباشر')}</label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">{tx('Form CTA Headline (EN)', 'عنوان زر النموذج (EN)')}</label>
            <input
              type="text"
              value={contact.ctaText.en}
              onChange={(e) =>
                setContact({
                  ...contact,
                  ctaText: { ...contact.ctaText, en: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">{tx('Confirmation Success Message (EN)', 'رسالة التأكيد عند النجاح (EN)')}</label>
            <textarea
              rows={2}
              value={contact.successMessage.en}
              onChange={(e) =>
                setContact({
                  ...contact,
                  successMessage: { ...contact.successMessage, en: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
            />
          </div>
        </div>

        {/* Biographies */}
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4 lg:col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono">
            {tx('Editorial Story & Philosophy', 'القصة التحريرية والفلسفة')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">{tx('Short Bio (EN)', 'نبذة مختصرة (EN)')}</label>
              <textarea
                rows={2}
                value={profile.shortBio.en}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    shortBio: { ...profile.shortBio, en: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">نبذة مختصرة (عربي)</label>
              <textarea
                rows={2}
                dir="rtl"
                value={profile.shortBio.ar}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    shortBio: { ...profile.shortBio, ar: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">{tx('Long Bio / Creative Background (EN)', 'السيرة المطولة / الخلفية الإبداعية (EN)')}</label>
            <textarea
              rows={4}
              value={profile.longBio.en}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  longBio: { ...profile.longBio, en: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">{tx('Personal Editing Philosophy Quote (EN)', 'اقتباس فلسفة المونتاج الشخصية (EN)')}</label>
            <input
              type="text"
              value={profile.philosophy.en}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  philosophy: { ...profile.philosophy, en: e.target.value },
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
