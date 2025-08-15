import * as Styles from '@universityofmaryland/web-styles-library';
import * as Atomic from 'atomic';
import { ElementModel } from 'model';
import { theme } from 'utilities';
import { type ElementVisual } from '_types';

interface PathwayStandardProps {
  actions?: HTMLElement | null;
  dateSign?: ElementVisual;
  eventDetails?: ElementVisual;
  eyebrow?: HTMLElement | null;
  headline?: HTMLElement | null;
  image?: HTMLImageElement | null;
  includesAnimation?: boolean;
  isImagePositionLeft?: boolean;
  isImageScaled?: boolean;
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
  stats?: HTMLElement | null;
  text?: HTMLElement | null;
  video?: HTMLVideoElement | null;
}

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

const createAssetContent = ({
  image,
  video,
  dateSign,
  isImageScaled,
}: Pick<
  PathwayStandardProps,
  'dateSign' | 'isThemeDark' | 'image' | 'video' | 'isImageScaled'
>): ElementVisual => {
  const children: ElementVisual[] = [];

  if (video) {
    children.push(
      Atomic.assets.video.observedAutoPlay({
        video,
        isScaled: isImageScaled,
      }),
    );
  }

  if (!video && image) {
    children.push(
      Atomic.assets.image.background({
        image,
        isScaled: isImageScaled,
        isShowCaption: true,
        dateSign,
        customStyles: {
          [' > * ']: {},
        },
      }),
    );
  }

  return ElementModel.createDiv({
    className: 'pathway-image-container-wrapper',
    children,
    elementStyles: {
      element: {
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      },
    },
  });
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
          minHeight: '56vw',
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

const createStat = ({ stats }: Pick<PathwayStandardProps, 'stats'>) => {
  if (!stats) return null;

  const statWrapper = ElementModel.createDiv({
    className: 'text-lockup-medium-stats',
    elementStyles: {
      element: {
        marginTop: Styles.token.spacing.lg,

        [`&:has(> *:nth-child(2))`]: {
          display: `grid`,
          gridGap: `${Styles.token.spacing.md}`,
        },

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          marginTop: Styles.token.spacing.lg,
          paddingTop: Styles.token.spacing.md,
          borderTop: `1px solid ${Styles.token.color.gray.light}`,
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          marginTop: Styles.token.spacing['2xl'],

          [`&:has(> *:nth-child(2))`]: {
            gridGap: `${Styles.token.spacing.lg}`,
            gridTemplateColumns: `repeat(2, 1fr)`,
          },
        },
      },
    },
  });

  statWrapper.element.innerHTML = stats.innerHTML;

  return statWrapper;
};

const createHeadline = ({
  headline,
  isThemeDark,
}: Pick<PathwayStandardProps, 'headline' | 'isThemeDark'>) => {
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${Styles.token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: '40px',
      }),
    },
  };

  return ElementModel.headline.sansLargest({
    element: headline,
    isThemeDark,
    elementStyles: {
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
        textWrap: 'balance',
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
  });
};

const createTextContent = (props: PathwayStandardProps): ElementVisual => {
  const children: ElementVisual[] = [];

  children.push(
    Atomic.textLockup.medium({
      actions: props.actions,
      eventDetails: props.eventDetails,
      compositeHeadline: createHeadline(props),
      isThemeDark: props.isThemeDark,
      ribbon: props.eyebrow,
      compositeStats: createStat(props),
      text: props.text,
    }),
  );

  const wrapper = ElementModel.createDiv({
    className: 'pathway-text-container-wrapper',
    children,
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
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
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
