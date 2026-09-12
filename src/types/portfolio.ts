export type Language = 'en' | 'ar';
export type ThemeMode = 'dark';

export interface LocalizedString {
  en: string;
  ar: string;
}

export type VideoPlatform = 
  | 'youtube' 
  | 'vimeo' 
  | 'google-drive'
  | 'tiktok' 
  | 'instagram' 
  | 'facebook' 
  | 'direct' 
  | 'embed';

export type AspectRatio = '16:9' | '9:16' | '1:1' | '21:9' | '4:5' | '4:3' | 'auto';
export type VideoSourceType = 'youtube' | 'vimeo' | 'google-drive' | 'direct';
export type VideoOpenMode = 'inline' | 'modal';

export interface ProjectVideo {
  enabled: boolean;
  sourceType: VideoSourceType;
  url?: string;
  embedUrl?: string;
  posterUrl?: string;
  aspectRatio?: AspectRatio;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  fullscreen?: boolean;
  openMode?: VideoOpenMode;
}

export type PortfolioThemeName = 'cinematic' | 'liquid' | 'liquid-glass' | 'editorial' | 'digital' | 'minimal' | 'luxury' | 'obsidian' | 'nocturne' | 'monolith';
export type BackgroundIntensity = 'off' | 'subtle' | 'medium' | 'strong';
export type MotionMode = 'full' | 'reduced' | 'off';
export type ThreeDQuality = 'auto' | 'high' | 'medium' | 'low';
export type ProjectDisplayMode = 'grid' | 'view-more' | 'carousel' | 'horizontal' | 'featured-secondary' | 'compact';
export type PresentationMode = 'standard' | 'client';

export type ContentStatus = 'published' | 'draft' | 'hidden';

export interface ClientModeSettings {
  enabled: boolean;
  presentation: PresentationMode;
}

export interface CaseStudy {
  enabled: boolean;
  challenge: LocalizedString;
  strategy: LocalizedString;
  editingApproach: LocalizedString;
  storytellingApproach: LocalizedString;
  beforeAfter?: {
    beforeDesc: LocalizedString;
    afterDesc: LocalizedString;
    beforeMediaUrl?: string;
    afterMediaUrl?: string;
  };
  metrics?: { label: LocalizedString; value: string }[];
  gallery?: string[];
  clientFeedback?: LocalizedString;
}

export interface Project {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  category: string; // matches Category.id
  client: string;
  date: string;
  thumbnail: string;
  previewVideoUrl?: string;
  fullVideoUrl: string;
  platform: VideoPlatform;
  videoId?: string;
  aspectRatio: AspectRatio;
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
  controls: boolean;
  toolsUsed: string[];
  skills: string[];
  results?: LocalizedString;
  tags: string[];
  credits?: string;
  featured: boolean;
  status: ContentStatus;
  visible?: boolean;
  order: number;
  caseStudy?: CaseStudy;
  viewsCount?: number;
  video?: ProjectVideo;
}

export interface Category {
  id: string;
  name: LocalizedString;
  order: number;
  visible: boolean;
}

export interface Service {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string; // Lucide icon name
  mediaUrl?: string;
  tags: string[];
  ctaText?: LocalizedString;
  ctaLink?: string;
  order: number;
  visible: boolean;
  status: ContentStatus;
}

export interface ServicePackage {
  id: string;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  price: number;
  currency: string;
  billing: LocalizedString;
  features: string[];
  ctaText: LocalizedString;
  ctaLink?: string;
  featured: boolean;
  presentation?: 'basic' | 'standard' | 'premium' | 'professional';
  badge?: LocalizedString;
  order: number;
  visible: boolean;
  status: ContentStatus;
}

export interface Skill {
  id: string;
  name: LocalizedString;
  level: number; // 0 - 100
  category: string; // e.g. "Editing", "Writing", "Post-Production"
  order: number;
  enabled: boolean;
}

export interface ToolItem {
  id: string;
  name: string;
  icon: string;
  skillLevel: number; // 1-100
  yearsUsed: number;
  description: LocalizedString;
  category: string; // e.g. "NLE", "FX", "Audio", "Scripting"
  order: number;
  visible: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: LocalizedString;
  startDate: string;
  endDate: string;
  currentPosition: boolean;
  description: LocalizedString;
  responsibilities: LocalizedString[];
  achievements: LocalizedString[];
  tools: string[];
  logo?: string;
  location: string;
  order: number;
  visible: boolean;
}

export interface Education {
  id: string;
  institution: LocalizedString;
  degree: LocalizedString;
  field: LocalizedString;
  startDate: string;
  endDate: string;
  description: LocalizedString;
  certificateUrl?: string;
  logo?: string;
  visible: boolean;
}

