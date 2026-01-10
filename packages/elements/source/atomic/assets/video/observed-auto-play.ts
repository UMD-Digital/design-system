import { isPreferredReducedMotion } from '@universityofmaryland/web-utilities-library/accessibility';
import { createVideoToggle } from './toggle';

interface CardVideoShortProps {
  video: HTMLVideoElement;
  isAutoplay?: boolean;
  isScaled?: boolean;
  additionalElementStyles?: Record<string, any>;
  /** Control video preload strategy. Defaults to 'metadata' */
  videoPreload?: 'none' | 'metadata' | 'auto';
  /** Control fetch priority for the video. Defaults to 'auto' */
  videoFetchPriority?: 'high' | 'low' | 'auto';
}

export const createVideoObservedAutoPlay = ({
  video,
  isAutoplay = false,
  isScaled = false,
  additionalElementStyles,
  videoPreload = 'metadata',
  videoFetchPriority = 'auto',
}: CardVideoShortProps) =>
  (() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.readyState >= 2) {
              composite?.events?.setPlay();
            } else {
              video.addEventListener(
                'loadeddata',
                () => composite?.events?.setPlay(),
                {
                  once: true,
                },
              );

              if (video.readyState === 0) {
                video.load();
              }
            }
          } else {
            composite?.events?.setPause();
          }
        });
      },
      {
        threshold: 0.25,
      },
    );
    const callback = (isPlaying: boolean) => {
      if (isPlaying && observer) {
        observer.disconnect();
      }
    };

    video.removeAttribute('controls');
    video.setAttribute('preload', videoPreload);
    if (videoFetchPriority !== 'auto') {
      video.setAttribute('fetchpriority', videoFetchPriority);
    }
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');

    const composite = createVideoToggle({
      video,
      additionalElementStyles,
      isScaled,
      callback,
    });

    if (!isPreferredReducedMotion() && isAutoplay) {
      observer.observe(composite.element);
    }

    return composite;
  })();
