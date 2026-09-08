import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Experience } from '../../../types/portfolio';
import { Plus, Trash2, Edit2, Briefcase, X } from 'lucide-react';

export const AdminExperienceTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const experiences = [...(data.experience || [])].sort((a, b) => a.order - b.order);

  const handleSave = async () => {
    if (!editingExp) return;
    const index = experiences.findIndex((e) => e.id === editingExp.id);
    let updated: Experience[];
    if (index >= 0) {
      updated = [...experiences];
      updated[index] = editingExp;
    } else {
      updated = [...experiences, editingExp];
    }
    await saveData({ ...data, experience: updated });
    setEditingExp(null);
    addToast('Experience saved successfully!', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this career experience?')) return;
    const filtered = experiences.filter((e) => e.id !== id);
    await saveData({ ...data, experience: filtered });
    addToast('Experience removed', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Experience & Career History</h2>
          <p className="text-xs text-zinc-400">
            Timeline of studio positions, leadership roles, and client milestones
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditingExp({
              id: `exp-${Date.now()}`,
              company: 'New Studio / Agency',
              position: { en: 'Senior Video Editor', ar: 'محرر فيديو رئيسي' },
              startDate: '2024',
              endDate: 'Present',
              currentPosition: true,
              description: {
                en: 'Directing post-production pipelines and motion assets.',
                ar: 'إدارة خطوط معالجة الفيديو والمؤثرات البصرية.',
              },
              location: 'Remote',
              responsibilities: [{ en: 'Supervising editorial cuts', ar: 'الإشراف على عمليات المونتاج' }],
              achievements: [{ en: '+50M combined views', ar: '+50 مليون مشاهدة إجمالية' }],
              tools: ['Premiere Pro', 'After Effects'],
              order: experiences.length + 1,
              visible: true,
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h4 className="text-base font-bold text-white">{exp.position.en}</h4>
              <p className="text-xs font-mono text-emerald-400">
                {exp.company} • {exp.startDate} — {exp.currentPosition ? 'Present' : exp.endDate}
              </p>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">{exp.description.en}</p>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                type="button"
                onClick={() => setEditingExp(exp)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingExp && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1015] border border-white/15 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Edit Career Experience</h3>
              <button
                type="button"
                onClick={() => setEditingExp(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Company / Studio</label>
                  <input
                    type="text"
                    value={editingExp.company}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Location</label>
                  <input
                    type="text"
                    value={editingExp.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Position Title (EN)</label>
                <input
                  type="text"
                  value={editingExp.position.en}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      position: { ...editingExp.position, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Start Date</label>
                  <input
                    type="text"
                    value={editingExp.startDate}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">End Date</label>
                  <input
                    type="text"
                    value={editingExp.endDate}
                    disabled={editingExp.currentPosition}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs disabled:opacity-30"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="cur-pos"
                  checked={editingExp.currentPosition}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, currentPosition: e.target.checked })
                  }
                  className="w-4 h-4 accent-emerald-500"
                />
                <label htmlFor="cur-pos" className="text-xs text-white font-mono">
                  Currently active in this position
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Description (EN)</label>
                <textarea
                  rows={2}
                  value={editingExp.description.en}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      description: { ...editingExp.description, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingExp(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
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
