import React, { useState } from 'react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ShieldCheck, KeyRound, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminSecurityTab: React.FC = () => {
  const { updatePassword, logout } = useAdminAuth();
  const { setIsAdminMode, addToast, language } = usePortfolio();
  const tx = (en: string, ar: string) => language === 'ar' ? ar : en;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword.length < 4) {
      setError(tx('New password must be at least 4 characters long.', 'يجب أن تتكون كلمة المرور الجديدة من 4 أحرف على الأقل.'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(tx('New passwords do not match.', 'كلمتا المرور الجديدتان غير متطابقتين.'));
      return;
    }

    const res = await updatePassword(newPassword);
    if (res.success) {
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      addToast(tx('Master key successfully updated.', 'تم تحديث المفتاح الرئيسي بنجاح.'), 'success');
    } else {
      setError(res.message || tx('Failed to update password.', 'تعذر تحديث كلمة المرور.'));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-2xl">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white font-syne">{tx('Security & Master Key Settings', 'إعدادات الأمان والمفتاح الرئيسي')}</h2>
        <p className="text-xs text-zinc-400">{tx('Manage admin access credentials and session authorization', 'إدارة بيانات دخول الإدارة وتفويض الجلسة')}</p>
      </div>

      {/* Security Status Box */}
      <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-3">
        <div className="flex items-center gap-2.5 text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
            {tx('Supabase Authentication Active', 'مصادقة Supabase مفعلة')}
          </h3>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          Admin access is secured using Supabase Auth and Row Level Security (RLS). Ensure your account is registered in the <code className="bg-black/50 px-2 py-0.5 rounded font-mono text-emerald-300">admin_users</code> table with the <code className="bg-black/50 px-2 py-0.5 rounded font-mono text-emerald-300">admin</code> role.
        </p>
      </div>

      {/* Change Password Form */}
      <div className="p-7 rounded-3xl bg-[#12141c] border border-white/10 space-y-6">
        <h3 className="text-base font-bold text-white font-syne flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          {tx('Update Master Password', 'تحديث كلمة المرور الرئيسية')}
        </h3>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{tx('Master key has been successfully updated and encrypted.', 'تم تحديث المفتاح الرئيسي وتشفيره بنجاح.')}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">{tx('New Master Password', 'كلمة المرور الرئيسية الجديدة')}</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={tx('Enter new credential...', 'أدخل بيانات الاعتماد الجديدة...')}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-emerald-500 text-white text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400">{tx('Confirm New Password', 'تأكيد كلمة المرور الجديدة')}</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={tx('Re-type new credential...', 'أعد كتابة بيانات الاعتماد الجديدة...')}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-emerald-500 text-white text-xs font-mono"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            {tx('Update Key', 'تحديث المفتاح')}
          </button>
        </form>
      </div>

      {/* Immediate Session Termination */}
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-white uppercase font-mono">{tx('End Session', 'إنهاء الجلسة')}</h4>
          <p className="text-xs text-zinc-400">{tx('Terminates active administrative authentication', 'ينهي مصادقة الإدارة النشطة')}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            setIsAdminMode(false);
          }}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono"
        >
          {tx('Logout', 'تسجيل الخروج')}
        </button>
      </div>

      {/* Production Supabase RLS Guide */}
      <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Production Supabase Row Level Security (RLS)</span>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          Please execute the SQL migration located at <code className="bg-black/50 px-2 py-0.5 rounded font-mono text-emerald-300">supabase/migrations/20260101000000_init_security.sql</code> in your Supabase SQL editor. This sets up the <code className="bg-black/50 px-2 py-0.5 rounded font-mono text-emerald-300">admin_users</code> table, secures the <code className="bg-black/50 px-2 py-0.5 rounded font-mono text-emerald-300">portfolio_data</code> table, and provisions a <code className="bg-black/50 px-2 py-0.5 rounded font-mono text-emerald-300">public_portfolio_data</code> view for safe public access without exposing drafts.
        </p>
      </div>
    </div>
  );
};
