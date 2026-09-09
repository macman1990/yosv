import React, { useState } from 'react';
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

export const AdminDashboard: React.FC = () => {
  const { data, saveData, addToast, language } = usePortfolio();
  const [activeTab, setActiveTab] = useState<AdminTabId>('overview');
  const [isSaving, setIsSaving] = useState(false);

  const handleGlobalSave = async () => {
    setIsSaving(true);
    await saveData(data);
    setTimeout(() => {
      setIsSaving(false);
      addToast('All studio data committed and synced!', 'success');
    }, 400);
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[90000] flex flex-col overflow-hidden font-sans bg-[var(--background)] text-[var(--foreground)]"
    >
      <AdminHeader onSave={handleGlobalSave} isSaving={isSaving} />

      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

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
            {activeTab === 'appearance' && <AdminAppearanceTab />}
            {activeTab === 'media' && <AdminMediaLibraryTab />}
            {activeTab === 'backup' && <AdminBackupSyncTab />}
            {activeTab === 'security' && <AdminSecurityTab />}
          </div>
        </main>
      </div>
    </div>
  );
};
