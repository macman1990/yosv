import { PortfolioThemeName, ThemeMode } from '../types/portfolio';

export interface ThemeSemanticTokens {
  id: PortfolioThemeName;
  name: string;
  description: string;
  material: string;
  motion: string;
  typography: {
    display: string;
    headingScale: string;
    bodyDensity: string;
    label: string;
    letterSpacing: string;
    hierarchy: string;
  };
  layout: {
    sectionSpacing: string;
    contentWidth: string;
    cardDensity: string;
    gridBehavior: string;
    heroComposition: string;
    navGeometry: string;
  };
  surfaces: {
    panelOpacity: string;
    blur: string;
    borderStrength: string;
    radius: string;
    shadow: string;
    highlight: string;
  };
  componentGeometry: {
    buttons: string;
    cards: string;
    pills: string;
    navigation: string;
    projectCards: string;
    overlays: string;
  };
  background: {
    family: string;
    atmosphere: string;
    texture: string;
    lighting: string;
  };
  motionProfile: {
    transition: string;
    reveal: string;
    hover: string;
    parallax: string;
    scroll: string;
  };
  projectPresentation: {
    preferredCard: string;
    mediaEmphasis: string;
    metadataDensity: string;
    featuredBehavior: string;
  };
  cssVars: Record<string, string>;
}

export const normalizeThemeName = (themeName?: string): PortfolioThemeName => {
  const value = String(themeName || 'cinematic').toLowerCase();
  if (value === 'liquid' || value === 'liquid-glass') return 'liquid-glass';
  if (value === 'luxury') return 'minimal';
  if (['cinematic', 'liquid-glass', 'editorial', 'digital', 'minimal'].includes(value)) {
    return value as PortfolioThemeName;
  }
  return 'cinematic';
};

