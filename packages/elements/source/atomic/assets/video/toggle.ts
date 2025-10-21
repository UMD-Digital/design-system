import {
  pause as iconPause,
  play as iconPlay,
} from '@universityofmaryland/web-icons-library/controls';
import ElementBuilder from '@universityofmaryland/web-builder-library';

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
    const composite = ElementBuilder.create.element({
      element: document.createElement('div'),
      className: 'umd-element-video',
      elementStyles: {
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
      },
    });
    const button = ElementBuilder.styled.buttons.videoState({
      element: document.createElement('button'),
    });

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

    // Load styles and attributes

    button.element.setAttribute('aria-label', 'Play');
    button.element.innerHTML = iconPlay;
    button.element.setAttribute('type', 'button');
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

    composite.element.appendChild(video);
    composite.element.appendChild(button.element);
    composite.styles += button.styles;

    return {
      ...composite,
      events: {
        setPlay,
        setPause,
      },
    };
  })();
