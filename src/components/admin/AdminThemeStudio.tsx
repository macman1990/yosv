import React, { useEffect, useMemo, useState } from 'react';
import { Check, Eye, Palette, RotateCcw, Save } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { normalizeThemeName, THEME_REGISTRY } from '../../lib/themeRegistry';
import { DEFAULT_THEME_TOKENS, getThemeContrastWarnings, getThemeTokenVariables, normalizeThemeTokens } from '../../lib/themeTokens';
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

const themeOptions = Array.from(new Map(Object.values(THEME_REGISTRY).map((theme) => [theme.id, theme])).values());

export const AdminThemeStudio: React.FC = () => {
  const { data, saveData, addToast, language } = usePortfolio();
  const tx = (en: string, ar: string) => language === 'ar' ? ar : en;
  const savedTokens = normalizeThemeTokens(data.appearance.customTheme?.tokens);
  const [draft, setDraft] = useState<ThemeTokenSettings>(savedTokens);
  const [enabled, setEnabled] = useState(data.appearance.customTheme?.enabled === true);
  const [themeName, setThemeName] = useState(data.appearance.themeName);
  const [dirty, setDirty] = useState(false);
  const appearance = useMemo(() => ({ ...data.appearance, themeName, defaultTheme: 'dark' as const, customTheme: { enabled, tokens: draft } }), [data.appearance, draft, enabled, themeName]);
  const contrastWarnings = useMemo(() => getThemeContrastWarnings(draft), [draft]);

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
    setDirty(false);
  }, [data.appearance]);

  const updateToken = (key: keyof ThemeTokenSettings, value: string | number) => {
    setDraft((current) => normalizeThemeTokens({ ...current, [key]: value }));
    setDirty(true);
  };

  const resetToTheme = () => {
    const theme = THEME_REGISTRY[normalizeThemeName(themeName)];
    const hex = (value: string | undefined, fallback: string) => value && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
    setDraft(normalizeThemeTokens({
      ...DEFAULT_THEME_TOKENS,
      background: hex(theme.cssVars['--background-base'], DEFAULT_THEME_TOKENS.background),
      surface: hex(theme.cssVars['--surface-primary'], DEFAULT_THEME_TOKENS.surface),
      text: hex(theme.cssVars['--text-primary'], DEFAULT_THEME_TOKENS.text),
      textMuted: hex(theme.cssVars['--text-secondary'], DEFAULT_THEME_TOKENS.textMuted),
      accent: hex(theme.cssVars['--accent-primary'], DEFAULT_THEME_TOKENS.accent),
      accentSecondary: hex(theme.cssVars['--accent-secondary'], DEFAULT_THEME_TOKENS.accentSecondary),
    }));
    setDirty(true);
  };

  const cancelChanges = () => {
    setDraft(savedTokens);
    setEnabled(data.appearance.customTheme?.enabled === true);
    setThemeName(data.appearance.themeName);
    setDirty(false);
  };

  const handleSave = async () => {
    const normalized = normalizeThemeTokens(draft);
    const ok = await saveData({ ...data, appearance: { ...data.appearance, themeName, defaultTheme: 'dark', customTheme: { enabled, tokens: normalized } } });
    if (ok) {
      setDraft(normalized);
      setDirty(false);
      addToast(tx('Theme Studio changes saved.', 'تم حفظ تغييرات استوديو السمات.'), 'success');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <header className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-accent)]"><Palette className="h-4 w-4" /> {tx('Theme Studio', 'استوديو السمات')}</div>
          <h2 className="text-2xl font-bold font-syne text-[var(--foreground)]">{tx('Build the visual system', 'أنشئ النظام البصري')}</h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">{tx('Preview validated design tokens locally, then persist them only when you explicitly save.', 'عاين رموز التصميم التي تم التحقق منها محليًا، ثم احفظها فقط عند التأكيد.')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={cancelChanges} disabled={!dirty} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40">{tx('Cancel', 'إلغاء')}</button>
          <button type="button" onClick={resetToTheme} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--foreground)]"><RotateCcw className="h-4 w-4" /> {tx('Reset theme', 'إعادة ضبط السمة')}</button>
          <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-xs font-bold text-black"><Save className="h-4 w-4" /> {tx('Save', 'حفظ')} {dirty && '•'}</button>
        </div>
      </header>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><h3 className="font-semibold text-[var(--foreground)]">{tx('Custom theme override', 'تجاوز السمة المخصصة')}</h3><p className="mt-1 text-xs text-[var(--muted)]">{tx('The current named theme remains the fallback.', 'تبقى السمة المسماة الحالية خيارًا احتياطيًا.')}</p></div>
          <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-[var(--foreground)]"><input type="checkbox" checked={enabled} onChange={(e) => { setEnabled(e.target.checked); setDirty(true); }} /> {tx('Enable custom tokens', 'تفعيل الرموز المخصصة')}</label>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]"><Eye className="h-4 w-4 text-[var(--color-accent)]" /> {tx('Live preview is active while you edit.', 'المعاينة المباشرة مفعلة أثناء التحرير.')}</div>
      </section>

      {contrastWarnings.length > 0 && <aside role="status" className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-100">
        <strong className="block text-amber-200">{tx('Contrast check', 'فحص التباين')}</strong>
        <ul className="mt-2 list-disc space-y-1 ps-5 text-xs">{contrastWarnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>
      </aside>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {themeOptions.map((theme) => <button key={theme.id} type="button" onClick={() => { setThemeName(theme.id); setDirty(true); }} className={`theme-preview-tile text-start ${themeName === theme.id ? 'theme-preview-tile-active' : ''}`} style={{ background: theme.cssVars['--background-atmosphere'], backgroundColor: theme.cssVars['--background-base'], borderColor: themeName === theme.id ? theme.cssVars['--accent-primary'] : undefined }} aria-pressed={themeName === theme.id}>
          <span className="theme-preview-tile__swatch" style={{ background: theme.cssVars['--accent-primary'] }} />
          <span className="mt-4 block text-sm font-semibold text-white">{theme.name}</span>
          <span className="mt-1 block text-[11px] leading-5 text-white/65">{theme.description}</span>
          {themeName === theme.id && <span className="mt-3 inline-flex rounded-full bg-white/15 px-2 py-1 text-[10px] uppercase tracking-widest text-white">Active</span>}
        </button>)}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{tx('Color system', 'نظام الألوان')}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {colorFields.map(({ key, label }) => <label key={key} className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] p-3 text-xs text-[var(--foreground)]"><span>{label}</span><input aria-label={label} type="color" value={String(draft[key])} onChange={(e) => updateToken(key, e.target.value)} className="h-8 w-12 cursor-pointer rounded border-0 bg-transparent" /></label>)}
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{tx('Surfaces & geometry', 'الأسطح والهندسة')}</h3>
          <div className="space-y-5">{rangeFields.map(({ key, label, min, max }) => <label key={key} className="block text-xs text-[var(--foreground)]"><span className="mb-2 flex justify-between"><span>{label}</span><output>{draft[key]}</output></span><input aria-label={label} type="range" min={min} max={max} value={Number(draft[key])} onChange={(e) => updateToken(key, Number(e.target.value))} className="w-full accent-[var(--color-accent)]" /></label>)}</div>
          <div className="mt-6 rounded-xl border border-[var(--border-subtle)] p-4 text-xs text-[var(--muted)]"><Check className="mr-2 inline h-4 w-4 text-[var(--color-accent)]" />{tx('Named theme:', 'السمة المسماة:')} {THEME_REGISTRY[normalizeThemeName(data.appearance.themeName)].name}</div>
        </div>
      </section>
    </div>
  );
};
