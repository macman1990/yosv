import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ToolItem, Skill } from '../../../types/portfolio';
import { Plus, Trash2, Edit2, Cpu, Flame, X } from 'lucide-react';

export const AdminToolsSkillsTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();

  const [activeSection, setActiveSection] = useState<'tools' | 'skills'>('tools');
  const [editingTool, setEditingTool] = useState<ToolItem | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const tools = [...(data.tools || [])].sort((a, b) => a.order - b.order);
  const skills = [...(data.skills || [])].sort((a, b) => a.order - b.order);

  const handleSaveTool = async () => {
    if (!editingTool) return;
    const index = tools.findIndex((t) => t.id === editingTool.id);
    let updated: ToolItem[];
    if (index >= 0) {
      updated = [...tools];
      updated[index] = editingTool;
    } else {
      updated = [...tools, editingTool];
    }
    await saveData({ ...data, tools: updated });
    setEditingTool(null);
    addToast('Software tool saved!', 'success');
  };

  const handleDeleteTool = async (id: string) => {
    if (!window.confirm('Delete this tool?')) return;
    const filtered = tools.filter((t) => t.id !== id);
    await saveData({ ...data, tools: filtered });
    addToast('Tool deleted', 'info');
  };

  const handleSaveSkill = async () => {
    if (!editingSkill) return;
    const index = skills.findIndex((s) => s.id === editingSkill.id);
    let updated: Skill[];
    if (index >= 0) {
      updated = [...skills];
      updated[index] = editingSkill;
    } else {
      updated = [...skills, editingSkill];
    }
    await saveData({ ...data, skills: updated });
    setEditingSkill(null);
    addToast('Skill saved!', 'success');
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm('Delete this skill?')) return;
    const filtered = skills.filter((s) => s.id !== id);
    await saveData({ ...data, skills: filtered });
    addToast('Skill deleted', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sub-tab selection */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSection('tools')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === 'tools'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Software Applications ({tools.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('skills')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === 'skills'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Core Disciplines ({skills.length})</span>
          </button>
        </div>

        {activeSection === 'tools' ? (
          <button
            type="button"
            onClick={() =>
              setEditingTool({
                id: `tool-${Date.now()}`,
                name: 'New Software',
                icon: 'Cpu',
                skillLevel: 90,
                yearsUsed: 3,
                description: { en: 'Tool description', ar: 'وصف الأداة' },
                category: 'editing',
                order: tools.length + 1,
                visible: true,
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tool</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              setEditingSkill({
                id: `skill-${Date.now()}`,
                name: { en: 'New Discipline', ar: 'مهارة جديدة' },
                level: 95,
                category: 'technical',
                order: skills.length + 1,
                enabled: true,
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
        )}
      </div>

      {/* Tools View */}
      {activeSection === 'tools' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-4 rounded-2xl bg-[#12141c] border border-white/10 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{tool.name}</h4>
                  <p className="text-xs text-zinc-400 font-mono">
                    {tool.yearsUsed} yrs • {tool.skillLevel}% mastery • {tool.category}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingTool(tool)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTool(tool.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2">{tool.description.en}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills View */}
      {activeSection === 'skills' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-2xl bg-[#12141c] border border-white/10 flex items-center justify-between"
            >
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{skill.name.en}</h4>
                <p className="text-xs text-emerald-400 font-mono">{skill.level}% proficiency</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingSkill(skill)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Tool Modal */}
      {editingTool && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1015] border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Edit Software Tool</h3>
              <button
                type="button"
                onClick={() => setEditingTool(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Software Name</label>
                <input
                  type="text"
                  value={editingTool.name}
                  onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Mastery Level (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={editingTool.skillLevel}
                    onChange={(e) =>
                      setEditingTool({ ...editingTool, skillLevel: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400">Years Experience</label>
                  <input
                    type="number"
                    min="1"
                    value={editingTool.yearsUsed}
                    onChange={(e) =>
                      setEditingTool({ ...editingTool, yearsUsed: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Description (EN)</label>
                <textarea
                  rows={2}
                  value={editingTool.description.en}
                  onChange={(e) =>
                    setEditingTool({
                      ...editingTool,
                      description: { ...editingTool.description, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingTool(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTool}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-500 hover:bg-emerald-400 text-black"
              >
                Save Tool
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Skill Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1015] border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Edit Core Discipline</h3>
              <button
                type="button"
                onClick={() => setEditingSkill(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Skill Name (English)</label>
                <input
                  type="text"
                  value={editingSkill.name.en}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      name: { ...editingSkill.name, en: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">اسم المهارة (عربي)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={editingSkill.name.ar}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      name: { ...editingSkill.name, ar: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-zinc-400">Mastery Level (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={editingSkill.level}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingSkill(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSkill}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-500 hover:bg-emerald-400 text-black"
              >
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
