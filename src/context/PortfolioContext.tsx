import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PortfolioData, Language, ThemeMode, Project, PresentationMode } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialData';
import { StorageService } from '../lib/storage';
import { UI_TRANSLATIONS } from '../lib/translations';
import { getThemePreset, normalizeThemeName, resolveColorMode } from '../lib/themeRegistry';
import { getThemeTokenVariables } from '../lib/themeTokens';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  t: (key: string) => string;
  saveData: (updated: PortfolioData) => Promise<boolean>;
  updateData: (updated: Partial<PortfolioData> | PortfolioData) => Promise<boolean>;
  resetData: () => Promise<void>;
  activeVideoProject: Project | null;
  setActiveVideoProject: (proj: Project | null) => void;
  activeCaseStudyProject: Project | null;
  setActiveCaseStudyProject: (proj: Project | null) => void;
  showAdminLogin: boolean;
  setShowAdminLogin: (show: boolean) => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  toasts: ToastMessage[];
  addToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  isClientMode: boolean;
  presentationMode: PresentationMode;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [loading, setLoading] = useState(true);
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [activeVideoProject, setActiveVideoProject] = useState<Project | null>(null);
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState<Project | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const clientModeSettings = data.appearance?.clientMode;
  const requestedMode = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('mode') : null;
  const isClientMode = clientModeSettings?.enabled === true && (
    requestedMode === 'client' ||
    (requestedMode !== 'standard' && clientModeSettings.presentation === 'client')
  );
  const presentationMode: PresentationMode = isClientMode ? 'client' : 'standard';

  // Load persisted data on mount
  useEffect(() => {
    StorageService.getPortfolioData().then((loaded) => {
      setData(loaded);
      const defaultMode = resolveColorMode(loaded.appearance?.defaultTheme || 'dark');
      const savedTheme = localStorage.getItem('aetheria_preferred_theme') as 'dark' | 'light' | null;
      const nextTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : defaultMode;
      setThemeState(nextTheme);
      setLoading(false);
    });

    // Language preference
    const savedLang = localStorage.getItem('aetheria_preferred_lang') as Language;
    if (savedLang === 'en' || savedLang === 'ar') {
      setLanguageState(savedLang);
    }

    // Theme preference
    const savedTheme = localStorage.getItem('aetheria_preferred_theme') as 'dark' | 'light';
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeState(savedTheme);
    }
  }, []);

  // Update HTML tag dir & lang attributes on language change
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language]);

  // Update body theme classes and dynamic CSS root variables on theme or appearance change
  useEffect(() => {
    const themeName = normalizeThemeName(data.appearance?.themeName || 'cinematic');
    const preset = getThemePreset(themeName);
    const currentThemeMode = theme === 'light' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', currentThemeMode);
    document.documentElement.setAttribute('data-theme-name', themeName);
    document.body.setAttribute('data-theme-name', themeName);
    document.documentElement.setAttribute('data-motion-mode', data.appearance?.motionMode || 'full');

    if (currentThemeMode === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    if (data.appearance?.accentColor) {
      document.documentElement.style.setProperty('--color-accent', data.appearance.accentColor);
      document.documentElement.style.setProperty('--accent-muted', `${data.appearance.accentColor}1f`);
      document.documentElement.style.setProperty('--accent-glow', `${data.appearance.accentColor}33`);
    }
    if (data.appearance?.secondaryAccent) {
      document.documentElement.style.setProperty('--color-accent-secondary', data.appearance.secondaryAccent);
    }

    Object.entries(preset.cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    document.documentElement.style.setProperty('--section-shell-max-width', `${Math.max(960, Number(data.appearance?.contentWidth ?? 1200))}px`);
    document.documentElement.style.setProperty('--section-spacing', `${Number(data.appearance?.sectionSpacing ?? 32)}px`);
    document.documentElement.style.setProperty('--projects-gap', `${Number(data.appearance?.projectGap ?? 24)}px`);
    document.documentElement.style.setProperty('--glass-intensity', data.appearance?.glassIntensity || 'medium');
    document.documentElement.style.setProperty('--background-mode', data.appearance?.backgroundMode || 'subtle');
    Object.entries(getThemeTokenVariables(data.appearance)).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    const shell = currentThemeMode === 'light' ? 'rgba(255,255,255,0.68)' : 'rgba(9, 12, 17, 0.92)';
    const panel = currentThemeMode === 'light' ? 'rgba(255,255,255,0.72)' : 'rgba(21, 26, 35, 0.82)';
    const border = currentThemeMode === 'light' ? 'rgba(15, 22, 31, 0.09)' : 'rgba(255,255,255,0.08)';
    const shadow = currentThemeMode === 'light' ? '0 24px 60px -32px rgba(16,22,32,0.18)' : '0 24px 60px -28px rgba(0,0,0,0.8)';

    document.documentElement.style.setProperty('--theme-shell-bg', shell);
    document.documentElement.style.setProperty('--theme-panel-bg', panel);
    document.documentElement.style.setProperty('--theme-panel-border', border);
    document.documentElement.style.setProperty('--theme-shadow', shadow);
  }, [theme, data.appearance]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const seo = data.seo;
    const siteTitle = seo?.siteTitle?.[language] || seo?.siteTitle?.en || data.profile?.name?.[language] || data.profile?.name?.en || 'Portfolio';
    const metaDescription = seo?.metaDescription?.[language] || seo?.metaDescription?.en || '';
    const staticCanonicalUrl = document.head.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    const canonicalUrl = seo?.canonicalUrl || staticCanonicalUrl;
    const ogTitle = siteTitle;
    const ogDescription = metaDescription;
    const ogImage = seo?.ogImage || '';

    const setMetaTag = (selector: string, attribute: string, value: string, attributeValue: string) => {
      if (!value) {
        const existing = document.head.querySelector(selector);
        if (existing) existing.remove();
        return;
      }

      let element = document.head.querySelector(selector) as HTMLElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    const setLinkTag = (selector: string, relValue: string, hrefValue: string) => {
      if (!hrefValue) {
        const existing = document.head.querySelector(selector);
        if (existing) existing.remove();
        return;
      }

      let link = document.head.querySelector(selector) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', relValue);
        document.head.appendChild(link);
      }
      link.setAttribute('href', hrefValue);
    };

    document.title = siteTitle;
    setMetaTag('meta[name="description"]', 'name', metaDescription, 'description');
    setMetaTag('meta[property="og:title"]', 'property', ogTitle, 'og:title');
    setMetaTag('meta[property="og:description"]', 'property', ogDescription, 'og:description');
    setMetaTag('meta[property="og:image"]', 'property', ogImage, 'og:image');
    setMetaTag('meta[name="twitter:title"]', 'name', ogTitle, 'twitter:title');
    setMetaTag('meta[name="twitter:description"]', 'name', ogDescription, 'twitter:description');
    setMetaTag('meta[name="twitter:image"]', 'name', ogImage, 'twitter:image');
    setLinkTag('link[rel="canonical"]', 'canonical', canonicalUrl);
  }, [data.seo, data.profile, language]);

  // Keyboard shortcut Ctrl + Shift + A to open Admin Login terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setShowAdminLogin(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('aetheria_preferred_lang', lang);
  }, []);

  const setTheme = useCallback((newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem('aetheria_preferred_theme', newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('aetheria_preferred_theme', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      return UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS['en']?.[key] || key;
    },
    [language]
  );

  const addToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const saveData = useCallback(
    async (updated: PortfolioData): Promise<boolean> => {
      try {
        const res = await StorageService.savePortfolioData(updated);
        setData(await StorageService.getPortfolioData());
        addToast(t('admin.saved'), 'success');
        return res;
      } catch (error: any) {
        addToast(error.message || 'Failed to save data', 'error');
        return false;
      }
    },
    [addToast, t]
  );

  const updateData = useCallback(
    async (updated: Partial<PortfolioData> | PortfolioData): Promise<boolean> => {
      const nextData = (updated as PortfolioData).profile ? (updated as PortfolioData) : { ...data, ...updated };
      try {
        const res = await StorageService.savePortfolioData(nextData as PortfolioData);
        setData(await StorageService.getPortfolioData());
        addToast(t('admin.saved'), 'success');
        return res;
      } catch (error: any) {
        addToast(error.message || 'Failed to update data', 'error');
        return false;
      }
    },
    [addToast, data, t]
  );

  const resetData = useCallback(async () => {
    const fresh = await StorageService.resetToDefault();
    setData(fresh);
    addToast('Data reset to defaults', 'info');
  }, [addToast]);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        t,
        saveData,
        updateData,
        resetData,
        activeVideoProject,
        setActiveVideoProject,
        activeCaseStudyProject,
        setActiveCaseStudyProject,
        showAdminLogin,
        setShowAdminLogin,
        isAdminMode,
        setIsAdminMode,
        toasts,
        addToast,
        removeToast,
        isClientMode,
        presentationMode,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
