import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { isPreferredReducedMotion } from '@universityofmaryland/web-utilities-library/accessibility';
import {
  pause as iconPause,
  play as iconPlay,
} from '@universityofmaryland/web-icons-library/controls';

import { type StyleOverrideProps } from '_types';

interface VideoProps extends Pick<StyleOverrideProps, 'customStyles'> {
  video: HTMLVideoElement;
  isScaled?: boolean;
  callback?: (isPlaying: boolean) => void;
}

export const createVideoToggle = (props: VideoProps) =>
  (() => {
    const {
      video,
      customStyles,
      isScaled = false,
      callback,
    } = props;

    const button = new ElementBuilder('button')
      .styled(Styles.element.action.button.videoState)
      .withAttribute('type', 'button')
      .withAttribute('aria-label', 'Play')
      .withHTML(iconPlay)
      .build();

    const setPlay = () => {
      button.element.setAttribute('aria-label', 'Pause');
      button.element.innerHTML = iconPause;
      video.muted = true;
      video.play().catch((error) => {
        if (error.name === 'NotAllowedError') {
          setPause();
        }
        console.warn('Video play failed:', error);
      });
    };

    const setPause = () => {
      button.element.setAttribute('aria-label', 'Play');
      button.element.innerHTML = iconPlay;
      video.pause();
    };

    button.element.addEventListener('click', () => {
      if (video.paused) {
        if (callback) callback(false);
        setPlay();
      } else {
        if (callback) callback(true);
        setPause();
      }
    });

    const isAutoplay =
      video.getAttribute('autoplay') === '' ||
      video.getAttribute('autoplay') === 'true';

    if (isAutoplay) {
      if (isPreferredReducedMotion()) {
        // The native `autoplay` attribute makes the browser start playback on
        // its own, regardless of our JS. Remove it and pause so the video
        // stays on its first frame, leaving the play button for manual start.
        video.removeAttribute('autoplay');
        setPause();
      } else {
        setPlay();
      }
    }

    return new ElementBuilder()
      .withClassName('umd-element-video')
      .withStyles({
        element: {
          position: 'relative',
          ...customStyles,
          ...(isScaled && {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }),

          ...(isScaled && {
            [`& video`]: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            },
          }),
        },
      })
      .withChildren(video, button)
      .withEvents({ setPlay, setPause })
      .build();
  })();
