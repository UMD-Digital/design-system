import * as token from '@universityofmaryland/web-styles-library/token';
import { withViewTimelineAnimation } from '@universityofmaryland/web-utilities-library/styles';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { assets } from 'atomic';
import { type HeroExpandProps as BaseHeroExpandProps } from '../_types';
import { type ElementVisual, type ContentElement } from '../../../_types';

interface HeroExpandProps extends BaseHeroExpandProps {
  eyebrow?: ContentElement;
  additional?: HTMLSlotElement | null;
}

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

const createImageOverlay = () =>
  ElementBuilder.create.div({
    className: 'hero-expand-image-overlay',
    elementStyles: {
      element: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'rgba(0,0,0,0.65)',
        opacity: 1,

        ...withViewTimelineAnimation({
          opacity: 0,
          animation: `${ANIMATION_CONFIG.IMAGE_OVERLAY.NAME} forwards`,
          animationTimeline: 'view()',
          animationRangeStart: ANIMATION_CONFIG.IMAGE_OVERLAY.RANGE.START,
          animationRangeEnd: ANIMATION_CONFIG.IMAGE_OVERLAY.RANGE.END,
        }),
      },
    },
  });

const createAssetElement = ({
  image,
  video,
}: Pick<HeroExpandProps, 'image' | 'video'>): ElementVisual | null => {
  if (video) {
    return assets.video.toggle({
      video,
      additionalElementStyles: {
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',

        [`& video`]: {
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        },
      },
    });
  }
  if (image) {
    return assets.image.background({
      element: image,
      isScaled: true,
      isGifAllowed: true,
      isShowCaption: true,
    });
  }

  return null;
};

const createImageSize = (props: Pick<HeroExpandProps, 'image' | 'video'>) => {
  const overlay = createImageOverlay();
  const asset = createAssetElement(props);
  const children = asset ? [asset, overlay] : [overlay];

  const container = ElementBuilder.create.div({
    className: 'hero-expand-image-size',
    children,
    elementStyles: {
      element: {
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        width: '100%',

        ...withViewTimelineAnimation({
          height: ANIMATION_CONFIG.IMAGE_SIZE.INITIAL_HEIGHT,
          animation: `${ANIMATION_CONFIG.IMAGE_SIZE.NAME} ease-in-out forwards`,
          animationTimeline: 'view()',
          animationRangeStart: ANIMATION_CONFIG.IMAGE_SIZE.RANGE.START,
          animationRangeEnd: ANIMATION_CONFIG.IMAGE_SIZE.RANGE.END,

          [`@container (${token.media.queries.tablet.min})`]: {
            animationRangeEnd: ANIMATION_CONFIG.IMAGE_SIZE.RANGE.END_TABLET,
          },
        }),
      },
    },
  });

  return container;
};

