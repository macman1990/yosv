import { AspectRatio, Project, ProjectVideo, VideoPlatform, VideoSourceType } from '../types/portfolio';
import { getYouTubeId, isAllowedEmbedUrl, sanitizeExternalUrl } from './security';

export interface ParsedVideoInfo {
  platform: VideoPlatform;
  provider: VideoSourceType;
  videoId?: string;
  sourceUrl: string;
  embedUrl: string;
  thumbnailUrl?: string;
  playbackType: 'iframe' | 'native-video';
  isDirect: boolean;
  isIframe: boolean;
}

export function getGoogleDriveId(url: string): string | null {
  const match = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/i);
  return match?.[1] || null;
}

export function detectVideoPlatform(urlOrCode: string): VideoPlatform {
  if (!urlOrCode) return 'direct';
  const trimmed = urlOrCode.trim();
  if (trimmed.includes('<iframe')) return 'embed';
  if (trimmed.includes('drive.google.com')) return 'google-drive';
  if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) return 'youtube';
  if (trimmed.includes('vimeo.com')) return 'vimeo';
  if (trimmed.includes('tiktok.com')) return 'tiktok';
  if (trimmed.includes('instagram.com')) return 'instagram';
  if (trimmed.includes('facebook.com') || trimmed.includes('fb.watch')) return 'facebook';
  return 'direct';
}

function sourceTypeFor(platform: VideoPlatform): VideoSourceType {
  if (platform === 'google-drive') return 'google-drive';
  if (platform === 'youtube' || platform === 'vimeo') return platform;
  return 'direct';
}

export function normalizeVideoUrl(
  sourceUrl: string,
  provider?: VideoSourceType | VideoPlatform,
  customEmbedUrl?: string,
  options?: { autoplay?: boolean; muted?: boolean; loop?: boolean; controls?: boolean }
): ParsedVideoInfo {
  const trimmed = sourceUrl.trim();
  const detected = provider || detectVideoPlatform(trimmed);
  const platform = detected as VideoPlatform;
  const autoplay = options?.autoplay ? 1 : 0;
  const muted = options?.muted ? 1 : 0;
  const loop = options?.loop ? 1 : 0;
  const controls = options?.controls !== false ? 1 : 0;

  if (platform === 'google-drive') {
    const videoId = getGoogleDriveId(trimmed);
    const embedUrl = customEmbedUrl && isAllowedEmbedUrl(customEmbedUrl)
      ? customEmbedUrl
      : videoId ? `https://drive.google.com/file/d/${videoId}/preview` : '';
    return { platform: 'google-drive', provider: 'google-drive', videoId: videoId || undefined, sourceUrl: trimmed, embedUrl, playbackType: 'iframe', isDirect: false, isIframe: true };
  }

  if (platform === 'youtube') {
    const videoId = getYouTubeId(trimmed) || (/^[a-zA-Z0-9_-]{11}$/.test(trimmed) ? trimmed : undefined);
    const embedUrl = customEmbedUrl && isAllowedEmbedUrl(customEmbedUrl)
      ? customEmbedUrl
      : videoId
        ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay}&mute=${muted}&controls=${controls}&loop=${loop}${loop ? `&playlist=${videoId}` : ''}&rel=0&modestbranding=1`
        : '';
    return { platform: 'youtube', provider: 'youtube', videoId, sourceUrl: trimmed, embedUrl, thumbnailUrl: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined, playbackType: 'iframe', isDirect: false, isIframe: true };
  }

  if (platform === 'vimeo') {
    const match = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^/]*\/videos\/|album\/\d+\/video\/|video\/)?(\d+)/);
    const videoId = match?.[1] || trimmed.match(/\d{6,12}/)?.[0];
    const embedUrl = customEmbedUrl && isAllowedEmbedUrl(customEmbedUrl)
      ? customEmbedUrl
      : videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay}&muted=${muted}&loop=${loop}&autopause=0` : '';
    return { platform: 'vimeo', provider: 'vimeo', videoId, sourceUrl: trimmed, embedUrl, playbackType: 'iframe', isDirect: false, isIframe: true };
  }

  if (platform === 'embed') {
    const src = trimmed.match(/src=["']([^"']+)["']/i)?.[1] || trimmed;
    return { platform: 'embed', provider: 'direct', sourceUrl: trimmed, embedUrl: isAllowedEmbedUrl(src) ? src : '', playbackType: 'iframe', isDirect: false, isIframe: true };
  }

  const safeSource = sanitizeExternalUrl(trimmed);
  return { platform: 'direct', provider: 'direct', sourceUrl: trimmed, embedUrl: safeSource === '#' ? '' : safeSource, playbackType: 'native-video', isDirect: true, isIframe: false };
}

export function getProjectVideo(project: Project): ParsedVideoInfo {
  const config = project.video;
  const sourceUrl = config?.url || project.fullVideoUrl || project.previewVideoUrl || '';
  const provider = config?.sourceType || sourceTypeFor(project.platform);
  return normalizeVideoUrl(sourceUrl, provider, config?.embedUrl, {
    autoplay: config?.autoplay ?? project.autoplay,
    muted: config?.muted ?? project.muted,
    loop: config?.loop ?? project.loop,
    controls: config?.controls ?? project.controls,
  });
}

export function getAspectRatioClass(ratio?: AspectRatio): string {
  switch (ratio) {
    case '9:16': return 'aspect-[9/16]';
    case '1:1': return 'aspect-square';
    case '21:9': return 'aspect-[21/9]';
    case '4:5': return 'aspect-[4/5]';
    case '4:3': return 'aspect-[4/3]';
    case 'auto': return 'aspect-video';
    default: return 'aspect-video';
  }
}

export function getVideoAspectRatio(project: Project): AspectRatio {
  return project.video?.aspectRatio || project.aspectRatio || '16:9';
}

export function getNormalizedVideoConfig(project: Project): ProjectVideo {
  const video = project.video;
  return {
    enabled: video?.enabled ?? Boolean(project.fullVideoUrl || project.previewVideoUrl),
    sourceType: video?.sourceType || sourceTypeFor(project.platform),
    url: video?.url || project.fullVideoUrl || project.previewVideoUrl,
    embedUrl: video?.embedUrl,
    posterUrl: video?.posterUrl || project.thumbnail,
    aspectRatio: video?.aspectRatio || project.aspectRatio || '16:9',
    autoplay: video?.autoplay ?? false,
    muted: video?.muted ?? project.muted,
    controls: video?.controls ?? project.controls,
    loop: video?.loop ?? project.loop,
    fullscreen: video?.fullscreen ?? true,
    openMode: video?.openMode || 'modal',
  };
}
