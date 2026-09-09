import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, MessageCircle, Send, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { StorageService } from '../../lib/storage';

export const ContactSection: React.FC = () => {
  const { data, language, t, addToast } = usePortfolio();
  const contact = data.contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ctaText = contact.ctaText[language] || contact.ctaText.en;
  const successMsg = contact.successMessage[language] || contact.successMessage.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast('Please fill out name, email, and message.', 'error');
      return;
    }

    setSubmitting(true);
    // Simulate high-speed serverless submission & analytics record
    setTimeout(async () => {
      await StorageService.recordAnalytics({
        type: 'contact_submit',
        language,
        theme: 'dark',
        device: window.innerWidth < 768 ? 'mobile' : 'desktop',
      });

      setSubmitting(false);
      setSubmitted(true);
      addToast(successMsg, 'success');
    }, 800);
  };

  const whatsappLink = `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Kareem, I am interested in collaborating on a video editing / content project.`
  )}`;

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="section-shell space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 reveal">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-accent)]"
          >
            <Mail className="w-3.5 h-3.5" />
            {t('contact.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-[-0.05em]">
            {t('contact.title')}
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5 reveal reveal-delay-1">
            <div className="glass-card border border-[var(--border)] p-6 sm:p-7 text-start">
              <h3 className="text-xl font-bold text-[var(--foreground)] font-syne">{ctaText}</h3>
              <p className="mt-3 text-xs text-[var(--muted)] leading-relaxed">
                Direct booking for channel retainers, commercial post-production, high-yield viral series, and scriptwriting workshops.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center justify-between rounded-[22px] border border-[var(--border)] bg-[var(--surface-muted)] p-4 transition-all hover:border-[var(--border-hover)]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                      style={{ backgroundColor: 'var(--accent-muted)', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                    >
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{t('contact.emailDirect')}</p>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{contact.email}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--muted-foreground)] rtl-flip" />
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-[22px] border border-[var(--border)] bg-[var(--surface-muted)] p-4 transition-all hover:border-[var(--border-hover)]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                      style={{ backgroundColor: 'var(--accent-muted)', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                    >
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: 'var(--color-accent)' }}>{t('contact.whatsappDirect')}</p>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{contact.whatsapp}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 rtl-flip" style={{ color: 'var(--color-accent)' }} />
                </a>
              </div>
            </div>

            <div className="glass-card border border-[var(--border)] p-5 flex flex-wrap gap-2">
              {(data.socialLinks || []).filter((s) => s.visible).map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 reveal reveal-delay-2">
            <div className="glass-card border border-[var(--border)] p-6 sm:p-8">
              {submitted ? (
                <div className="space-y-5 py-8 text-center">
                  <div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border"
                    style={{ backgroundColor: 'var(--accent-muted)', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] font-syne">Inquiry Transmitted</h3>
                  <p className="mx-auto max-w-md text-sm text-[var(--muted)] leading-relaxed">{successMsg}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-6 py-2.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--foreground)]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                        {t('contact.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Vance or Apex Studio"
                        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                        {t('contact.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="producer@studio.com"
                        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                      />
                    </div>
                  </div>

                  {contact.formFields.showProjectType && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                        {t('contact.projectType')}
                      </label>
                      <input
                        type="text"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        placeholder={t('contact.projectTypePlaceholder')}
                        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                      />
                    </div>
                  )}

                  {contact.formFields.showBudget && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                        {t('contact.budget')}
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                      >
                        <option value="">Select an investment tier...</option>
                        <option value="$1k - $3k">$1,000 – $3,000</option>
                        <option value="$3k - $8k">$3,000 – $8,000</option>
                        <option value="$8k - $20k+">$8,000 – $20,000+</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your vision, video runtime, goals, and any raw footage links..."
                      className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-2xl bg-[var(--color-accent)] px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:opacity-95 disabled:opacity-50"
                  >
                    {submitting ? <span>{t('contact.sending')}</span> : <span className="inline-flex items-center justify-center gap-2"><Send className="h-4 w-4 rtl-flip" />{t('contact.send')}</span>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
