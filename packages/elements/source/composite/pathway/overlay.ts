import * as Styles from '@universityofmaryland/web-styles-library';
import * as Atomic from 'atomic';
import { ElementModel } from 'model';
import { theme } from 'utilities';
import { createTextLockupMedium, createAssetContent } from './_common';
import { type PathwayOverlayProps } from './_types';
import { type ElementVisual } from '../../_types';

const REF_TEXT_ELEMENT = 'pathway-text-container';
const REF_IMAGE_ELEMENT = 'pathway-image-container';

const REF_KEY_FRAME_BACKGROUND_LEFT = 'pathway-overlay-background-left';
const REF_KEY_FRAME_BACKGROUND_RIGHT = 'pathway-overlay-background-right';

const mediumSize = 800;
const largeSize = 1200;

const keyFrameBackgroundLeft = `
  @keyframes ${REF_KEY_FRAME_BACKGROUND_LEFT} {
    from {
      transform: translateX(30vw);
   }
    to {
      transform: translateX(0);
    }
  }
`;

const keyFrameBackgroundRight = `
  @keyframes ${REF_KEY_FRAME_BACKGROUND_RIGHT} {
    from {
      transform: translateX(-30vw);
   }
    to {
      transform: translateX(0);
    }
  }
`;

const setupAnimation = (container: HTMLElement) => {
  const textElement = container.querySelector(
    `.${REF_TEXT_ELEMENT}`,
  ) as HTMLElement;
  const imageElement = container.querySelector(
    `.${REF_IMAGE_ELEMENT}`,
  ) as HTMLElement | null;

  if (!textElement) return;

  const rect = container.getBoundingClientRect();
  const elementTop = rect.top + window.scrollY;
  const viewportBottom = window.scrollY + window.innerHeight;
  const hasAnimationOccured = elementTop < viewportBottom - rect.height * 0.65;
  let isInitialCheck = true;

  if (hasAnimationOccured) {
    textElement.style.transition = 'opacity 0s, transform 0s';
    textElement.style.opacity = '1';
    textElement.style.transform = 'translateY(0)';

    if (imageElement) {
      imageElement.style.transition = 'opacity 0s, transform 0s';
      imageElement.style.opacity = '1';
      imageElement.style.transform = 'translateY(0)';
    }
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (isInitialCheck && entry.intersectionRatio >= 0.35) {
            textElement.style.transition = 'opacity 0s, transform 0s';
          }

          textElement.style.opacity = '1';
          textElement.style.transform = 'translateY(0)';

          if (imageElement) {
            if (isInitialCheck && entry.intersectionRatio >= 0.35) {
              imageElement.style.transition = 'opacity 0s, transform 0s';
            }
            imageElement.style.opacity = '1';
            imageElement.style.transform = 'translateY(0)';
          }

          observer.unobserve(entry.target);
        }

        isInitialCheck = false;
      });
    },
    {
      rootMargin: '0px',
      threshold: [0.35],
    },
  );

  observer.observe(container);
};

const createAssetColumn = (
  props: Pick<
    PathwayOverlayProps,
    | 'dateSign'
    | 'isThemeDark'
    | 'image'
    | 'video'
    | 'includesAnimation'
    | 'isImagePositionLeft'
    | 'isImageScaled'
  >,
): ElementVisual | null => {
  const { image, video, includesAnimation, isImagePositionLeft } = props;

  if (!image && !video) return null;

  return ElementModel.createDiv({
    className: REF_IMAGE_ELEMENT,
    children: [createAssetContent(props)],
    elementStyles: {
      element: {
        position: 'relative',
        height: '100%',

        ...(includesAnimation && {
          ...theme.media.withViewTimelineAnimation({
            opacity: '0',
            transform: 'translateY(100px)',
            transition: 'opacity 1s, transform 1s',
            transitionDelay: isImagePositionLeft ? '0s' : '0.5s',
          }),
        }),

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          display: 'grid',
          minHeight: '56vw',
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          ...(isImagePositionLeft === false && {
            order: '2',
          }),
        },

        [`@container (min-width: ${largeSize}px)`]: {
          [`& img`]: {
            minHeight: '656px',
          },
        },
      },
    },
  });
};

