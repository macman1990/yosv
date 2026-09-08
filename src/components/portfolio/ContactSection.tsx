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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border"
            style={{
              backgroundColor: 'var(--accent-muted)',
              borderColor: 'var(--color-accent)',
              color: 'var(--color-accent)',
            }}
          >
            <Mail className="w-3.5 h-3.5" />
            {t('contact.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--foreground)] font-syne tracking-tight transition-colors duration-300">
            {t('contact.title')}
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed transition-colors duration-300">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct channels & Quick Connect */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] space-y-6 shadow-[var(--card-shadow)] text-start">
              <h3 className="text-xl font-bold text-[var(--foreground)] font-syne">{ctaText}</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Direct booking for channel retainers, commercial post-production, high-yield viral series, and scriptwriting workshops.
              </p>

              <div className="space-y-3 pt-2">
                {/* Email Direct */}
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: 'var(--accent-muted)',
                        borderColor: 'var(--color-accent)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted-foreground)] font-mono">{t('contact.emailDirect')}</p>
                      <p className="text-sm font-semibold text-[var(--foreground)] group-hover:opacity-90 transition-opacity">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--muted-foreground)] rtl-flip transition-colors" />
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: 'var(--accent-muted)',
                        borderColor: 'var(--color-accent)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono" style={{ color: 'var(--color-accent)' }}>
                        {t('contact.whatsappDirect')}
                      </p>
                      <p className="text-sm font-semibold text-[var(--foreground)] group-hover:opacity-90 transition-opacity">
                        {contact.whatsapp}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 rtl-flip" style={{ color: 'var(--color-accent)' }} />
                </a>
              </div>
            </div>

            {/* Social Links List */}
            <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] flex flex-wrap gap-2 shadow-[var(--card-shadow)]">
              {(data.socialLinks || [])
                .filter((s) => s.visible)
                .map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-[var(--card-shadow)] text-start">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div
                    className="w-16 h-16 rounded-full border mx-auto flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--accent-muted)',
                      borderColor: 'var(--color-accent)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] font-syne">Inquiry Transmitted</h3>
                  <p className="text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                    {successMsg}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[var(--surface-muted)] hover:bg-[var(--surface-elevated)] text-[var(--foreground)] border border-[var(--border)] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[var(--muted-foreground)]">
                        {t('contact.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Vance or Apex Studio"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[var(--muted-foreground)]">
                        {t('contact.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="producer@studio.com"
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {contact.formFields.showProjectType && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[var(--muted-foreground)]">
                        {t('contact.projectType')}
                      </label>
                      <input
                        type="text"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        placeholder={t('contact.projectTypePlaceholder')}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm transition-colors"
                      />
                    </div>
                  )}

                  {contact.formFields.showBudget && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-[var(--muted-foreground)]">
                        {t('contact.budget')}
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--foreground)] text-sm transition-colors cursor-pointer"
                      >
                        <option value="">Select an investment tier...</option>
                        <option value="$1k - $3k">$1,000 – $3,000 (Short-Form Pilot / Single Edit)</option>
                        <option value="$3k - $8k">$3,000 – $8,000 (Monthly Channel Retainer / 4K Doc)</option>
                        <option value="$8k - $20k+">$8,000 – $20,000+ (Commercial Series / Full Post Direction)</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[var(--muted-foreground)]">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your vision, video runtime, goals, and any raw footage links..."
                      className="w-full px-4 py-3 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] focus:border-[var(--color-accent)] focus:outline-none text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--color-accent)] text-black font-mono flex items-center justify-center gap-2 transition-all shadow-md hover:opacity-95 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>{t('contact.sending')}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 rtl-flip" />
                        <span>{t('contact.send')}</span>
                      </>
                    )}
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
