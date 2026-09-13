import { AppearanceSettings, ThemeTokenSettings } from '../types/portfolio';

export const DEFAULT_THEME_TOKENS: ThemeTokenSettings = {
  background: '#090d12',
  surface: '#141a22',
  surfaceElevated: '#1d2530',
  text: '#edf2f8',
  textMuted: '#a9b3c7',
  border: '#91a0b5',
  accent: '#8ec5ff',
  accentSecondary: '#7dd3fc',
  success: '#35c98a',
  warning: '#e7ad62',
  danger: '#ed7b86',
  heroBackground: '#0b0f15',
  sectionBackground: '#10151d',
  cardBackground: '#141a22',
  heading: '#f6f8fb',
  body: '#d8e1ef',
  radius: 22,
  surfaceOpacity: 88,
  shadowIntensity: 70,
  borderIntensity: 12,
  blurIntensity: 18,
};

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

const relativeLuminance = (hex: string): number => {
  const channels = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};

export const contrastRatio = (foreground: string, background: string): number => {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};

export const getThemeContrastWarnings = (tokens: ThemeTokenSettings): string[] => {
  const warnings: string[] = [];
  if (contrastRatio(tokens.text, tokens.background) < 4.5) warnings.push('Primary text may be difficult to read against the page background.');
  if (contrastRatio(tokens.textMuted, tokens.background) < 3) warnings.push('Muted text may be difficult to read against the page background.');
  if (contrastRatio(tokens.accent, tokens.background) < 3) warnings.push('The accent may not be readable against the page background.');
  return warnings;
};

export const normalizeHex = (value: unknown, fallback: string): string => {
  const normalized = String(value || '').trim();
  return HEX_COLOR.test(normalized) ? normalized.toLowerCase() : fallback;
};

export const normalizeThemeTokens = (tokens?: Partial<ThemeTokenSettings>): ThemeTokenSettings => {
  const source = tokens || {};
  return {
    ...DEFAULT_THEME_TOKENS,
    ...source,
    background: normalizeHex(source.background, DEFAULT_THEME_TOKENS.background),
    surface: normalizeHex(source.surface, DEFAULT_THEME_TOKENS.surface),
    surfaceElevated: normalizeHex(source.surfaceElevated, DEFAULT_THEME_TOKENS.surfaceElevated),
    text: normalizeHex(source.text, DEFAULT_THEME_TOKENS.text),
    textMuted: normalizeHex(source.textMuted, DEFAULT_THEME_TOKENS.textMuted),
    border: normalizeHex(source.border, DEFAULT_THEME_TOKENS.border),
    accent: normalizeHex(source.accent, DEFAULT_THEME_TOKENS.accent),
    accentSecondary: normalizeHex(source.accentSecondary, DEFAULT_THEME_TOKENS.accentSecondary),
    success: normalizeHex(source.success, DEFAULT_THEME_TOKENS.success),
    warning: normalizeHex(source.warning, DEFAULT_THEME_TOKENS.warning),
    danger: normalizeHex(source.danger, DEFAULT_THEME_TOKENS.danger),
    heroBackground: normalizeHex(source.heroBackground, DEFAULT_THEME_TOKENS.heroBackground),
    sectionBackground: normalizeHex(source.sectionBackground, DEFAULT_THEME_TOKENS.sectionBackground),
    cardBackground: normalizeHex(source.cardBackground, DEFAULT_THEME_TOKENS.cardBackground),
    heading: normalizeHex(source.heading, DEFAULT_THEME_TOKENS.heading),
    body: normalizeHex(source.body, DEFAULT_THEME_TOKENS.body),
    radius: clampNumber(source.radius, 0, 48, DEFAULT_THEME_TOKENS.radius),
    surfaceOpacity: clampNumber(source.surfaceOpacity, 35, 100, DEFAULT_THEME_TOKENS.surfaceOpacity),
    shadowIntensity: clampNumber(source.shadowIntensity, 0, 100, DEFAULT_THEME_TOKENS.shadowIntensity),
    borderIntensity: clampNumber(source.borderIntensity, 0, 100, DEFAULT_THEME_TOKENS.borderIntensity),
    blurIntensity: clampNumber(source.blurIntensity, 0, 40, DEFAULT_THEME_TOKENS.blurIntensity),
  };
};

const clampNumber = (value: unknown, min: number, max: number, fallback: number): number => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
};

export const getThemeTokenVariables = (appearance: AppearanceSettings): Record<string, string> => {
  if (!appearance.customTheme?.enabled) return {};
  const tokens = normalizeThemeTokens(appearance.customTheme.tokens);
  const alpha = Math.round(tokens.surfaceOpacity * 2.55).toString(16).padStart(2, '0');
  const borderAlpha = Math.round(tokens.borderIntensity * 2.55).toString(16).padStart(2, '0');
  return {
    '--background': tokens.background,
    '--background-elevated': tokens.surfaceElevated,
    '--foreground': tokens.text,
    '--foreground-soft': tokens.body,
    '--muted': tokens.textMuted,
    '--muted-foreground': tokens.textMuted,
    '--surface': `${tokens.surface}${alpha}`,
    '--surface-elevated': `${tokens.surfaceElevated}${alpha}`,
    '--surface-muted': `${tokens.background}${alpha}`,
    '--card': `${tokens.cardBackground}${alpha}`,
    '--border': `${tokens.border}${borderAlpha}`,
    '--border-subtle': `${tokens.border}${Math.max(8, Math.round(tokens.borderIntensity * 1.4)).toString(16).padStart(2, '0')}`,
    '--color-accent': tokens.accent,
    '--color-accent-secondary': tokens.accentSecondary,
    '--hero-background': tokens.heroBackground,
    '--hero-foreground': tokens.heading,
    '--input-border': `${tokens.border}${borderAlpha}`,
    '--theme-custom-radius': `${tokens.radius}px`,
    '--theme-custom-blur': `${tokens.blurIntensity}px`,
    '--theme-custom-shadow': `0 ${Math.round(tokens.shadowIntensity / 2)}px ${tokens.shadowIntensity}px -30px rgba(0,0,0,${(tokens.shadowIntensity / 100).toFixed(2)})`,
  };
};
