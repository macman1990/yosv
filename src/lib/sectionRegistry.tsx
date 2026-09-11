import React, { Component } from 'react';
import { PortfolioData, FeatureFlagKey, SectionOrderItem } from '../types/portfolio';
import { HeroSection } from '../components/portfolio/HeroSection';
import { FeaturedWorkSection } from '../components/portfolio/FeaturedWorkSection';
import { ServicesSection } from '../components/portfolio/ServicesSection';
import { AboutSection } from '../components/portfolio/AboutSection';
import { ExperienceSection } from '../components/portfolio/ExperienceSection';
import { EducationCertificationsSection } from '../components/portfolio/EducationCertificationsSection';
import { ToolsSection } from '../components/portfolio/ToolsSection';
import { ContentCreationSection } from '../components/portfolio/ContentCreationSection';
import { BlogSection } from '../components/portfolio/BlogSection';
import { TestimonialsSection } from '../components/portfolio/TestimonialsSection';
import { CustomSectionsRenderer } from '../components/portfolio/CustomSectionsRenderer';
import { PricingSection } from '../components/portfolio/PricingSection';
import { ContactSection } from '../components/portfolio/ContactSection';
import { ClientLogosSection } from '../components/portfolio/ClientLogosSection';

export type PortfolioSectionId =
  | 'hero'
  | 'work'
  | 'services'
  | 'about'
  | 'experience'
  | 'education'
  | 'tools'
  | 'content'
  | 'blog'
  | 'testimonials'
  | 'clientLogos'
  | 'custom'
  | 'pricing'
  | 'contact';

export interface PortfolioSectionDefinition {
  id: PortfolioSectionId;
  label: { en: string; ar: string };
  defaultOrder: number;
  featureKeys?: FeatureFlagKey[];
  featureMode?: 'all' | 'any';
  render: () => React.ReactNode;
}

interface SectionRenderBoundaryProps {
  children: React.ReactNode;
}

export class SectionRenderBoundary extends Component<SectionRenderBoundaryProps, { failed: boolean }> {
  private readonly sectionProps: SectionRenderBoundaryProps;

  public constructor(props: SectionRenderBoundaryProps) {
    super(props);
    this.sectionProps = props;
  }

  public state = { failed: false };

  public static getDerivedStateFromError() {
    return { failed: true };
  }

  public render() {
    return this.state.failed ? null : this.sectionProps.children;
  }
}

export const SECTION_REGISTRY: readonly PortfolioSectionDefinition[] = [
  { id: 'hero', label: { en: 'Hero', ar: 'الرئيسية' }, defaultOrder: 1, render: () => <HeroSection /> },
  { id: 'work', label: { en: 'Selected Work', ar: 'الأعمال المختارة' }, defaultOrder: 2, render: () => <FeaturedWorkSection /> },
  { id: 'services', label: { en: 'Services', ar: 'الخدمات' }, defaultOrder: 3, render: () => <ServicesSection /> },
  { id: 'about', label: { en: 'About', ar: 'عني' }, defaultOrder: 4, render: () => <AboutSection /> },
  { id: 'experience', label: { en: 'Experience', ar: 'الخبرة' }, defaultOrder: 5, render: () => <ExperienceSection /> },
  { id: 'education', label: { en: 'Education & Certifications', ar: 'التعليم والشهادات' }, defaultOrder: 6, render: () => <EducationCertificationsSection /> },
  { id: 'tools', label: { en: 'Tools & Skills', ar: 'الأدوات والمهارات' }, defaultOrder: 7, render: () => <ToolsSection /> },
  { id: 'content', label: { en: 'Content & Reels', ar: 'المحتوى والريلز' }, defaultOrder: 8, featureKeys: ['content', 'contentHub'], featureMode: 'any', render: () => <ContentCreationSection /> },
  { id: 'blog', label: { en: 'Blog & Editorial', ar: 'المدونة والتحرير' }, defaultOrder: 9, featureKeys: ['blog'], render: () => <BlogSection /> },
  { id: 'testimonials', label: { en: 'Testimonials', ar: 'آراء العملاء' }, defaultOrder: 10, featureKeys: ['testimonials'], render: () => <TestimonialsSection /> },
  { id: 'clientLogos', label: { en: 'Client Logos', ar: 'شعارات العملاء' }, defaultOrder: 11, featureKeys: ['clientLogos'], render: () => <ClientLogosSection /> },
  { id: 'custom', label: { en: 'Custom Sections', ar: 'الأقسام المخصصة' }, defaultOrder: 12, render: () => <CustomSectionsRenderer /> },
  { id: 'pricing', label: { en: 'Pricing & Packages', ar: 'الأسعار والباقات' }, defaultOrder: 13, featureKeys: ['pricing', 'packages'], featureMode: 'any', render: () => <PricingSection /> },
  { id: 'contact', label: { en: 'Contact', ar: 'تواصل' }, defaultOrder: 14, featureKeys: ['startProject', 'projectInquiry'], render: () => <ContactSection /> },
];

const registryIds = new Set<string>(SECTION_REGISTRY.map((section) => section.id));

export const getSectionDefinition = (id: string): PortfolioSectionDefinition | undefined => {
  return SECTION_REGISTRY.find((section) => section.id === id);
};

export const getDefaultSectionOrder = (): SectionOrderItem[] => SECTION_REGISTRY.map((section) => ({
  id: section.id,
  order: section.defaultOrder,
  visible: true,
}));

export const normalizeSectionOrder = (items?: SectionOrderItem[]): SectionOrderItem[] => {
  const known = Array.isArray(items) ? items.filter((item) => registryIds.has(item.id)) : [];
  const seen = new Set<string>();
  const normalized = known
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .sort((a, b) => (Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER) - (Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER))
    .map((item, index) => ({ ...item, order: index + 1, visible: item.visible !== false }));

  getDefaultSectionOrder().forEach((item) => {
    if (!seen.has(item.id)) normalized.push({ ...item, order: normalized.length + 1 });
  });

  return normalized;
};

const CLIENT_SECTION_ORDER: readonly PortfolioSectionId[] = ['hero', 'work', 'services', 'clientLogos', 'testimonials', 'contact'];

export const getClientSectionOrder = (items?: SectionOrderItem[]): SectionOrderItem[] => {
  const normalized = normalizeSectionOrder(items);
  const byId = new Map(normalized.map((item) => [item.id, item]));

  return CLIENT_SECTION_ORDER
    .map((id, index) => {
      const item = byId.get(id);
      return item && item.visible ? { ...item, order: index + 1 } : null;
    })
    .filter((item): item is SectionOrderItem => item !== null);
};

export const isSectionEnabled = (data: PortfolioData, section: PortfolioSectionDefinition): boolean => {
  if (!section.featureKeys?.length) return true;
  return section.featureMode === 'any'
    ? section.featureKeys.some((key) => data.siteFeatures?.[key] === true)
    : section.featureKeys.every((key) => data.siteFeatures?.[key] === true);
};
