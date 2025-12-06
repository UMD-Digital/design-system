import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { withViewTimelineAnimation } from '@universityofmaryland/web-utilities-library/styles';
import { createTextLockupMedium, createAssetContent } from './_common';
import { type PathwayStandardProps } from './_types';
import { type ElementModel } from '../../_types';

const mediumSize = 800;
const largeSize = 1200;

const setupAnimation = (
  container: HTMLElement,
  textElement: HTMLElement,
  imageElement: HTMLElement | null,
) => {
  const rect = container.getBoundingClientRect();
  const elementTop = rect.top + window.scrollY;
  const viewportBottom = window.scrollY + window.innerHeight;

  if (elementTop < viewportBottom - rect.height * 0.65) {
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

  let isInitialCheck = true;

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
    PathwayStandardProps,
    | 'dateSign'
    | 'isThemeDark'
    | 'image'
    | 'video'
    | 'includesAnimation'
    | 'isImagePositionLeft'
    | 'isImageScaled'
  >,
): ElementModel<HTMLElement> | null => {
  const {
    image,
    video,
    includesAnimation,
    isImagePositionLeft,
    isImageScaled,
  } = props;

  if (!image && !video) return null;

  return new ElementBuilder()
    .withClassName('pathway-image-container')
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

        ...(isImageScaled === false && {
          display: 'flex',
          justifyContent: 'center',
        }),

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          display: 'grid',
          height: '56vw',
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          ...(isImagePositionLeft === false && {
            order: '2',
          }),
        },
      },
    })
    .build();
};

const createTextContent = (
  props: PathwayStandardProps,
): ElementModel<HTMLElement> => {
  const wrapper = new ElementBuilder()
    .withClassName('pathway-text-container-wrapper')
    .withChild(createTextLockupMedium(props))
    .withStyles({
      element: {
        padding: `${token.spacing.md} ${token.spacing.lg}`,

        [`@container (min-width: ${mediumSize}px)`]: {
          padding: `0 ${token.spacing['2xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },

        [`@container (min-width: ${largeSize}px)`]: {
          padding: `0 ${token.spacing['6xl']}`,

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
    .withClassName('pathway-text-container')
    .withChild(wrapper)
    .withStyles({
      element: {
        container: 'inline-size',

        ...(props.includesAnimation && {
          ...withViewTimelineAnimation({
            opacity: '0',
            transform: 'translateY(100px)',
            transition: 'opacity 1s, transform 1s',
            transitionDelay: props.isImagePositionLeft ? '0.5s' : '0s',
          }),
        }),

        ...(props.isThemeDark && {
          backgroundColor: token.color.black,
          color: token.color.white,
        }),

        ...(props.isThemeMaryland && {
          backgroundColor: token.color.red,
          color: token.color.white,
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

const createLock = (props: PathwayStandardProps) => {
  const textContent = createTextContent(props);
  const assetContent = createAssetColumn(props);

  const lockWrapper = new ElementBuilder()
    .withClassName('pathway-container-lock-wrapper')
    .withStyles({
      element: {
        position: 'relative',

        [`@container (min-width: ${mediumSize}px)`]: {
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          alignItems: 'center',
          minHeight: '56vh',
        },
      },
    });

  if (assetContent) {
    lockWrapper.withChild(assetContent);
  }
  lockWrapper.withChild(textContent);

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

export default (props: PathwayStandardProps) => {
  const wrapper = new ElementBuilder()
    .withClassName('pathway-container-wrapper')
    .withChild(createLock(props))
    .build();

  const composite = new ElementBuilder()
    .withClassName('pathway-container')
    .withChild(wrapper)
    .withStyles({
      element: {
        container: 'inline-size',
        position: 'relative',
        overflow: 'hidden',
      },
    })
    .build();

  // Set up animation observer
  const loadAnimation = () => {
    if (props.includesAnimation) {
      const textElement = composite.element.querySelector(
        '.pathway-text-container',
      ) as HTMLElement;
      const imageElement = composite.element.querySelector(
        '.pathway-image-container',
      ) as HTMLElement | null;

      if (textElement) {
        setupAnimation(composite.element, textElement, imageElement);
      }
    }
  };

  return {
    ...composite,
    events: {
      loadAnimation,
    },
  };
};
