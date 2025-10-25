import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import {
  pause as iconPause,
  play as iconPlay,
} from '@universityofmaryland/web-icons-library/controls';

interface VideoProps {
  video: HTMLVideoElement;
  isScaled?: boolean;
  additionalElementStyles?: Record<string, any>;
  callback?: (isPlaying: boolean) => void;
}

export default (props: VideoProps) =>
  (() => {
    const {
      video,
      additionalElementStyles,
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

    if (
      video.getAttribute('autoplay') === '' ||
      video.getAttribute('autoplay') === 'true'
    ) {
      setPlay();
    }

    return new ElementBuilder()
      .withClassName('umd-element-video')
      .withStyles({
        element: {
          position: 'relative',
          ...additionalElementStyles,
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