export interface Certification {
  id: string;
  name: LocalizedString;
  organization: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  description: LocalizedString;
  logo?: string;
  featured: boolean;
  visible: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  position: LocalizedString;
  company: string;
  photo?: string;
  testimonial: LocalizedString;
  rating: number; // 1 - 5
  projectRef?: string;
  date: string;
  order?: number;
  visible: boolean;
}

export interface StatItem {
  id: string;
  number: number;
  prefix?: string;
  suffix?: string;
  label: LocalizedString;
  icon: string;
  order: number;
  visible: boolean;
}

export interface ContentItem {
  id: string;
  title: LocalizedString;
  type: 'youtube' | 'tiktok' | 'reel' | 'article' | 'script' | 'creative';
  description: LocalizedString;
  mediaUrl: string;
  platform: VideoPlatform;
  thumbnail?: string;
  date: string;
  views?: string;
  link?: string;
  order: number;
  visible: boolean;
  status: ContentStatus;
}

export type BlogPostType = 'article' | 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'linkedin' | 'external' | 'social_post' | 'curated_video';
export type BlogPlatform = 'direct' | 'article' | 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'linkedin' | 'external' | 'other';

export interface BlogPost {
  id: string;
  type: BlogPostType;
  title: LocalizedString;
  slug: string;
  excerpt: LocalizedString;
  content?: LocalizedString;
  platform: BlogPlatform;
  externalUrl?: string;
  embedUrl?: string;
  thumbnail?: string;
  coverImage?: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  status?: ContentStatus;
  publishedAt: string;
  updatedAt?: string;
  readingTime?: string;
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
  canonicalUrl?: string;
  viewsCount?: number;
  order?: number;
}

export interface BlogCategory {
  id: string;
  name: LocalizedString;
  slug: string;
  order?: number;
  visible?: boolean;
}

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'facebook' | 'x' | 'behance' | 'github' | 'website' | 'email';
  label: string;
  url: string;
  icon: string;
  order: number;
  visible: boolean;
}

export type FeatureFlagKey =
  | 'startProject'
  | 'projectInquiry'
  | 'projectBrief'
  | 'availability'
  | 'clientLogos'
  | 'testimonials'
  | 'pricing'
  | 'packages'
  | 'blog'
  | 'content'
  | 'contentHub'
  | 'socialLinks';

export interface FeatureFlag {
  key: FeatureFlagKey;
  enabled: boolean;
  label: LocalizedString;
  description: LocalizedString;
}

export interface SiteFeatureFlags {
  startProject: boolean;
  projectInquiry: boolean;
  projectBrief: boolean;
  availability: boolean;
  clientLogos: boolean;
  testimonials: boolean;
  pricing: boolean;
  packages: boolean;
  blog: boolean;
  content: boolean;
  contentHub: boolean;
  socialLinks: boolean;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  visible: boolean;
  order: number;
}

export type AvailabilityStatusValue = 'available' | 'limited' | 'booked';

export interface AvailabilityStatus {
  status: AvailabilityStatusValue;
  visible: boolean;
  label: LocalizedString;
  description: LocalizedString;
  nextAvailableDate?: string;
}

export interface ProjectInquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  package?: string;
  project_type?: string;
  project_title?: string;
  project_description?: string;
  message: string;
  brief_url?: string;
  deadline?: string;
  timeline?: string;
  budget?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  admin_notes?: string;
  locale: Language;
  source: 'portfolio';
  honeypot?: string;
}

export interface CustomSectionBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'button' | 'card' | 'stat' | 'embed';
  title?: LocalizedString;
  content?: LocalizedString;
  mediaUrl?: string;
  link?: string;
  extraData?: Record<string, any>;
}

export interface CustomSection {
  id: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  badge?: LocalizedString;
  order: number;
  visible: boolean;
  backgroundColor?: string;
  blocks: CustomSectionBlock[];
}

export interface CustomPage {
  id: string;
  title: LocalizedString;
  slug: string;
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  featuredImage?: string;
  content: LocalizedString;
  visible: boolean;
  status: ContentStatus;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'pdf' | 'document';
  mimeType?: string;
  size: string;
  uploadedAt: string;
  dimensions?: string;
  altText?: string;
  category?: string;
  bucketPath?: string;
}

