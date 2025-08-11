import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';
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
    image,
    isScaled: true,
    isShowCaption: true,
  });
};

const buildAssetChildren = ({
  image,
  video,
}: Pick<HeroOverlayProps, 'image' | 'video'>): ElementVisual[] => {
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

  return ElementModel.createDiv({
    className: 'umd-hero-overlay__asset',
    children,
    elementStyles: {
      element: {
        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          position: 'absolute',
          width: '60%',
          height: `calc(100% - ${Styles.token.spacing['5xl']})`,
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
    },
  });
};

const createHeadline = (props: Pick<HeroOverlayProps, 'headline'>) => {
  const { headline } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline =
    characterCount > 30;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${Styles.token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: '80px',
      }),
    },
  };

  const headlineElement = ElementModel.headline.campaignExtraLarge({
    element: headline,
    elementStyles: {
      element: {
        textTransform: 'uppercase',
        textWrap: 'pretty',
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
    isThemeDark: true,
  });

  return headlineElement;
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

  return ElementModel.createDiv({
    className: 'umd-hero-overlay__text-content',
    children: [textLockupElement],
    elementStyles: {
      element: {
        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          maxWidth: '55%',
        },

        [`& .${Styles.element.text.rich.simpleLargeDark.className}`]: {
          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            maxWidth: '60%',
          },
        },
      },
    },
  });
};

const createText = (
  props: Pick<
    HeroOverlayProps,
    'eyebrow' | 'headline' | 'text' | 'actions' | 'includesAnimation'
  >,
) => {
  const { includesAnimation } = props;
  const textContent = createTextContent(props);

  const lock = ElementModel.layout.spaceHorizontalLarger({
    element: document.createElement('div'),
    children: [textContent],
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
    },
  });

  return ElementModel.createDiv({
    className: 'umd-hero-overlay__text',
    children: [lock],
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.lg} 0`,
        display: 'flex',
        position: 'relative',
        zIndex: 999,
        width: '100%',

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          padding: `${Styles.token.spacing['5xl']} 0`,

          ...(includesAnimation && {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              animation: `hero-slide-up forwards ${ANIMATION_CONFIG.SLIDE_UP.DURATION}`,
            },
          }),
        },
      },
    },
  });
};

export default (props: HeroOverlayProps) => {
  const text = createText(props);
  const asset = createAsset(props);

  const children: ElementVisual[] = [text];
  if (asset) {
    children.push(asset);
  }

  const container = ElementModel.createDiv({
    className: 'umd-hero-overlay__container',
    children,
    elementStyles: {
      element: {
        position: 'relative',
        backgroundColor: Styles.token.color.black,
        overflow: 'clip',

        [`@container (${Styles.token.media.queries.large.max})`]: {
          display: 'flex',
          flexDirection: 'column-reverse',
        },

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
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
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, .8) 50%, rgba(0, 0, 0, 0) 75%)',
            zIndex: 999,
          },
        },

        [`@container (${Styles.token.media.queries.desktop.min})`]: {
          minHeight: '764px',
        },
      },
    },
  });

  const composite = ElementModel.createDiv({
    className: 'umd-hero-overlay',
    children: [container],
    elementStyles: {
      element: {
        containerType: 'inline-size',
      },
    },
  });

  composite.styles += keyFrameHeroResize;
  composite.styles += keyFrameHeroSlideUp;

  return composite;
};
