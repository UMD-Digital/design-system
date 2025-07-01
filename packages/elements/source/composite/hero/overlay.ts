import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';

interface AnimationProps {
  includesAnimation?: boolean;
}

interface AssetProps extends AnimationProps {
  image?: HTMLImageElement | null;
  video?: HTMLVideoElement | null;
}

interface HeadlineProps {
  headline?: HTMLElement | null;
}

interface TextProps extends AnimationProps, HeadlineProps {
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
}

interface HeroOverlayProps extends AssetProps, TextProps {}

const keyFrameHeroResize = `
  @keyframes hero-overlay-resize {
    from { transform: scale(1.1); }
    to { transform: scale(1); }
  }
`;

const keyFrameHeroSlideUp = `
  @keyframes hero-slide-up {
    from {
      transform: translateY(25px);
      opacity: .2;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const createAsset = ({ image, video, includesAnimation }: AssetProps) => {
  const assetContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-overlay__asset',
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
              animation: 'hero-overlay-resize forwards 1.5s',
            },
          }),
        },

        ['& img, & video']: {
          height: '100%',
        },
      },
    },
  });

  let mediaElement;

  if (video && video instanceof HTMLVideoElement) {
    mediaElement = assets.video.observedAutoPlay({
      video,
      isScaled: true,
    });
  } else if (image) {
    mediaElement = assets.image.background({
      image,
      isScaled: true,
      isShowCaption: true,
    });
  } else {
    return null;
  }

  assetContainer.element.appendChild(mediaElement.element);
  assetContainer.styles += mediaElement.styles;

  return assetContainer;
};

const createHeadline = (props: HeadlineProps) => {
  const { headline } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  const desktopStyles = {
    ...(isOverwriteHeadline && { fontSize: '80px' }),
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

const createText = (props: TextProps) => {
  const { includesAnimation } = props;

  const textContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-overlay__text',
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.lg} 0`,
        display: 'flex',
        position: 'relative',
        zIndex: 999,

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          width: '55%',
          padding: `${Styles.token.spacing['5xl']} 0`,

          ...(includesAnimation && {
            [`@media (prefers-reduced-motion: no-preference)`]: {
              animation: 'hero-slide-up forwards 1.5s',
            },
          }),
        },
      },
    },
  });

  const lock = ElementModel.layout.spaceHorizontalMax({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
    },
  });

  const textContent = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-overlay__text-content',
    elementStyles: {
      element: {
        [`& .${Styles.element.text.rich.simpleLargeDark.className}`]: {
          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            maxWidth: '60%',
          },
        },
      },
    },
  });

  const textLockupElement = textLockup.large({
    ribbon: props.eyebrow,
    headline: createHeadline(props),
    text: props.text,
    actions: props.actions,
    isThemeDark: true,
  });

  textContent.element.appendChild(textLockupElement.element);
  textContent.styles += textLockupElement.styles;

  lock.element.appendChild(textContent.element);
  lock.styles += textContent.styles;

  textContainer.element.appendChild(lock.element);
  textContainer.styles += lock.styles;

  return textContainer;
};

export default (props: HeroOverlayProps) =>
  (() => {
    const composite = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-hero-overlay',
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
              background:
                'linear-gradient(90deg, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, .8) 50%, rgba(0, 0, 0, 0) 75%)',
              zIndex: 999,
            },
          },

          [`@container (${Styles.token.media.queries.desktop.min})`]: {
            minHeight: '764px',
          },
        },
      },
    });

    const text = createText(props);
    const asset = createAsset(props);

    composite.element.appendChild(text.element);
    composite.styles += text.styles;

    if (asset) {
      composite.element.appendChild(asset.element);
      composite.styles += asset.styles;
    }

    composite.styles = `
      ${keyFrameHeroResize}
      ${keyFrameHeroSlideUp}
      ${composite.styles}
    `;

    return composite;
  })();
