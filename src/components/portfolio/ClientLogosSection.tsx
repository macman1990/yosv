import React from 'react';
import { ExternalLink, Images } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ClientLogo } from '../../types/portfolio';
import { sanitizeExternalUrl } from '../../lib/security';

const getVisibleLogos = (logos: ClientLogo[]): ClientLogo[] => [...logos]
  .filter((logo) => logo.visible && logo.logoUrl.trim())
  .sort((a, b) => a.order - b.order);

const LogoMark: React.FC<{ logo: ClientLogo; decorative?: boolean }> = ({ logo, decorative = false }) => {
  const image = (
    <img
      src={logo.logoUrl}
      alt={decorative ? '' : logo.name}
      loading="lazy"
      className="client-logos-section__image"
    />
  );

  if (decorative) {
    return <div className="client-logos-section__item" aria-hidden="true">{image}</div>;
  }

  const safeUrl = logo.websiteUrl ? sanitizeExternalUrl(logo.websiteUrl) : '#';
  if (safeUrl === '#') {
    return <div className="client-logos-section__item" title={logo.name}>{image}</div>;
  }

  return (
    <a
      href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="client-logos-section__item client-logos-section__item--link"
      aria-label={logo.name}
    >
      {image}
      <ExternalLink className="client-logos-section__link-icon" aria-hidden="true" />
    </a>
  );
};

export const ClientLogosSection: React.FC = () => {
  const { data, isClientMode, language, t } = usePortfolio();
  if (data.siteFeatures?.clientLogos !== true) return null;

  const logos = getVisibleLogos(data.clientLogos || []);
  if (logos.length === 0) return null;

  return (
    <section id="client-logos" className={`client-logos-section ${isClientMode ? 'client-logos-section--client' : ''}`} aria-labelledby="client-logos-title">
      <div className="section-shell">
        <div className="client-logos-section__header">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-accent)]">
              <Images className="h-3.5 w-3.5" aria-hidden="true" />
              {language === 'ar' ? 'شركاء وثقوا بي' : 'Trusted collaborators'}
            </div>
            <h2 id="client-logos-title" className="mt-4 font-syne text-2xl font-black tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
              {language === 'ar' ? 'علامات تجارية صنعتها فرق قوية' : 'Trusted by teams with work to move'}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
            {isClientMode
              ? (language === 'ar' ? 'خبرة عملية تساعد على تحويل الأفكار إلى محتوى واضح ومؤثر.' : 'Practical creative experience for projects that need clarity and momentum.')
              : t('work.subtitle')}
          </p>
        </div>

        <div className="client-logos-section__viewport" aria-label={language === 'ar' ? 'شعارات العملاء' : 'Client logos'}>
          <div className="client-logos-section__track">
            <div className="client-logos-section__group">
              {logos.map((logo) => <LogoMark key={logo.id} logo={logo} />)}
            </div>
            <div className="client-logos-section__group" aria-hidden="true">
              {logos.map((logo) => <LogoMark key={`duplicate-${logo.id}`} logo={logo} decorative />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