const createAssetContainer = (
  props: Pick<HeroExpandProps, 'image' | 'video'>,
) =>
  ElementBuilder.create.div({
    className: 'hero-expand-image-container',
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

        ...withViewTimelineAnimation({
          width: ANIMATION_CONFIG.COMPONENT_SIZE.INITIAL_WIDTH,
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          animation: `${ANIMATION_CONFIG.COMPONENT_SIZE.NAME} ease-in-out forwards`,
          animationTimeline: 'view()',
          animationRangeStart: ANIMATION_CONFIG.COMPONENT_SIZE.RANGE.START,
          animationRangeEnd: ANIMATION_CONFIG.COMPONENT_SIZE.RANGE.END,

          [`@container (${token.media.queries.tablet.min})`]: {
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

  return ElementBuilder.styled.text.ribbon({
    element: eyebrow,
    elementStyles: {
      siblingAfter: {
        marginTop: token.spacing.md,
      },
    },
  });
};

const createHeadline = (headline?: HTMLElement | null) => {
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  return ElementBuilder.styled.headline.campaignMaximum({
    element: headline,
    elementStyles: {
      element: {
        color: token.color.white,
        fontWeight: 800,
        textTransform: 'uppercase',
        textWrap: 'balance',

        [`@container (${token.media.queries.desktop.min})`]: {
          ...(isOverwriteHeadline && {
            fontSize: '96px',
          }),
        },
      },
    },
  });
};

const createTopTextChildren = ({
  eyebrow,
  headline,
}: Pick<HeroExpandProps, 'eyebrow' | 'headline'>): ElementVisual[] => {
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

const createBottomTextChildren = ({
  actions,
  additional,
}: Pick<HeroExpandProps, 'actions' | 'additional'>): ElementVisual[] => {
  const children: ElementVisual[] = [];

  if (actions) {
    const actionsContainer = ElementBuilder.create.div({
      className: 'hero-expand-text-actions',
      elementStyles: {
        siblingAfter: {
          marginTop: token.spacing.lg,
        },
      },
    });
    actionsContainer.element.appendChild(actions);
    children.push(actionsContainer);
  }

  if (additional) {
    const additionalContainer = ElementBuilder.create.div({
      className: 'hero-expand-text-additional',
    });
    additionalContainer.element.appendChild(additional);
    children.push(additionalContainer);
  }

  return children;
};

const createTextContainer = (
  props: Pick<
    HeroExpandProps,
    'eyebrow' | 'headline' | 'actions' | 'additional'
  >,
) => {
  const textChildren: ElementVisual[] = [];

  const topTextChildren = createTopTextChildren(props);
  if (topTextChildren.length > 0) {
    const topText = ElementBuilder.styled.layout.spaceHorizontalNormal({
      element: document.createElement('div'),
      children: topTextChildren,
      elementStyles: {
        siblingAfter: {
          marginTop: token.spacing.lg,
        },
      },
    });
    textChildren.push(topText);
  }

  const bottomTextChildren = createBottomTextChildren(props);
  if (bottomTextChildren.length > 0) {
    const bottomText = ElementBuilder.styled.layout.spaceHorizontalNormal({
      element: document.createElement('div'),
      children: bottomTextChildren,
      elementStyles: {
        element: {
          width: '100%',
        },
      },
    });
    textChildren.push(bottomText);
  }

  return ElementBuilder.create.div({
    className: 'hero-expand-text-container',
    children: textChildren,
    elementStyles: {
      element: {
        position: 'relative',
        height: '100%',
        zIndex: 9999,
        textAlign: 'center',
        padding: `${token.spacing.md} 0`,

        [`@container (${token.media.queries.tablet.min})`]: {
          padding: `${token.spacing['3xl']} 0`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },

        [`@container (${token.media.queries.highDef.min})`]: {
          padding: `${token.spacing['6xl']} 0`,
        },
      },
    },
  });
};

const createSticky = (props: HeroExpandProps) => {
  const assetContainer = createAssetContainer(props);
  const textContainer = createTextContainer(props);

  return ElementBuilder.create.element({
    element: document.createElement('div'),
    className: 'hero-expand-sticky',
    children: [assetContainer, textContainer],
    elementStyles: {
      element: {
        position: 'relative',

        [`@container (${token.media.queries.tablet.min})`]: {
          ...withViewTimelineAnimation({
            position: 'sticky',
            top: 0,
            height: '100vh',
          }),
        },

        [`@supports (not (animation-timeline: view()))`]: {
          top: '0 !important',
        },
      },
    },
  });
};

export default (props: HeroExpandProps) => {
  const sticky = createSticky(props);

  const composite = ElementBuilder.create.element({
    element: document.createElement('div'),
    className: 'umd-hero-expand',
    children: [sticky],
    elementStyles: {
      element: {
        containerType: 'inline-size',
        ...withViewTimelineAnimation({
          position: 'relative',

          [`@container (${token.media.queries.tablet.min})`]: {
            height: '200vh',
          },
        }),

        ['& img, & video']: {
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      },
    },
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
