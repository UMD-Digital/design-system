import { AssetIcon } from 'utilities';

const ELEMENT_BUTTON = 'button-video-state';

// prettier-ignore
const STYLES_BUTTON_VIDEO_STATE = `
  .${ELEMENT_BUTTON} {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 44px;
    height: 44px;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .${ELEMENT_BUTTON} svg {
    fill: white;
    width: 20px;
  }
`;

const CreateButtonVideoState = ({ video }: { video: HTMLVideoElement }) =>
  (() => {
    const button = document.createElement('button');
    const setButtonPlay = () => {
      button.setAttribute('aria-label', 'Pause');
      button.innerHTML = AssetIcon.PAUSE;
      video.play();
    };
    const setButtonPause = () => {
      button.setAttribute('aria-label', 'Play');
      button.innerHTML = AssetIcon.PLAY;
      video.pause();
    };

    button.setAttribute('type', 'button');
    button.classList.add(ELEMENT_BUTTON);
    button.addEventListener('click', () => {
      video.paused ? setButtonPlay() : setButtonPause();
    });

    return {
      elements: {
        button,
      },
      events: {
        setButtonPlay,
      },
    };
  })();

export default {
  CreateElement: CreateButtonVideoState,
  Styles: STYLES_BUTTON_VIDEO_STATE,
};
