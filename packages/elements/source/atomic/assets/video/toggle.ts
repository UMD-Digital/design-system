import { ElementModel } from 'model';
import * as Utility from 'utilities';

interface VideoProps {
  video: HTMLVideoElement;
  additionalElementStyles?: Record<string, any>;
  callback?: (isPlaying: boolean) => void;
}

export default (props: VideoProps) =>
  (() => {
    const { video, additionalElementStyles, callback } = props;
    const composite = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-element-video',
      elementStyles: {
        element: {
          position: 'relative',
          ...additionalElementStyles,
        },
      },
    });
    const button = ElementModel.buttons.videoState({
      element: document.createElement('button'),
    });

    const setPlay = () => {
      button.element.setAttribute('aria-label', 'Pause');
      button.element.innerHTML = Utility.asset.icon.PAUSE;
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
      button.element.innerHTML = Utility.asset.icon.PLAY;
      video.pause();
    };

    // Load styles and attributes

    button.element.setAttribute('aria-label', 'Play');
    button.element.innerHTML = Utility.asset.icon.PLAY;
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
