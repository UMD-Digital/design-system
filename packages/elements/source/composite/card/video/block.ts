import { assets } from 'atomic';

interface CardVideoShortProps {
  video: HTMLVideoElement;
  isAutoplay?: boolean;
}

export default (props: CardVideoShortProps) =>
  (() =>
    assets.video.observedAutoPlay({
      ...props,
      additionalElementStyles: {
        width: '100%',
        aspectRatio: '1 / 1',
        position: 'relative',
        overflow: 'hidden',

        [`& video`]: {
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        },
      },
    }))();