export interface AppearanceSettings {
  accentColor: string; // hex, e.g. "#10b981"
  secondaryAccent: string; // hex, e.g. "#06b6d4"
  headingFont: string;
  bodyFont: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  animationIntensity: 'subtle' | 'standard' | 'cinematic' | 'none';
  customCursorEnabled: boolean;
  scrollAnimationEnabled: boolean;
  grainOverlayEnabled: boolean;
  enable3D?: boolean;
  threeDIntensity?: BackgroundIntensity;
  threeDQuality?: ThreeDQuality;
  defaultTheme: ThemeMode;
  themeName: PortfolioThemeName;
  backgroundIntensity: BackgroundIntensity;
  backgroundMode?: 'off' | 'subtle' | 'medium' | 'strong';
  glassIntensity?: 'off' | 'subtle' | 'medium' | 'strong';
  surfaceOpacity?: number;
  blurIntensity?: number;
  borderIntensity?: 'subtle' | 'medium' | 'strong';
  shadowIntensity?: 'soft' | 'medium' | 'strong';
  motionIntensity?: 'subtle' | 'standard' | 'cinematic';
  motionMode?: MotionMode;
  contentWidth?: number;
  sectionSpacing?: number;
  cardDensity?: 'compact' | 'balanced' | 'spacious';
  projectGap?: number;
  projectCardSize?: 'compact' | 'standard' | 'large';
  viewMoreEnabled?: boolean;
  viewMoreLabelEn?: string;
  viewMoreLabelAr?: string;
  projectDisplayMode: ProjectDisplayMode;
  projectsInitialCount: number;
  projectsExpandedCount: number;
  desktopColumns: number;
  tabletColumns: number;
  mobileColumns: number;
  carouselAutoplay: boolean;
  carouselLoop: boolean;
  showCarouselControls: boolean;
  featuredCount?: number;
  secondaryCount?: number;
  navigationMode?: 'slider' | 'scroll';
  heroStyle?: 'cinematic' | 'editorial' | 'studio' | 'luxury';
  clientMode?: ClientModeSettings;
  customTheme?: {
    enabled: boolean;
    tokens: ThemeTokenSettings;
  };
}

export interface ThemeTokenSettings {
  background: string;
  surface: string;
  surfaceElevated: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accentSecondary: string;
  success: string;
  warning: string;
  danger: string;
  heroBackground: string;
  sectionBackground: string;
  cardBackground: string;
  heading: string;
  body: string;
  radius: number;
  surfaceOpacity: number;
  shadowIntensity: number;
  borderIntensity: number;
  blurIntensity: number;
}

export interface SEOSettings {
  siteTitle: LocalizedString;
  metaDescription: LocalizedString;
  keywords: string[];
  ogImage: string;
  author: string;
  canonicalUrl: string;
}

export interface ProfileData {
  name: LocalizedString;
  title: LocalizedString;
  shortTagline: LocalizedString;
  shortBio: LocalizedString;
  longBio: LocalizedString;
  yearsExperience: number;
  philosophy: LocalizedString;
  photoUrl: string;
  cvUrl?: string;
  contactEmail: string;
  whatsappNumber: string;
  location: LocalizedString;
  availableForWork: boolean;
}

export interface ContactSettings {
  email: string;
  whatsapp: string;
  ctaText: LocalizedString;
  successMessage: LocalizedString;
  formFields: {
    showProjectType: boolean;
    showBudget: boolean;
    showTimeline: boolean;
    showProjectBrief: boolean;
    projectBriefRequired: boolean;
    briefLabelEn: string;
    briefLabelAr: string;
    briefPlaceholderEn: string;
    briefPlaceholderAr: string;
  };
}

export interface NavItem {
  id: string;
  label: LocalizedString;
  target: string; // e.g. '#work', '#services', '/about'
  isExternal: boolean;
  order: number;
  visible: boolean;
}

export interface AnalyticsEvent {
  id: string;
  type: 'pageview' | 'project_view' | 'contact_submit' | 'cv_download' | 'video_play';
  targetId?: string;
  timestamp: number;
  language: Language;
  theme: string;
  device: 'desktop' | 'tablet' | 'mobile';
}

export interface SectionOrderItem {
  id: string;
  order: number;
  visible: boolean;
  label?: LocalizedString;
}

export interface MessageEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewing' | 'replied';
}

export interface PortfolioData {
  profile: ProfileData;
  projects: Project[];
  categories: Category[];
  services: Service[];
  servicePackages: ServicePackage[];
  skills: Skill[];
  tools: ToolItem[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  testimonials: Testimonial[];
  stats: StatItem[];
  contentItems: ContentItem[];
  blogPosts: BlogPost[];
  blogCategories: BlogCategory[];
  socialLinks: SocialLink[];
  siteFeatures: SiteFeatureFlags;
  clientLogos: ClientLogo[];
  availability: AvailabilityStatus;
  customSections: CustomSection[];
  pages: CustomPage[];
  media: MediaAsset[];
  navItems: NavItem[];
  sectionOrder?: SectionOrderItem[];
  messages?: MessageEntry[];
  appearance: AppearanceSettings;
  seo: SEOSettings;
  contact: ContactSettings;
  analytics: AnalyticsEvent[];
  projectInquiries?: ProjectInquiry[];
}
