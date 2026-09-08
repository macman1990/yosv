// Security utilities: sanitization, embed allowlisting, and safe rendering

// Allowed hostnames for external iframe embeds
const ALLOWED_EMBED_HOSTS = [
  'www.youtube.com',
  'youtube.com',
  'www.youtube-nocookie.com',
  'youtube-nocookie.com',
  'player.vimeo.com',
  'vimeo.com',
  'www.tiktok.com',
  'tiktok.com',
  'www.instagram.com',
  'instagram.com',
];

/**
 * Validates and sanitizes external URLs to prevent javascript:, data:, or vbscript: injection.
 * Returns '#' if the URL is invalid or unsafe.
 */
export function sanitizeExternalUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();
  if (!trimmed) return '#';

  // Allow anchor fragments and internal routes
  if (trimmed.startsWith('#') || trimmed.startsWith('/')) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
      return trimmed;
    }
  } catch {
    // Relative safe link
    if (!trimmed.includes(':')) {
      return trimmed;
    }
  }

  return '#';
}

/**
 * Checks whether an iframe URL belongs to an approved trusted embed provider.
 */
export function isAllowedEmbedUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    const hostname = parsed.hostname.toLowerCase();
    return ALLOWED_EMBED_HOSTS.some((allowed) => hostname === allowed || hostname.endsWith(`.${allowed}`));
  } catch {
    return false;
  }
}

/**
 * Extracts YouTube Video ID from various link styles (watch, share, shorts, embed).
 */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  return match ? match[1] : null;
}

/**
 * Converts a raw video or social URL into a safe, sandboxed embed URL if supported.
 */
export function getSafeEmbedUrl(url: string, platform?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // 1. YouTube
  const ytId = getYouTubeId(trimmed);
  if (ytId) {
    return `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`;
  }

  // 2. Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1`;
  }

  // 3. Directly provided embed URL if allowlisted
  if (isAllowedEmbedUrl(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Sanitizes markdown content into safe HTML without dangerously injecting raw script tags.
 * Escapes raw HTML tags and converts basic markdown tokens (headings, bold, italic, code, quotes, bullet lists).
 */
export function renderSafeMarkdown(markdownText: string): string {
  if (!markdownText) return '';

  // 1. Escape HTML entities to prevent XSS
  const escaped = markdownText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  // 2. Convert markdown blocks safely
  const lines = escaped.split('\n');
  const renderedLines: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith('### ')) {
      if (inList) { renderedLines.push('</ul>'); inList = false; }
      renderedLines.push(`<h4 class="text-base font-bold text-[var(--foreground)] mt-4 mb-2">${applyInlineFormatting(trimmed.substring(4))}</h4>`);
    } else if (trimmed.startsWith('## ')) {
      if (inList) { renderedLines.push('</ul>'); inList = false; }
      renderedLines.push(`<h3 class="text-lg font-bold text-[var(--foreground)] mt-6 mb-2 font-syne">${applyInlineFormatting(trimmed.substring(3))}</h3>`);
    } else if (trimmed.startsWith('# ')) {
      if (inList) { renderedLines.push('</ul>'); inList = false; }
      renderedLines.push(`<h2 class="text-xl font-extrabold text-[var(--foreground)] mt-8 mb-3 font-syne">${applyInlineFormatting(trimmed.substring(2))}</h2>`);
    } else if (trimmed.startsWith('> ')) {
      if (inList) { renderedLines.push('</ul>'); inList = false; }
      renderedLines.push(`<blockquote class="ps-4 border-s-2 border-[var(--color-accent)] italic text-[var(--muted)] my-3">${applyInlineFormatting(trimmed.substring(2))}</blockquote>`);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) { renderedLines.push('<ul class="list-disc ps-5 space-y-1 my-2 text-[var(--foreground)]">'); inList = true; }
      renderedLines.push(`<li>${applyInlineFormatting(trimmed.substring(2))}</li>`);
    } else if (!trimmed) {
      if (inList) { renderedLines.push('</ul>'); inList = false; }
      renderedLines.push('<div class="h-2"></div>');
    } else {
      if (inList) { renderedLines.push('</ul>'); inList = false; }
      renderedLines.push(`<p class="leading-relaxed text-[var(--foreground)] my-2">${applyInlineFormatting(trimmed)}</p>`);
    }
  }

  if (inList) {
    renderedLines.push('</ul>');
  }

  return renderedLines.join('\n');
}

function applyInlineFormatting(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[var(--foreground)]">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[var(--surface-muted)] font-mono text-xs text-[var(--color-accent)]">$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (match, label, href) => {
      const safeHref = sanitizeExternalUrl(href);
      return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="text-[var(--color-accent)] underline hover:opacity-80">${label}</a>`;
    });
}
