import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';
import { type HeroStackedProps } from './_types';

const ANIMATION_CONFIG = {
  FADE_OVER: {
    NAME: 'hero-stacked-fade-over',
    RANGE: {
      START: '30vh',
      END: '70vh',
    },
  },
  FONT_COLOR: {
    NAME: 'hero-stacked-font-color',
    RANGE: {
      SMALL: {
        HEADLINE_START: '120vh',
        HEADLINE_END: '150vh',
        TEXT_START: '100vh',
        TEXT_END: '120vh',
      },
      DEFAULT: {
        HEADLINE_START: '100vh',
        HEADLINE_END: '130vh',
        TEXT_START: '90vh',
        TEXT_END: '110vh',
      },
    },
  },
} as const;

const CLASS_NAMES = {
  CONTAINER: 'umd-hero-stacked',
  ASSET: 'umd-hero-stacked__asset',
  OVERLAY: 'umd-hero-stacked__overlay',
  TEXT: 'umd-hero-stacked__text',
} as const;

const THEME_VALUES = {
  HEADLINE_CHAR_THRESHOLD: 30,
  HEADLINE_LARGE_SIZE: '80px',
  OVERLAY_COLOR: 'rgba(0,0,0,.7)',
  HEIGHTS: {
    MIN: '300px',
    DEFAULT_MIN: '400px',
    MAX: '700px',
    VH_PERCENTAGE: '65vh',
  },
  MAX_WIDTHS: {
    HEADLINE: '700px',
    TEXT: '860px',
  },
  ASPECT_RATIO: '5 / 4',
} as const;

const keyFrameFadeOver = `
  @keyframes ${ANIMATION_CONFIG.FADE_OVER.NAME} {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const keyFrameFontColor = `
  @keyframes ${ANIMATION_CONFIG.FONT_COLOR.NAME} {
    from { color: ${Styles.token.color.black}; }
    to { color: ${Styles.token.color.white}; }
  }
