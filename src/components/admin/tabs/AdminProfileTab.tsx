import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ProfileData, ContactSettings } from '../../../types/portfolio';
import { Save, User, FileText, MapPin, Mail, Phone } from 'lucide-react';

export const AdminProfileTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();

  const [profile, setProfile] = useState<ProfileData>({ ...data.profile });
  const [contact, setContact] = useState<ContactSettings>({ ...data.contact });

  const handleSave = async () => {
    await saveData({ ...data, profile, contact });
    addToast('Profile & Contact details updated!', 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Identity & Biography Settings</h2>
          <p className="text-xs text-zinc-400">
            Configure primary personal brand info, bilingual statements, and direct channels
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Identification */}
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono">
            Identity & Naming
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">Full Name (English)</label>
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
              <label className="text-xs font-mono text-zinc-400">Professional Title (EN)</label>
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
              <label className="text-xs font-mono text-zinc-400">Profile Image URL</label>
              <input
                type="url"
                value={profile.photoUrl}
                onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">CV / Resume PDF URL</label>
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
              <label className="text-xs font-mono text-zinc-400">Years Experience</label>
              <input
                type="number"
                min="0"
                value={profile.yearsExperience}
                onChange={(e) => setProfile({ ...profile, yearsExperience: parseInt(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">Location</label>
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
            Direct Booking & Channels
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">Primary Contact Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">WhatsApp Direct Number</label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">Form CTA Headline (EN)</label>
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
            <label className="text-xs font-mono text-zinc-400">Confirmation Success Message (EN)</label>
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
            Editorial Story & Philosophy
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">Short Bio (EN)</label>
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
            <label className="text-xs font-mono text-zinc-400">Long Bio / Creative Background (EN)</label>
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
            <label className="text-xs font-mono text-zinc-400">Personal Editing Philosophy Quote (EN)</label>
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
