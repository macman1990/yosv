import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { ProjectInquiry } from '../../../types/portfolio';
import { StorageService } from '../../../lib/storage';
import { Mail, MessageSquare, RefreshCw } from 'lucide-react';

export const AdminMessagesTab: React.FC = () => {
  const { data, addToast } = usePortfolio();
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
    addToast(ok ? 'Inquiry status saved.' : 'Inquiry status could not be saved.', ok ? 'success' : 'error');
  };

  const legacyMessages = data.messages || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3"><div><h2 className="font-syne text-xl font-bold text-white">Messages & Inquiries</h2><p className="text-xs text-zinc-400">Private admin inbox backed by the protected project inquiries table.</p></div><button type="button" onClick={() => void load()} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200"><RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />Refresh</button></div>
      {loading ? <div className="rounded-2xl border border-white/10 bg-[#12141c] p-12 text-center text-sm text-zinc-400">Loading inquiries...</div> : inquiries.length === 0 && legacyMessages.length === 0 ? <div className="rounded-2xl border border-white/10 bg-[#12141c] p-12 text-center"><MessageSquare className="mx-auto mb-3 h-10 w-10 text-zinc-600" /><p className="text-sm text-zinc-400">No persisted inquiries are available.</p></div> : <div className="space-y-3">{inquiries.map((inquiry) => <article key={inquiry.id} className="rounded-2xl border border-white/10 bg-[#12141c] p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-white">{inquiry.name}</h3><p className="mt-1 text-xs text-zinc-400"><Mail className="mr-1 inline h-3 w-3" />{inquiry.email} • {new Date(inquiry.created_at).toLocaleString()}</p></div><select value={inquiry.status} onChange={(e) => void updateStatus(inquiry.id, e.target.value as ProjectInquiry['status'])} className="rounded-lg border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-white"><option value="new">New</option><option value="read">Read</option><option value="replied">Replied</option><option value="archived">Archived</option></select></div><div className="mt-4 grid grid-cols-1 gap-2 text-xs text-zinc-300 sm:grid-cols-2"><span>Project: {inquiry.project_type || inquiry.project_title || 'Not provided'}</span><span>Budget: {inquiry.budget || 'Not provided'}</span><span>Timeline: {inquiry.timeline || inquiry.deadline || 'Not provided'}</span>{inquiry.brief_url && <a href={inquiry.brief_url} target="_blank" rel="noopener noreferrer" className="text-emerald-300 underline">Open brief</a>}</div><p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-100">{inquiry.message || inquiry.project_description || 'No message body provided.'}</p></article>)}</div>}
    </div>
  );
};