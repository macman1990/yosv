import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { getBackgroundPreset, normalizeBackgroundIntensity, normalizeMotionMode } from '../../lib/backgroundSystem';
import { normalizeThemeName } from '../../lib/themeRegistry';

export const BackgroundSystem: React.FC = () => {
  const { data } = usePortfolio();
  const appearance = data.appearance;
  const theme = normalizeThemeName(appearance?.themeName);
  const preset = getBackgroundPreset(theme);
  const intensity = normalizeBackgroundIntensity(appearance?.backgroundIntensity);
  const motion = normalizeMotionMode(appearance?.motionMode);
  const grainEnabled = appearance?.grainOverlayEnabled !== false;

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-background-intensity', intensity);
    root.setAttribute('data-background-motion', motion);
    root.setAttribute('data-background-grain', grainEnabled ? 'on' : 'off');
    return () => {
      root.removeAttribute('data-background-intensity');
      root.removeAttribute('data-background-motion');
      root.removeAttribute('data-background-grain');
    };
  }, [grainEnabled, intensity, motion]);

  return (
    <div
      aria-hidden="true"
      className="background-system"
      data-background-theme={theme}
      data-background-intensity={intensity}
      data-background-motion={motion}
      data-background-grain={grainEnabled ? 'on' : 'off'}
      style={{
        '--background-light': preset.light,
        '--background-mobile-light': preset.mobileLight,
        '--background-grain-opacity': String(preset.grainOpacity),
        '--background-layer-count': String(preset.layerCount),
      } as React.CSSProperties}
    >
      <div className="background-system__atmosphere" />
      <div className="background-system__texture" />
      <div className="background-system__vignette" />
    </div>
  );
};
