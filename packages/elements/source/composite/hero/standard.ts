import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';

interface AnimationProps {
  includesAnimation?: boolean;
}

interface SizingProps {
  isHeightSmall?: boolean;
}

interface TextStyleProps extends SizingProps {
  isThemeDark?: boolean;
}

interface AssetProps extends AnimationProps {
  image?: HTMLImageElement | null;
  video?: HTMLVideoElement | null;
}

interface HeadlineProps extends TextStyleProps {
  headline?: HTMLElement | null;
}

interface TextProps extends AnimationProps, HeadlineProps {
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isTextCenter?: boolean;
}

interface HeroStandardProps extends AssetProps, TextProps {}

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

const keyFrameHeroScaleDown = `
  @keyframes hero-scale-down {
    from {
      transform: scale(1.1);
    }
    to {
      transform: scale(1);
    }
  }
`;

const createAsset = ({ image, video, includesAnimation }: AssetProps) => {
  const assetContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-default__asset',
    elementStyles: {
      element: {
        [`@container (${Styles.token.media.queries.large.max})`]: {
          aspectRatio: '16 / 9',
        },
        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        },

        [`&:before`]: {
          [`@container (${Styles.token.media.queries.tablet.min})`]: {
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
            animation: 'hero-scale-down forwards 1s',
          }),
        },
      },
    },
  });

  if (video && video instanceof HTMLVideoElement) {
    const videoElement = assets.video.observedAutoPlay({
      video,
      isScaled: true,
    });
    assetContainer.element.appendChild(videoElement.element);
    assetContainer.styles += videoElement.styles;

    return assetContainer;
  }

  if (image) {
    const imageElement = assets.image.background({
      image,
      isScaled: true,
      isShowCaption: true,
    });
    assetContainer.element.appendChild(imageElement.element);
    assetContainer.styles += imageElement.styles;
    return assetContainer;
  }

  const defaultImage = assets.image.placeholder.fearlessForward();
  assetContainer.element.appendChild(defaultImage.element);
  assetContainer.styles += defaultImage.styles;

  return assetContainer;
};

const createHeadline = (props: HeadlineProps) => {
  const { headline, isHeightSmall, isThemeDark } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 10 && isHeightSmall;

  let headlineElement = null;

  if (headline) {
    const tabletStyles = {
      maxWidth: '700px',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: Styles.token.color.white,
    };

    const desktopStyles = {
      maxWidth: '816px',
      ...(isOverwriteHeadline && { fontSize: '80px' }),
    };

    headlineElement = ElementModel.headline.campaignExtraLarge({
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
  }

  return headlineElement;
};

const createText = (props: TextProps) => {
  const {
    isTextCenter = false,
    isHeightSmall = false,
    includesAnimation,
  } = props;

  const lock = ElementModel.layout.spaceHorizontalMax({
    element: document.createElement('div'),
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

  const textContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-default__text',
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
          maxWidth: '928px',
        }),

        ...(includesAnimation && {
          animation: 'hero-slide-up forwards 1s',
        }),

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          maxWidth: '736px',
          paddingTop: `${Styles.token.spacing['2xl']}`,
          paddingBottom: `${Styles.token.spacing['2xl']}`,
          ...(!isTextCenter && {
            width: '80%',
          }),
          ...(isHeightSmall && {
            minHeight: '400px',
            alignItems: 'flex-end',
            display: 'flex',
          }),
        },

        [`@container (${Styles.token.media.queries.desktop.min})`]: {
          maxWidth: '808px',
        },
      },
    },
  });

  const text = textLockup.large({
    headline: createHeadline(props),
    ribbon: props.eyebrow,
    textLargest: props.text,
    actions: props.actions,
    isThemeDark: true,
  });

  textContainer.element.appendChild(text.element);
  textContainer.styles += text.styles;

  lock.element.appendChild(textContainer.element);
  lock.styles += textContainer.styles;

  return lock;
};

export default (props: HeroStandardProps) =>
  (() => {
    const { isHeightSmall } = props;

    const composite = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-hero-default',
      elementStyles: {
        element: {
          position: 'relative',
          overflow: 'hidden',
          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            ...(!isHeightSmall && {
              height: '75vh',
              minHeight: '480px',
            }),
          },

          [`@container (${Styles.token.media.queries.desktop.min})`]: {
            ...(!isHeightSmall && {
              minHeight: '720px',
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

    const asset = createAsset(props);
    const text = createText(props);

    composite.element.appendChild(asset.element);
    composite.styles += asset.styles;
    composite.element.appendChild(text.element);
    composite.styles += text.styles;

    composite.styles = `
      ${keyFrameHeroScaleDown}
      ${keyFrameHeroSlideUp}
      ${composite.styles}
    `;

    return composite;
  })();
