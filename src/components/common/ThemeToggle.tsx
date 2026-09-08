import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { theme, toggleTheme } = usePortfolio();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center p-2 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--foreground)] transition-all duration-200 cursor-pointer shadow-xs"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle visual theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};
