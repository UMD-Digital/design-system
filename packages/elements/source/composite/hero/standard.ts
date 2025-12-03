import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { assets, textLockup } from 'atomic';
import { type HeroStandardProps } from './_types';
import { type ElementModel } from '../../_types';

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

const createVideoAsset = (video: HTMLVideoElement) => {
  return assets.video.observedAutoPlay({
    video,
    isScaled: true,
  });
};

const createImageAsset = (image: HTMLImageElement) => {
  return assets.image.background({
    element: image,
    isScaled: true,
    isGifAllowed: true,
    isShowCaption: true,
  });
};

const buildAssetChildren = ({
  image,
  video,
}: Pick<HeroStandardProps, 'image' | 'video'>): ElementModel<HTMLElement>[] => {
  const children: ElementModel<HTMLElement>[] = [];

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
      [`@container (${token.media.queries.large.max})`]: {
        aspectRatio: '16 / 9',
      },

      [`@container (${token.media.queries.tablet.min})`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      },

      [`&:before`]: {
        [`@container (${token.media.queries.tablet.min})`]: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .8) 85%)',
          zIndex: '99',
        },
      },

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

  return new ElementBuilder()
    .withClassName('umd-hero-default__asset')
    .withChildren(...children)
    .withStyles(elementStyles)
    .build();
};

const createHeadline = (
  props: Pick<
    HeroStandardProps,
    'headline' | 'isHeightSmall' | 'isThemeDark' | 'isTextCenter'
  >,
): ElementModel<HTMLElement> | null => {
  const { headline, isHeightSmall, isTextCenter, isThemeDark } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 10 && isHeightSmall;

  if (!headline) return null;

  return new ElementBuilder(headline)
    .styled(
      Styles.typography.campaign.compose('extralarge', {
        theme: theme.fontColor(isThemeDark),
      }),
    )
    .withStyles({
      element: {
        textTransform: 'uppercase',

        [`@media (${token.media.queries.tablet.min})`]: {
          maxWidth: '700px',
          color: token.color.white,

          ...(isTextCenter && { marginLeft: 'auto', marginRight: 'auto' }),
        },

        [`@media (${token.media.queries.desktop.min})`]: {
          maxWidth: '816px',
          ...(isOverwriteHeadline && { fontSize: '80px' }),
        },
      },
      subElement: {
        color: 'currentColor',
      },
      siblingAfter: {
        marginTop: token.spacing.sm,
      },
    })
    .build();
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

  const textContainer = new ElementBuilder()
    .withClassName('umd-hero-default__text')
    .withChild(text)
    .withStyles({
      element: {
        display: 'flex',
        alignItems: 'flex-end',
        height: '100%',

        ...(isTextCenter && {
          textAlign: 'center',
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '928px',
        }),

        ...(includesAnimation && {
          animation: `hero-slide-up forwards ${ANIMATION_CONFIG.SLIDE_UP.DURATION}`,
        }),

        [`@container (${token.media.queries.tablet.min})`]: {
          maxWidth: '736px',
          paddingTop: `${token.spacing['2xl']}`,
          paddingBottom: `${token.spacing['2xl']}`,
          ...(!isTextCenter && {
            width: '80%',
          }),
          ...(isHeightSmall && {
            minHeight: '400px',
            alignItems: 'flex-end',
            display: 'flex',
          }),
        },

        [`@container (${token.media.queries.desktop.min})`]: {
          maxWidth: '808px',
        },
      },
    })
    .build();

  return new ElementBuilder()
    .styled(Styles.layout.space.horizontal.larger)
    .withChild(textContainer)
    .withStyles({
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: 99,

        [`@container (${token.media.queries.tablet.max})`]: {
          paddingTop: `${token.spacing.sm}`,

          [`&:has(.${elementStyles.text.decoration.ribbon.className})`]: {
            paddingTop: `0`,
            marginTop: '-14px',
          },
        },
      },
    })
    .build();
};

export default (props: HeroStandardProps) => {
  const { isHeightSmall, isThemeDark } = props;
  const asset = createAsset(props);
  const text = createText(props);

  const composite = new ElementBuilder()
    .withClassName('umd-hero-default')
    .withChildren(asset, text)
    .withStyles({
      element: {
        position: 'relative',
        overflow: 'hidden',
        containerType: 'inline-size',

        ...(isThemeDark && {
          backgroundColor: token.color.black,
        }),

        [`@container (${token.media.queries.large.max})`]: {
          ...(isThemeDark && {
            paddingBottom: `${token.spacing.md}`,
          }),
        },

        [`@container (${token.media.queries.tablet.min})`]: {
          ...(!isHeightSmall && {
            height: '75vh',
            minHeight: '480px',
          }),
        },

        [`@container (${token.media.queries.desktop.min})`]: {
          ...(!isHeightSmall && {
            minHeight: '720px',
          }),
        },
      },
      subElement: {
        [`@container (${token.media.queries.large.max})`]: {
          [`*:not(.${elementStyles.asset.image.caption.className})`]: {
            ...(!isThemeDark && {
              color: `${token.color.black} !important`,
            }),
          },
        },
      },
    })
    .build();

  composite.styles += keyFrameHeroScaleDown;
  composite.styles += keyFrameHeroSlideUp;

  return composite;
};
