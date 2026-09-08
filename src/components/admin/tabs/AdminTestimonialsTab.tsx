import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Testimonial } from '../../../types/portfolio';
import { Plus, Trash2, Edit2, Star, MessageSquare, X } from 'lucide-react';

export const AdminTestimonialsTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();
  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);

  const testimonials = [...(data.testimonials || [])];

  const handleSave = async () => {
    if (!editingTest) return;
    const index = testimonials.findIndex((t) => t.id === editingTest.id);
    let updated: Testimonial[];
    if (index >= 0) {
      updated = [...testimonials];
      updated[index] = editingTest;
    } else {
      updated = [...testimonials, editingTest];
    }
    await saveData({ ...data, testimonials: updated });
    setEditingTest(null);
    addToast('Testimonial saved!', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const filtered = testimonials.filter((t) => t.id !== id);
    await saveData({ ...data, testimonials: filtered });
    addToast('Testimonial deleted', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Client Testimonials</h2>
          <p className="text-xs text-zinc-400">
            Reviews and endorsements from creators, founders, and directors
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setEditingTest({
              id: `test-${Date.now()}`,
              clientName: 'New Client',
              position: { en: 'Executive Producer', ar: 'منتج تنفيذي' },
              company: 'Global Media',
              photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
              testimonial: {
                en: 'Sensational storytelling instincts and lightning-fast turnover.',
                ar: 'مهارة فائقة في سرد القصص ودقة وسرعة في التسليم.',
              },
              rating: 5,
              project: 'Commercial Reel',
              date: '2025',
              order: testimonials.length + 1,
              visible: true,
            })
          }
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>New Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-white">{item.clientName}</h4>
              <p className="text-xs text-emerald-400 font-mono">
                {item.company} • {item.position.en}
              </p>
              <p className="text-xs text-zinc-400 italic mt-2">"{item.testimonial.en}"</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setEditingTest(item)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTest && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1015] border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Edit Testimonial</h3>
              <button
                type="button"
                onClick={() => setEditingTest(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Client Name</label>
                  <input
                    type="text"
                    value={editingTest.clientName}
                    onChange={(e) =>
                      setEditingTest({ ...editingTest, clientName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Company</label>
                  <input
                    type="text"
                    value={editingTest.company}
                    onChange={(e) => setEditingTest({ ...editingTest, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Testimonial Quote (EN)</label>
                <textarea
                  rows={3}
                  value={editingTest.testimonial.en}
                  onChange={(e) =>
                    setEditingTest({
                      ...editingTest,
                      testimonial: { ...editingTest.testimonial, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Star Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingTest.rating}
                    onChange={(e) =>
                      setEditingTest({ ...editingTest, rating: parseInt(e.target.value) || 5 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Avatar Photo URL</label>
                  <input
                    type="url"
                    value={editingTest.photo || ''}
                    onChange={(e) => setEditingTest({ ...editingTest, photo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingTest(null)}
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
