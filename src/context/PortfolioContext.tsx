import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PortfolioData, Language, ThemeMode, Project } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialData';
import { StorageService } from '../lib/storage';
import { UI_TRANSLATIONS } from '../lib/translations';

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

  // Load persisted data on mount
  useEffect(() => {
    StorageService.getPortfolioData().then((loaded) => {
      setData(loaded);
      if (loaded.appearance?.defaultTheme) {
        setThemeState(loaded.appearance.defaultTheme);
      }
      setLoading(false);
    });

    // Language preference
    const savedLang = localStorage.getItem('aetheria_preferred_lang') as Language;
    if (savedLang === 'en' || savedLang === 'ar') {
      setLanguageState(savedLang);
    }

    // Theme preference
    const savedTheme = localStorage.getItem('aetheria_preferred_theme') as 'dark' | 'light';
    if (savedTheme) {
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
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    // Accent color dynamic variable
    if (data.appearance?.accentColor) {
      document.documentElement.style.setProperty('--color-accent', data.appearance.accentColor);
      document.documentElement.style.setProperty(
        '--accent-muted',
        `${data.appearance.accentColor}1f`
      );
      document.documentElement.style.setProperty(
        '--accent-glow',
        `${data.appearance.accentColor}33`
      );
    }
    if (data.appearance?.secondaryAccent) {
      document.documentElement.style.setProperty('--color-accent-secondary', data.appearance.secondaryAccent);
    }
  }, [theme, data.appearance]);

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
        setData(updated);
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
        setData(nextData as PortfolioData);
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
