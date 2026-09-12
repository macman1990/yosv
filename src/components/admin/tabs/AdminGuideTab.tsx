import React, { useMemo, useState } from 'react';
import { BookOpen, ChevronDown, Search, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';

const sections = [
  ['overview', 'Overview', 'نظرة عامة', 'The dashboard controls the portfolio content, appearance, publishing state, and incoming inquiries.'],
  ['getting-started', 'Getting started', 'البدء', 'Edit a section, use Save All Changes, then refresh the public site to verify the sanitized public projection.'],
  ['appearance', 'Appearance & Theme Studio', 'المظهر واستوديو السمات', 'Choose a named theme or enable validated custom tokens. Preview changes locally and save once you are ready.'],
  ['site', 'Site settings', 'إعدادات الموقع', 'Navigation, feature flags, availability, Client Mode, logos, and page order control what visitors see.'],
  ['hero', 'Hero', 'الواجهة الرئيسية', 'Profile, title, bio, CTA, CV, and featured media are managed through Profile and Site Content.'],
  ['projects', 'Projects', 'المشاريع', 'Create projects, configure categories, media, featured status, case-study legacy fields, and video settings.'],
  ['services', 'Services', 'الخدمات', 'Manage services, tools, experience, education, certifications, and supporting content.'],
  ['content', 'Content & Blog', 'المحتوى والمدونة', 'Content Creator items, editorial posts, client logos, and testimonials have dedicated editors.'],
  ['pricing', 'Pricing', 'التسعير', 'Pricing packages are data-driven. Use presentation variants to communicate basic, standard, premium, or professional positioning.'],
  ['contact', 'Contact & inquiries', 'التواصل والاستفسارات', 'Contact fields and authenticated inquiry management are kept separate from public content.'],
  ['order', 'Page Order & Client Mode', 'ترتيب الصفحات ووضع العميل', 'Page Order controls frontend section sequence. Client Mode uses the same registry with a focused presentation.'],
  ['availability', 'Availability', 'التوفر', 'Available, limited, and booked are the canonical states shared by Hero and Contact.'],
  ['publishing', 'Saving & publishing', 'الحفظ والنشر', 'Save persists through PortfolioContext and StorageService. Public output uses the sanitized public projection where applicable.'],
  ['troubleshooting', 'Troubleshooting', 'استكشاف الأخطاء', 'For stale UI, hard refresh. For media, check HTTPS URLs and provider permissions. For save errors, verify the admin session and network.'],
] as const;

export const AdminGuideTab: React.FC = () => {
  const { language } = usePortfolio();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState('overview');
  const filtered = useMemo(() => sections.filter(([, en, ar, body]) => `${en} ${ar} ${body}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="space-y-6">
    <header className="border-b border-[var(--border)] pb-5"><div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-accent)]"><BookOpen className="h-4 w-4" /> Dashboard Guide</div><h2 className="mt-2 text-2xl font-bold font-syne">{language === 'ar' ? 'دليل لوحة التحكم' : 'Dashboard Guide'}</h2><p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">{language === 'ar' ? 'مرجع سريع لإدارة الموقع ونشر التغييرات بأمان.' : 'A scannable reference for managing and publishing the portfolio safely.'}</p></header>
    <label className="relative block"><Search className="pointer-events-none absolute start-3 top-3 h-4 w-4 text-[var(--muted)]" /><input aria-label="Search dashboard guide" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={language === 'ar' ? 'ابحث في الدليل' : 'Search the guide'} className="w-full rounded-xl border border-[var(--border)] bg-[var(--input-bg)] py-2.5 ps-10 pe-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-accent)]" /></label>
    <div className="grid gap-3">{filtered.map(([id, en, ar, body]) => <section id={id} key={id} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"><button type="button" aria-expanded={open === id} onClick={() => setOpen(open === id ? '' : id)} className="flex w-full items-center justify-between gap-4 p-4 text-start font-semibold text-[var(--foreground)]"><span>{language === 'ar' ? ar : en}</span><ChevronDown className={`h-4 w-4 transition-transform ${open === id ? 'rotate-180' : ''}`} /></button>{open === id && <div className="border-t border-[var(--border-subtle)] p-4 text-sm leading-7 text-[var(--muted)]"><ShieldCheck className="me-2 inline h-4 w-4 text-[var(--color-accent)]" />{body}</div>}</section>)}</div>
  </div>;
};
