import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Lock, KeyRound, ArrowRight, X, AlertCircle, ShieldCheck } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { showAdminLogin, setShowAdminLogin, setIsAdminMode, addToast, language } = usePortfolio();
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

  const copy = {
    en: {
      title: 'Terminal Access Portal',
      subtitle: 'Aetheria Studio Engine • CMS Authorization',
      emailLabel: 'Admin Email',
      emailHint: 'Local Fallback: leave blank',
      emailPlaceholder: 'Enter admin email...',
      passwordLabel: 'Master Key',
      passwordPlaceholder: 'Enter master key...',
      authFailed: 'Authentication denied. Invalid credentials.',
      failure: 'Internal authentication failure.',
      button: 'Authorize & Open CMS',
      loading: 'Authenticating...',
      security: 'Encrypted Session • SHA-256',
      online: 'Online',
      close: 'Close',
    },
    ar: {
      title: 'بوابة الوصول الآمنة',
      subtitle: 'محرك استوديو آيثيريا • تفويض لوحة التحكم',
      emailLabel: 'البريد الإلكتروني للإدارة',
      emailHint: 'بديل محلي: اتركه فارغاً',
      emailPlaceholder: 'أدخل بريد الإدارة...',
      passwordLabel: 'المفتاح الرئيسي',
      passwordPlaceholder: 'أدخل المفتاح الرئيسي...',
      authFailed: 'تم رفض الوصول. بيانات غير صالحة.',
      failure: 'فشل داخلي في المصادقة.',
      button: 'تفويض والدخول إلى لوحة التحكم',
      loading: 'جارٍ التحقق...',
      security: 'جلسة مشفرة • SHA-256',
      online: 'متصل',
      close: 'إغلاق',
    },
  } as const;

  const text = copy[language];

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-start shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            setShowAdminLogin(false);
            setError(null);
            setPassword('');
          }}
          className="absolute end-5 top-5 cursor-pointer rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-2 text-[var(--muted)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          aria-label={text.close}
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
          <h2 className="font-syne text-xl font-bold tracking-tight text-[var(--foreground)]">
            {text.title}
          </h2>
          <p className="font-mono text-xs leading-relaxed text-[var(--muted)]">
            {text.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
              <span>{text.emailLabel}</span>
              <span className="text-[10px] text-[var(--muted-foreground)]">{text.emailHint}</span>
            </label>
            <div className="relative">
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={text.emailPlaceholder}
                className="w-full ps-4 pe-10 py-3 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--foreground)] text-sm font-mono transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
              <span>{text.passwordLabel}</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={text.passwordPlaceholder}
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
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-black shadow-md transition-all hover:opacity-95 disabled:opacity-50"
          >
            {loading ? (
              <span>{text.loading}</span>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                <span>{text.button}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-[11px] font-mono text-[var(--muted-foreground)]">
          <span>{text.security}</span>
          <span style={{ color: 'var(--color-accent)' }}>{text.online}</span>
        </div>
      </div>
    </div>
  );
};
