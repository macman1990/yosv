import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Lock, KeyRound, ArrowRight, X, AlertCircle, ShieldCheck } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { showAdminLogin, setShowAdminLogin, setIsAdminMode, addToast } = usePortfolio();
  const { login, isAuthenticated } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!showAdminLogin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        setShowAdminLogin(false);
        setIsAdminMode(true);
        setPassword('');
        addToast('Admin authentication established.', 'success');
      } else {
        setError(result.error || 'Authentication denied. Invalid credentials.');
      }
    } catch (err) {
      setError('Internal authentication failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-start">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            setShowAdminLogin(false);
            setError(null);
            setPassword('');
          }}
          className="absolute top-5 end-5 p-2 rounded-full bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-6">
          <div
            className="w-12 h-12 rounded-2xl border flex items-center justify-center mb-4"
            style={{
              backgroundColor: 'var(--accent-muted)',
              borderColor: 'var(--color-accent)',
              color: 'var(--color-accent)',
            }}
          >
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)] font-syne tracking-tight">
            Terminal Access Portal
          </h2>
          <p className="text-xs text-[var(--muted)] leading-relaxed font-mono">
            Aetheria Studio Engine • CMS Authorization
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[var(--muted)] flex items-center justify-between">
              <span>Admin Email</span>
              <span className="text-[10px] text-[var(--muted-foreground)]">Local Fallback: leave blank</span>
            </label>
            <div className="relative">
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email..."
                className="w-full ps-4 pe-10 py-3 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--foreground)] text-sm font-mono transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[var(--muted)] flex items-center justify-between">
              <span>Master Key</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter master key..."
                className="w-full ps-4 pe-10 py-3 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--foreground)] text-sm font-mono tracking-widest transition-colors"
              />
              <KeyRound className="w-4 h-4 text-[var(--muted-foreground)] absolute end-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[var(--color-accent)] text-black flex items-center justify-center gap-2 transition-all shadow-md hover:opacity-95 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize & Open CMS</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--muted-foreground)]">
          <span>Encrypted Session • SHA-256</span>
          <span style={{ color: 'var(--color-accent)' }}>Online</span>
        </div>
      </div>
    </div>
  );
};
