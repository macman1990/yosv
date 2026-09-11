import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PortfolioData, AnalyticsEvent, ProjectInquiry } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialData';
import { normalizeSectionOrder } from './sectionRegistry';

const STORAGE_KEY = 'aetheria_portfolio_data_v1';
const AUTH_KEY = 'aetheria_admin_session_v1';

// Supabase client initialization (optional, environment-driven)
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL;
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const logSupabaseError = (operation: string, error: any) => {
  if (!import.meta.env.DEV) return;

  console.debug('[StorageService] Supabase error', {
    operation,
    message: error?.message ?? 'Unknown error',
    code: error?.code ?? null,
    details: error?.details ?? null,
    hint: error?.hint ?? null,
  });
};

const normalizeClientLogos = (list: any[] | undefined): any[] => {
  if (!Array.isArray(list)) {
    return initialPortfolioData.clientLogos;
  }

  return list.map((logo, index) => ({
    id: logo?.id || `logo-${index}-${Date.now()}`,
    name: logo?.name || `Client ${index + 1}`,
    logoUrl: logo?.logoUrl ?? logo?.url ?? '',
    websiteUrl: logo?.websiteUrl ?? logo?.url ?? '',
    visible: typeof logo?.visible === 'boolean' ? logo.visible : Boolean(logo?.isVisible),
    order: typeof logo?.order === 'number' ? logo.order : index + 1,
  }));
};

export const normalizePortfolioData = (input: Partial<PortfolioData> | null | undefined): PortfolioData => {
  const base = initialPortfolioData;
  const payload = input && typeof input === 'object' ? input : {};

  const siteFeatures = {
    startProject: payload.siteFeatures?.startProject ?? base.siteFeatures.startProject,
    projectInquiry: payload.siteFeatures?.projectInquiry ?? base.siteFeatures.projectInquiry,
    projectBrief: payload.siteFeatures?.projectBrief ?? base.siteFeatures.projectBrief,
    availability: payload.siteFeatures?.availability ?? base.siteFeatures.availability,
    clientLogos: payload.siteFeatures?.clientLogos ?? base.siteFeatures.clientLogos,
    testimonials: payload.siteFeatures?.testimonials ?? base.siteFeatures.testimonials,
    pricing: payload.siteFeatures?.pricing ?? base.siteFeatures.pricing,
    packages: payload.siteFeatures?.packages ?? base.siteFeatures.packages,
    blog: payload.siteFeatures?.blog ?? base.siteFeatures.blog,
    content: payload.siteFeatures?.content ?? base.siteFeatures.content,
    contentHub: payload.siteFeatures?.contentHub ?? base.siteFeatures.contentHub,
    socialLinks: payload.siteFeatures?.socialLinks ?? base.siteFeatures.socialLinks,
  } as PortfolioData['siteFeatures'];

  const contact = {
    ...base.contact,
    ...(payload.contact || {}),
    formFields: {
      ...base.contact.formFields,
      ...(payload.contact?.formFields || {}),
    },
  } as PortfolioData['contact'];

  const availability = {
    ...base.availability,
    ...(payload.availability || {}),
    label: { ...base.availability.label, ...(payload.availability?.label || {}) },
    description: { ...base.availability.description, ...(payload.availability?.description || {}) },
  } as PortfolioData['availability'];

  const appearance = {
    ...base.appearance,
    ...(payload.appearance || {}),
    accentColor: payload.appearance?.accentColor || base.appearance.accentColor,
    secondaryAccent: payload.appearance?.secondaryAccent || base.appearance.secondaryAccent,
    themeName: payload.appearance?.themeName || base.appearance.themeName,
    defaultTheme: payload.appearance?.defaultTheme || base.appearance.defaultTheme,
    backgroundIntensity: payload.appearance?.backgroundIntensity || base.appearance.backgroundIntensity,
    projectDisplayMode: payload.appearance?.projectDisplayMode || base.appearance.projectDisplayMode,
    projectsInitialCount: Number(payload.appearance?.projectsInitialCount ?? base.appearance.projectsInitialCount),
    projectsExpandedCount: Number(payload.appearance?.projectsExpandedCount ?? base.appearance.projectsExpandedCount),
    desktopColumns: Number(payload.appearance?.desktopColumns ?? base.appearance.desktopColumns),
    tabletColumns: Number(payload.appearance?.tabletColumns ?? base.appearance.tabletColumns),
    mobileColumns: Number(payload.appearance?.mobileColumns ?? base.appearance.mobileColumns),
    scrollAnimationEnabled: typeof payload.appearance?.scrollAnimationEnabled === 'boolean' ? payload.appearance.scrollAnimationEnabled : base.appearance.scrollAnimationEnabled,
    customCursorEnabled: typeof payload.appearance?.customCursorEnabled === 'boolean' ? payload.appearance.customCursorEnabled : base.appearance.customCursorEnabled,
    enable3D: typeof payload.appearance?.enable3D === 'boolean' ? payload.appearance.enable3D : (base.appearance.enable3D ?? false),
    threeDIntensity: payload.appearance?.threeDIntensity || base.appearance.threeDIntensity || 'subtle',
    threeDQuality: payload.appearance?.threeDQuality || base.appearance.threeDQuality || 'auto',
    motionMode: payload.appearance?.motionMode || base.appearance.motionMode || 'full',
    contentWidth: Number(payload.appearance?.contentWidth ?? base.appearance.contentWidth ?? 1200),
    sectionSpacing: Number(payload.appearance?.sectionSpacing ?? base.appearance.sectionSpacing ?? 32),
    projectGap: Number(payload.appearance?.projectGap ?? base.appearance.projectGap ?? 24),
    glassIntensity: payload.appearance?.glassIntensity || base.appearance.glassIntensity || 'medium',
    backgroundMode: payload.appearance?.backgroundMode || base.appearance.backgroundMode || 'subtle',
    viewMoreEnabled: typeof payload.appearance?.viewMoreEnabled === 'boolean' ? payload.appearance.viewMoreEnabled : (base.appearance.viewMoreEnabled ?? true),
    viewMoreLabelEn: payload.appearance?.viewMoreLabelEn || base.appearance.viewMoreLabelEn || 'View More',
    viewMoreLabelAr: payload.appearance?.viewMoreLabelAr || base.appearance.viewMoreLabelAr || 'المزيد',
  } as PortfolioData['appearance'];

  const normalized: PortfolioData = {
    ...base,
    ...payload,
    siteFeatures,
    contact,
    availability,
    appearance,
    sectionOrder: normalizeSectionOrder(payload.sectionOrder),
    clientLogos: normalizeClientLogos((payload as any).clientLogos),
    socialLinks: Array.isArray(payload.socialLinks) ? payload.socialLinks : base.socialLinks,
    servicePackages: Array.isArray(payload.servicePackages) ? payload.servicePackages : base.servicePackages,
    testimonials: Array.isArray(payload.testimonials) ? payload.testimonials : base.testimonials,
    blogPosts: Array.isArray(payload.blogPosts) ? payload.blogPosts : base.blogPosts,
    blogCategories: Array.isArray(payload.blogCategories) ? payload.blogCategories : base.blogCategories,
  };

  return normalized;
};

