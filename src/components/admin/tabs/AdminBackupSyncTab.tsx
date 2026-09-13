import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { StorageService } from '../../../lib/storage';
import { Download, Upload, RotateCcw, Database, Cloud, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ConfirmDialog } from '../../common/ConfirmDialog';

export const AdminBackupSyncTab: React.FC = () => {
  const { data, saveData, resetData, addToast, language } = usePortfolio();
  const tx = (en: string, ar: string) => language === 'ar' ? ar : en;
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  const metaEnv = (import.meta as any).env || {};
  const hasSupabaseConfig = Boolean(
    metaEnv.VITE_SUPABASE_URL && metaEnv.VITE_SUPABASE_ANON_KEY
  );

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `aetheria_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast(tx('Portfolio backup exported to JSON!', 'تم تصدير نسخة الموقع الاحتياطية إلى JSON.'), 'success');
  };

  const handleImportJSON = async () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.profile || !parsed.projects) {
        throw new Error('Invalid schema');
      }
      await saveData(parsed);
      setShowImportArea(false);
      setImportJsonText('');
      addToast(tx('Data successfully restored from JSON!', 'تمت استعادة البيانات من JSON بنجاح.'), 'success');
    } catch (err) {
      addToast(tx('Failed to parse JSON. Please check file format.', 'تعذر تحليل JSON. تحقق من تنسيق الملف.'), 'error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        await saveData(parsed);
        addToast(tx('File imported successfully!', 'تم استيراد الملف بنجاح.'), 'success');
      } catch (err) {
        addToast(tx('Invalid JSON file format.', 'تنسيق ملف JSON غير صالح.'), 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white font-syne">{tx('Data Sync & Backup Architecture', 'بنية مزامنة البيانات والنسخ الاحتياطي')}</h2>
        <p className="text-xs text-zinc-400">{tx('Vercel-compatible cloud persistence, JSON snapshots, and disaster recovery', 'تخزين سحابي متوافق مع Vercel ولقطات JSON واستعادة البيانات')}</p>
      </div>

      {/* Cloud Status Card */}
      <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cloud className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">{tx('Storage Engine Health', 'حالة محرك التخزين')}</h3>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
              hasSupabaseConfig
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}
          >
            {hasSupabaseConfig ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                {tx('Supabase Connected', 'Supabase متصل')}
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                {tx('Local Cache Storage Active', 'التخزين المحلي النشط')}
              </>
            )}
          </span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          {hasSupabaseConfig
            ? tx('All updates in this CMS automatically synchronize across sessions with your Supabase database.', 'تتزامن كل التحديثات في لوحة الإدارة تلقائيًا عبر الجلسات مع قاعدة بيانات Supabase.')
            : tx('Running in zero-friction browser persistence. Every change is stored locally. To connect Supabase, configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.', 'يعمل التخزين السلس داخل المتصفح؛ تُحفظ كل التغييرات محليًا. لربط Supabase اضبط VITE_SUPABASE_URL وVITE_SUPABASE_ANON_KEY.')}
        </p>
      </div>

      {/* Backup & Import Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">{tx('Export Full Snapshot', 'تصدير لقطة كاملة')}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {tx('Downloads all projects, videos, services, career history, and theme settings as a single portable JSON file.', 'ينزّل كل المشاريع والفيديوهات والخدمات والسجل المهني وإعدادات السمة في ملف JSON واحد قابل للنقل.')}
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportJSON}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{tx('Download JSON Snapshot', 'تنزيل لقطة JSON')}</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">{tx('Import JSON Backup', 'استيراد نسخة JSON احتياطية')}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {tx('Restore previously exported portfolio snapshots or paste raw JSON.', 'استعد لقطات الموقع المصدرة سابقًا أو الصق JSON خامًا.')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer text-center">
              <Upload className="w-4 h-4" />
              <span>{tx('Upload .JSON File', 'رفع ملف .JSON')}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowImportArea(!showImportArea)}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-mono"
            >
              {tx('Paste', 'لصق')}
            </button>
          </div>
        </div>
      </div>

      {showImportArea && (
        <div className="p-6 rounded-3xl bg-[#12141c] border border-white/10 space-y-3 animate-in fade-in duration-200">
          <h4 className="text-xs font-mono uppercase text-zinc-400 font-bold">
            {tx('Paste JSON Content Here', 'الصق محتوى JSON هنا')}
          </h4>
          <textarea
            rows={6}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder={tx('Paste raw JSON structure...', 'الصق بنية JSON الخام...')}
            className="w-full p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-300"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowImportArea(false)}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400"
            >
              {tx('Cancel', 'إلغاء')}
            </button>
            <button
              type="button"
              onClick={handleImportJSON}
              className="px-5 py-2 rounded-xl text-xs font-bold uppercase bg-emerald-500 text-black"
            >
              {tx('Apply JSON', 'تطبيق JSON')}
            </button>
          </div>
        </div>
      )}

      {/* Danger Zone: Reset to Default */}
      <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset to Factory Default Content
          </h4>
          <p className="text-xs text-zinc-400">
            Replaces all current entries with the initial sample video projects, tools, and profile.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white shadow-md self-start sm:self-auto cursor-pointer"
        >
          Reset All Data
        </button>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        title={tx('Reset Portfolio to Default?', 'إعادة ملف الأعمال إلى الإعدادات الافتراضية؟')}
        message="This will overwrite all customized projects, services, and profile settings with the initial high-yield dataset."
        confirmText="Yes, Reset Data"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={async () => {
          await resetData();
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
