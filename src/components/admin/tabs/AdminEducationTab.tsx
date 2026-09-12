import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Certification, Education } from '../../../types/portfolio';
import { Plus, Trash2, Edit2, Award, GraduationCap, X } from 'lucide-react';

export const AdminEducationTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();

  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const certs = [...(data.certifications || [])];
  const education = [...(data.education || [])];

  const handleSaveCert = async () => {
    if (!editingCert) return;
    const index = certs.findIndex((c) => c.id === editingCert.id);
    let updated: Certification[];
    if (index >= 0) {
      updated = [...certs];
      updated[index] = editingCert;
    } else {
      updated = [...certs, editingCert];
    }
    await saveData({ ...data, certifications: updated });
    setEditingCert(null);
    addToast('Certification updated!', 'success');
  };

  const handleDeleteCert = async (id: string) => {
    if (!window.confirm('Delete this certification?')) return;
    const filtered = certs.filter((c) => c.id !== id);
    await saveData({ ...data, certifications: filtered });
    addToast('Certification deleted', 'info');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Certifications header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Certifications & Accreditations</h2>
          <p className="text-xs text-zinc-400">
            Showcase verified training from Blackmagic Design, Adobe, and universities
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditingCert({
              id: `cert-${Date.now()}`,
              name: { en: 'Certified Post-Production Professional', ar: 'محترف ما بعد الإنتاج المعتمد' },
              organization: 'Blackmagic Design',
              date: '2024',
              credentialId: 'BMD-9982',
              credentialUrl: 'https://blackmagicdesign.com',
              description: { en: 'Advanced editorial mastery', ar: 'إتقان متقدم للمونتاج' },
              featured: false,
              visible: true,
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>New Certification</span>
        </button>
      </div>

      {/* Certifications Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex items-start justify-between gap-3"
          >
            <div>
              <h4 className="text-sm font-bold text-white">{cert.name.en}</h4>
              <p className="text-xs text-emerald-400 font-mono">
                {cert.organization} • {cert.date}
              </p>
              {cert.credentialId && (
                <p className="text-[11px] text-zinc-500 font-mono mt-1">ID: {cert.credentialId}</p>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setEditingCert(cert)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCert(cert.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Cert Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1015] border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Edit Certification</h3>
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Certification Name (EN)</label>
                <input
                  type="text"
                  value={editingCert.name.en}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      name: { ...editingCert.name, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Issuing Organization</label>
                  <input
                    type="text"
                    value={editingCert.organization}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, organization: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Year</label>
                  <input
                    type="text"
                    value={editingCert.date}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Credential Verification URL</label>
                <input
                  type="url"
                  value={editingCert.credentialUrl || ''}
                  onChange={(e) =>
                    setEditingCert({ ...editingCert, credentialUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCert}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-500 hover:bg-emerald-400 text-black"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