export class StorageService {
  private static cachedData: PortfolioData | null = null;

  public static async getPortfolioData(): Promise<PortfolioData> {
    if (this.cachedData) {
      return this.cachedData;
    }

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('public_portfolio_data')
          .select('payload, updated_at')
          .eq('id', 'primary')
          .maybeSingle();

        if (!error && data?.payload) {
          const normalized = normalizePortfolioData(data.payload as PortfolioData);
          this.cachedData = normalized;
          if (import.meta.env.DEV) {
            console.debug('[StorageService] Loaded public portfolio payload from Supabase', {
              operation: 'get_public_portfolio_data',
              keys: Object.keys(normalized.siteFeatures || {}),
            });
          }
          return normalized;
        }

        if (error) {
          logSupabaseError('get_public_portfolio_data', error);
        }
      } catch (err) {
        logSupabaseError('get_public_portfolio_data_exception', err);
      }
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const normalized = normalizePortfolioData(parsed as Partial<PortfolioData>);
        this.cachedData = normalized;
        return normalized;
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.debug('[StorageService] localStorage read failed', e);
      }
    }

    const initial = normalizePortfolioData(initialPortfolioData);
    this.cachedData = initial;
    if (supabase) {
      this.savePortfolioData(initial).catch((err) => {
        if (import.meta.env.DEV) {
          console.debug('[StorageService] Initial cloud seed failed', err);
        }
      });
    }
    return initial;
  }

  public static async savePortfolioData(data: PortfolioData): Promise<boolean> {
    const normalized = normalizePortfolioData(data);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch (e) {
      if (import.meta.env.DEV) {
        console.debug('[StorageService] localStorage write failed', e);
      }
    }

    if (supabase) {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          logSupabaseError('save_portfolio_data_session', sessionError);
          throw new Error(`Cloud session check failed: ${sessionError.message}`);
        }

        if (!sessionData?.session?.user) {
          throw new Error('You must be logged in to save to the cloud.');
        }

        const { data: saved, error } = await supabase
          .from('portfolio_data')
          .upsert(
            {
              id: 'primary',
              payload: normalized,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          )
          .select('payload, updated_at')
          .single();

        if (error) {
          logSupabaseError('save_portfolio_data_upsert', error);
          throw new Error(`Cloud save failed: ${error.message}`);
        }

        if (!saved?.payload) {
          const payloadError = {
            message: 'Supabase save returned no payload.',
            code: 'NO_PAYLOAD',
            details: null,
            hint: 'Check the portfolio_data row and the payload column payload field.',
          };
          logSupabaseError('save_portfolio_data_no_payload', payloadError);
          throw new Error('Cloud save failed: Supabase save returned no payload.');
        }

        this.cachedData = normalizePortfolioData(saved.payload as PortfolioData);
        if (import.meta.env.DEV) {
          console.debug('[StorageService] Saved portfolio payload to Supabase', {
            operation: 'save_portfolio_data',
            startProject: this.cachedData.siteFeatures.startProject,
            pricing: this.cachedData.siteFeatures.pricing,
          });
        }

        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown cloud save error';
        logSupabaseError('save_portfolio_data_exception', err);
        throw new Error(message);
      }
    }

    this.cachedData = normalized;
    return true;
  }

  public static async resetToDefault(): Promise<PortfolioData> {
    this.cachedData = initialPortfolioData;
    await this.savePortfolioData(initialPortfolioData);
    return initialPortfolioData;
  }

  public static exportJSON(data: PortfolioData): string {
    return JSON.stringify(data, null, 2);
  }

  public static async importJSON(jsonString: string): Promise<PortfolioData> {
    const parsed = JSON.parse(jsonString);
    if (!parsed.profile || !parsed.projects) {
      throw new Error('Invalid portfolio backup JSON format.');
    }
    const merged = normalizePortfolioData(parsed as Partial<PortfolioData>);
    await this.savePortfolioData(merged);
    return merged;
  }

  public static async submitProjectInquiry(input: Pick<ProjectInquiry, 'name' | 'email' | 'project_type' | 'budget' | 'timeline' | 'brief_url' | 'message' | 'locale' | 'source'>): Promise<{ success: boolean; error?: string }> {
    if (!supabase) return { success: false, error: 'Inquiry service is not configured.' };

    const { error } = await supabase.from('project_inquiries').insert({
      name: input.name,
      email: input.email,
      project_type: input.project_type,
      budget: input.budget,
      timeline: input.timeline,
      brief_url: input.brief_url,
      message: input.message,
      locale: input.locale,
      status: 'new',
      source: 'portfolio',
    });

    if (error) {
      logSupabaseError('submit_project_inquiry', error);
      return { success: false, error: 'Inquiry could not be saved.' };
    }

    return { success: true };
  }

  public static async getProjectInquiries(): Promise<ProjectInquiry[]> {
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('project_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      logSupabaseError('get_project_inquiries', error);
      return [];
    }

    return (data || []) as ProjectInquiry[];
  }

  public static async updateProjectInquiryStatus(id: string, status: ProjectInquiry['status']): Promise<boolean> {
    if (!supabase) return false;
    const { error } = await supabase.from('project_inquiries').update({ status }).eq('id', id);
    if (error) {
      logSupabaseError('update_project_inquiry_status', error);
      return false;
    }
    return true;
  }

  public static async recordAnalytics(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>) {
    try {
      const data = await this.getPortfolioData();
      const newEvent: AnalyticsEvent = {
        ...event,
        id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: Date.now(),
      };
      // Keep last 200 events for privacy and storage conservation
      const updatedAnalytics = [newEvent, ...(data.analytics || [])].slice(0, 200);
      data.analytics = updatedAnalytics;
      await this.savePortfolioData(data);
    } catch (err) {
      console.debug('Analytics record skipped:', err);
    }
  }
}
