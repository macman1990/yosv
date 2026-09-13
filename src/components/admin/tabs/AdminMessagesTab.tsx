import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ProjectInquiry } from '../../../types/portfolio';
import { StorageService } from '../../../lib/storage';
import { Mail, MessageSquare, RefreshCw } from 'lucide-react';

export const AdminMessagesTab: React.FC = () => {
  const { data, addToast, language } = usePortfolio();
  const tx = (en: string, ar: string) => language === 'ar' ? ar : en;
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setInquiries(await StorageService.getProjectInquiries());
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const updateStatus = async (id: string, status: ProjectInquiry['status']) => {
    const ok = await StorageService.updateProjectInquiryStatus(id, status);
    if (ok) setInquiries((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    addToast(ok ? tx('Inquiry status saved.', 'تم حفظ حالة الاستفسار.') : tx('Inquiry status could not be saved.', 'تعذر حفظ حالة الاستفسار.'), ok ? 'success' : 'error');
  };

  const legacyMessages = data.messages || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3"><div><h2 className="font-syne text-xl font-bold text-white">{tx('Messages & Inquiries', 'الرسائل والاستفسارات')}</h2><p className="text-xs text-zinc-400">{tx('Private admin inbox backed by the protected project inquiries table.', 'صندوق وارد إداري خاص مدعوم بجدول استفسارات المشاريع المحمي.')}</p></div><button type="button" onClick={() => void load()} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200"><RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />{tx('Refresh', 'تحديث')}</button></div>
      {loading ? <div className="rounded-2xl border border-white/10 bg-[#12141c] p-12 text-center text-sm text-zinc-400">{tx('Loading inquiries...', 'جارٍ تحميل الاستفسارات...')}</div> : inquiries.length === 0 && legacyMessages.length === 0 ? <div className="rounded-2xl border border-white/10 bg-[#12141c] p-12 text-center"><MessageSquare className="mx-auto mb-3 h-10 w-10 text-zinc-600" /><p className="text-sm text-zinc-400">{tx('No persisted inquiries are available.', 'لا توجد استفسارات محفوظة.')}</p></div> : <div className="space-y-3">{inquiries.map((inquiry) => <article key={inquiry.id} className="rounded-2xl border border-white/10 bg-[#12141c] p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-white">{inquiry.name}</h3><p className="mt-1 text-xs text-zinc-400"><Mail className="mr-1 inline h-3 w-3" />{inquiry.email} • {new Date(inquiry.created_at).toLocaleString()}</p></div><select value={inquiry.status} onChange={(e) => void updateStatus(inquiry.id, e.target.value as ProjectInquiry['status'])} className="rounded-lg border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-white"><option value="new">{tx('New', 'جديد')}</option><option value="read">{tx('Read', 'مقروء')}</option><option value="replied">{tx('Replied', 'تم الرد')}</option><option value="archived">{tx('Archived', 'مؤرشف')}</option></select></div><div className="mt-4 grid grid-cols-1 gap-2 text-xs text-zinc-300 sm:grid-cols-2"><span>{tx('Project:', 'المشروع:')} {inquiry.project_type || inquiry.project_title || tx('Not provided', 'غير متوفر')}</span><span>{tx('Budget:', 'الميزانية:')} {inquiry.budget || tx('Not provided', 'غير متوفر')}</span><span>{tx('Timeline:', 'الجدول الزمني:')} {inquiry.timeline || inquiry.deadline || tx('Not provided', 'غير متوفر')}</span>{inquiry.brief_url && <a href={inquiry.brief_url} target="_blank" rel="noopener noreferrer" className="text-emerald-300 underline">{tx('Open brief', 'فتح الموجز')}</a>}</div><p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-100">{inquiry.message || inquiry.project_description || tx('No message body provided.', 'لم يتم تقديم نص للرسالة.')}</p></article>)}</div>}
    </div>
  );
};