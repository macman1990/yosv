import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
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
  Sparkles,
} from 'lucide-react';

export type AdminTabId =
  | 'overview'
  | 'projects'
  | 'services'
  | 'features'
  | 'startProject'
  | 'projectInquiry'
  | 'availability'
  | 'clientLogos'
  | 'pricing'
  | 'tools'
  | 'experience'
  | 'education'
  | 'content'
  | 'blog'
  | 'testimonials'
  | 'profile'
  | 'social'
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
  const { language } = usePortfolio();

  const labelMap: Record<AdminTabId, { en: string; ar: string }> = {
    overview: { en: 'Overview', ar: 'نظرة عامة' },
    projects: { en: 'Projects & Reels', ar: 'المشاريع والريلز' },
    services: { en: 'Services', ar: 'الخدمات' },
    features: { en: 'Features', ar: 'المميزات' },
    startProject: { en: 'Start a Project', ar: 'ابدأ مشروعًا' },
    projectInquiry: { en: 'Project Inquiry', ar: 'استفسارات المشاريع' },
    availability: { en: 'Availability', ar: 'حالة التوفر' },
    clientLogos: { en: 'Client Logos', ar: 'شعارات العملاء' },
    pricing: { en: 'Pricing Packages', ar: 'باقات التسعير' },
    tools: { en: 'Tools & Skills', ar: 'الأدوات والمهارات' },
    experience: { en: 'Experience', ar: 'الخبرة' },
    education: { en: 'Education & Certs', ar: 'التعليم والشهادات' },
    content: { en: 'Content Creator', ar: 'محتوى المنصة' },
    blog: { en: 'Blog & Editorial', ar: 'المدونة والتحرير' },
    testimonials: { en: 'Testimonials', ar: 'آراء العملاء' },
    profile: { en: 'Profile & Bio', ar: 'الملف الشخصي والسيرة' },
    social: { en: 'Social Media', ar: 'السوشيال ميديا' },
    sections: { en: 'Section Builder', ar: 'بناء الأقسام' },
    appearance: { en: 'Appearance & UI', ar: 'المظهر والواجهة' },
    media: { en: 'Media Library', ar: 'مكتبة الوسائط' },
    backup: { en: 'Backup & JSON', ar: 'النسخ الاحتياطي والـ JSON' },
    security: { en: 'Security & Auth', ar: 'الأمان والمصادقة' },
  };

  const menuItems: { id: AdminTabId; icon: React.ReactNode }[] = [
    { id: 'overview', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'projects', icon: <Film className="h-4 w-4" /> },
    { id: 'services', icon: <Layers className="h-4 w-4" /> },
    { id: 'features', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'startProject', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'projectInquiry', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'availability', icon: <ShieldAlert className="h-4 w-4" /> },
    { id: 'clientLogos', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'pricing', icon: <Layers className="h-4 w-4" /> },
    { id: 'tools', icon: <Cpu className="h-4 w-4" /> },
    { id: 'experience', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'education', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'content', icon: <Video className="h-4 w-4" /> },
    { id: 'blog', icon: <FileText className="h-4 w-4" /> },
    { id: 'testimonials', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'profile', icon: <User className="h-4 w-4" /> },
    { id: 'social', icon: <Component className="h-4 w-4" /> },
    { id: 'sections', icon: <Component className="h-4 w-4" /> },
    { id: 'appearance', icon: <Palette className="h-4 w-4" /> },
    { id: 'media', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'backup', icon: <Database className="h-4 w-4" /> },
    { id: 'security', icon: <ShieldAlert className="h-4 w-4" /> },
  ];

  return (
    <aside className="h-full w-64 shrink-0 overflow-y-auto border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="space-y-1 p-4">
        <div className="mb-2 flex items-center gap-2 px-3 py-3">
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-[var(--muted)]">
            Studio CMS v3.4
          </span>
        </div>

        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const label = labelMap[item.id][language];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[var(--color-accent)] text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-[var(--border)] p-4 text-center text-[11px] font-mono text-[var(--muted-foreground)]">
        Aetheria OS • Vercel Ready
      </div>
    </aside>
  );
};
