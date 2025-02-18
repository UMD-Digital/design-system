import * as Utility from 'utilities';
import { ElementModel } from 'model';

export default ({ video }: { video: HTMLVideoElement }) =>
  (() => {
    const button = document.createElement('button');

    const setButtonPlay = () => {
      button.setAttribute('aria-label', 'Pause');
      button.innerHTML = Utility.asset.icon.PAUSE;
      video.play();
    };
    const setButtonPause = () => {
      button.setAttribute('aria-label', 'Play');
      button.innerHTML = Utility.asset.icon.PLAY;
      video.pause();
    };

    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      video.paused ? setButtonPlay() : setButtonPause();
    });

    const element = ElementModel.buttons.videoState({
      element: button,
    });

    return {
      element: element.element,
      styles: element.styles,
      events: {
        setButtonPlay,
        setButtonPause,
      },
    };
  })();