const createTextContent = (props: PathwayOverlayProps): ElementVisual => {
  const wrapper = ElementModel.createDiv({
    className: 'pathway-text-container-wrapper',
    children: [createTextLockupMedium(props)],
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.md} 0`,

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          ...Styles.layout.space.horizontal.larger,
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          padding: `${Styles.token.spacing['4xl']} ${Styles.token.spacing['2xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },

        [`@container (min-width: ${largeSize}px)`]: {
          padding: `${Styles.token.spacing['8xl']} ${Styles.token.spacing['6xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },
      },
    },
  });

  const container = ElementModel.createDiv({
    className: REF_TEXT_ELEMENT,
    children: [wrapper],
    elementStyles: {
      element: {
        zIndex: '99',

        ...(props.includesAnimation && {
          ...theme.media.withViewTimelineAnimation({
            opacity: '0',
            transform: 'translateY(100px)',
            transition: 'opacity 1s, transform 1s',
            transitionDelay: props.isImagePositionLeft ? '0.5s' : '0s',
          }),
        }),

        [`@container (min-width: ${mediumSize}px)`]: {
          ...(props.isImagePositionLeft === false && {
            order: '1',
          }),
        },
      },
    },
  });

  return container;
};

const createBackground = (props: PathwayOverlayProps): ElementVisual => {
  const getBackgroundColor = () => {
    if (props.isThemeDark) return Styles.token.color.black;
    if (props.isThemeLight) return Styles.token.color.gray.lighter;
    if (props.isThemeMaryland) return Styles.token.color.red;
    return Styles.token.color.white;
  };

  return ElementModel.createDiv({
    className: 'pathway-overlay-container-background',
    elementStyles: {
      element: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        width: '100%',
        backgroundColor: getBackgroundColor(),

        [`@container (min-width: ${mediumSize}px)`]: {
          right: '-1000px',
          width: 'calc(75% + 1000px)',

          ...(props.includesAnimation && {
            animationTimeline: 'view()',
            animationRangeStart: 'entry',
            animationRangeEnd: 'contain',

            ...theme.media.withViewTimelineAnimation({
              ...(props.isImagePositionLeft === true && {
                animationName: REF_KEY_FRAME_BACKGROUND_LEFT,
              }),

              ...(props.isImagePositionLeft === false && {
                animationName: REF_KEY_FRAME_BACKGROUND_RIGHT,
                left: '-1000px',
                right: 'auto',
              }),
            }),
          }),
        },
      },
    },
  });
};

const createLock = (props: PathwayOverlayProps) => {
  const children = [
    createBackground(props),
    createAssetColumn(props),
    createTextContent(props),
  ].filter((item): item is ElementVisual => item !== null);
  const isThemeApplied =
    props.isThemeDark || props.isThemeLight || props.isThemeMaryland;

  const lockWrapper = ElementModel.createDiv({
    className: 'pathway-overlay-container-lock-wrapper',
    children,
    elementStyles: {
      element: {
        position: 'relative',

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          padding: '0',
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',

          ...(isThemeApplied && {
            padding: `${Styles.token.spacing['6xl']} 0`,
          }),
        },
      },
    },
  });

  return ElementModel.layout.spaceHorizontalLarger({
    element: document.createElement('div'),
    children: [lockWrapper],
    elementStyles: {
      element: {
        [`@container (max-width: ${mediumSize - 1}px)`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  });
};

export default (props: PathwayOverlayProps) => {
  const composite = ElementModel.createDiv({
    className: 'pathway-overlay-container',
    children: [
      ElementModel.createDiv({
        className: 'pathway-overlay-container-wrapper',
        children: [createLock(props)],
      }),
    ],
    elementStyles: {
      element: {
        container: 'inline-size',
        position: 'relative',
        overflow: 'clip',
      },
    },
  });

  const loadAnimation = () => {
    if (props.includesAnimation) {
      setupAnimation(composite.element);
    }
  };

  composite.styles += keyFrameBackgroundLeft;
  composite.styles += keyFrameBackgroundRight;

  return {
    ...composite,
    events: {
      loadAnimation,
    },
  };
};
