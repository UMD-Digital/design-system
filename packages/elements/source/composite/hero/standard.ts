import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';
import { type HeroStandardProps } from './_types';

const ANIMATION_CONFIG = {
  SLIDE_UP: {
    DURATION: '1s',
    TRANSFORM: {
      FROM: 'translateY(25px)',
      TO: 'translateY(0)',
    },
    OPACITY: {
      FROM: 0.2,
      TO: 1,
    },
  },
  SCALE_DOWN: {
    DURATION: '1s',
    TRANSFORM: {
      FROM: 'scale(1.1)',
      TO: 'scale(1)',
    },
  },
} as const;

const CLASS_NAMES = {
  CONTAINER: 'umd-hero-default',
  ASSET: 'umd-hero-default__asset',
  TEXT: 'umd-hero-default__text',
} as const;

const THEME_VALUES = {
  HEADLINE_CHAR_THRESHOLD: 10,
  HEADLINE_LARGE_SIZE: '80px',
  GRADIENT_OVERLAY:
    'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .8) 85%)',
  HEIGHTS: {
    SMALL_MIN: '400px',
    DEFAULT_MIN: '480px',
    DESKTOP_MIN: '720px',
    VH_PERCENTAGE: '75vh',
  },
  MAX_WIDTHS: {
    HEADLINE_TABLET: '700px',
    HEADLINE_DESKTOP: '816px',
    TEXT_DESKTOP: '808px',
    TEXT_TABLET: '736px',
    TEXT_CENTER: '928px',
  },
  TEXT_WIDTH_PERCENTAGE: '80%',
} as const;

const keyFrameHeroSlideUp = `
  @keyframes hero-slide-up {
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

const keyFrameHeroScaleDown = `
  @keyframes hero-scale-down {
    from {
      transform: ${ANIMATION_CONFIG.SCALE_DOWN.TRANSFORM.FROM};
    }
    to {
      transform: ${ANIMATION_CONFIG.SCALE_DOWN.TRANSFORM.TO};
    }
  }
