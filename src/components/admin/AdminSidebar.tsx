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
  ListOrdered,
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
  | 'pageOrder'
  | 'siteContent'
  | 'messages'
  | 'appearance'
  | 'media'
  | 'backup'
  | 'security'
  | 'guide';

interface AdminSidebarProps {
  activeTab: AdminTabId;
  setActiveTab: (tab: AdminTabId) => void;
  collapsed?: boolean;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  navigationInteractive?: boolean;
  onToggleCollapsed?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, mobileOpen = false, onCloseMobile, navigationInteractive = true, collapsed = false, onToggleCollapsed }) => {
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
    pageOrder: { en: 'Page Order', ar: 'ترتيب الصفحات' },
    siteContent: { en: 'Site Content', ar: 'محتوى الموقع' },
    messages: { en: 'Messages', ar: 'الرسائل' },
    appearance: { en: 'Appearance & UI', ar: 'المظهر والواجهة' },
    media: { en: 'Media Library', ar: 'مكتبة الوسائط' },
    backup: { en: 'Backup & JSON', ar: 'النسخ الاحتياطي والـ JSON' },
    security: { en: 'Security & Auth', ar: 'الأمان والمصادقة' },
    guide: { en: 'Dashboard Guide', ar: 'دليل لوحة التحكم' },
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
    { id: 'pageOrder', icon: <ListOrdered className="h-4 w-4" /> },
    { id: 'siteContent', icon: <FileText className="h-4 w-4" /> },
    { id: 'messages', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'appearance', icon: <Palette className="h-4 w-4" /> },
    { id: 'media', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'backup', icon: <Database className="h-4 w-4" /> },
    { id: 'security', icon: <ShieldAlert className="h-4 w-4" /> },
    { id: 'guide', icon: <FileText className="h-4 w-4" /> },
  ];

  return (
    <aside id="admin-navigation" aria-label="Admin navigation" className={`fixed inset-y-0 start-0 z-[91000] h-full shrink-0 overflow-y-auto border-e border-[var(--border)] bg-[var(--surface)] transition-[width,transform] duration-300 md:relative md:z-auto md:block md:translate-x-0 ${collapsed ? 'md:w-20' : 'md:w-64'} w-72 ${mobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full md:translate-x-0'}`}>
      <div className={`space-y-1 p-4 ${collapsed ? 'md:px-2' : ''}`}>
        <div className={`mb-2 flex items-center gap-2 px-3 py-3 ${collapsed ? 'md:justify-center md:px-0' : ''}`}>
          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
          <span className={`text-xs font-mono font-bold uppercase tracking-[0.24em] text-[var(--muted)] ${collapsed ? 'md:hidden' : ''}`}>
            Studio CMS v3.4
          </span>
          <button type="button" onClick={onToggleCollapsed} aria-expanded={!collapsed} aria-controls="admin-navigation" aria-label={collapsed ? 'Expand dashboard navigation' : 'Collapse dashboard navigation'} title={collapsed ? 'Expand navigation' : 'Collapse navigation'} className="ms-auto hidden rounded-lg border border-[var(--border)] p-1.5 text-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] md:block">
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const label = labelMap[item.id][language];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => { setActiveTab(item.id); onCloseMobile?.(); }}
              tabIndex={navigationInteractive ? 0 : -1}
              title={collapsed ? label : undefined}
              className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${collapsed ? 'md:justify-center md:px-2' : ''} ${
                isActive
                  ? 'bg-[var(--color-accent)] text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span className={collapsed ? 'md:hidden' : ''}>{label}</span>
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
