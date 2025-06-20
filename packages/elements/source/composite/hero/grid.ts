import * as Styles from '@universityofmaryland/web-styles-library';
import { assets } from 'atomic';
import { ElementModel } from 'model';

interface CornerProps {
  images: Array<HTMLImageElement>;
  isCornerLeft: boolean;
}

interface CenterProps {
  images: Array<HTMLImageElement>;
  video?: HTMLVideoElement | null;
}

interface HeroGridProps {
  corners: Array<CornerProps>;
  center: CenterProps;
}

const keyFrameColumns = `
  @keyframes grid-columns {
    from {
      grid-template-columns: 20% 60% 20%;
    }
    to {
      grid-template-columns: 0 100% 0;
      grid-gap: 0;
    }
  }
`;

const keyFrameRows = `
  @keyframes grid-rows {
    from {
      grid-template-rows: 25vh 1fr 25vh;
    }
    to {
      grid-template-rows: 0 1fr 0;
      grid-gap: 0;
    }
  }
`;

const keyFrameTint = `
  @keyframes tint-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const columnBase = {
  display: 'grid',
  gridAutoFlow: 'row dense',
  gridGap: `${Styles.token.spacing.min}`,
  width: '100%',
  height: '100vh',

  [`@media (${Styles.token.media.queries.tablet.min})`]: {
    gridGap: `${Styles.token.spacing.md}`,
  },

  ['& > *']: {
    overflow: 'hidden',
    position: 'relative',
  },
};

const createImageWrapper = (image: HTMLImageElement) =>
  assets.image.background({
    image,
    isScaled: true,
    isShowCaption: true,
  });

const createVideoWrapper = (video: HTMLVideoElement) =>
  assets.video.observedAutoPlay({
    video,
    isAutoplay: true,
    additionalElementStyles: {
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
    },
  });

const createCorner = ({ images, isCornerLeft }: CornerProps) => {
  const corner = ElementModel.create({
    element: document.createElement('div'),
    className: `hero-grid-corner-${isCornerLeft ? 'left' : 'right'}`,
    elementStyles: {
      element: {
        ...columnBase,
        gridTemplateRows: `1fr 1fr 1fr`,
      },
    },
  });
  images.forEach((image) => {
    const imageElement = createImageWrapper(image);
    corner.element.appendChild(imageElement.element);
    corner.styles += imageElement.styles;
  });
  return corner;
};

const createCenter = ({ images, video }: CenterProps) => {
  const center = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-grid-center',
    elementStyles: {
      element: {
        ...columnBase,
        gridTemplateRows: `25vh 1fr 25vh`,

        '@media (prefers-reduced-motion: no-preference)': {
          '@supports (animation-timeline: view())': {
            animation: 'grid-rows ease-in-out forwards',
            animationTimeline: 'view()',
            animationRangeStart: '110vh',
            animationRangeEnd: '230vh',
          },
        },
      },
    },
  });

  const tint = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-grid-tint',
    elementStyles: {
      element: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9,
        opacity: 0,

        '@media (prefers-reduced-motion: no-preference)': {
          '@supports (animation-timeline: view())': {
            animation: 'tint-fade ease-in-out forwards',
            animationTimeline: 'view()',
            animationRangeStart: '50vh',
            animationRangeEnd: '140vh',
          },
        },
      },
    },
  });

  center.element.appendChild(tint.element);
  center.styles += tint.styles;

  if (video) {
    const videoElement = createVideoWrapper(video);
    const firstImage = createImageWrapper(images[0]);
    const secondImage = createImageWrapper(images[1]);

    center.element.appendChild(firstImage.element);
    center.styles += firstImage.styles;
    center.element.appendChild(videoElement.element);
    center.styles += videoElement.styles;
    center.element.appendChild(secondImage.element);
    center.styles += secondImage.styles;
  } else {
    images.forEach((image) => {
      const imageElement = createImageWrapper(image);
      center.element.appendChild(imageElement.element);
      center.styles += imageElement.styles;
    });
  }

  return center;
};

export default (props: HeroGridProps) => {
  const { corners, center } = props;
  const declaration = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-grid-container',
    elementStyles: {
      element: {
        width: '100%',
        display: 'block',

        '@media (prefers-reduced-motion: no-preference)': {
          '@supports (animation-timeline: view())': {
            height: '300vh',
          },
        },

        ['img, video']: {
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        },
      },
    },
  });

  const grid = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-grid-layout',
    elementStyles: {
      element: {
        gridTemplateColumns: '20% 60% 20%',
        height: '100vh',
        width: '100%',
        display: 'grid',
        gridGap: `${Styles.token.spacing.min}`,
        backgroundColor: 'var(--grayDark)',

        [`@media (${Styles.token.media.queries.tablet.min})`]: {
          gridGap: `${Styles.token.spacing.md}`,
        },

        '@media (prefers-reduced-motion: no-preference)': {
          '@supports (animation-timeline: view())': {
            position: 'sticky',
            top: 0,
            animation: 'grid-columns ease-in-out forwards',
            animationTimeline: 'view()',
            animationRangeStart: '110vh',
            animationRangeEnd: '230vh',
          },
        },
      },
    },
  });

  const leftCorner = corners.find((c) => c.isCornerLeft);
  const rightCorner = corners.find((c) => !c.isCornerLeft);

  if (!leftCorner) {
    console.error('Left corner is required for hero grid');
  }

  if (!center) {
    console.error('Center is required for hero grid');
  }

  if (!rightCorner) {
    console.error('Right corner is required for hero grid');
  }

  if (!rightCorner || !leftCorner || !center) {
    return declaration;
  }

  const leftCornerElement = createCorner(leftCorner);
  const centerElement = createCenter(center);
  const rightCornerElement = createCorner(rightCorner);

  grid.element.appendChild(leftCornerElement.element);
  grid.styles += leftCornerElement.styles;
  grid.element.appendChild(centerElement.element);
  grid.styles += centerElement.styles;
  grid.element.appendChild(rightCornerElement.element);
  grid.styles += rightCornerElement.styles;

  declaration.element.appendChild(grid.element);
  declaration.styles += grid.styles;
  declaration.styles += keyFrameColumns;
  declaration.styles += keyFrameRows;
  declaration.styles += keyFrameTint;

  return declaration;
};
