import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { getSectionDefinition, isSectionEnabled, normalizeSectionOrder } from '../../../lib/sectionRegistry';
import { SectionOrderItem } from '../../../types/portfolio';
import { ArrowDown, ArrowUp, Eye, EyeOff, Save } from 'lucide-react';

export const AdminPageOrderTab: React.FC = () => {
  const { data, language, saveData, addToast } = usePortfolio();
  const [items, setItems] = useState<SectionOrderItem[]>(() => normalizeSectionOrder(data.sectionOrder));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(normalizeSectionOrder(data.sectionOrder));
  }, [data.sectionOrder]);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    setItems(next.map((item, itemIndex) => ({ ...item, order: itemIndex + 1 })));
  };

  const toggle = (index: number) => {
    setItems(items.map((item, itemIndex) => itemIndex === index ? { ...item, visible: item.visible === false } : item));
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const saved = await saveData({ ...data, sectionOrder: items });
      addToast(saved ? 'Page order saved.' : 'Page order could not be saved.', saved ? 'success' : 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="font-syne text-xl font-bold text-white">Page Order</h2>
          <p className="text-xs text-zinc-400">Arrange public sections independently from navigation order. Visibility and feature flags are both respected.</p>
        </div>
        <button type="button" onClick={handleSave} disabled={saving} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black disabled:opacity-50"><Save className="h-4 w-4" />{saving ? 'Saving...' : 'Save Page Order'}</button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const section = getSectionDefinition(item.id);
          if (!section) return null;
          const enabled = isSectionEnabled(data, section);
          const label = section.label[language];
          return (
            <div key={item.id} className={`flex items-center gap-3 rounded-2xl border p-4 ${item.visible === false ? 'border-white/5 bg-white/[0.02] opacity-60' : 'border-white/10 bg-[#12141c]'}`}>
              <span className="w-8 font-mono text-xs text-zinc-500">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-[11px] text-zinc-500">{section.label.en} {section.featureKeys?.length ? `• ${enabled ? 'Feature enabled' : 'Feature disabled'}` : ''}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="rounded-lg bg-white/5 p-2 text-zinc-300 disabled:opacity-30" title="Move up" aria-label={`Move ${label} up`}><ArrowUp className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} className="rounded-lg bg-white/5 p-2 text-zinc-300 disabled:opacity-30" title="Move down" aria-label={`Move ${label} down`}><ArrowDown className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => toggle(index)} className="rounded-lg bg-white/5 p-2 text-zinc-300" title={item.visible === false ? 'Show section' : 'Hide section'} aria-label={`${item.visible === false ? 'Show' : 'Hide'} ${label}`}>{item.visible === false ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5 text-emerald-400" />}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
