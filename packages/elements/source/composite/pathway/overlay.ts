import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import * as Styles from '@universityofmaryland/web-styles-library';
import { withViewTimelineAnimation } from '@universityofmaryland/web-utilities-library/styles';
import { createTextLockupMedium, createAssetContent } from './_common';
import { type PathwayOverlayProps } from './_types';
import { type ElementModel } from '../../_types';

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
): ElementModel<HTMLElement> | null => {
  const { image, video, includesAnimation, isImagePositionLeft } = props;

  if (!image && !video) return null;

  return new ElementBuilder()
    .withClassName(REF_IMAGE_ELEMENT)
    .withChild(createAssetContent(props))
    .withStyles({
      element: {
        position: 'relative',
        height: '100%',

        ...(includesAnimation && {
          ...withViewTimelineAnimation({
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
    })
    .build();
};

const createTextContent = (
  props: PathwayOverlayProps,
): ElementModel<HTMLElement> => {
  const wrapper = new ElementBuilder()
    .withClassName('pathway-text-container-wrapper')
    .withChild(createTextLockupMedium(props))
    .withStyles({
      element: {
        padding: `${token.spacing.md} 0`,

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          ...layout.space.horizontal.larger,
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          padding: `${token.spacing['4xl']} ${token.spacing['2xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },

        [`@container (min-width: ${largeSize}px)`]: {
          padding: `${token.spacing['8xl']} ${token.spacing['6xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },
      },
    })
    .build();

  const container = new ElementBuilder()
    .withClassName(REF_TEXT_ELEMENT)
    .withChild(wrapper)
    .withStyles({
      element: {
        zIndex: '99',

        ...(props.includesAnimation && {
          ...withViewTimelineAnimation({
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
    })
    .build();

  return container;
};

const createBackground = (
  props: PathwayOverlayProps,
): ElementModel<HTMLElement> => {
  const getBackgroundColor = () => {
    if (props.isThemeDark) return token.color.black;
    if (props.isThemeLight) return token.color.gray.lighter;
    if (props.isThemeMaryland) return token.color.red;
    return token.color.white;
  };

  return new ElementBuilder()
    .withClassName('pathway-overlay-container-background')
    .withStyles({
      element: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: `-${token.spacing.xl}`,
        width: `calc(100% + ${token.spacing['6xl']})`,
        backgroundColor: getBackgroundColor(),

        [`@container (min-width: ${mediumSize}px)`]: {
          ...(props.includesAnimation && {
            animationTimeline: 'view()',
            animationRangeStart: 'entry',
            animationRangeEnd: 'contain',

            ...withViewTimelineAnimation({
              width: 'calc(75% + 1000px)',

              ...(props.isImagePositionLeft === true && {
                right: '-1000px',
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
    })
    .build();
};

const createLock = (props: PathwayOverlayProps) => {
  const isThemeApplied =
    props.isThemeDark || props.isThemeLight || props.isThemeMaryland;

  const lockWrapper = new ElementBuilder()
    .withClassName('pathway-overlay-container-lock-wrapper')
    .withStyles({
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
            padding: `${token.spacing['6xl']} 0`,
          }),
        },
      },
    });

  lockWrapper.withChild(createBackground(props));

  const assetColumn = createAssetColumn(props);
  if (assetColumn) {
    lockWrapper.withChild(assetColumn);
  }

  lockWrapper.withChild(createTextContent(props));

  const lockWrapperBuilt = lockWrapper.build();

  return new ElementBuilder()
    .styled(Styles.layout.space.horizontal.larger)
    .withChild(lockWrapperBuilt)
    .withStyles({
      element: {
        [`@container (max-width: ${mediumSize - 1}px)`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    })
    .build();
};

export default (props: PathwayOverlayProps) => {
  const wrapper = new ElementBuilder()
    .withClassName('pathway-overlay-container-wrapper')
    .withChild(createLock(props))
    .build();

  const composite = new ElementBuilder()
    .withClassName('pathway-overlay-container')
    .withChild(wrapper)
    .withStyles({
      element: {
        container: 'inline-size',
        position: 'relative',
        overflow: 'clip',
      },
    })
    .build();

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
