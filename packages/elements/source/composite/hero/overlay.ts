import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { type ElementModel } from '../../_types';
import { type HeroOverlayProps } from './_types';

const ANIMATION_CONFIG = {
  RESIZE: {
    DURATION: '1.5s',
    TRANSFORM: {
      FROM: 'scale(1.1)',
      TO: 'scale(1)',
    },
  },
  SLIDE_UP: {
    DURATION: '1.5s',
    TRANSFORM: {
      FROM: 'translateY(25px)',
      TO: 'translateY(0)',
    },
    OPACITY: {
      FROM: 0.2,
      TO: 1,
    },
  },
} as const;

const keyFrameHeroResize = `
  @keyframes hero-overlay-resize {
    from { transform: ${ANIMATION_CONFIG.RESIZE.TRANSFORM.FROM}; }
    to { transform: ${ANIMATION_CONFIG.RESIZE.TRANSFORM.TO}; }
  }
`;

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
}: Pick<HeroOverlayProps, 'image' | 'video'>): ElementModel<HTMLElement>[] => {
  if (video && video instanceof HTMLVideoElement) {
    return [createVideoAsset(video)];
  }

  if (image) {
    return [createImageAsset(image)];
  }

  return [assets.image.placeholder.fearlessForward()];
};

const createAsset = ({
  image,
  video,
  includesAnimation,
}: Pick<HeroOverlayProps, 'image' | 'video' | 'includesAnimation'>) => {
  const children = buildAssetChildren({ image, video });

  if (children.length === 0) {
    return null;
  }

  return new ElementBuilder()
    .withClassName('umd-hero-overlay__asset')
    .withChildren(...children)
    .withStyles({
      element: {
        [`@media (${token.media.queries.large.max})`]: {
          [`&:has(.${elementStyles.asset.gif.toggle.className})`]: {
            minHeight: '56vw',
            display: 'grid',
          },
        },

        [`@container (${token.media.queries.tablet.min})`]: {
          position: 'absolute',
          width: '60%',
          height: `calc(100% - ${token.spacing['5xl']})`,
          right: 0,
          top: 0,
          overflow: 'visible',

          ...(includesAnimation && {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              animation: `hero-overlay-resize forwards ${ANIMATION_CONFIG.RESIZE.DURATION}`,
            },
          }),
        },

        ['& img, & video']: {
          height: '100%',
          minHeight: '300px',
        },
      },
    })
    .build();
};

const createHeadline = (
  props: Pick<HeroOverlayProps, 'headline'>,
): ElementModel<HTMLElement> | null => {
  const { headline } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  return new ElementBuilder(headline)
    .styled(Styles.typography.campaign.fonts.extraLarge)
    .withStyles({
      element: {
        textTransform: 'uppercase',
        textWrap: 'pretty',
        color: token.color.white,

        [`@container (${token.media.queries.desktop.min})`]: {
          ...(isOverwriteHeadline && {
            fontSize: '80px',
          }),
        },
      },
      siblingAfter: {
        marginTop: token.spacing.md,
      },
    })
    .build();
};

const createTextContent = (
  props: Pick<HeroOverlayProps, 'eyebrow' | 'headline' | 'text' | 'actions'>,
) => {
  const textLockupElement = textLockup.large({
    ribbon: props.eyebrow,
    headlineComposite: createHeadline(props),
    text: props.text,
    actions: props.actions,
    isThemeDark: true,
  });

  return new ElementBuilder()
    .withClassName('umd-hero-overlay__text-content')
    .withChild(textLockupElement)
    .withStyles({
      element: {
        [`@container (${token.media.queries.tablet.min})`]: {
          maxWidth: '55%',
        },

        [`& .${elementStyles.text.rich.simpleLargeDark.className}`]: {
          [`@container (${token.media.queries.tablet.min})`]: {
            maxWidth: '60%',
          },
        },
      },
    })
    .build();
};

const createText = (
  props: Pick<
    HeroOverlayProps,
    'eyebrow' | 'headline' | 'text' | 'actions' | 'includesAnimation'
  >,
) => {
  const { includesAnimation } = props;
  const textContent = createTextContent(props);

  const lock = new ElementBuilder()
    .styled(Styles.layout.space.horizontal.larger)
    .withChild(textContent)
    .withStyles({
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
    })
    .build();

  return new ElementBuilder()
    .withClassName('umd-hero-overlay__text')
    .withChild(lock)
    .withStyles({
      element: {
        padding: `${token.spacing.lg} 0`,
        display: 'flex',
        position: 'relative',
        zIndex: 999,
        width: '100%',

        [`@container (${token.media.queries.tablet.min})`]: {
          padding: `${token.spacing['5xl']} 0`,

          ...(includesAnimation && {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              animation: `hero-slide-up forwards ${ANIMATION_CONFIG.SLIDE_UP.DURATION}`,
            },
          }),
        },
      },
    })
    .build();
};

export default (props: HeroOverlayProps) => {
  const text = createText(props);
  const asset = createAsset(props);

  const container = new ElementBuilder()
    .withClassName('umd-hero-overlay__container')
    .withChild(text)
    .withStyles({
      element: {
        position: 'relative',
        backgroundColor: token.color.black,
        overflow: 'clip',

        [`@container (${token.media.queries.large.max})`]: {
          display: 'flex',
          flexDirection: 'column-reverse',
        },

        [`@container (${token.media.queries.tablet.min})`]: {
          minHeight: '640px',
          display: 'flex',
          alignItems: 'center',

          ['&:before']: {
            content: '""',
            position: 'absolute',
            left: 0,
            right: '50px',
            top: 0,
            height: '100%',
            background:
              'linear-gradient(90deg, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, .8) 50%, rgba(0, 0, 0, 0) 75%)',
            zIndex: 999,
          },
        },

        [`@container (${token.media.queries.desktop.min})`]: {
          minHeight: '764px',
        },
      },
    });

  if (asset) {
    container.withChild(asset);
  }

  const containerBuilt = container.build();

  const composite = new ElementBuilder()
    .withClassName('umd-hero-overlay')
    .withChild(containerBuilt)
    .withStyles({
      element: {
        containerType: 'inline-size',
      },
    })
    .build();

  composite.styles += keyFrameHeroResize;
  composite.styles += keyFrameHeroSlideUp;

  return composite;
};
