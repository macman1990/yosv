import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PortfolioData, AnalyticsEvent } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialData';

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

export class StorageService {
  private static cachedData: PortfolioData | null = null;

  public static async getPortfolioData(): Promise<PortfolioData> {
    if (this.cachedData) {
      return this.cachedData;
    }

    // 1. If Supabase is connected, try to fetch from Supabase
    if (supabase) {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;

        let isAdmin = false;
        if (userId) {
          const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('role')
            .eq('user_id', userId)
            .maybeSingle();
          isAdmin = !adminError && adminData?.role === 'admin';
        }

        // Admins query the raw table (contains drafts), public queries the secure filtered view
        const tableName = isAdmin ? 'portfolio_data' : 'public_portfolio_data';

        const { data, error } = await supabase
          .from(tableName)
          .select('payload')
          .eq('id', 'primary')
          .single();

        if (data?.payload && !error) {
          this.cachedData = data.payload as PortfolioData;
          return this.cachedData;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
      }
    }

    // 2. Fallback to LocalStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.cachedData = {
          ...initialPortfolioData,
          ...parsed,
          siteFeatures: { ...initialPortfolioData.siteFeatures, ...(parsed.siteFeatures || {}) },
          availability: { ...initialPortfolioData.availability, ...(parsed.availability || {}) },
          blogPosts: parsed.blogPosts && parsed.blogPosts.length > 0 ? parsed.blogPosts : initialPortfolioData.blogPosts,
          blogCategories: parsed.blogCategories && parsed.blogCategories.length > 0 ? parsed.blogCategories : initialPortfolioData.blogCategories,
          clientLogos: Array.isArray(parsed.clientLogos) && parsed.clientLogos.length > 0 ? parsed.clientLogos : initialPortfolioData.clientLogos,
        };
        return this.cachedData;
      }
    } catch (e) {
      console.error('Error reading localStorage portfolio data:', e);
    }

    // 3. First time initialize with initial sample data
    this.cachedData = initialPortfolioData;
    this.savePortfolioData(initialPortfolioData).catch((err) =>
      console.warn('Initial save error:', err)
    );
    return this.cachedData;
  }

  public static async savePortfolioData(data: PortfolioData): Promise<boolean> {
    this.cachedData = data;

    // Save to LocalStorage immediately
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }

    // If Supabase is active, sync with database table
    if (supabase) {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData?.session?.user) {
           console.warn('Supabase sync skipped: No authenticated admin session');
           throw new Error('You must be logged in to save to the cloud.');
        }

        const { error } = await supabase.from('portfolio_data').upsert({
          id: 'primary',
          payload: data,
          updated_at: new Date().toISOString(),
        });
        if (error) {
          console.error('Supabase sync error:', error.message);
          throw new Error(`Cloud save failed: ${error.message}`);
        }
      } catch (err) {
        console.error('Supabase sync exception:', err);
        throw err;
      }
    }

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
    const merged: PortfolioData = {
      ...initialPortfolioData,
      ...parsed,
      siteFeatures: { ...initialPortfolioData.siteFeatures, ...(parsed.siteFeatures || {}) },
      availability: { ...initialPortfolioData.availability, ...(parsed.availability || {}) },
      clientLogos: Array.isArray(parsed.clientLogos) && parsed.clientLogos.length > 0 ? parsed.clientLogos : initialPortfolioData.clientLogos,
    } as PortfolioData;
    await this.savePortfolioData(merged);
    return merged;
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
