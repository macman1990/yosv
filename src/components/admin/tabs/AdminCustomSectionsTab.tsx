import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { CustomSection, CustomSectionBlock } from '../../../types/portfolio';
import { Plus, Trash2, Edit2, Component, Eye, EyeOff, X, Layers } from 'lucide-react';

export const AdminCustomSectionsTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();
  const [editingSection, setEditingSection] = useState<CustomSection | null>(null);

  const sections = [...(data.customSections || [])].sort((a, b) => a.order - b.order);

  const handleCreateNew = () => {
    const newSec: CustomSection = {
      id: `sec-${Date.now()}`,
      title: { en: 'Signature Direction', ar: 'الإخراج المميز' },
      subtitle: { en: 'Customized modular block for unique showcases', ar: 'قسم مخصص للمشاريع الحصرية' },
      badge: { en: 'Special Feature', ar: 'ميزة خاصة' },
      order: sections.length + 1,
      visible: true,
      blocks: [
        {
          id: `blk-${Date.now()}-1`,
          type: 'card',
          title: { en: 'Viral Series Retainers', ar: 'سلاسل المحتوى الفيروسي' },
          content: { en: 'Weekly episodic production with custom soundscapes and motion graphics.', ar: 'إنتاج حلقات أسبوعية بمؤثرات بصرية وصوتية مخصصة.' },
          link: '#contact',
        },
      ],
    };
    setEditingSection(newSec);
  };

  const handleSave = async () => {
    if (!editingSection) return;
    const index = sections.findIndex((s) => s.id === editingSection.id);
    let updated: CustomSection[];
    if (index >= 0) {
      updated = [...sections];
      updated[index] = editingSection;
    } else {
      updated = [...sections, editingSection];
    }
    await saveData({ ...data, customSections: updated });
    setEditingSection(null);
    addToast('Custom section saved!', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this custom section?')) return;
    const filtered = sections.filter((s) => s.id !== id);
    await saveData({ ...data, customSections: filtered });
    addToast('Custom section deleted', 'info');
  };

  const handleToggleVisible = async (sec: CustomSection) => {
    const updated = sections.map((s) =>
      s.id === sec.id ? { ...s, visible: !s.visible } : s
    );
    await saveData({ ...data, customSections: updated });
  };

  const handleAddBlock = () => {
    if (!editingSection) return;
    const newBlock: CustomSectionBlock = {
      id: `blk-${Date.now()}`,
      type: 'card',
      title: { en: 'New Showcase Card', ar: 'بطاقة استعراض جديدة' },
      content: { en: 'Block description content here...', ar: 'محتوى البطاقة هنا...' },
    };
    setEditingSection({
      ...editingSection,
      blocks: [...(editingSection.blocks || []), newBlock],
    });
  };

  const handleDeleteBlock = (blockId: string) => {
    if (!editingSection) return;
    setEditingSection({
      ...editingSection,
      blocks: editingSection.blocks.filter((b) => b.id !== blockId),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Custom Section Builder</h2>
          <p className="text-xs text-zinc-400">
            Create modular, future-proof sections with text, media, and interactive cards
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>New Section</span>
        </button>
      </div>

      <div className="space-y-4">
        {sections.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
            <Component className="w-10 h-10 text-zinc-600 mx-auto" />
            <p className="text-xs text-zinc-400">No custom sections created yet.</p>
          </div>
        ) : (
          sections.map((sec) => (
            <div
              key={sec.id}
              className="p-5 rounded-2xl bg-[#12141c] border border-white/10 flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">{sec.title.en}</h4>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                    {sec.blocks?.length || 0} Blocks
                  </span>
                </div>
                {sec.subtitle && (
                  <p className="text-xs text-zinc-400 mt-0.5">{sec.subtitle.en}</p>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleVisible(sec)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                  title="Toggle Visibility"
                >
                  {sec.visible ? (
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSection(sec)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(sec.id)}
                  className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingSection && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1015] border border-white/15 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Configure Custom Section</h3>
              <button
                type="button"
                onClick={() => setEditingSection(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Section Title (EN)</label>
                  <input
                    type="text"
                    value={editingSection.title.en}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        title: { ...editingSection.title, en: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">عنوان القسم (عربي)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editingSection.title.ar}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        title: { ...editingSection.title, ar: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Subtitle (EN)</label>
                <input
                  type="text"
                  value={editingSection.subtitle?.en || ''}
                  onChange={(e) =>
                    setEditingSection({
                      ...editingSection,
                      subtitle: { en: e.target.value, ar: editingSection.subtitle?.ar || '' },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              {/* Blocks management */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    Blocks & Cards ({editingSection.blocks?.length || 0})
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddBlock}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono"
                  >
                    + Add Block
                  </button>
                </div>

                <div className="space-y-2">
                  {editingSection.blocks?.map((block, bIdx) => (
                    <div
                      key={block.id}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500">Block #{bIdx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlock(block.id)}
                          className="text-rose-400 hover:text-rose-300 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        value={block.title?.en || ''}
                        placeholder="Block Title (EN)"
                        onChange={(e) => {
                          const updatedBlocks = [...editingSection.blocks];
                          updatedBlocks[bIdx] = {
                            ...updatedBlocks[bIdx],
                            title: { en: e.target.value, ar: updatedBlocks[bIdx].title?.ar || '' },
                          };
                          setEditingSection({ ...editingSection, blocks: updatedBlocks });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs"
                      />
                      <textarea
                        rows={2}
                        value={block.content?.en || ''}
                        placeholder="Block Content (EN)"
                        onChange={(e) => {
                          const updatedBlocks = [...editingSection.blocks];
                          updatedBlocks[bIdx] = {
                            ...updatedBlocks[bIdx],
                            content: {
                              en: e.target.value,
                              ar: updatedBlocks[bIdx].content?.ar || '',
                            },
                          };
                          setEditingSection({ ...editingSection, blocks: updatedBlocks });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-500 hover:bg-emerald-400 text-black"
              >
                Save Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
