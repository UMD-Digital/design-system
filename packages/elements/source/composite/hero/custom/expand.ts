import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import { ElementModel } from 'model';
import { type ElementVisual } from '_types';

interface ContentProps {
  eyebrow?: HTMLElement | null;
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  additional?: HTMLSlotElement | null;
}

interface AssetProps {
  image?: HTMLImageElement;
  video?: HTMLVideoElement;
}

interface HeroExpandProps extends ContentProps, AssetProps {}

const CLASS_NAMES = {
  CONTAINER: 'umd-hero-expand',
  STICKY: 'hero-expand-sticky',
  IMAGE_CONTAINER: 'hero-expand-image-container',
  IMAGE_SIZE: 'hero-expand-image-size',
  IMAGE_OVERLAY: 'hero-expand-image-overlay',
  TEXT_CONTAINER: 'hero-expand-text-container',
  TEXT_TOP: 'hero-expand-text-top-container',
  TEXT_BOTTOM: 'hero-expand-text-bottom-container',
  TEXT_ACTIONS: 'hero-expand-text-actions',
  TEXT_ADDITIONAL: 'hero-expand-text-additional',
} as const;

const ANIMATION_CONFIG = {
  IMAGE_OVERLAY: {
    NAME: 'img-overlay',
    RANGE: {
      START: '70vh',
      END: '100vh',
    },
  },
  IMAGE_SIZE: {
    NAME: 'img-size',
    INITIAL_HEIGHT: '50vh',
    FINAL_HEIGHT: '100vh',
    RANGE: {
      START: '40vh',
      END: '100vh',
      END_TABLET: '200vh',
    },
  },
  COMPONENT_SIZE: {
    NAME: 'component-size',
    NAME_TABLET: 'component-size-tablet',
    INITIAL_WIDTH: '10%',
    INITIAL_WIDTH_TABLET: '60%',
    FINAL_WIDTH: '100vw',
    RANGE: {
      START: '40vh',
      END: '100vh',
      START_TABLET: '60vh',
      END_TABLET: '200vh',
    },
  },
} as const;

const THEME_VALUES = {
  HEADLINE_CHAR_THRESHOLD: 30,
  HEADLINE_LARGE_SIZE: '96px',
  HEADLINE_FONT_WEIGHT: 800,
  OVERLAY_BACKGROUND: 'rgba(0,0,0,0.65)',
  STICKY_HEIGHT: '100vh',
  TABLET_HEIGHT: '200vh',
} as const;

const keyFrameImgOverlay = `
  @keyframes ${ANIMATION_CONFIG.IMAGE_OVERLAY.NAME} {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const keyFrameImgSize = `
  @keyframes ${ANIMATION_CONFIG.IMAGE_SIZE.NAME} {
    from { height: ${ANIMATION_CONFIG.IMAGE_SIZE.INITIAL_HEIGHT}; }
    to { height: ${ANIMATION_CONFIG.IMAGE_SIZE.FINAL_HEIGHT}; }
  }
`;

const keyFrameComponentSize = `
  @keyframes ${ANIMATION_CONFIG.COMPONENT_SIZE.NAME} {
    from { width: ${ANIMATION_CONFIG.COMPONENT_SIZE.INITIAL_WIDTH}; }
    to { width: ${ANIMATION_CONFIG.COMPONENT_SIZE.FINAL_WIDTH}; }
  }

  @keyframes ${ANIMATION_CONFIG.COMPONENT_SIZE.NAME_TABLET} {
    from { width: ${ANIMATION_CONFIG.COMPONENT_SIZE.INITIAL_WIDTH_TABLET}; }
    to { width: ${ANIMATION_CONFIG.COMPONENT_SIZE.FINAL_WIDTH}; }
  }
