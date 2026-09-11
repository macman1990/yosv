import { PortfolioThemeName, BackgroundIntensity, MotionMode } from '../types/portfolio';
import { normalizeThemeName } from './themeRegistry';

export interface BackgroundPreset {
  theme: PortfolioThemeName;
  family: string;
  texture: string;
  atmosphere: string;
  light: string;
  mobileLight: string;
  grainOpacity: number;
  layerCount: number;
}

type CanonicalThemeName = 'cinematic' | 'liquid-glass' | 'editorial' | 'digital' | 'minimal';

export const BACKGROUND_PRESETS: Record<CanonicalThemeName, BackgroundPreset> = {
  cinematic: {
    theme: 'cinematic',
    family: 'filmic atmosphere',
    texture: 'film grain and vignette',
    atmosphere: 'slow warm light leak and cool key light',
    light: 'radial-gradient(circle at 18% 14%, rgba(150,190,255,0.18), transparent 29%), radial-gradient(circle at 82% 24%, rgba(224,168,79,0.14), transparent 27%)',
    mobileLight: 'radial-gradient(circle at 28% 12%, rgba(150,190,255,0.12), transparent 32%)',
    grainOpacity: 0.12,
    layerCount: 3,
  },
  'liquid-glass': {
    theme: 'liquid-glass',
    family: 'spatial aurora field',
    texture: 'soft translucent depth',
    atmosphere: 'blurred cyan and violet light fields',
    light: 'radial-gradient(circle at 20% 16%, rgba(126,211,252,0.22), transparent 31%), radial-gradient(circle at 80% 12%, rgba(168,85,247,0.18), transparent 30%), radial-gradient(circle at 58% 78%, rgba(96,127,255,0.12), transparent 34%)',
    mobileLight: 'radial-gradient(circle at 32% 18%, rgba(126,211,252,0.14), transparent 34%), radial-gradient(circle at 82% 12%, rgba(168,85,247,0.10), transparent 32%)',
    grainOpacity: 0.035,
    layerCount: 3,
  },
  editorial: {
    theme: 'editorial',
    family: 'ink and paper atmosphere',
    texture: 'restrained paper fiber',
    atmosphere: 'almost-static art-directed warmth',
    light: 'linear-gradient(120deg, rgba(215,180,140,0.10), transparent 36%), radial-gradient(circle at 76% 20%, rgba(185,104,69,0.08), transparent 26%)',
    mobileLight: 'linear-gradient(120deg, rgba(215,180,140,0.07), transparent 42%)',
    grainOpacity: 0.06,
    layerCount: 2,
  },
  digital: {
    theme: 'digital',
    family: 'technical studio field',
    texture: 'fine production grid and signal lines',
    atmosphere: 'controlled cyan signal glow',
    light: 'linear-gradient(rgba(96,165,250,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(28,217,217,0.045) 1px, transparent 1px), radial-gradient(circle at 18% 18%, rgba(28,217,217,0.13), transparent 26%)',
    mobileLight: 'radial-gradient(circle at 22% 16%, rgba(28,217,217,0.09), transparent 30%)',
    grainOpacity: 0.025,
    layerCount: 2,
  },
  minimal: {
    theme: 'minimal',
    family: 'quiet ambient light',
    texture: 'near-invisible matte texture',
    atmosphere: 'soft premium depth',
    light: 'radial-gradient(circle at 50% 0%, rgba(212,165,116,0.15), transparent 31%)',
    mobileLight: 'radial-gradient(circle at 50% 0%, rgba(212,165,116,0.10), transparent 34%)',
    grainOpacity: 0.018,
    layerCount: 1,
  },
};

export const getBackgroundPreset = (themeName?: string): BackgroundPreset => {
  return BACKGROUND_PRESETS[normalizeThemeName(themeName) as CanonicalThemeName];
};

export const normalizeBackgroundIntensity = (intensity?: string): BackgroundIntensity => {
  if (intensity === 'off' || intensity === 'subtle' || intensity === 'medium' || intensity === 'strong') return intensity;
  return 'medium';
};

export const normalizeMotionMode = (mode?: string): MotionMode => {
  if (mode === 'reduced' || mode === 'off') return mode;
  return 'full';
};
