import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CustomCursor: React.FC = () => {
  const { data } = usePortfolio();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'video' | 'text'>('default');
  const [visible, setVisible] = useState(false);

  const enabled = data.appearance?.customCursorEnabled !== false;

  useEffect(() => {
    if (!enabled) return;

    // Check if device is desktop with mouse pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="video"]') || target.closest('.project-card')) {
        setCursorType('video');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorType('pointer');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled]);

  if (!enabled || !visible || cursorType === 'text') return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          backgroundColor: data.appearance?.accentColor || '#10b981',
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
        }}
      />
      {/* Outer cinematic halo ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center ${
          cursorType === 'video'
            ? 'w-16 h-16 rounded-full backdrop-blur-xs border shadow-lg'
            : cursorType === 'pointer'
            ? 'w-10 h-10 rounded-full border scale-110'
            : 'w-7 h-7 rounded-full border border-[var(--border-hover)]'
        }`}
        style={{
          transform: `translate3d(${
            cursorType === 'video' ? pos.x - 32 : cursorType === 'pointer' ? pos.x - 20 : pos.x - 14
          }px, ${
            cursorType === 'video' ? pos.y - 32 : cursorType === 'pointer' ? pos.y - 20 : pos.y - 14
          }px, 0)`,
          ...(cursorType === 'video'
            ? {
                backgroundColor: 'var(--accent-muted)',
                borderColor: 'var(--color-accent)',
              }
            : cursorType === 'pointer'
            ? {
                backgroundColor: 'var(--accent-muted)',
                borderColor: 'var(--color-accent)',
              }
            : {}),
        }}
      >
        {cursorType === 'video' && (
          <span
            className="text-[9px] uppercase tracking-widest font-mono font-bold"
            style={{ color: 'var(--color-accent)' }}
          >
            PLAY
          </span>
        )}
      </div>
    </>
  );
};
