import React, { Suspense, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { BackgroundIntensity, MotionMode, ThreeDQuality } from '../../types/portfolio';
import { normalizeThemeName } from '../../lib/themeRegistry';
import { canUseWebGL } from './three-utils';
import type { ThreeSceneProps } from './ThreeScene';

const LazyThreeScene = React.lazy(() => import('./ThreeScene').then((module) => ({ default: module.ThreeScene })));

export const Portfolio3D: React.FC = () => {
  const { data } = usePortfolio();
  const systemReducedMotion = useReducedMotion();
  const [canRender, setCanRender] = useState(false);
  const appearance = data.appearance;
  const intensity = (appearance?.threeDIntensity || 'subtle') as BackgroundIntensity;
  const quality = (appearance?.threeDQuality || 'auto') as ThreeDQuality;
  const motion: MotionMode = systemReducedMotion ? 'reduced' : (appearance?.motionMode || 'full');
  const theme = normalizeThemeName(appearance?.themeName || 'cinematic') as ThreeSceneProps['theme'];

  useEffect(() => {
    let active = true;
    if (appearance?.enable3D === false || intensity === 'off' || motion === 'off') {
      setCanRender(false);
      return undefined;
    }
    const mobile = navigator.maxTouchPoints > 1 || window.innerWidth < 768;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (mobile || coarsePointer) {
      setCanRender(false);
      return undefined;
    }
    const frame = window.requestIdleCallback ? window.requestIdleCallback : (callback: IdleRequestCallback) => window.setTimeout(callback, 1);
    const cancel = window.cancelIdleCallback ? window.cancelIdleCallback : (id: number) => window.clearTimeout(id);
    const task = frame(() => {
      if (active) setCanRender(canUseWebGL());
    });
    return () => {
      active = false;
      cancel(task as number);
    };
  }, [appearance?.enable3D, intensity, motion, quality]);

  if (!canRender) return null;

  return (
    <div className="portfolio-3d-shell" aria-hidden="true">
      <Suspense fallback={null}>
        <LazyThreeScene theme={theme} intensity={intensity} quality={quality} motion={motion} />
      </Suspense>
    </div>
  );
};
