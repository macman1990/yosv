import React, { Component, useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar, AdminTabId } from './AdminSidebar';
import { AdminOverviewTab } from './tabs/AdminOverviewTab';
import { AdminProjectsTab } from './tabs/AdminProjectsTab';
import { AdminServicesTab } from './tabs/AdminServicesTab';
import { AdminToolsSkillsTab } from './tabs/AdminToolsSkillsTab';
import { AdminExperienceTab } from './tabs/AdminExperienceTab';
import { AdminEducationTab } from './tabs/AdminEducationTab';
import { AdminContentTab } from './tabs/AdminContentTab';
import { AdminBlogTab } from './tabs/AdminBlogTab';
import { AdminTestimonialsTab } from './tabs/AdminTestimonialsTab';
import { AdminProfileTab } from './tabs/AdminProfileTab';
import { AdminCustomSectionsTab } from './tabs/AdminCustomSectionsTab';
import { AdminAppearanceTab } from './tabs/AdminAppearanceTab';
import { AdminMediaLibraryTab } from './tabs/AdminMediaLibraryTab';
import { AdminBackupSyncTab } from './tabs/AdminBackupSyncTab';
import { AdminSecurityTab } from './tabs/AdminSecurityTab';
import { AdminPricingTab } from './tabs/AdminPricingTab';
import { AdminSocialLinksTab } from './tabs/AdminSocialLinksTab';
import { AdminFeatureFlagsTab } from './tabs/AdminFeatureFlagsTab';
import { AdminStartProjectTab } from './tabs/AdminStartProjectTab';
import { AdminProjectInquiryTab } from './tabs/AdminProjectInquiryTab';
import { AdminAvailabilityTab } from './tabs/AdminAvailabilityTab';
import { AdminClientLogosTab } from './tabs/AdminClientLogosTab';
import { AdminPageOrderTab } from './tabs/AdminPageOrderTab';
import { AdminSiteContentTab } from './tabs/AdminSiteContentTab';
import { AdminMessagesTab } from './tabs/AdminMessagesTab';
const LazyAdminGuideTab = React.lazy(() => import('./tabs/AdminGuideTab').then((module) => ({ default: module.AdminGuideTab })));

class GuideErrorBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError(): { failed: boolean } { return { failed: true }; }
  render() {
    return this.state.failed
      ? <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">The guide could not be loaded. Refresh the dashboard and try again.</div>
      : this.props.children;
  }
}

export const AdminDashboard: React.FC = () => {
  const { data, saveData, addToast, language } = usePortfolio();
  const [activeTab, setActiveTab] = useState<AdminTabId>('overview');
  const [isSaving, setIsSaving] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('aetheria_admin_sidebar_collapsed') === 'true');

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    localStorage.setItem('aetheria_admin_sidebar_collapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileNavOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = previousOverflow; menuButtonRef.current?.focus(); };
  }, [mobileNavOpen]);

  const handleGlobalSave = async () => {
    setIsSaving(true);
    await saveData(data);
    setTimeout(() => {
      setIsSaving(false);
      addToast(language === 'ar' ? 'تم حفظ ومزامنة كل بيانات الاستوديو.' : 'All studio data committed and synced!', 'success');
    }, 400);
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[90000] flex flex-col overflow-hidden font-sans bg-[var(--background)] text-[var(--foreground)]"
    >
      <AdminHeader onSave={handleGlobalSave} isSaving={isSaving} onMenu={() => setMobileNavOpen(true)} menuOpen={mobileNavOpen} />

      <div className="flex flex-1 overflow-hidden">
        {mobileNavOpen && <button type="button" aria-label={language === 'ar' ? 'إغلاق التنقل' : 'Close navigation'} onClick={() => setMobileNavOpen(false)} className="fixed inset-0 z-[90500] bg-black/60 md:hidden" />}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((value) => !value)} mobileOpen={mobileNavOpen} navigationInteractive={!isMobile || mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />

        <main className="flex-1 overflow-y-auto bg-[var(--background)] p-6 md:p-10">
          <div className="mx-auto max-w-6xl pb-16">
            {activeTab === 'overview' && <AdminOverviewTab onNavigate={setActiveTab} />}
            {activeTab === 'projects' && <AdminProjectsTab />}
            {activeTab === 'services' && <AdminServicesTab />}
            {activeTab === 'features' && <AdminFeatureFlagsTab />}
            {activeTab === 'startProject' && <AdminStartProjectTab />}
            {activeTab === 'projectInquiry' && <AdminProjectInquiryTab />}
            {activeTab === 'availability' && <AdminAvailabilityTab />}
            {activeTab === 'clientLogos' && <AdminClientLogosTab />}
            {activeTab === 'pricing' && <AdminPricingTab />}
            {activeTab === 'tools' && <AdminToolsSkillsTab />}
            {activeTab === 'experience' && <AdminExperienceTab />}
            {activeTab === 'education' && <AdminEducationTab />}
            {activeTab === 'content' && <AdminContentTab />}
            {activeTab === 'blog' && <AdminBlogTab />}
            {activeTab === 'testimonials' && <AdminTestimonialsTab />}
            {activeTab === 'profile' && <AdminProfileTab />}
            {activeTab === 'social' && <AdminSocialLinksTab />}
            {activeTab === 'sections' && <AdminCustomSectionsTab />}
            {activeTab === 'pageOrder' && <AdminPageOrderTab />}
            {activeTab === 'siteContent' && <AdminSiteContentTab />}
            {activeTab === 'messages' && <AdminMessagesTab />}
            {activeTab === 'appearance' && <AdminAppearanceTab />}
            {activeTab === 'media' && <AdminMediaLibraryTab />}
            {activeTab === 'backup' && <AdminBackupSyncTab />}
            {activeTab === 'security' && <AdminSecurityTab />}
            {activeTab === 'guide' && <GuideErrorBoundary><React.Suspense fallback={<div className="p-6 text-sm text-[var(--muted)]">{language === 'ar' ? 'جارٍ تحميل الدليل…' : 'Loading guide…'}</div>}><LazyAdminGuideTab /></React.Suspense></GuideErrorBoundary>}
          </div>
        </main>
      </div>
    </div>
  );
};
