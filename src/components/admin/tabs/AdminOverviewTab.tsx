import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { AdminTabId } from '../AdminSidebar';
import {
  Film,
  Eye,
  Layers,
  Sparkles,
  ArrowUpRight,
  Database,
  Plus,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface AdminOverviewTabProps {
  onNavigate: (tab: AdminTabId) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ onNavigate }) => {
  const { data } = usePortfolio();

  const projectCount = data.projects?.length || 0;
  const servicesCount = data.services?.length || 0;
  const toolsCount = data.tools?.length || 0;
  const testimonialsCount = data.testimonials?.length || 0;
  const contentCount = data.contentItems?.length || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-[#12141c] border border-emerald-500/25 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            System Live & Synced
          </div>
          <h1 className="text-3xl font-black text-white font-syne">
            Welcome, {data.profile.name.en}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            Full control center for video showcases, short-form viral cuts, scripts, software mastery metrics, and brand appearance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add New Project
          </button>
          <button
            type="button"
            onClick={() => onNavigate('media')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all"
          >
            Media Library
          </button>
        </div>
      </div>

      {/* Numerical Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Portfolio Projects</span>
            <Film className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{projectCount}</div>
          <p className="text-[11px] text-zinc-500">Video & Case Study entries</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Content Creator Cuts</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{contentCount}</div>
          <p className="text-[11px] text-zinc-500">Reels, YouTube, Scripts</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Client Services</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{servicesCount}</div>
          <p className="text-[11px] text-zinc-500">Active offerings & retainers</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#12141c] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>Testimonials</span>
            <CheckCircle className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{testimonialsCount}</div>
          <p className="text-[11px] text-zinc-500">Verified client reviews</p>
        </div>
      </div>

      {/* Quick Access Action Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 font-mono">
          Quick Workflows
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-emerald-500/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-white font-bold mb-1">
              <span>Manage Projects</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Upload videos, edit titles, switch aspect ratios (9:16 vertical vs 16:9), and update results.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('appearance')}
            className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-emerald-500/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-white font-bold mb-1">
              <span>Aesthetics & Theme</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Adjust emerald accent colors, customize custom cursor halo, and toggle theme modes.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('backup')}
            className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-emerald-500/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-white font-bold mb-1">
              <span>Export / Import JSON</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Backup your entire portfolio to a single JSON file, restore data, or connect Supabase.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
