import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ExternalLink, Save, LogOut, Globe, Sparkles } from 'lucide-react';

export const AdminHeader: React.FC<{ onSave: () => void; isSaving?: boolean }> = ({
  onSave,
  isSaving,
}) => {
  const { setIsAdminMode, language, setLanguage, addToast } = usePortfolio();
  const { logout } = useAdminAuth();

  const handleExitToSite = () => {
    setIsAdminMode(false);
  };

  const handleLogout = () => {
    logout();
    setIsAdminMode(false);
    addToast('Logged out of Admin Session.', 'info');
  };

  return (
    <header className="h-16 px-6 bg-[#111218] border-b border-white/10 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleExitToSite}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Live Portfolio</span>
        </button>

        <span className="text-zinc-600">|</span>

        {/* Content Language switch for previewing and editing bilingual entries */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>Editing In:</span>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              language === 'en' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage('ar')}
            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              language === 'ar' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-white'
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
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Syncing...' : 'Save All Changes'}</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
