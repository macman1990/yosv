import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Languages } from 'lucide-react';

export const LanguageSwitcher: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { language, setLanguage } = usePortfolio();

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] backdrop-blur-md">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
          language === 'en'
            ? 'bg-[var(--color-accent)] text-black shadow-sm font-bold'
            : 'text-[var(--muted)] hover:text-[var(--foreground)]'
        }`}
        title="English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer font-arabic-heading ${
          language === 'ar'
            ? 'bg-[var(--color-accent)] text-black shadow-sm font-bold'
            : 'text-[var(--muted)] hover:text-[var(--foreground)]'
        }`}
        title="العربية (Arabic)"
      >
        عربي
      </button>
    </div>
  );
};