`;

const createVideoAsset = (video: HTMLVideoElement) => {
  return assets.video.observedAutoPlay({
    video,
    isScaled: true,
  });
};

const createImageAsset = (image: HTMLImageElement) => {
  return assets.image.background({
    image,
    isScaled: true,
    isShowCaption: true,
  });
};

const createOverlay = (includesAnimation?: boolean) => {
  return ElementModel.createDiv({
    className: CLASS_NAMES.OVERLAY,
    elementStyles: {
      element: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '100vh',
        width: '100vw',
        display: 'block',
        backgroundColor: THEME_VALUES.OVERLAY_COLOR,
        zIndex: 99,
        opacity: 0,

        ...(includesAnimation && {
          [`@media (${Styles.token.media.queries.tablet.min})`]: {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              [`@supports (animation-timeline: view())`]: {
                animation: `${ANIMATION_CONFIG.FADE_OVER.NAME} ease-in-out forwards`,
                animationTimeline: 'view()',
                animationRangeStart: ANIMATION_CONFIG.FADE_OVER.RANGE.START,
                animationRangeEnd: ANIMATION_CONFIG.FADE_OVER.RANGE.END,
              },
            },
          },
        }),
      },
    },
  });
};

const createAsset = ({
  image,
  video,
  includesAnimation,
  isWidthLarge = false,
  isHeightSmall = false,
}: Pick<
  HeroStackedProps,
  'image' | 'video' | 'includesAnimation' | 'isWidthLarge' | 'isHeightSmall'
>) => {
  let mediaElement: ElementVisual | null = null;

  if (video && video instanceof HTMLVideoElement) {
    mediaElement = createVideoAsset(video);
  } else if (image) {
    mediaElement = createImageAsset(image);
  }

  if (!mediaElement) {
    return null;
  }

  const assetInteriorElement = ElementModel.createDiv({
    className: `${CLASS_NAMES.ASSET}--interior`,
    children: [mediaElement, createOverlay(includesAnimation)],
    elementStyles: {
      element: {
        overflow: 'clip',
        position: 'relative',
      },
    },
  });

  const assetContainer = ElementModel.createDiv({
    className: CLASS_NAMES.ASSET,
    children: isWidthLarge
      ? [
          ElementModel.layout.spaceHorizontalLarger({
            element: document.createElement('div'),
            children: [assetInteriorElement],
          }),
        ]
      : [mediaElement, createOverlay(includesAnimation)],
    elementStyles: {
      element: {
        position: 'relative',
        overflow: 'clip',

        ['& img, & video']: {
          aspectRatio: '5 / 4',

          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            maxHeight: '700px',
            minHeight: '300px',

            ...(!isHeightSmall && {
              minHeight: '400px',
              height: '65vh !important',
            }),
          },
        },
      },
    },
  });

  return assetContainer;
};

const buildHeadlineAnimationStyles = (
  includesAnimation?: boolean,
  isHeightSmall?: boolean,
) => {
  if (!includesAnimation) return {};

  const range = isHeightSmall
    ? ANIMATION_CONFIG.FONT_COLOR.RANGE.SMALL
    : ANIMATION_CONFIG.FONT_COLOR.RANGE.DEFAULT;

  return {
    [`@container (${Styles.token.media.queries.tablet.min})`]: {
      ...Utils.theme.media.withViewTimelineAnimation({
        animation: `${ANIMATION_CONFIG.FONT_COLOR.NAME} ease-in-out forwards`,
        animationTimeline: 'view()',
        animationRangeStart: range.HEADLINE_START,
        animationRangeEnd: range.HEADLINE_END,
      }),
    },
  };
};

const createHeadline = (
  props: Pick<
    HeroStackedProps,
    'headline' | 'isHeightSmall' | 'includesAnimation' | 'isThemeDark'
  >,
) => {
  const { headline, isHeightSmall, includesAnimation } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline =
    characterCount < THEME_VALUES.HEADLINE_CHAR_THRESHOLD;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${Styles.token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: THEME_VALUES.HEADLINE_LARGE_SIZE,
      }),
    },
  };

  const animationStyles = buildHeadlineAnimationStyles(
    includesAnimation,
    isHeightSmall,
  );

  const elementStyles = {
    element: {
      color: Styles.token.color.black,
      maxWidth: THEME_VALUES.MAX_WIDTHS.HEADLINE,
      margin: '0 auto',
      textTransform: 'uppercase',
      marginTop: `${Styles.token.spacing.sm}`,
      ...desktopStyles,
      ...animationStyles,
    },
    siblingAfter: {
      marginTop: `${Styles.token.spacing.md}`,
    },
  };

  return ElementModel.headline.campaignLarge({
    element: headline,
    elementStyles,
  });
};

const buildTextAnimationStyles = (
  includesAnimation?: boolean,
  isHeightSmall?: boolean,
) => {
  if (!includesAnimation) return {};

  const range = isHeightSmall
    ? ANIMATION_CONFIG.FONT_COLOR.RANGE.SMALL
    : ANIMATION_CONFIG.FONT_COLOR.RANGE.DEFAULT;

  return {
    [`@container (${Styles.token.media.queries.tablet.min})`]: {
      ...Utils.theme.media.withViewTimelineAnimation({
        animation: `${ANIMATION_CONFIG.FONT_COLOR.NAME} ease-in-out forwards`,
        animationTimeline: 'view()',
        animationRangeStart: range.TEXT_START,
        animationRangeEnd: range.TEXT_END,
      }),
    },
  };
};

const createText = (
  props: Omit<HeroStackedProps, 'image' | 'video' | 'isWidthLarge'>,
) => {
  const { topPosition, includesAnimation } = props;
  const additionalSpread = topPosition ? parseInt(topPosition) : null;
  const textLockupElement = textLockup.large({
    ribbon: props.eyebrow,
    headlineComposite: createHeadline(props),
    textLargest: props.text,
    actions: props.actions,
    isThemeDark: false,
  });

  const lock = ElementModel.layout.spaceHorizontalLarger({
    element: document.createElement('div'),
    children: [textLockupElement],
    elementStyles: {
      element: {
        position: 'relative',
      },
    },
  });

  return ElementModel.createDiv({
    className: CLASS_NAMES.TEXT,
    children: [lock],
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.lg} 0`,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: '999',

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          padding: `${Styles.token.spacing['6xl']} 0 ${Styles.token.spacing['3xl']}`,
        },

        ...(props.includesAnimation && {
          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            ...Utils.theme.media.withViewTimelineAnimation({
              position: 'sticky',
              top: additionalSpread || 0,
            }),
          },
        }),

        [`& *`]: {
          ...buildTextAnimationStyles(
            props.includesAnimation,
            props.isHeightSmall,
          ),
        },

        [`& .${Styles.element.text.decoration.ribbon.className[0]}`]: {
          animation: 'none !important',
        },

        [`& .${Styles.element.text.rich.simpleLargest.className}`]: {
          maxWidth: THEME_VALUES.MAX_WIDTHS.TEXT,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
  });
};

export default (props: HeroStackedProps) => {
  const asset = createAsset(props);
  const hasAsset = asset !== null;
  const shouldAnimateText = hasAsset && props.includesAnimation;

  const text = createText({
    ...props,
    includesAnimation: shouldAnimateText,
  });

  const children: ElementVisual[] = [text];
  if (hasAsset) {
    children.push(asset);
  }

  const composite = ElementModel.createDiv({
    className: CLASS_NAMES.CONTAINER,
    children,
  });

  composite.styles += keyFrameFadeOver;
  composite.styles += keyFrameFontColor;

  return composite;
};
