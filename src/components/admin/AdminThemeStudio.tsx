import React, { useEffect, useMemo, useState } from 'react';
import { Check, Eye, Palette, RotateCcw, Save } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { normalizeThemeName, THEME_REGISTRY } from '../../lib/themeRegistry';
import { DEFAULT_THEME_TOKENS, getThemeTokenVariables, normalizeThemeTokens } from '../../lib/themeTokens';
import { AppearanceSettings, ThemeTokenSettings } from '../../types/portfolio';

const colorFields: Array<{ key: keyof ThemeTokenSettings; label: string }> = [
  { key: 'background', label: 'Page background' }, { key: 'surface', label: 'Primary surface' },
  { key: 'surfaceElevated', label: 'Elevated surface' }, { key: 'text', label: 'Primary text' },
  { key: 'textMuted', label: 'Muted text' }, { key: 'border', label: 'Border' },
  { key: 'accent', label: 'Accent' }, { key: 'accentSecondary', label: 'Accent secondary' },
  { key: 'success', label: 'Success' }, { key: 'warning', label: 'Warning' },
  { key: 'danger', label: 'Danger' }, { key: 'heroBackground', label: 'Hero background' },
  { key: 'sectionBackground', label: 'Section background' }, { key: 'cardBackground', label: 'Card background' },
  { key: 'heading', label: 'Heading color' }, { key: 'body', label: 'Body color' },
];

const rangeFields: Array<{ key: keyof ThemeTokenSettings; label: string; min: number; max: number }> = [
  { key: 'radius', label: 'Radius', min: 0, max: 48 },
  { key: 'surfaceOpacity', label: 'Surface opacity', min: 35, max: 100 },
  { key: 'shadowIntensity', label: 'Shadow intensity', min: 0, max: 100 },
  { key: 'borderIntensity', label: 'Border intensity', min: 0, max: 100 },
  { key: 'blurIntensity', label: 'Blur intensity', min: 0, max: 40 },
];

const applyPreview = (appearance: AppearanceSettings) => {
  Object.entries(getThemeTokenVariables(appearance)).forEach(([key, value]) => document.documentElement.style.setProperty(key, value));
};

export const AdminThemeStudio: React.FC = () => {
  const { data, saveData, addToast } = usePortfolio();
  const savedTokens = normalizeThemeTokens(data.appearance.customTheme?.tokens);
  const [draft, setDraft] = useState<ThemeTokenSettings>(savedTokens);
  const [enabled, setEnabled] = useState(data.appearance.customTheme?.enabled === true);
  const [themeName, setThemeName] = useState(data.appearance.themeName);
  const [defaultTheme, setDefaultTheme] = useState(data.appearance.defaultTheme);
  const [dirty, setDirty] = useState(false);
  const appearance = useMemo(() => ({ ...data.appearance, themeName, defaultTheme, customTheme: { enabled, tokens: draft } }), [data.appearance, defaultTheme, draft, enabled, themeName]);

  useEffect(() => {
    applyPreview(appearance);
    document.documentElement.setAttribute('data-theme-name', normalizeThemeName(themeName));
    document.body.setAttribute('data-theme-name', normalizeThemeName(themeName));
    return () => applyPreview({ ...data.appearance, customTheme: { enabled: data.appearance.customTheme?.enabled === true, tokens: savedTokens } });
  }, [appearance, data.appearance, savedTokens]);

  useEffect(() => {
    setDraft(normalizeThemeTokens(data.appearance.customTheme?.tokens));
    setEnabled(data.appearance.customTheme?.enabled === true);
    setThemeName(data.appearance.themeName);
    setDefaultTheme(data.appearance.defaultTheme);
    setDirty(false);
  }, [data.appearance]);

  const updateToken = (key: keyof ThemeTokenSettings, value: string | number) => {
    setDraft((current) => normalizeThemeTokens({ ...current, [key]: value }));
    setDirty(true);
  };

  const resetToTheme = () => {
    const theme = THEME_REGISTRY[normalizeThemeName(themeName)];
    const accent = theme.cssVars['--accent-primary'] || DEFAULT_THEME_TOKENS.accent;
    setDraft(normalizeThemeTokens({ ...DEFAULT_THEME_TOKENS, accent }));
    setDirty(true);
  };

  const handleSave = async () => {
    const normalized = normalizeThemeTokens(draft);
    const ok = await saveData({ ...data, appearance: { ...data.appearance, themeName, defaultTheme, customTheme: { enabled, tokens: normalized } } });
    if (ok) {
      setDraft(normalized);
      setDirty(false);
      addToast('Theme Studio changes saved.', 'success');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <header className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-accent)]"><Palette className="h-4 w-4" /> Theme Studio</div>
          <h2 className="text-2xl font-bold font-syne text-[var(--foreground)]">Build the visual system</h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">Preview validated design tokens locally, then persist them only when you explicitly save.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={resetToTheme} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--foreground)]"><RotateCcw className="h-4 w-4" /> Reset theme</button>
          <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-xs font-bold text-black"><Save className="h-4 w-4" /> Save {dirty && '•'}</button>
        </div>
      </header>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><h3 className="font-semibold text-[var(--foreground)]">Custom theme override</h3><p className="mt-1 text-xs text-[var(--muted)]">The current named theme remains the fallback.</p></div>
          <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-[var(--foreground)]"><input type="checkbox" checked={enabled} onChange={(e) => { setEnabled(e.target.checked); setDirty(true); }} /> Enable custom tokens</label>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]"><Eye className="h-4 w-4 text-[var(--color-accent)]" /> Live preview is active while you edit.</div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <label className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--foreground)]">Named theme
          <select value={themeName} onChange={(e) => { setThemeName(e.target.value as AppearanceSettings['themeName']); setDirty(true); }} className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--input-bg)] px-3 py-2 text-sm">
            {Object.values(THEME_REGISTRY).map((theme) => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
          </select>
        </label>
        <label className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--foreground)]">Default color mode
          <select value={defaultTheme} onChange={(e) => { setDefaultTheme(e.target.value as AppearanceSettings['defaultTheme']); setDirty(true); }} className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--input-bg)] px-3 py-2 text-sm">
            <option value="dark">Dark</option><option value="light">Light</option><option value="system">System</option>
          </select>
        </label>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Color system</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {colorFields.map(({ key, label }) => <label key={key} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] p-3 text-xs text-[var(--foreground)]"><span>{label}</span><input aria-label={label} type="color" value={String(draft[key])} onChange={(e) => updateToken(key, e.target.value)} className="h-8 w-12 cursor-pointer rounded border-0 bg-transparent" /></label>)}
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Surfaces & geometry</h3>
          <div className="space-y-5">{rangeFields.map(({ key, label, min, max }) => <label key={key} className="block text-xs text-[var(--foreground)]"><span className="mb-2 flex justify-between"><span>{label}</span><output>{draft[key]}</output></span><input aria-label={label} type="range" min={min} max={max} value={Number(draft[key])} onChange={(e) => updateToken(key, Number(e.target.value))} className="w-full accent-[var(--color-accent)]" /></label>)}</div>
          <div className="mt-6 rounded-xl border border-[var(--border-subtle)] p-4 text-xs text-[var(--muted)]"><Check className="mr-2 inline h-4 w-4 text-[var(--color-accent)]" />Named theme: {THEME_REGISTRY[normalizeThemeName(data.appearance.themeName)].name}</div>
        </div>
      </section>
    </div>
  );
};
