import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { Check, Sparkles } from 'lucide-react';
import { sanitizeExternalUrl } from '../../lib/security';

export const PricingSection: React.FC = () => {
  const { data, language } = usePortfolio();
  const shouldReduceMotion = useReducedMotion();

  const packages = (data.servicePackages || [])
    .filter((pkg) => pkg.visible && pkg.status !== 'draft')
    .sort((a, b) => a.order - b.order);

  if (!packages.length) {
    return null;
  }

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="section-shell space-y-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-accent)]">
            <Sparkles className="h-3.5 w-3.5" />
            Pricing
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.05em] text-[var(--foreground)]">
            Clear packages for work that needs to ship.
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            Flexible retainers and project work built around quality output, speed, and a calm editing process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg, idx) => {
            const name = pkg.name[language] || pkg.name.en;
            const tagline = pkg.tagline[language] || pkg.tagline.en;
            const description = pkg.description[language] || pkg.description.en;
            const billing = pkg.billing[language] || pkg.billing.en;
            const ctaText = pkg.ctaText[language] || pkg.ctaText.en;
            const variant = ['basic', 'standard', 'premium', 'professional'].includes(pkg.presentation || '')
              ? pkg.presentation!
              : (pkg.featured ? 'premium' : idx === 0 ? 'basic' : idx === 1 ? 'standard' : 'professional');
            const badge = pkg.badge?.[language] || pkg.badge?.en || (pkg.featured ? 'Most popular' : variant === 'professional' ? 'Executive tier' : '');

            return (
              <motion.div
                key={pkg.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                data-pricing-variant={variant}
                className={`pricing-card pricing-card-${variant} group relative flex flex-col rounded-[30px] border p-6 shadow-[var(--card-shadow)] transition-all duration-500 hover:-translate-y-1 ${pkg.featured ? 'border-[var(--color-accent)] bg-[var(--surface)]' : 'border-[var(--border)] bg-[var(--surface)]/80'}`}
              >
                {badge && (
                  <div className="absolute right-5 top-5 rounded-full border border-[var(--color-accent)] bg-[var(--accent-muted)] px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    {badge}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="space-y-3">
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--muted)]">{variant}</p>
                    <h3 className="text-2xl font-bold font-syne text-[var(--foreground)]">{name}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{tagline}</p>
                  </div>

                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-[var(--foreground)] font-syne">{pkg.currency} {pkg.price}</span>
                    <span className="pb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted)]">{billing}</span>
                  </div>

                  <p className="text-sm text-[var(--muted)] leading-relaxed">{description}</p>
                </div>

                <ul className="mt-6 space-y-3 border-t border-[var(--border-subtle)] pt-5">
                  {pkg.features.map((feature, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-sm text-[var(--foreground)]/90">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-muted)] text-[var(--color-accent)]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={sanitizeExternalUrl(pkg.ctaLink || '#contact')}
                  className="mt-6 inline-flex items-center justify-center rounded-full px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: pkg.featured ? 'var(--color-accent)' : 'var(--surface-muted)', color: pkg.featured ? '#050816' : 'var(--foreground)' }}
                >
                  {ctaText}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
