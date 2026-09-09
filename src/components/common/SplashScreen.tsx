import React from 'react';

interface SplashScreenProps {
  visible: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className={`splash-screen ${visible ? '' : 'hidden'}`} aria-live="polite" aria-busy="true">
      <div className="splash-shell">
        <div className="splash-mark">YM</div>

        <div className="splash-text">
          <span className="splash-name">Youssef Mohamed</span>
          <span className="splash-role">Video Editor & Creative Freelancer</span>
        </div>

        <div className="splash-line" />
      </div>
    </div>
  );
};
