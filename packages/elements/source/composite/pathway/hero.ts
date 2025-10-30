import * as token from '@universityofmaryland/web-styles-library/token';
import { withViewTimelineAnimation } from '@universityofmaryland/web-utilities-library/styles';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { assets, textLockup } from 'atomic';
import { type ElementVisual } from '../../_types';

interface PathwayHeroProps {
  actions: HTMLElement | null;
  eyebrow: HTMLElement | null;
  headline: HTMLElement | null;
  image: HTMLImageElement | null;
  includesAnimation?: boolean;
  isImagePositionLeft?: boolean;
  isThemeDark?: boolean;
  text: HTMLElement | null;
  video: HTMLVideoElement | null;
}

// Constants
const BREAK_SMALL = 999;
const BREAK_MEDIUM = 1000;
const BREAK_LARGE = 1300;

const ANIMATION_CONFIG = {
  RESIZE: {
    DURATION: '1.5s',
    TRANSFORM: {
      FROM: 'scale(1.1)',
      TO: 'scale(1)',
    },
  },
  SLIDE_UP: {
    DURATION: '1.5s',
    TRANSFORM: {
      FROM: 'translateY(25px)',
      TO: 'translateY(0)',
    },
    OPACITY: {
      FROM: 0.2,
      TO: 1,
    },
  },
} as const;

// Keyframe animations
const keyFramePathwayResize = `
  @keyframes pathway-hero-resize {
    from { transform: ${ANIMATION_CONFIG.RESIZE.TRANSFORM.FROM}; }
    to { transform: ${ANIMATION_CONFIG.RESIZE.TRANSFORM.TO}; }
  }
`;

const keyFramePathwaySlideUp = `
  @keyframes pathway-hero-slide-up {
    from { 
      transform: ${ANIMATION_CONFIG.SLIDE_UP.TRANSFORM.FROM}; 
      opacity: ${ANIMATION_CONFIG.SLIDE_UP.OPACITY.FROM};
    }
    to { 
      transform: ${ANIMATION_CONFIG.SLIDE_UP.TRANSFORM.TO}; 
      opacity: ${ANIMATION_CONFIG.SLIDE_UP.OPACITY.TO};
    }
  }
`;

const createAssetColumn = ({
  image,
  video,
  includesAnimation,
  isImagePositionLeft,
}: Pick<
  PathwayHeroProps,
  'image' | 'video' | 'includesAnimation' | 'isImagePositionLeft'
>) => {
  const children: ElementVisual[] = [];

  if (!image && !video) return;

  if (video) {
    children.push(
      assets.video.observedAutoPlay({
        video,
        isScaled: true,
        additionalElementStyles: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    );
  }

  if (image && !video) {
    children.push(
      assets.image.background({
        element: image,
        isScaled: true,
        isShowCaption: true,
        isGifAllowed: true,
      }),
    );
  }

  return ElementBuilder.create.div({
    className: 'pathway-hero-container-asset-wrapper',
    children,
    elementStyles: {
      element: {
        overflow: 'hidden',
        position: 'relative',

        [`@container (max-width: ${BREAK_SMALL}px)`]: {
          aspectRatio: '16 / 9',
        },

        [`@container (min-width: ${BREAK_MEDIUM}px)`]: {
          width: '50%',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          height: '100%',

          ...(!isImagePositionLeft && {
            left: 'inherit',
            right: 0,
          }),
        },

        [`& img, & video`]: {
          [`@container (min-width: ${BREAK_MEDIUM}px)`]: {
            ...(includesAnimation && {
              ...withViewTimelineAnimation({
                animation: `pathway-hero-resize forwards ${ANIMATION_CONFIG.RESIZE.DURATION}`,
              }),
            }),
          },
        },
      },
    },
  });
};

const createHeadline = (props: Pick<PathwayHeroProps, 'headline'>) => {
  const { headline } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: '80px',
      }),
    },
  };

  const elementStyles = {
    element: {
      color: token.color.black,
      margin: '0 auto',
      textTransform: 'uppercase',
      marginTop: `${token.spacing.sm}`,
      ...desktopStyles,
    },
    siblingAfter: {
      marginTop: `${token.spacing.md}`,
    },
  };

  return ElementBuilder.styled.headline.campaignExtraLarge({
    element: headline,
    elementStyles,
  });
};

