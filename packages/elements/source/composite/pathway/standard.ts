import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { theme } from 'utilities';
import { createTextLockupMedium, createAssetContent } from './_common';
import { type ElementVisual } from '../../_types';
import { type PathwayStandardProps } from './_types';

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
): ElementVisual | null => {
  const {
    image,
    video,
    includesAnimation,
    isImagePositionLeft,
    isImageScaled,
  } = props;

  if (!image && !video) return null;

  return ElementModel.createDiv({
    className: 'pathway-image-container',
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
    },
  });
};

const createTextContent = (props: PathwayStandardProps): ElementVisual => {
  const wrapper = ElementModel.createDiv({
    className: 'pathway-text-container-wrapper',
    children: [createTextLockupMedium(props)],
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.md} ${Styles.token.spacing.lg}`,

        [`@container (min-width: ${mediumSize}px)`]: {
          padding: `0 ${Styles.token.spacing['2xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },

        [`@container (min-width: ${largeSize}px)`]: {
          padding: `0 ${Styles.token.spacing['6xl']}`,

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
    className: 'pathway-text-container',
    children: [wrapper],
    elementStyles: {
      element: {
        container: 'inline-size',

        ...(props.includesAnimation && {
          ...theme.media.withViewTimelineAnimation({
            opacity: '0',
            transform: 'translateY(100px)',
            transition: 'opacity 1s, transform 1s',
            transitionDelay: props.isImagePositionLeft ? '0.5s' : '0s',
          }),
        }),

        ...(props.isThemeDark && {
          backgroundColor: Styles.token.color.black,
          color: Styles.token.color.white,
        }),

        ...(props.isThemeMaryland && {
          backgroundColor: Styles.token.color.red,
          color: Styles.token.color.white,
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

const createLock = (props: PathwayStandardProps) => {
  const textContent = createTextContent(props);
  const assetContent = createAssetColumn(props);
  const children: ElementVisual[] = [];

  if (assetContent) {
    children.push(assetContent);
  }
  children.push(textContent);

  const lockWrapper = ElementModel.createDiv({
    className: 'pathway-container-lock-wrapper',
    children,
    elementStyles: {
      element: {
        position: 'relative',

        [`@container (min-width: ${mediumSize}px)`]: {
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          alignItems: 'center',
          minHeight: '48vh',
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

export default (props: PathwayStandardProps) => {
  const composite = ElementModel.createDiv({
    className: 'pathway-container',
    children: [
      ElementModel.createDiv({
        className: 'pathway-container-wrapper',
        children: [createLock(props)],
      }),
    ],
    elementStyles: {
      element: {
        container: 'inline-size',
        position: 'relative',
        overflow: 'hidden',
      },
    },
  });

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