`;

const ASSET_STYLES = {
  BASE: {
    MOBILE: {
      [`@container (${Styles.token.media.queries.large.max})`]: {
        aspectRatio: '16 / 9',
      },
    },
    TABLET_AND_UP: {
      [`@container (${Styles.token.media.queries.tablet.min})`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      },
    },
  },
  OVERLAY: {
    [`@container (${Styles.token.media.queries.tablet.min})`]: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: THEME_VALUES.GRADIENT_OVERLAY,
      zIndex: '99',
    },
  },
} as const;

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

const buildAssetChildren = ({
  image,
  video,
}: Pick<HeroStandardProps, 'image' | 'video'>): ElementVisual[] => {
  const children: ElementVisual[] = [];

  if (video) {
    children.push(createVideoAsset(video));
  }

  if (image && !video) {
    children.push(createImageAsset(image));
  }

  if (!image && !video) {
    children.push(assets.image.placeholder.fearlessForward());
  }

  return children;
};

const buildAssetStyles = (includesAnimation?: boolean) => {
  return {
    element: {
      ...ASSET_STYLES.BASE.MOBILE,
      ...ASSET_STYLES.BASE.TABLET_AND_UP,
      [`&:before`]: ASSET_STYLES.OVERLAY,
      ['& img']: {
        ...(includesAnimation && {
          [`@media (prefers-reduced-motion: no-preference)`]: {
            animation: `hero-scale-down forwards ${ANIMATION_CONFIG.SCALE_DOWN.DURATION}`,
          },
        }),
      },
    },
  };
};

const createAsset = ({
  image,
  video,
  includesAnimation,
}: Pick<HeroStandardProps, 'image' | 'video' | 'includesAnimation'>) => {
  const children = buildAssetChildren({ image, video });
  const elementStyles = buildAssetStyles(includesAnimation);

  return ElementModel.createDiv({
    className: CLASS_NAMES.ASSET,
    children,
    elementStyles,
  });
};

const createHeadline = (
  props: Pick<HeroStandardProps, 'headline' | 'isHeightSmall' | 'isThemeDark'>,
) => {
  const { headline, isHeightSmall, isThemeDark } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline =
    characterCount > THEME_VALUES.HEADLINE_CHAR_THRESHOLD && isHeightSmall;

  if (!headline) return null;

  const tabletStyles = {
    maxWidth: THEME_VALUES.MAX_WIDTHS.HEADLINE_TABLET,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: Styles.token.color.white,
  };

  const desktopStyles = {
    maxWidth: THEME_VALUES.MAX_WIDTHS.HEADLINE_DESKTOP,
    ...(isOverwriteHeadline && { fontSize: THEME_VALUES.HEADLINE_LARGE_SIZE }),
  };

  const headlineElement = ElementModel.headline.campaignExtraLarge({
    element: headline,
    elementStyles: {
      element: {
        textTransform: 'uppercase',
        [`@media (${Styles.token.media.queries.tablet.min})`]: tabletStyles,
        [`@media (${Styles.token.media.queries.desktop.min})`]: desktopStyles,
      },
      subElement: {
        color: 'currentColor',
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.sm,
      },
    },
    isThemeDark,
  });

  return headlineElement;
};

const createText = (props: HeroStandardProps) => {
  const {
    isTextCenter = false,
    isHeightSmall = false,
    includesAnimation,
  } = props;

  const text = textLockup.large({
    headlineComposite: createHeadline(props),
    ribbon: props.eyebrow,
    textLargest: props.text,
    actions: props.actions,
    isThemeDark: true,
  });

  const textContainer = ElementModel.createDiv({
    className: CLASS_NAMES.TEXT,
    children: [text],
    elementStyles: {
      element: {
        display: 'flex',
        alignItems: 'flex-end',
        height: '100%',
        ...(isTextCenter && {
          textAlign: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: THEME_VALUES.MAX_WIDTHS.TEXT_CENTER,
        }),

        ...(includesAnimation && {
          animation: `hero-slide-up forwards ${ANIMATION_CONFIG.SLIDE_UP.DURATION}`,
        }),

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          maxWidth: THEME_VALUES.MAX_WIDTHS.TEXT_TABLET,
          paddingTop: `${Styles.token.spacing['2xl']}`,
          paddingBottom: `${Styles.token.spacing['2xl']}`,
          ...(!isTextCenter && {
            width: THEME_VALUES.TEXT_WIDTH_PERCENTAGE,
          }),
          ...(isHeightSmall && {
            minHeight: THEME_VALUES.HEIGHTS.SMALL_MIN,
            alignItems: 'flex-end',
            display: 'flex',
          }),
        },

        [`@container (${Styles.token.media.queries.desktop.min})`]: {
          maxWidth: THEME_VALUES.MAX_WIDTHS.TEXT_DESKTOP,
        },
      },
    },
  });

  return ElementModel.layout.spaceHorizontalLarger({
    element: document.createElement('div'),
    children: [textContainer],
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: 99,

        [`@container (${Styles.token.media.queries.tablet.max})`]: {
          paddingTop: `${Styles.token.spacing.sm}`,

          [`&:has(.${Styles.element.text.decoration.ribbon.className})`]: {
            paddingTop: `0`,
            marginTop: '-14px',
          },
        },
      },
    },
  });
};

export default (props: HeroStandardProps) => {
  const { isHeightSmall } = props;
  const asset = createAsset(props);
  const text = createText(props);

  const composite = ElementModel.createDiv({
    className: CLASS_NAMES.CONTAINER,
    children: [asset, text],
    elementStyles: {
      element: {
        position: 'relative',
        overflow: 'hidden',
        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          ...(!isHeightSmall && {
            height: THEME_VALUES.HEIGHTS.VH_PERCENTAGE,
            minHeight: THEME_VALUES.HEIGHTS.DEFAULT_MIN,
          }),
        },

        [`@container (${Styles.token.media.queries.desktop.min})`]: {
          ...(!isHeightSmall && {
            minHeight: THEME_VALUES.HEIGHTS.DESKTOP_MIN,
          }),
        },
      },
      subElement: {
        [`@container (${Styles.token.media.queries.large.max})`]: {
          ['*']: {
            color: `${Styles.token.color.black} !important`,
          },
        },
      },
    },
  });

  composite.styles += keyFrameHeroScaleDown;
  composite.styles += keyFrameHeroSlideUp;

  return composite;
};
