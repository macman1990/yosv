import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Service } from '../../../types/portfolio';
import { Plus, Edit2, Trash2, Layers, X } from 'lucide-react';

export const AdminServicesTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();
  const [editingService, setEditingService] = useState<Service | null>(null);

  const services = [...(data.services || [])].sort((a, b) => a.order - b.order);

  const handleCreateNew = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: { en: 'New Creative Service', ar: 'خدمة إبداعية جديدة' },
      description: {
        en: 'Strategic content production and technical post-processing tailored for brand conversion.',
        ar: 'إنتاج محتوى استراتيجي ومعالجة رقمية متقدمة لتعزيز حضور علامتك التجارية.',
      },
      icon: 'Film',
      tags: ['Production', 'Creative'],
      order: services.length + 1,
      visible: true,
      status: 'published',
    };
    setEditingService(newService);
  };

  const handleSave = async () => {
    if (!editingService) return;
    const index = services.findIndex((s) => s.id === editingService.id);
    let updated: Service[];
    if (index >= 0) {
      updated = [...services];
      updated[index] = editingService;
    } else {
      updated = [...services, editingService];
    }
    await saveData({ ...data, services: updated });
    setEditingService(null);
    addToast('Service saved successfully!', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    const filtered = services.filter((s) => s.id !== id);
    await saveData({ ...data, services: filtered });
    addToast('Service deleted', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Services Management</h2>
          <p className="text-xs text-zinc-400">
            Define your client packages, capabilities, and retainers
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  {service.icon}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingService(service)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(service.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="text-base font-bold text-white">{service.title.en}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{service.description.en}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
              {service.tags?.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {editingService && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1015] border border-white/15 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Edit Service</h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Title (English)</label>
                <input
                  type="text"
                  value={editingService.title.en}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      title: { ...editingService.title, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">العنوان (عربي)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={editingService.title.ar}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      title: { ...editingService.title, ar: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Description (English)</label>
                <textarea
                  rows={3}
                  value={editingService.description.en}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: { ...editingService.description, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Icon Key</label>
                  <select
                    value={editingService.icon}
                    onChange={(e) =>
                      setEditingService({ ...editingService, icon: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#14161f] border border-white/10 text-white text-xs"
                  >
                    <option value="Film">Film</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Feather">Feather</option>
                    <option value="Palette">Palette</option>
                    <option value="Sparkles">Sparkles</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Zap">Zap</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={editingService.tags?.join(', ') || ''}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        tags: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-500 hover:bg-emerald-400 text-black shadow-md"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