const createTextColumn = (
  props: Pick<
    PathwayHeroProps,
    'actions' | 'eyebrow' | 'headline' | 'isThemeDark' | 'text'
  >,
) => {
  const { headline, eyebrow, text, ...rest } = props;

  return textLockup.large({
    ...rest,
    ribbon: eyebrow,
    textLargest: text,
    headlineComposite: createHeadline({ headline }),
    additionalStyles: {
      maxWidth: '720px',
    },
  });
};

const createTextWrapper = (props: PathwayHeroProps) =>
  ElementBuilder.create.div({
    className: 'pathway-hero-container-lock-wrapper',
    children: [createTextColumn(props)],
    elementStyles: {
      element: {
        width: '100%',

        [`@container  (max-width: ${BREAK_SMALL}px)`]: {
          padding: `${token.spacing.md} 0`,
        },

        [`@container  (min-width: ${BREAK_MEDIUM}px)`]: {
          padding: `${token.spacing['4xl']} 0`,

          ...(props.isImagePositionLeft && {
            paddingRight: 0,
          }),

          ...(!props.isImagePositionLeft && {
            paddingLeft: 0,
          }),

          ...(props.includesAnimation && {
            ...withViewTimelineAnimation({
              animation: `pathway-hero-slide-up forwards ${ANIMATION_CONFIG.SLIDE_UP.DURATION}`,
            }),
          }),
        },

        [`@container  (min-width: ${BREAK_LARGE}px)`]: {
          padding: `${token.spacing['8xl']} 0`,
        },
      },
    },
  });

const createLockColumn = (props: PathwayHeroProps) =>
  ElementBuilder.styled.layout.spaceHorizontalLarger({
    element: document.createElement('div'),
    children: [createTextWrapper(props)],
    elementStyles: {
      element: {
        position: 'relative',

        [`@container (min-width: ${BREAK_MEDIUM}px)`]: {
          display: 'flex',
          alignItems: 'center',
          minHeight: '720px',

          ...(props.isImagePositionLeft && {
            paddingRight: token.spacing['2xl'],
          }),

          ...(!props.isImagePositionLeft && {
            paddingLeft: token.spacing['2xl'],
            order: 1,
          }),
        },

        [`@container (min-width: ${BREAK_LARGE}px)`]: {
          ...(!props.isImagePositionLeft && {
            paddingRight: token.spacing['4xl'],
          }),

          ...(props.isImagePositionLeft && {
            paddingLeft: token.spacing['4xl'],
          }),
        },
      },
    },
  });

const createWrapper = (props: PathwayHeroProps) => {
  const { isImagePositionLeft = false } = props;
  const imageColumn = createAssetColumn(props);
  const children: ElementVisual[] = [];

  if (imageColumn) {
    children.push(imageColumn);
  }

  children.push(createLockColumn(props));

  return ElementBuilder.create.div({
    className: 'pathway-hero-container-wrapper',
    elementStyles: {
      element: {
        position: 'relative',

        ...(isImagePositionLeft && {
          [`@container (min-width: ${BREAK_MEDIUM}px)`]: {
            paddingLeft: '50%',
          },
        }),

        ...(!isImagePositionLeft && {
          [`@container (min-width: ${BREAK_MEDIUM}px)`]: {
            paddingRight: '50%',
          },
        }),
      },
    },
    children,
  });
};

export default (props: PathwayHeroProps) => {
  const composite = ElementBuilder.create.div({
    className: 'pathway-hero-container',
    children: [createWrapper(props)],
    elementStyles: {
      element: {
        containerType: 'inline-size',
        position: 'relative',
      },
    },
  });

  composite.styles += keyFramePathwayResize;
  composite.styles += keyFramePathwaySlideUp;

  return composite;
};
