import { ElementModel } from 'model';
import * as Utility from 'utilities';
import { videoState } from '../../buttons';

interface VideoProps {
  video: HTMLVideoElement;
}

export default (props: VideoProps) => {
  const { video } = props;
  const buttonState = videoState({ video });
  const composite = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-element-video',
    elementStyles: {
      element: {},
    },
  });

  composite.element.appendChild(video);
  composite.element.appendChild(buttonState.element);
  composite.styles += buttonState.styles;

  if (!Utility.accessibility.isPrefferdReducedMotion()) {
    buttonState.events.setButtonPlay();
  } else {
    buttonState.events.setButtonPause();
    video.pause();
  }

  return composite;
};
