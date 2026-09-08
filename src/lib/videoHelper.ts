import { VideoPlatform, AspectRatio } from '../types/portfolio';

export interface ParsedVideoInfo {
  platform: VideoPlatform;
  videoId?: string;
  embedUrl: string;
  thumbnailUrl?: string;
  isDirect: boolean;
  isIframe: boolean;
}

export function detectVideoPlatform(urlOrCode: string): VideoPlatform {
  if (!urlOrCode) return 'direct';
  const trimmed = urlOrCode.trim();

  if (trimmed.startsWith('<iframe') || trimmed.includes('<iframe')) {
    return 'embed';
  }

  if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
    return 'youtube';
  }
  if (trimmed.includes('vimeo.com')) {
    return 'vimeo';
  }
  if (trimmed.includes('tiktok.com')) {
    return 'tiktok';
  }
  if (trimmed.includes('instagram.com')) {
    return 'instagram';
  }
  if (trimmed.includes('facebook.com') || trimmed.includes('fb.watch')) {
    return 'facebook';
  }
  if (trimmed.endsWith('.mp4') || trimmed.endsWith('.webm') || trimmed.endsWith('.mov') || trimmed.includes('.mp4?')) {
    return 'direct';
  }

  return 'youtube'; // fallback
}

export function parseVideoUrl(
  urlOrCode: string,
  explicitPlatform?: VideoPlatform,
  options?: {
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
  }
): ParsedVideoInfo {
  if (!urlOrCode) {
    return {
      platform: 'direct',
      embedUrl: '',
      isDirect: false,
      isIframe: false,
    };
  }

  const trimmed = urlOrCode.trim();
  const platform = explicitPlatform || detectVideoPlatform(trimmed);

  const autoplay = options?.autoplay ? 1 : 0;
  const muted = options?.muted ? 1 : 0;
  const loop = options?.loop ? 1 : 0;
  const controls = options?.controls !== false ? 1 : 0;

  // 1. Custom iframe
  if (platform === 'embed' || trimmed.startsWith('<iframe')) {
    // If it's pure iframe HTML, extract src or render
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    return {
      platform: 'embed',
      embedUrl: srcMatch ? srcMatch[1] : trimmed,
      isDirect: false,
      isIframe: true,
    };
  }

  // 2. YouTube
  if (platform === 'youtube') {
    let videoId = '';
    
    // Check for standard ID passed directly (e.g. "dQw4w9WgXcQ")
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      videoId = trimmed;
    } else if (trimmed.includes('youtu.be/')) {
      const parts = trimmed.split('youtu.be/')[1];
      videoId = parts.split('?')[0].split('&')[0];
    } else if (trimmed.includes('/shorts/')) {
      const parts = trimmed.split('/shorts/')[1];
      videoId = parts.split('?')[0].split('&')[0];
    } else if (trimmed.includes('v=')) {
      const match = trimmed.match(/[?&]v=([^&]+)/);
      if (match) videoId = match[1];
    } else if (trimmed.includes('/embed/')) {
      const parts = trimmed.split('/embed/')[1];
      videoId = parts.split('?')[0].split('&')[0];
    }

    if (!videoId && trimmed.length > 5) {
      videoId = trimmed;
    }

    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay}&mute=${muted}&controls=${controls}&loop=${loop}${loop ? `&playlist=${videoId}` : ''}&rel=0&modestbranding=1`;
    const thumbnailUrl = videoId ? `https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80` : undefined;

    return {
      platform: 'youtube',
      videoId,
      embedUrl,
      thumbnailUrl,
      isDirect: false,
      isIframe: true,
    };
  }

  // 3. Vimeo
  if (platform === 'vimeo') {
    let vimeoId = '';
    const match = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
    if (match && match[3]) {
      vimeoId = match[3];
    } else {
      const digits = trimmed.match(/(\d{6,12})/);
      if (digits) vimeoId = digits[1];
    }

    const embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay}&muted=${muted}&loop=${loop}&autopause=0`;
    return {
      platform: 'vimeo',
      videoId: vimeoId,
      embedUrl,
      isDirect: false,
      isIframe: true,
    };
  }

  // 4. TikTok
  if (platform === 'tiktok') {
    let videoId = '';
    const match = trimmed.match(/video\/(\d+)/);
    if (match) videoId = match[1];
    const embedUrl = videoId 
      ? `https://www.tiktok.com/embed/v2/${videoId}` 
      : trimmed;
    return {
      platform: 'tiktok',
      videoId,
      embedUrl,
      isDirect: false,
      isIframe: true,
    };
  }

  // 5. Instagram
  if (platform === 'instagram') {
    let reelId = '';
    const match = trimmed.match(/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
    if (match) reelId = match[1];
    const embedUrl = reelId 
      ? `https://www.instagram.com/reel/${reelId}/embed` 
      : trimmed;
    return {
      platform: 'instagram',
      videoId: reelId,
      embedUrl,
      isDirect: false,
      isIframe: true,
    };
  }

  // 6. Direct MP4 / WebM
  return {
    platform: 'direct',
    embedUrl: trimmed,
    isDirect: true,
    isIframe: false,
  };
}

export function getAspectRatioClass(ratio: AspectRatio): string {
  switch (ratio) {
    case '16:9':
      return 'aspect-video';
    case '9:16':
      return 'aspect-[9/16]';
    case '1:1':
      return 'aspect-square';
    case '21:9':
      return 'aspect-[21/9]';
    case '4:5':
      return 'aspect-[4/5]';
    default:
      return 'aspect-video';
  }
}
