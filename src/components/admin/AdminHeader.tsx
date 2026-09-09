import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ExternalLink, Save, LogOut, Globe, Sparkles } from 'lucide-react';

export const AdminHeader: React.FC<{ onSave: () => void; isSaving?: boolean }> = ({
  onSave,
  isSaving,
}) => {
  const { setIsAdminMode, language, setLanguage, addToast } = usePortfolio();
  const labels = {
    en: {
      viewLive: 'View Live Portfolio',
      editingIn: 'Editing In',
      save: 'Save All Changes',
      syncing: 'Syncing...',
      signOut: 'Sign Out',
      logout: 'Logged out of Admin Session.',
    },
    ar: {
      viewLive: 'عرض الموقع المباشر',
      editingIn: 'تعديل في',
      save: 'حفظ كل التغييرات',
      syncing: 'جارٍ المزامنة...',
      signOut: 'تسجيل الخروج',
      logout: 'تم تسجيل الخروج من الجلسة الإدارية.',
    },
  } as const;
  const { logout } = useAdminAuth();

  const handleExitToSite = () => {
    setIsAdminMode(false);
  };

  const handleLogout = () => {
    logout();
    setIsAdminMode(false);
    addToast(labels[language].logout, 'info');
  };

  const current = labels[language];

  return (
    <header className="h-16 shrink-0 border-b border-[var(--border)] bg-[var(--glass-bg)] px-6 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExitToSite}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>{current.viewLive}</span>
          </button>

          <span className="text-[var(--muted-foreground)]">|</span>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)]">
            <Globe className="h-3.5 w-3.5 text-[var(--color-accent)]" />
            <span>{current.editingIn}</span>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`rounded px-2 py-0.5 text-[11px] font-bold ${
                language === 'en' ? 'bg-[var(--color-accent)] text-black' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`rounded px-2 py-0.5 text-[11px] font-bold ${
                language === 'ar' ? 'bg-[var(--color-accent)] text-black' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              AR
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:opacity-90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? current.syncing : current.save}</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-2 text-[var(--muted)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
            title={current.signOut}
            aria-label={current.signOut}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
