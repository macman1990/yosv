import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AppearanceSettings } from '../../../types/portfolio';
import { Save, Palette, MousePointer, SunMedium, Moon, Sparkles } from 'lucide-react';
import { THEME_REGISTRY, normalizeThemeName } from '../../../lib/themeRegistry';
import { AdminThemeStudio } from '../AdminThemeStudio';

export const AdminAppearanceTab: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    ...data.appearance,
    accentColor: data.appearance?.accentColor || '#10b981',
    secondaryAccent: data.appearance?.secondaryAccent || '#06b6d4',
    defaultTheme: data.appearance?.defaultTheme || 'dark',
    customCursorEnabled: data.appearance?.customCursorEnabled !== false,
    grainOverlayEnabled: data.appearance?.grainOverlayEnabled !== false,
    motionMode: data.appearance?.motionMode || 'full',
    enable3D: data.appearance?.enable3D !== false,
    threeDIntensity: data.appearance?.threeDIntensity || 'subtle',
    threeDQuality: data.appearance?.threeDQuality || 'auto',
    heroStyle: data.appearance?.heroStyle || 'cinematic',
    navigationMode: data.appearance?.navigationMode || 'slider',
    themeName: normalizeThemeName(data.appearance?.themeName || 'cinematic'),
    backgroundIntensity: data.appearance?.backgroundIntensity || 'medium',
    projectDisplayMode: data.appearance?.projectDisplayMode || 'view-more',
    projectsInitialCount: data.appearance?.projectsInitialCount || 6,
    projectsExpandedCount: data.appearance?.projectsExpandedCount || 12,
    desktopColumns: data.appearance?.desktopColumns || 3,
    tabletColumns: data.appearance?.tabletColumns || 2,
    mobileColumns: data.appearance?.mobileColumns || 1,
    carouselAutoplay: data.appearance?.carouselAutoplay ?? false,
    carouselLoop: data.appearance?.carouselLoop ?? true,
    showCarouselControls: data.appearance?.showCarouselControls ?? true,
    clientMode: {
      enabled: data.appearance?.clientMode?.enabled === true,
      presentation: data.appearance?.clientMode?.presentation === 'client' ? 'client' : 'standard',
    },
  } as AppearanceSettings);

  const selectedTheme = THEME_REGISTRY[normalizeThemeName(appearance.themeName)];

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
      <AdminThemeStudio />
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
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-violet-400 font-mono text-xs uppercase font-bold tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Visual Theme</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono">Current system</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{selectedTheme.name}</h3>
              </div>
              <span className="rounded-full border border-[var(--color-accent)] bg-[var(--accent-muted)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Active
              </span>
            </div>
            <p className="text-sm text-zinc-300">{selectedTheme.description}</p>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
              <div className="rounded-xl bg-black/20 p-2"><span className="block text-zinc-500 uppercase tracking-wide">Material</span><span className="mt-1 block text-zinc-200">{selectedTheme.material}</span></div>
              <div className="rounded-xl bg-black/20 p-2"><span className="block text-zinc-500 uppercase tracking-wide">Motion</span><span className="mt-1 block text-zinc-200">{selectedTheme.motion}</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {Object.values(THEME_REGISTRY).map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setAppearance({ ...appearance, themeName: theme.id as any })}
                className={`rounded-2xl border p-3 text-left transition ${appearance.themeName === theme.id ? 'border-[var(--color-accent)] bg-[var(--accent-muted)]' : 'border-white/10 bg-white/5'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-sm font-semibold text-white">{theme.name}</span>
                    <span className="mt-1 block text-[11px] text-zinc-400">{theme.material}</span>
                  </div>
                  <span className={`h-2.5 w-2.5 rounded-full ${appearance.themeName === theme.id ? 'bg-[var(--color-accent)]' : 'bg-zinc-600'}`} />
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-mono text-zinc-400">Background Intensity</label>
            <select
              value={appearance.backgroundIntensity || 'medium'}
              onChange={(e) => setAppearance({ ...appearance, backgroundIntensity: e.target.value as any })}
              className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white"
            >
              <option value="off">Off</option>
              <option value="subtle">Subtle</option>
              <option value="medium">Medium</option>
              <option value="strong">Strong</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400">Project Display Mode</label>
            <select
              value={appearance.projectDisplayMode || 'view-more'}
              onChange={(e) => setAppearance({ ...appearance, projectDisplayMode: e.target.value as any })}
              className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white"
            >
              <option value="grid">Grid</option>
              <option value="view-more">View More</option>
              <option value="carousel">Carousel</option>
              <option value="horizontal">Horizontal Scroll</option>
              <option value="featured-secondary">Featured + Secondary</option>
              <option value="compact">Compact List</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">Initial Count</label>
              <input
                type="number"
                min={1}
                max={24}
                value={appearance.projectsInitialCount || 6}
                onChange={(e) => setAppearance({ ...appearance, projectsInitialCount: Number(e.target.value) || 6 })}
                className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-zinc-400">Expanded Count</label>
              <input
                type="number"
                min={1}
                max={48}
                value={appearance.projectsExpandedCount || 12}
                onChange={(e) => setAppearance({ ...appearance, projectsExpandedCount: Number(e.target.value) || 12 })}
                className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold tracking-wider"><Sparkles className="w-4 h-4" /><span>Project Presentation</span></div>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1 text-xs font-mono text-zinc-400"><span>Card Size</span><select value={appearance.projectCardSize || 'standard'} onChange={(e) => setAppearance({ ...appearance, projectCardSize: e.target.value as 'compact' | 'standard' | 'large' })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white"><option value="compact">Compact</option><option value="standard">Standard</option><option value="large">Large</option></select></label>
              <label className="space-y-1 text-xs font-mono text-zinc-400"><span>Project Gap</span><input type="number" min={8} max={64} value={appearance.projectGap || 24} onChange={(e) => setAppearance({ ...appearance, projectGap: Number(e.target.value) || 24 })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white" /></label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <label className="space-y-1 text-xs font-mono text-zinc-400"><span>Desktop</span><select value={appearance.desktopColumns || 3} onChange={(e) => setAppearance({ ...appearance, desktopColumns: Number(e.target.value) })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white"><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option></select></label>
              <label className="space-y-1 text-xs font-mono text-zinc-400"><span>Tablet</span><select value={appearance.tabletColumns || 2} onChange={(e) => setAppearance({ ...appearance, tabletColumns: Number(e.target.value) })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white"><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option></select></label>
              <label className="space-y-1 text-xs font-mono text-zinc-400"><span>Mobile</span><select value={appearance.mobileColumns || 1} onChange={(e) => setAppearance({ ...appearance, mobileColumns: Number(e.target.value) })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white"><option value={1}>1</option><option value={2}>2</option></select></label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1 text-xs font-mono text-zinc-400"><span>Featured Count</span><input type="number" min={1} max={4} value={appearance.featuredCount || 1} onChange={(e) => setAppearance({ ...appearance, featuredCount: Number(e.target.value) || 1 })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white" /></label>
              <label className="space-y-1 text-xs font-mono text-zinc-400"><span>Secondary Count</span><input type="number" min={1} max={12} value={appearance.secondaryCount || 4} onChange={(e) => setAppearance({ ...appearance, secondaryCount: Number(e.target.value) || 4 })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white" /></label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-300"><span>View More</span><input type="checkbox" checked={appearance.viewMoreEnabled !== false} onChange={(e) => setAppearance({ ...appearance, viewMoreEnabled: e.target.checked })} className="h-4 w-4 accent-emerald-500" /></label>
              <label className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-300"><span>Carousel Controls</span><input type="checkbox" checked={appearance.showCarouselControls !== false} onChange={(e) => setAppearance({ ...appearance, showCarouselControls: e.target.checked })} className="h-4 w-4 accent-emerald-500" /></label>
              <label className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-300"><span>Carousel Autoplay</span><input type="checkbox" checked={appearance.carouselAutoplay === true} onChange={(e) => setAppearance({ ...appearance, carouselAutoplay: e.target.checked })} className="h-4 w-4 accent-emerald-500" /></label>
              <label className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-zinc-300"><span>Carousel Loop</span><input type="checkbox" checked={appearance.carouselLoop !== false} onChange={(e) => setAppearance({ ...appearance, carouselLoop: e.target.checked })} className="h-4 w-4 accent-emerald-500" /></label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1 text-xs font-mono text-zinc-400"><span>View More EN</span><input type="text" value={appearance.viewMoreLabelEn || 'View More'} onChange={(e) => setAppearance({ ...appearance, viewMoreLabelEn: e.target.value })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white" /></label>
              <label className="space-y-1 text-xs font-mono text-zinc-400"><span>View More AR</span><input type="text" value={appearance.viewMoreLabelAr || 'المزيد'} onChange={(e) => setAppearance({ ...appearance, viewMoreLabelAr: e.target.value })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white" /></label>
            </div>
          </div>
        </div>

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

            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider"><Sparkles className="w-4 h-4" /><span>Client Presentation</span></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 space-y-3">
                <label className="flex items-center justify-between gap-3 text-xs text-zinc-300">
                  <span>
                    <span className="block font-semibold text-white">Enable Client Mode</span>
                    <span className="mt-1 block text-[11px] text-zinc-500">Allows the focused client presentation at <span className="font-mono">?mode=client</span>.</span>
                  </span>
                  <input type="checkbox" checked={appearance.clientMode?.enabled === true} onChange={(e) => setAppearance({ ...appearance, clientMode: { enabled: e.target.checked, presentation: appearance.clientMode?.presentation || 'standard' } })} className="h-4 w-4 accent-emerald-500" />
                </label>
                <label className="space-y-1 text-xs font-mono text-zinc-400">
                  <span>Default Presentation</span>
                  <select value={appearance.clientMode?.presentation || 'standard'} onChange={(e) => setAppearance({ ...appearance, clientMode: { enabled: appearance.clientMode?.enabled === true, presentation: e.target.value === 'client' ? 'client' : 'standard' } })} className="w-full rounded-xl bg-black/50 border border-white/10 px-3 py-2 text-sm text-white">
                    <option value="standard">Standard Portfolio</option>
                    <option value="client">Client Mode</option>
                  </select>
                </label>
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
                <h4 className="text-sm font-bold text-white">Film Grain & Texture</h4>
                <p className="text-xs text-zinc-400">Subtle theme-aware texture behind the portfolio content</p>
              </div>
              <input type="checkbox" checked={appearance.grainOverlayEnabled !== false} onChange={(e) => setAppearance({ ...appearance, grainOverlayEnabled: e.target.checked })} className="w-5 h-5 accent-emerald-500" />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Motion Level</h4>
                <p className="text-xs text-zinc-400">Controls ambient movement and scroll reveals</p>
              </div>
              <select value={appearance.motionMode || 'full'} onChange={(e) => setAppearance({ ...appearance, motionMode: e.target.value as 'full' | 'reduced' | 'off' })} className="px-3 py-1.5 rounded-xl bg-[#0f1015] border border-white/10 text-white text-xs font-mono">
                <option value="full">Full</option>
                <option value="reduced">Reduced</option>
                <option value="off">Off</option>
              </select>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-3.5">
              <div>
                <h4 className="text-sm font-bold text-white">3D Visuals</h4>
                <p className="text-xs text-zinc-400">Optional spatial depth in the public hero. Content remains independent.</p>
              </div>
              <label className="flex items-center justify-between gap-2 text-xs text-zinc-300"><span>Enable 3D</span><input type="checkbox" checked={appearance.enable3D !== false} onChange={(e) => setAppearance({ ...appearance, enable3D: e.target.checked })} className="h-4 w-4 accent-emerald-500" /></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1 text-xs font-mono text-zinc-400"><span>Intensity</span><select value={appearance.threeDIntensity || 'subtle'} onChange={(e) => setAppearance({ ...appearance, threeDIntensity: e.target.value as 'off' | 'subtle' | 'medium' | 'strong' })} className="w-full rounded-xl bg-[#0f1015] border border-white/10 px-3 py-1.5 text-white text-xs"><option value="off">Off</option><option value="subtle">Subtle</option><option value="medium">Medium</option><option value="strong">Strong</option></select></label>
                <label className="space-y-1 text-xs font-mono text-zinc-400"><span>Quality</span><select value={appearance.threeDQuality || 'auto'} onChange={(e) => setAppearance({ ...appearance, threeDQuality: e.target.value as 'auto' | 'high' | 'medium' | 'low' })} className="w-full rounded-xl bg-[#0f1015] border border-white/10 px-3 py-1.5 text-white text-xs"><option value="auto">Auto</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></label>
              </div>
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
