import React, { useEffect, useRef, useState } from 'react';
import { Maximize, Play, Volume2, VolumeX } from 'lucide-react';
import { ParsedVideoInfo, getAspectRatioClass } from '../../lib/videoHelper';
import { sanitizeExternalUrl } from '../../lib/security';
import { AspectRatio } from '../../types/portfolio';

interface ProfessionalVideoPlayerProps {
  video: ParsedVideoInfo;
  posterUrl?: string;
  aspectRatio?: AspectRatio;
  title: string;
  controls?: boolean;
  fullscreen?: boolean;
  className?: string;
}

export const ProfessionalVideoPlayer: React.FC<ProfessionalVideoPlayerProps> = ({
  video,
  posterUrl,
  aspectRatio = '16:9',
  title,
  controls = true,
  fullscreen = true,
  className = '',
}) => {
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState(false);
  const [muted, setMuted] = useState(false);
  const nativeVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setActivated(false);
    setError(false);
  }, [video.embedUrl, video.sourceUrl]);

  const activate = () => {
    setActivated(true);
    if (video.playbackType === 'native-video') {
      window.setTimeout(() => {
        nativeVideoRef.current?.play().catch(() => {
          setMuted(true);
          if (nativeVideoRef.current) {
            nativeVideoRef.current.muted = true;
            void nativeVideoRef.current.play().catch(() => setError(true));
          }
        });
      }, 0);
    }
  };

  const toggleMute = () => {
    const element = nativeVideoRef.current;
    if (!element) return;
    element.muted = !element.muted;
    setMuted(element.muted);
  };

  return (
    <div className={`relative w-full overflow-hidden bg-black ${getAspectRatioClass(aspectRatio)} ${className}`}>
      {!activated && posterUrl && (
        <img
          src={sanitizeExternalUrl(posterUrl)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      )}

      {activated && video.playbackType === 'native-video' && video.embedUrl && (
        <video
          ref={nativeVideoRef}
          src={video.embedUrl}
          poster={sanitizeExternalUrl(posterUrl)}
          controls={controls}
          playsInline
          preload="none"
          muted={muted}
          onError={() => setError(true)}
          className="h-full w-full object-contain"
        />
      )}

      {activated && video.playbackType === 'iframe' && video.embedUrl && !error && (
        <iframe
          src={video.embedUrl}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen={fullscreen}
          onError={() => setError(true)}
          className="h-full w-full border-0"
        />
      )}

      {!activated && (
        <button
          type="button"
          onClick={activate}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          aria-label={`Play ${title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)] text-black shadow-2xl">
            <Play className="h-6 w-6 fill-current" />
          </span>
        </button>
      )}

      {activated && video.playbackType === 'native-video' && (
        <div className="absolute bottom-3 right-3 z-10 flex gap-2">
          <button type="button" onClick={toggleMute} className="rounded-full bg-black/70 p-2 text-white" aria-label={muted ? 'Unmute video' : 'Mute video'}>
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          {fullscreen && <button type="button" onClick={() => nativeVideoRef.current?.requestFullscreen()} className="rounded-full bg-black/70 p-2 text-white" aria-label="Enter fullscreen"><Maximize className="h-4 w-4" /></button>}
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black p-6 text-center text-sm text-white">
          <p>Video playback is unavailable here.</p>
          <a href={sanitizeExternalUrl(video.sourceUrl)} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">Open source video</a>
        </div>
      )}
    </div>
  );
};
