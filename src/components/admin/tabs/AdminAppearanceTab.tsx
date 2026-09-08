import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AppearanceSettings } from '../../../types/portfolio';
import { Save, Palette, MousePointer, SunMedium, Moon, Sparkles } from 'lucide-react';

export const AdminAppearanceTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    accentColor: data.appearance?.accentColor || '#10b981',
    secondaryAccent: data.appearance?.secondaryAccent || '#06b6d4',
    defaultTheme: data.appearance?.defaultTheme || 'dark',
    customCursorEnabled: data.appearance?.customCursorEnabled !== false,
    filmGrainEnabled: data.appearance?.filmGrainEnabled !== false,
    heroStyle: data.appearance?.heroStyle || 'cinematic',
    navigationMode: data.appearance?.navigationMode || 'slider',
  });

  const handleSave = async () => {
    await saveData({ ...data, appearance });
    addToast('Design tokens & appearance settings saved!', 'success');
  };

  const presetColors = [
    { name: 'Emerald Cyber', hex: '#10b981' },
    { name: 'Cyan Neon', hex: '#06b6d4' },
    { name: 'Electric Violet', hex: '#8b5cf6' },
    { name: 'Amber Gold', hex: '#f59e0b' },
    { name: 'Rose Crimson', hex: '#f43f5e' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-syne">Visual Aesthetics & Theme Tokens</h2>
          <p className="text-xs text-zinc-400">
            Customize futuristic accent colors, interactive cursor physics, and default theme
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Appearance</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accent Colors */}
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold tracking-wider">
            <Palette className="w-4 h-4" />
            <span>Color Architecture</span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">Primary Accent Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.accentColor}
                  onChange={(e) => setAppearance({ ...appearance, accentColor: e.target.value })}
                  className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={appearance.accentColor}
                  onChange={(e) => setAppearance({ ...appearance, accentColor: e.target.value })}
                  className="w-32 px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-mono text-zinc-500">Color Presets:</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {presetColors.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setAppearance({ ...appearance, accentColor: color.hex })}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-zinc-300"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-xs font-mono text-zinc-400">Secondary Accent Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={appearance.secondaryAccent}
                  onChange={(e) =>
                    setAppearance({ ...appearance, secondaryAccent: e.target.value })
                  }
                  className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={appearance.secondaryAccent}
                  onChange={(e) =>
                    setAppearance({ ...appearance, secondaryAccent: e.target.value })
                  }
                  className="w-32 px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Features */}
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Experience & Interaction</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Custom Futuristic Cursor</h4>
                <p className="text-xs text-zinc-400">
                  Precision dot with spring halo and hover PLAY badges
                </p>
              </div>
              <input
                type="checkbox"
                checked={appearance.customCursorEnabled}
                onChange={(e) =>
                  setAppearance({ ...appearance, customCursorEnabled: e.target.checked })
                }
                className="w-5 h-5 accent-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Default Theme Mode</h4>
                <p className="text-xs text-zinc-400">
                  Atmosphere loaded when a client first visits
                </p>
              </div>
              <select
                value={appearance.defaultTheme}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    defaultTheme: e.target.value as 'dark' | 'light',
                  })
                }
                className="px-3 py-1.5 rounded-xl bg-[#0f1015] border border-white/10 text-white text-xs font-mono"
              >
                <option value="dark">Dark Cinema</option>
                <option value="light">Refined Light</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Public Navigation Mode</h4>
                <p className="text-xs text-zinc-400">
                  Cinematic scene timeline slider vs Continuous reel vertical scroll
                </p>
              </div>
              <select
                value={appearance.navigationMode || 'slider'}
                onChange={(e) =>
                  setAppearance({
                    ...appearance,
                    navigationMode: e.target.value as 'slider' | 'scroll',
                  })
                }
                className="px-3 py-1.5 rounded-xl bg-[#0f1015] border border-white/10 text-white text-xs font-mono"
              >
                <option value="slider">Cinematic Scene Slider (Timeline)</option>
                <option value="scroll">Continuous Reel (Vertical Scroll)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
