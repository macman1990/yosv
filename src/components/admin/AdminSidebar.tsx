import React from 'react';
import {
  LayoutDashboard,
  Film,
  Layers,
  Cpu,
  Briefcase,
  GraduationCap,
  Video,
  MessageSquare,
  User,
  Component,
  Palette,
  Image as ImageIcon,
  Database,
  ShieldAlert,
  FileText,
} from 'lucide-react';

export type AdminTabId =
  | 'overview'
  | 'projects'
  | 'services'
  | 'tools'
  | 'experience'
  | 'education'
  | 'content'
  | 'blog'
  | 'testimonials'
  | 'profile'
  | 'sections'
  | 'appearance'
  | 'media'
  | 'backup'
  | 'security';

interface AdminSidebarProps {
  activeTab: AdminTabId;
  setActiveTab: (tab: AdminTabId) => void;
  collapsed?: boolean;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems: { id: AdminTabId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects & Reels', icon: <Film className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Layers className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools & Skills', icon: <Cpu className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education & Certs', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'content', label: 'Content Creator', icon: <Video className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog & Editorial', icon: <FileText className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & Bio', icon: <User className="w-4 h-4" /> },
    { id: 'sections', label: 'Section Builder', icon: <Component className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance & UI', icon: <Palette className="w-4 h-4" /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'backup', label: 'Backup & JSON', icon: <Database className="w-4 h-4" /> },
    { id: 'security', label: 'Security & Auth', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-[#0d0e14] border-r border-white/10 flex flex-col justify-between shrink-0 h-full overflow-y-auto">
      <div className="p-4 space-y-1">
        <div className="px-3 py-3 mb-2 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
            Studio CMS v3.4
          </span>
        </div>

        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10 text-[11px] font-mono text-zinc-500 text-center">
        Aetheria OS • Vercel Ready
      </div>
    </aside>
  );
};