`;

const createImageOverlay = () => {
  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.IMAGE_OVERLAY,
    elementStyles: {
      element: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: THEME_VALUES.OVERLAY_BACKGROUND,
        opacity: 1,

        ...Utils.styles.media.withViewTimelineAnimation({
          opacity: 0,
          animation: `${ANIMATION_CONFIG.IMAGE_OVERLAY.NAME} forwards`,
          animationTimeline: 'view()',
          animationRangeStart: ANIMATION_CONFIG.IMAGE_OVERLAY.RANGE.START,
          animationRangeEnd: ANIMATION_CONFIG.IMAGE_OVERLAY.RANGE.END,
        }),
      },
    },
  });
};

const buildAssetElement = ({
  image,
  video,
}: AssetProps): HTMLElement | null => {
  if (video) return video;
  if (image) return image;
  return null;
};

const createImageSize = (props: AssetProps) => {
  const overlay = createImageOverlay();
  const asset = buildAssetElement(props);

  const container = ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.IMAGE_SIZE,
    children: [overlay],
    elementStyles: {
      element: {
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        width: '100%',

        ...Utils.styles.media.withViewTimelineAnimation({
          height: ANIMATION_CONFIG.IMAGE_SIZE.INITIAL_HEIGHT,
          animation: `${ANIMATION_CONFIG.IMAGE_SIZE.NAME} ease-in-out forwards`,
          animationTimeline: 'view()',
          animationRangeStart: ANIMATION_CONFIG.IMAGE_SIZE.RANGE.START,
          animationRangeEnd: ANIMATION_CONFIG.IMAGE_SIZE.RANGE.END,

          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            animationRangeEnd: ANIMATION_CONFIG.IMAGE_SIZE.RANGE.END_TABLET,
          },
        }),
      },
    },
  });

  if (asset) {
    container.element.appendChild(asset);
  }

  return container;
};

const createAssetContainer = (props: AssetProps) =>
  ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.IMAGE_CONTAINER,
    children: [createImageSize(props)],
    elementStyles: {
      element: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        height: '100%',
        overflow: 'clip',
        display: 'flex',
        alignItems: 'center',

        ...Utils.styles.media.withViewTimelineAnimation({
          width: ANIMATION_CONFIG.COMPONENT_SIZE.INITIAL_WIDTH,
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          animation: `${ANIMATION_CONFIG.COMPONENT_SIZE.NAME} ease-in-out forwards`,
          animationTimeline: 'view()',
          animationRangeStart: ANIMATION_CONFIG.COMPONENT_SIZE.RANGE.START,
          animationRangeEnd: ANIMATION_CONFIG.COMPONENT_SIZE.RANGE.END,

          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            width: ANIMATION_CONFIG.COMPONENT_SIZE.INITIAL_WIDTH_TABLET,
            animation: `${ANIMATION_CONFIG.COMPONENT_SIZE.NAME_TABLET} ease-in-out forwards`,
            animationTimeline: 'view()',
            animationRangeStart:
              ANIMATION_CONFIG.COMPONENT_SIZE.RANGE.START_TABLET,
            animationRangeEnd: ANIMATION_CONFIG.COMPONENT_SIZE.RANGE.END_TABLET,
          },
        }),
      },
    },
  });

const createEyebrow = (eyebrow?: HTMLElement | null) => {
  if (!eyebrow) return null;

  return ElementModel.text.ribbon({
    element: eyebrow,
    elementStyles: {
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
  });
};

const createHeadline = (headline?: HTMLElement | null) => {
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline =
    characterCount > THEME_VALUES.HEADLINE_CHAR_THRESHOLD;

  if (!headline) return null;

  const desktopStyles = {
    ...(isOverwriteHeadline && { fontSize: THEME_VALUES.HEADLINE_LARGE_SIZE }),
  };

  return ElementModel.headline.campaignMaximum({
    element: headline,
    elementStyles: {
      element: {
        color: Styles.token.color.white,
        fontWeight: THEME_VALUES.HEADLINE_FONT_WEIGHT,
        textTransform: 'uppercase',
        textWrap: 'balance',
        ...desktopStyles,
      },
    },
  });
};

const buildTopTextChildren = ({
  eyebrow,
  headline,
}: ContentProps): ElementVisual[] => {
  const children: ElementVisual[] = [];

  const eyebrowElement = createEyebrow(eyebrow);
  if (eyebrowElement) {
    children.push(eyebrowElement);
  }

  const headlineElement = createHeadline(headline);
  if (headlineElement) {
    children.push(headlineElement);
  }

  return children;
};

const buildBottomTextChildren = ({
  actions,
  additional,
}: ContentProps): ElementVisual[] => {
  const children: ElementVisual[] = [];

  if (actions) {
    const actionsContainer = ElementModel.create({
      element: document.createElement('div'),
      className: CLASS_NAMES.TEXT_ACTIONS,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.lg,
        },
      },
    });
    actionsContainer.element.appendChild(actions);
    children.push(actionsContainer);
  }

  if (additional) {
    const additionalContainer = ElementModel.create({
      element: document.createElement('div'),
      className: CLASS_NAMES.TEXT_ADDITIONAL,
    });
    additionalContainer.element.appendChild(additional);
    children.push(additionalContainer);
  }

  return children;
};

const createTextContainer = (props: ContentProps) => {
  const textChildren: ElementVisual[] = [];

  const topTextChildren = buildTopTextChildren(props);
  if (topTextChildren.length > 0) {
    const topText = ElementModel.create({
      element: document.createElement('div'),
      className: CLASS_NAMES.TEXT_TOP,
      children: topTextChildren,
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.lg,
        },
      },
    });
    textChildren.push(topText);
  }

  const bottomTextChildren = buildBottomTextChildren(props);
  if (bottomTextChildren.length > 0) {
    const bottomText = ElementModel.create({
      element: document.createElement('div'),
      className: CLASS_NAMES.TEXT_BOTTOM,
      children: bottomTextChildren,
    });
    textChildren.push(bottomText);
  }

  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.TEXT_CONTAINER,
    children: textChildren,
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
      },
    },
  });
};

const createSticky = (props: HeroExpandProps) => {
  const assetContainer = createAssetContainer(props);
  const textContainer = createTextContainer(props);

  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.STICKY,
    children: [assetContainer, textContainer],
    elementStyles: {
      element: {
        position: 'relative',

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          ...Utils.styles.media.withViewTimelineAnimation({
            position: 'sticky',
            top: 0,
            height: THEME_VALUES.STICKY_HEIGHT,
          }),
        },

        [`@supports (not (animation-timeline: view()))`]: {
          top: '0 !important',
        },
      },
    },
  });
};

const buildCompositeStyles = () => {
  return {
    element: {
      ...Utils.styles.media.withViewTimelineAnimation({
        position: 'relative',

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          height: THEME_VALUES.TABLET_HEIGHT,
        },
      }),

      ['& img, & video']: {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
  };
};

export default (props: HeroExpandProps) => {
  const sticky = createSticky(props);

  const composite = ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.CONTAINER,
    children: [sticky],
    elementStyles: buildCompositeStyles(),
  });

  const setTopPosition = ({ value }: { value: string | null }) => {
    sticky.element.style.top = value || '0';
  };

  composite.styles += keyFrameImgOverlay;
  composite.styles += keyFrameImgSize;
  composite.styles += keyFrameComponentSize;

  return {
    ...composite,
    events: {
      setTopPosition,
    },
  };
};