export const THEME_REGISTRY: Record<PortfolioThemeName, ThemeSemanticTokens> = {
  cinematic: {
    id: 'cinematic',
    name: 'Cinematic Film',
    description: 'Dramatic editorial hierarchy with filmic depth and storytelling-led imagery.',
    material: 'Dark film surfaces / soft glow / restrained framing',
    motion: 'Slow cinematic reveal / gentle drift / intentional pacing',
    typography: {
      display: 'large, high-contrast editorial display',
      headingScale: 'XL narrative headings and sculpted line-height',
      bodyDensity: 'compressed but relaxed editorial rhythm',
      label: 'uppercase tracking with restrained microcopy',
      letterSpacing: '-0.06em to 0.18em',
      hierarchy: 'strong title > quiet metadata > immersive body copy',
    },
    layout: {
      sectionSpacing: 'wide, cinematic vertical rhythm',
      contentWidth: 'deep reading width with full-bleed image moments',
      cardDensity: 'medium-to-spacious editorial cards',
      gridBehavior: 'asymmetric composition with larger image-led blocks',
      heroComposition: 'title-sequence first impression with dramatic media panel',
      navGeometry: 'lightweight floating navigation with filmic framing',
    },
    surfaces: {
      panelOpacity: 'strong dark surface with subtle transparency',
      blur: 'low-moderate blur for depth only',
      borderStrength: 'quiet, restrained borders',
      radius: 'rounded but architectural',
      shadow: 'deep cinematic shadow stacks',
      highlight: 'soft light leaks and warm bloom',
    },
    componentGeometry: {
      buttons: 'high-contrast campaign buttons with strong shadow',
      cards: 'frame-like cards with oversized image emphasis',
      pills: 'narrow uppercase pills with low visual weight',
      navigation: 'narrow floating shell with subtle glass treatment',
      projectCards: 'editorial story panels with layered metadata',
      overlays: 'deep vignette and title overlays',
    },
    background: {
      family: 'dark atmospheric filmic gradient',
      atmosphere: 'soft bloom, light leaks, warm undertones',
      texture: 'fine grain and subtle patterning',
      lighting: 'ambient radial highlight with deep contrast',
    },
    motionProfile: {
      transition: '0.55s to 0.9s cinematic easing',
      reveal: 'slow fade + translate with depth',
      hover: 'low intensity, premium feel',
      parallax: 'subtle drift on imagery',
      scroll: 'deliberate, story-like rhythm',
    },
    projectPresentation: {
      preferredCard: 'frame-first editorial storytelling cards',
      mediaEmphasis: 'large imagery and strong captioning',
      metadataDensity: 'compact metadata with narrative labels',
      featuredBehavior: 'lead project with dramatic framing',
    },
    cssVars: {
      '--font-display': 'var(--font-syne)',
      '--font-body': 'var(--font-sans)',
      '--space-section': '6rem',
      '--space-content': '2rem',
      '--surface-primary': 'rgba(13, 16, 22, 0.9)',
      '--surface-secondary': 'rgba(20, 23, 31, 0.84)',
      '--surface-glass': 'rgba(17, 21, 29, 0.66)',
      '--surface-overlay': 'rgba(2, 6, 12, 0.72)',
      '--border-subtle': 'rgba(255,255,255,0.08)',
      '--border-strong': 'rgba(255,255,255,0.14)',
      '--shadow-sm': '0 18px 36px -24px rgba(0,0,0,0.7)',
      '--shadow-lg': '0 28px 60px -28px rgba(0,0,0,0.8)',
      '--radius-sm': '14px',
      '--radius-md': '22px',
      '--radius-lg': '32px',
      '--text-primary': '#edf2f8',
      '--text-secondary': '#a9b3c7',
      '--accent-primary': '#8ec5ff',
      '--accent-secondary': '#7dd3fc',
      '--background-base': '#090d12',
      '--background-atmosphere': 'radial-gradient(circle at top, rgba(142,197,255,0.12), transparent 35%)',
      '--motion-duration': '0.7s',
      '--motion-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--hero-density': 'high-impact',
      '--card-density': 'medium',
      '--nav-height': '72px',
    },
  },
  liquid: {
    id: 'liquid-glass',
    name: 'Spatial / Liquid Glass',
    description: 'Floating, translucent layers with atmospheric depth and soft glass reflections.',
    material: 'Glass panels / blur fields / soft ambient highlights',
    motion: 'gentle float and layered transitions with ambient response',
    typography: {
      display: 'airy modern display with open rhythm',
      headingScale: 'spacious but confident large-scale type',
      bodyDensity: 'open restful body spacing',
      label: 'microcaps with soft contrast',
      letterSpacing: '-0.04em to 0.14em',
      hierarchy: 'headline, floating metadata, easy-to-scan body text',
    },
    layout: {
      sectionSpacing: 'generous with floating controls and breathing room',
      contentWidth: 'comfortably wide with layered panels',
      cardDensity: 'light and airy',
      gridBehavior: 'soft masonry with staggered overlays',
      heroComposition: 'immersive overlay card with glass panel framing',
      navGeometry: 'floating pill navigation with spatial depth',
    },
    surfaces: {
      panelOpacity: 'light translucent surfaces',
      blur: 'moderate blur with readable contrast',
      borderStrength: 'soft but visible separation',
      radius: 'rounded with large soft corners',
      shadow: 'light orbital shadows and depth planes',
      highlight: 'frosted reflections and glints',
    },
    componentGeometry: {
      buttons: 'glass CTA buttons with subtle lift and highlight',
      cards: 'floating glass tiles with layered depth',
      pills: 'soft translucent pills with active glow',
      navigation: 'floating pill shell with blur and ambient tint',
      projectCards: 'hoverable spatial cards with information overlays',
      overlays: 'transparent gradient overlays with soft blur',
    },
    background: {
      family: 'ambient radial light field',
      atmosphere: 'tinted glow and soft field layering',
      texture: 'low-noise softness with vapor-like gradients',
      lighting: 'soft diffused reflections and bloom',
    },
    motionProfile: {
      transition: '0.4s to 0.75s soft-glass easing',
      reveal: 'light fade + lift',
      hover: 'gentle floating and shimmer',
      parallax: 'limited floating motion',
      scroll: 'smooth ambient motion',
    },
    projectPresentation: {
      preferredCard: 'spatial image cards with floating metadata chips',
      mediaEmphasis: 'balanced media and overlay information',
      metadataDensity: 'light micro-details with supported overlays',
      featuredBehavior: 'glass-framed lead feature with overlay CTA',
    },
    cssVars: {
      '--font-display': 'var(--font-sans)',
      '--font-body': 'var(--font-sans)',
      '--space-section': '5.5rem',
      '--space-content': '1.75rem',
      '--surface-primary': 'rgba(255,255,255,0.12)',
      '--surface-secondary': 'rgba(145, 166, 204, 0.16)',
      '--surface-glass': 'rgba(255,255,255,0.18)',
      '--surface-overlay': 'rgba(17, 20, 30, 0.52)',
      '--border-subtle': 'rgba(255,255,255,0.14)',
      '--border-strong': 'rgba(255,255,255,0.24)',
      '--shadow-sm': '0 18px 40px -24px rgba(109,127,202,0.4)',
      '--shadow-lg': '0 32px 72px -30px rgba(96,120,200,0.45)',
      '--radius-sm': '16px',
      '--radius-md': '26px',
      '--radius-lg': '36px',
      '--text-primary': '#f3f6ff',
      '--text-secondary': '#cad6f5',
      '--accent-primary': '#8cb4ff',
      '--accent-secondary': '#b497ff',
      '--background-base': '#0c1018',
      '--background-atmosphere': 'radial-gradient(circle at 20% 10%, rgba(124,144,255,0.20), transparent 30%), radial-gradient(circle at 80% 20%, rgba(178,151,255,0.14), transparent 26%)',
      '--motion-duration': '0.5s',
      '--motion-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--hero-density': 'airy',
      '--card-density': 'light',
      '--nav-height': '76px',
    },
  },
  'liquid-glass': {
    id: 'liquid-glass',
    name: 'Spatial / Liquid Glass',
    description: 'Floating, translucent layers with atmospheric depth and soft glass reflections.',
    material: 'Glass panels / blur fields / soft ambient highlights',
    motion: 'gentle float and layered transitions with ambient response',
    typography: {
      display: 'airy modern display with open rhythm',
      headingScale: 'spacious but confident large-scale type',
      bodyDensity: 'open restful body spacing',
      label: 'microcaps with soft contrast',
      letterSpacing: '-0.04em to 0.14em',
      hierarchy: 'headline, floating metadata, easy-to-scan body text',
    },
    layout: {
      sectionSpacing: 'generous with floating controls and breathing room',
      contentWidth: 'comfortably wide with layered panels',
      cardDensity: 'light and airy',
      gridBehavior: 'soft masonry with staggered overlays',
      heroComposition: 'immersive overlay card with glass panel framing',
      navGeometry: 'floating pill navigation with spatial depth',
    },
    surfaces: {
      panelOpacity: 'light translucent surfaces',
      blur: 'moderate blur with readable contrast',
      borderStrength: 'soft but visible separation',
      radius: 'rounded with large soft corners',
      shadow: 'light orbital shadows and depth planes',
      highlight: 'frosted reflections and glints',
    },
    componentGeometry: {
      buttons: 'glass CTA buttons with subtle lift and highlight',
      cards: 'floating glass tiles with layered depth',
      pills: 'soft translucent pills with active glow',
      navigation: 'floating pill shell with blur and ambient tint',
      projectCards: 'hoverable spatial cards with information overlays',
      overlays: 'transparent gradient overlays with soft blur',
    },
    background: {
      family: 'ambient radial light field',
      atmosphere: 'tinted glow and soft field layering',
      texture: 'low-noise softness with vapor-like gradients',
      lighting: 'soft diffused reflections and bloom',
    },
    motionProfile: {
      transition: '0.4s to 0.75s soft-glass easing',
      reveal: 'light fade + lift',
      hover: 'gentle floating and shimmer',
      parallax: 'limited floating motion',
      scroll: 'smooth ambient motion',
    },
    projectPresentation: {
      preferredCard: 'spatial image cards with floating metadata chips',
      mediaEmphasis: 'balanced media and overlay information',
      metadataDensity: 'light micro-details with supported overlays',
      featuredBehavior: 'glass-framed lead feature with overlay CTA',
    },
    cssVars: {
      '--font-display': 'var(--font-sans)',
      '--font-body': 'var(--font-sans)',
      '--space-section': '5.5rem',
      '--space-content': '1.75rem',
      '--surface-primary': 'rgba(255,255,255,0.12)',
      '--surface-secondary': 'rgba(145, 166, 204, 0.16)',
      '--surface-glass': 'rgba(255,255,255,0.18)',
      '--surface-overlay': 'rgba(17, 20, 30, 0.52)',
      '--border-subtle': 'rgba(255,255,255,0.14)',
      '--border-strong': 'rgba(255,255,255,0.24)',
      '--shadow-sm': '0 18px 40px -24px rgba(109,127,202,0.4)',
      '--shadow-lg': '0 32px 72px -30px rgba(96,120,200,0.45)',
      '--radius-sm': '16px',
      '--radius-md': '26px',
      '--radius-lg': '36px',
      '--text-primary': '#f3f6ff',
      '--text-secondary': '#cad6f5',
      '--accent-primary': '#8cb4ff',
      '--accent-secondary': '#b497ff',
      '--background-base': '#0c1018',
      '--background-atmosphere': 'radial-gradient(circle at 20% 10%, rgba(124,144,255,0.20), transparent 30%), radial-gradient(circle at 80% 20%, rgba(178,151,255,0.14), transparent 26%)',
      '--motion-duration': '0.5s',
      '--motion-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--hero-density': 'airy',
      '--card-density': 'light',
      '--nav-height': '76px',
    },
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial / Art Direction',
    description: 'Magazine-inspired structure, generous whitespace, art-directed imagery, and stronger type rhythm.',
    material: 'Editorial paper surfaces / natural texture / deliberate asymmetry',
    motion: 'measured editorial pacing with calm transitions',
    typography: {
      display: 'high-contrast serif-inspired display on dark paper',
      headingScale: 'very large editorial headings with asymmetry',
      bodyDensity: 'modern editorial reading density',
      label: 'small uppercase labels with close tracking',
      letterSpacing: '-0.04em to 0.14em',
      hierarchy: 'headline-led narrative with emphatic pull quotes and captions',
    },
    layout: {
      sectionSpacing: 'large editorial whitespace with deliberate rhythm',
      contentWidth: 'wide and magazine-like with asymmetric plates',
      cardDensity: 'balanced but spacious',
      gridBehavior: 'ragged editorial flow and image-led composition',
      heroComposition: 'magazine cover opening with strong caption and image',
      navGeometry: 'horizontal minimal masthead with simple rhythm',
    },
    surfaces: {
      panelOpacity: 'warm paper-like panels with moderate contrast',
      blur: 'very light or none',
      borderStrength: 'minimal but intentional',
      radius: 'soft square / architectural corners',
      shadow: 'subtle paper shadow',
      highlight: 'controlled light edges',
    },
    componentGeometry: {
      buttons: 'simple standout CTA with calm, elegant styling',
      cards: 'story blocks and image plates rather than generic tiles',
      pills: 'modest filters and small labels',
      navigation: 'clean masthead lines with subtle contrast',
      projectCards: 'spread-like narrative arrangements',
      overlays: 'text overlays for art direction emphasis',
    },
    background: {
      family: 'warm paper / deep ink',
      atmosphere: 'quiet tonal gradients and editorial shadow',
      texture: 'subtle grain and rough paper feel',
      lighting: 'controlled side-lit contrast',
    },
    motionProfile: {
      transition: '0.6s to 0.95s editorial pacing',
      reveal: 'calm fade + slight slide',
      hover: 'low-key lift with tactile emphasis',
      parallax: 'soft image drift on large stories',
      scroll: 'intentional, magazine-like progression',
    },
    projectPresentation: {
      preferredCard: 'spread and feature plate composition',
      mediaEmphasis: 'image-first, caption-led narratives',
      metadataDensity: 'quiet details and editorial labels',
      featuredBehavior: 'lead feature with dramatic framing and text block',
    },
    cssVars: {
      '--font-display': 'var(--font-syne)',
      '--font-body': 'var(--font-sans)',
      '--space-section': '6.5rem',
      '--space-content': '2.25rem',
      '--surface-primary': 'rgba(22, 20, 18, 0.92)',
      '--surface-secondary': 'rgba(35, 30, 27, 0.8)',
      '--surface-glass': 'rgba(29, 26, 22, 0.48)',
      '--surface-overlay': 'rgba(13, 10, 8, 0.65)',
      '--border-subtle': 'rgba(255,255,255,0.08)',
      '--border-strong': 'rgba(198, 169, 130, 0.2)',
      '--shadow-sm': '0 18px 36px -24px rgba(17,12,9,0.75)',
      '--shadow-lg': '0 30px 68px -32px rgba(17,12,9,0.82)',
      '--radius-sm': '12px',
      '--radius-md': '20px',
      '--radius-lg': '28px',
      '--text-primary': '#f5efe8',
      '--text-secondary': '#d2c8bc',
      '--accent-primary': '#d7b48c',
      '--accent-secondary': '#d07f55',
      '--background-base': '#120f0d',
      '--background-atmosphere': 'radial-gradient(circle at 10% 0%, rgba(215,180,140,0.10), transparent 28%)',
      '--motion-duration': '0.75s',
      '--motion-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--hero-density': 'editorial',
      '--card-density': 'spacious',
      '--nav-height': '68px',
    },
  },
  digital: {
    id: 'digital',
    name: 'Digital Creative Studio',
    description: 'Structured production-system aesthetic with controlled neon accents and a technical studio grid.',
    material: 'technical surfaces / grid overlays / crisp panels',
    motion: 'clean system transitions with precise response and subtle motion',
    typography: {
      display: 'technical but premium modern display',
      headingScale: 'large and structured with measured rhythm',
      bodyDensity: 'tight and efficient',
      label: 'monospaced micro labels and crisp uppercase signals',
      letterSpacing: '-0.05em to 0.16em',
      hierarchy: 'utility-first readability with clear signal hierarchy',
    },
    layout: {
      sectionSpacing: 'systematic spacing with aligned gutters',
      contentWidth: 'professional studio width with structured grids',
      cardDensity: 'balanced and dense',
      gridBehavior: 'technical grid and precise alignment',
      heroComposition: 'studio-led hero with directional signal layouts',
      navGeometry: 'compact technical navigation shell',
    },
    surfaces: {
      panelOpacity: 'solid technical surfaces with subtle transparency',
      blur: 'minimal to moderate',
      borderStrength: 'clear signal edges',
      radius: 'sharp but controlled',
      shadow: 'precise, structured depth',
      highlight: 'subtle technical glows',
    },
    componentGeometry: {
      buttons: 'sharp direct-action buttons with clear priority',
      cards: 'structured product-like cards with system feel',
      pills: 'signal pills with crisp labels',
      navigation: 'dense grid-like nav with utility feel',
      projectCards: 'production tiles with metadata blocks',
      overlays: 'clean overlays and signal layers',
    },
    background: {
      family: 'technical dark grid field',
      atmosphere: 'controlled neon atmosphere and signal particles',
      texture: 'grid and subtle linework',
      lighting: 'laser-like accent bloom',
    },
    motionProfile: {
      transition: '0.35s to 0.6s precise studio timing',
      reveal: 'clear fade + small translation',
      hover: 'firm but responsive',
      parallax: 'controlled micro-parallax',
      scroll: 'structured and efficient',
    },
    projectPresentation: {
      preferredCard: 'system cards with technical metadata and clean overlays',
      mediaEmphasis: 'balanced stills with process metadata',
      metadataDensity: 'dense but usable',
      featuredBehavior: 'feature tile anchored with project system labels',
    },
    cssVars: {
      '--font-display': 'var(--font-syne)',
      '--font-body': 'var(--font-sans)',
      '--space-section': '5rem',
      '--space-content': '1.75rem',
      '--surface-primary': 'rgba(10, 15, 22, 0.92)',
      '--surface-secondary': 'rgba(17, 24, 31, 0.9)',
      '--surface-glass': 'rgba(18, 24, 31, 0.7)',
      '--surface-overlay': 'rgba(7,11,18,0.75)',
      '--border-subtle': 'rgba(148, 220, 255, 0.12)',
      '--border-strong': 'rgba(148, 220, 255, 0.2)',
      '--shadow-sm': '0 18px 40px -24px rgba(15, 73, 104, 0.48)',
      '--shadow-lg': '0 28px 72px -30px rgba(10, 120, 180, 0.36)',
      '--radius-sm': '12px',
      '--radius-md': '18px',
      '--radius-lg': '26px',
      '--text-primary': '#edf8ff',
      '--text-secondary': '#9ec3d8',
      '--accent-primary': '#1cd9d9',
      '--accent-secondary': '#60a5fa',
      '--background-base': '#070c13',
      '--background-atmosphere': 'radial-gradient(circle at 20% 15%, rgba(28,217,217,0.12), transparent 28%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      '--motion-duration': '0.45s',
      '--motion-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--hero-density': 'dense',
      '--card-density': 'balanced',
      '--nav-height': '70px',
    },
  },
  luxury: {
    id: 'minimal',
    name: 'Minimal Luxury',
    description: 'Refined typography, calm spacing, premium restraint, and quiet but confident luxury.',
    material: 'soft matte panels / warm minimal surfaces / quiet reflective details',
    motion: 'gentle and highly controlled, almost silent movement',
    typography: {
      display: 'refined premium display with open breathing room',
      headingScale: 'large yet curated and elegant',
      bodyDensity: 'low-noise, premium readability',
      label: 'quiet uppercase micro labels',
      letterSpacing: '-0.04em to 0.1em',
      hierarchy: 'pure hierarchy with strong whitespace and emphasis',
    },
    layout: {
      sectionSpacing: 'very generous and luxurious',
      contentWidth: 'narrow but elegant with premium pacing',
      cardDensity: 'airy and minimalist',
      gridBehavior: 'restrained layout with strong whitespace',
      heroComposition: 'quiet editorial reveal with premium framing',
      navGeometry: 'minimal ribbon or thin pill navigation',
    },
    surfaces: {
      panelOpacity: 'soft and premium, almost matte',
      blur: 'very low, close to none',
      borderStrength: 'delicate and minimal',
      radius: 'soft luxury radius',
      shadow: 'gentle ambient depth only',
      highlight: 'subtle warm glints',
    },
    componentGeometry: {
      buttons: 'low-noise premium buttons with understated weight',
      cards: 'quiet material cards with exactly controlled spacing',
      pills: 'small luxury filters with subtle border emphasis',
      navigation: 'low-noise minimal nav with immaculate rhythm',
      projectCards: 'clean premium cards with a lot of whitespace',
      overlays: 'very soft and limited overlays',
    },
    background: {
      family: 'warm neutral habitat',
      atmosphere: 'quiet ambient light with minimal noise',
      texture: 'almost none; only subtle surfaces',
      lighting: 'warm soft glows and quiet contrast',
    },
    motionProfile: {
      transition: '0.75s to 1s slow luxury easing',
      reveal: 'gentle fade and micro-lift',
      hover: 'almost imperceptible elevate',
      parallax: 'minimal, restrained',
      scroll: 'calm premium rhythm',
    },
    projectPresentation: {
      preferredCard: 'minimal premium story cards with elegant framing',
      mediaEmphasis: 'true balance between art and information',
      metadataDensity: 'low-noise and quiet',
      featuredBehavior: 'hero project with a poised minimalist showcase',
    },
    cssVars: {
      '--font-display': 'var(--font-syne)',
      '--font-body': 'var(--font-sans)',
      '--space-section': '7rem',
      '--space-content': '2.5rem',
      '--surface-primary': 'rgba(248, 246, 242, 0.86)',
      '--surface-secondary': 'rgba(255,255,255,0.72)',
      '--surface-glass': 'rgba(255,255,255,0.44)',
      '--surface-overlay': 'rgba(24, 20, 16, 0.42)',
      '--border-subtle': 'rgba(24, 20, 16, 0.08)',
      '--border-strong': 'rgba(24, 20, 16, 0.14)',
      '--shadow-sm': '0 18px 32px -24px rgba(24,20,16,0.22)',
      '--shadow-lg': '0 30px 64px -34px rgba(24,20,16,0.24)',
      '--radius-sm': '10px',
      '--radius-md': '18px',
      '--radius-lg': '24px',
      '--text-primary': '#17140e',
      '--text-secondary': '#5f554f',
      '--accent-primary': '#d4a574',
      '--accent-secondary': '#a67c5b',
      '--background-base': '#f4f0ea',
      '--background-atmosphere': 'radial-gradient(circle at 50% 0%, rgba(212,165,116,0.16), transparent 28%)',
      '--motion-duration': '0.8s',
      '--motion-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--hero-density': 'luxury',
      '--card-density': 'spacious',
      '--nav-height': '72px',
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Luxury',
    description: 'Refined typography, calm spacing, premium restraint, and quiet but confident luxury.',
    material: 'soft matte panels / warm minimal surfaces / quiet reflective details',
    motion: 'gentle and highly controlled, almost silent movement',
    typography: {
      display: 'refined premium display with open breathing room',
      headingScale: 'large yet curated and elegant',
      bodyDensity: 'low-noise, premium readability',
      label: 'quiet uppercase micro labels',
      letterSpacing: '-0.04em to 0.1em',
      hierarchy: 'pure hierarchy with strong whitespace and emphasis',
    },
    layout: {
      sectionSpacing: 'very generous and luxurious',
      contentWidth: 'narrow but elegant with premium pacing',
      cardDensity: 'airy and minimalist',
      gridBehavior: 'restrained layout with strong whitespace',
      heroComposition: 'quiet editorial reveal with premium framing',
      navGeometry: 'minimal ribbon or thin pill navigation',
    },
    surfaces: {
      panelOpacity: 'soft and premium, almost matte',
      blur: 'very low, close to none',
      borderStrength: 'delicate and minimal',
      radius: 'soft luxury radius',
      shadow: 'gentle ambient depth only',
      highlight: 'subtle warm glints',
    },
    componentGeometry: {
      buttons: 'low-noise premium buttons with understated weight',
      cards: 'quiet material cards with exactly controlled spacing',
      pills: 'small luxury filters with subtle border emphasis',
      navigation: 'low-noise minimal nav with immaculate rhythm',
      projectCards: 'clean premium cards with a lot of whitespace',
      overlays: 'very soft and limited overlays',
    },
    background: {
      family: 'warm neutral habitat',
      atmosphere: 'quiet ambient light with minimal noise',
      texture: 'almost none; only subtle surfaces',
      lighting: 'warm soft glows and quiet contrast',
    },
    motionProfile: {
      transition: '0.75s to 1s slow luxury easing',
      reveal: 'gentle fade and micro-lift',
      hover: 'almost imperceptible elevate',
      parallax: 'minimal, restrained',
      scroll: 'calm premium rhythm',
    },
    projectPresentation: {
      preferredCard: 'minimal premium story cards with elegant framing',
      mediaEmphasis: 'true balance between art and information',
      metadataDensity: 'low-noise and quiet',
      featuredBehavior: 'hero project with a poised minimalist showcase',
    },
    cssVars: {
      '--font-display': 'var(--font-syne)',
      '--font-body': 'var(--font-sans)',
      '--space-section': '7rem',
      '--space-content': '2.5rem',
      '--surface-primary': 'rgba(248, 246, 242, 0.86)',
      '--surface-secondary': 'rgba(255,255,255,0.72)',
      '--surface-glass': 'rgba(255,255,255,0.44)',
      '--surface-overlay': 'rgba(24, 20, 16, 0.42)',
      '--border-subtle': 'rgba(24, 20, 16, 0.08)',
      '--border-strong': 'rgba(24, 20, 16, 0.14)',
      '--shadow-sm': '0 18px 32px -24px rgba(24,20,16,0.22)',
      '--shadow-lg': '0 30px 64px -34px rgba(24,20,16,0.24)',
      '--radius-sm': '10px',
      '--radius-md': '18px',
      '--radius-lg': '24px',
      '--text-primary': '#17140e',
      '--text-secondary': '#5f554f',
      '--accent-primary': '#d4a574',
      '--accent-secondary': '#a67c5b',
      '--background-base': '#f4f0ea',
      '--background-atmosphere': 'radial-gradient(circle at 50% 0%, rgba(212,165,116,0.16), transparent 28%)',
      '--motion-duration': '0.8s',
      '--motion-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--hero-density': 'luxury',
      '--card-density': 'spacious',
      '--nav-height': '72px',
    },
  },
};

export const getThemePreset = (themeName?: string): ThemeSemanticTokens => {
  return THEME_REGISTRY[normalizeThemeName(themeName)];
};

export const resolveColorMode = (mode?: ThemeMode): 'dark' | 'light' => {
  if (mode === 'light') return 'light';
  if (mode === 'dark') return 'dark';
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
};
