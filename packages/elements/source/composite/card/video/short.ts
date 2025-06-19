import { ElementModel } from 'model';

interface CardVideoShortProps {
  video: HTMLVideoElement;
}

export default (props: CardVideoShortProps) => {
  const { video } = props;
  const composite = ElementModel.create({
    element: document.createElement('div'),
    className: 'card-video-short-container',
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
        aspectRatio: '9/16',

        [`& video`]: {
          height: '100%',
          width: '100%',
          objectFit: 'cover',

          ['&:hover']: {
            cursor: 'pointer',
          },
        },
      },
    },
  });

  const setPlay = () => {
    if (video.paused) {
      video.muted = true;
      video.play();
    }
  };

  const setPause = () => {
    if (!video.paused) {
      video.pause();
    }
  };

  video.setAttribute('controls', 'true');
  video.setAttribute(
    'controlsList',
    'nodownload nofullscreen noremoteplayback noplaybackrate"',
  );
  video.setAttribute('preload', 'true');
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  video.addEventListener('mouseover', setPlay);
  video.addEventListener('focus', setPlay);
  video.addEventListener('mouseleave', setPause);
  video.addEventListener('blur', setPause);

  composite.element.appendChild(video);

  return composite;
};
