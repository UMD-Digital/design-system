import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';

interface HeadlineProps {
  headline?: HTMLElement | null;
}

interface TextProps extends HeadlineProps {
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
}

interface CornerProps {
  images: Array<HTMLImageElement>;
  isCornerLeft: boolean;
}

interface CenterProps {
  images: Array<HTMLImageElement>;
  video?: HTMLVideoElement | null;
}

interface HeroGridProps extends TextProps {
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

const createHeadline = (props: HeadlineProps) => {
  const { headline } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  const desktopStyles = {
    ...(isOverwriteHeadline && { fontSize: '80px' }),
  };

  const headlineElement = ElementModel.headline.campaignExtraLarge({
    element: headline,
    elementStyles: {
      element: {
        textTransform: 'uppercase',
        textWrap: 'pretty',
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
    isThemeDark: true,
  });

  return headlineElement;
};

const createTextContainer = (props: TextProps) => {
  const { actions, headline, text } = props;

  if (!text && !actions && !headline) {
    return null;
  }

  const textContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-expand-text-container',
    elementStyles: {
      element: {
        position: 'relative',
        height: '100%',
        zIndex: 9999,
        textAlign: 'center',
        padding: `${Styles.token.spacing.md} 0`,

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          padding: `${Styles.token.spacing['3xl']} 0`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },

        [`@container (${Styles.token.media.queries.highDef.min})`]: {
          padding: `${Styles.token.spacing['6xl']} 0`,
        },

        '@media (prefers-reduced-motion: no-preference)': {
          '@supports (animation-timeline: view())': {
            paddingTop: '140vh',
          },
        },
      },
    },
  });

  const lock = ElementModel.layout.spaceHorizontalSmallest({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
    },
  });

  const textLockupElement = textLockup.large({
    headline: createHeadline(props),
    textLargest: text,
    actions,
    isThemeDark: true,
  });

  lock.element.appendChild(textLockupElement.element);
  lock.styles += textLockupElement.styles;

  textContainer.element.appendChild(lock.element);
  textContainer.styles += lock.styles;

  return textContainer;
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

  const text = createTextContainer(props);

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

  if (text) {
    declaration.element.appendChild(text.element);
    declaration.styles += text.styles;
  }

  declaration.styles += keyFrameColumns;
  declaration.styles += keyFrameRows;
  declaration.styles += keyFrameTint;

  return declaration;
};
