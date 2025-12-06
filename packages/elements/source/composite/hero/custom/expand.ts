import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { withViewTimelineAnimation } from '@universityofmaryland/web-utilities-library/styles';
import { assets } from 'atomic';
import { type ElementModel, type ContentElement } from '../../../_types';
import { type HeroExpandProps as BaseHeroExpandProps } from '../_types';

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
  new ElementBuilder()
    .withClassName('hero-expand-image-overlay')
    .withStyles({
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
    })
    .build();

const createAssetElement = ({
  image,
  video,
}: Pick<
  HeroExpandProps,
  'image' | 'video'
>): ElementModel<HTMLElement> | null => {
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

  const container = new ElementBuilder()
    .withClassName('hero-expand-image-size')
    .withStyles({
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
    });

  if (asset) {
    container.withChild(asset);
  }
  container.withChild(overlay);

  return container.build();
};

const createAssetContainer = (
  props: Pick<HeroExpandProps, 'image' | 'video'>,
) =>
  new ElementBuilder()
    .withClassName('hero-expand-image-container')
    .withChild(createImageSize(props))
    .withStyles({
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
    })
    .build();

const createEyebrow = (eyebrow?: HTMLElement | null) => {
  if (!eyebrow) return null;

  return new ElementBuilder(eyebrow)
    .styled(Styles.element.text.decoration.ribbon)
    .withStyles({
      siblingAfter: {
        marginTop: token.spacing.md,
      },
    })
    .build();
};

const createHeadline = (headline?: HTMLElement | null) => {
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  return new ElementBuilder(headline)
    .styled(Styles.typography.campaign.fonts.maximum)
    .withStyles({
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
    })
    .build();
};

const createTopTextChildren = ({
  eyebrow,
  headline,
}: Pick<
  HeroExpandProps,
  'eyebrow' | 'headline'
>): ElementModel<HTMLElement>[] => {
  const children: ElementModel<HTMLElement>[] = [];

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
}: Pick<
  HeroExpandProps,
  'actions' | 'additional'
>): ElementModel<HTMLElement>[] => {
  const children: ElementModel<HTMLElement>[] = [];

  if (actions) {
    const actionsContainer = new ElementBuilder()
      .withClassName('hero-expand-text-actions')
      .withChild(actions)
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.lg,
        },
      })
      .build();
    children.push(actionsContainer);
  }

  if (additional) {
    const additionalContainer = new ElementBuilder()
      .withClassName('hero-expand-text-additional')
      .withChild(additional)
      .build();
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
  const container = new ElementBuilder()
    .withClassName('hero-expand-text-container')
    .withStyles({
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
    });

  const topTextChildren = createTopTextChildren(props);
  if (topTextChildren.length > 0) {
    const topText = new ElementBuilder()
      .styled(Styles.layout.space.horizontal.normal)
      .withChildren(...topTextChildren)
      .withStyles({
        siblingAfter: {
          marginTop: token.spacing.lg,
        },
      })
      .build();
    container.withChild(topText);
  }

  const bottomTextChildren = createBottomTextChildren(props);
  if (bottomTextChildren.length > 0) {
    const bottomText = new ElementBuilder()
      .styled(Styles.layout.space.horizontal.normal)
      .withChildren(...bottomTextChildren)
      .withStyles({
        element: {
          width: '100%',
        },
      })
      .build();
    container.withChild(bottomText);
  }

  return container.build();
};

const createSticky = (props: HeroExpandProps) => {
  const assetContainer = createAssetContainer(props);
  const textContainer = createTextContainer(props);

  return new ElementBuilder()
    .withClassName('hero-expand-sticky')
    .withChildren(assetContainer, textContainer)
    .withStyles({
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
    })
    .build();
};

export default (props: HeroExpandProps) => {
  const sticky = createSticky(props);

  const composite = new ElementBuilder()
    .withClassName('umd-hero-expand')
    .withChild(sticky)
    .withStyles({
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
    })
    .build();

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
