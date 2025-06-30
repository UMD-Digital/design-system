import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';

interface TextStyleProps {
  isThemeDark?: boolean;
  isThemeLight?: boolean;
  isThemeMaryland?: boolean;
}

interface AssetProps {
  image?: HTMLImageElement | null;
  video?: HTMLVideoElement | null;
}

interface HeadlineProps extends TextStyleProps {
  headline?: HTMLElement | null;
}

interface TextProps extends HeadlineProps {
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
}

interface HeroMinimalProps extends AssetProps, TextProps {}

const createAsset = ({ image, video }: AssetProps) => {
  if (!image && !video) return null;

  const assetContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-minimal__asset',
    elementStyles: {
      element: {
        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          position: 'absolute',
          right: 0,
          top: 0,
          width: '50%',
          height: '100%',
        },

        ['& img']: {
          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            objectFit: 'cover',
            objectPosition: 'center',
            height: '100%',
            width: '100%',
          },
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
  }

  if (mediaElement) {
    assetContainer.element.appendChild(mediaElement.element);
    assetContainer.styles += mediaElement.styles;
  }

  return assetContainer;
};

const createHeadline = (props: HeadlineProps) => {
  const { headline, isThemeDark, isThemeMaryland } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 40;

  if (!headline) return null;

  const desktopStyles = {
    ...(isOverwriteHeadline && { fontSize: '64px' }),
  };

  const headlineElement = ElementModel.headline.campaignLarge({
    element: headline,
    elementStyles: {
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.sm,
      },
    },
    isThemeDark: isThemeDark || isThemeMaryland,
  });

  return headlineElement;
};

const createText = (props: TextProps, hasAsset: boolean) => {
  const { isThemeDark, isThemeMaryland } = props;

  const textContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-minimal__text',
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.xl} 0`,

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          ...(hasAsset && {
            padding: `${Styles.token.spacing['4xl']} 0`,
            width: `calc(50% - ${Styles.token.spacing['4xl']})`,
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

  const textWrapper = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-minimal__text-wrapper',
    elementStyles: {
      element: {
        paddingLeft: Styles.token.spacing.md,
        borderLeft: `2px solid ${
          isThemeDark || isThemeMaryland
            ? Styles.token.color.gold
            : Styles.token.color.red
        }`,

        [`@container (${Styles.token.media.queries.desktop.min})`]: {
          paddingLeft: Styles.token.spacing.lg,
        },
      },
    },
  });

  const textLockupElement = textLockup.large({
    eyebrow: props.eyebrow,
    headline: createHeadline(props),
    textLargest: props.text,
    actions: props.actions,
    isThemeDark: isThemeDark || isThemeMaryland || false,
  });

  textWrapper.element.appendChild(textLockupElement.element);
  textWrapper.styles += textLockupElement.styles;

  textContainer.element.appendChild(textWrapper.element);
  textContainer.styles += textWrapper.styles;

  lock.element.appendChild(textContainer.element);
  lock.styles += textContainer.styles;

  return lock;
};

const getBackgroundColor = (props: HeroMinimalProps) => {
  const { isThemeDark, isThemeLight, isThemeMaryland } = props;

  if (isThemeDark) return Styles.token.color.black;
  if (isThemeMaryland) return Styles.token.color.red;
  if (isThemeLight) return Styles.token.color.gray.lightest;
  return 'transparent';
};

export default (props: HeroMinimalProps) =>
  (() => {
    const composite = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-hero-minimal',
      elementStyles: {
        element: {
          backgroundColor: getBackgroundColor(props),
          position: 'relative',
          display: 'flex',

          [`@container (${Styles.token.media.queries.large.max})`]: {
            flexDirection: 'column-reverse',
          },

          [`@container (${Styles.token.media.queries.tablet.min})`]: {
            minHeight: '288px',
            alignItems: 'center',
          },
        },
      },
    });

    const asset = createAsset(props);
    const text = createText(props, !!asset);

    composite.element.appendChild(text.element);
    composite.styles += text.styles;

    if (asset) {
      composite.element.appendChild(asset.element);
      composite.styles += asset.styles;
    }

    return composite;
  })();
