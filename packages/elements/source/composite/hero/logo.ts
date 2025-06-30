import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';

interface TextStyleProps {
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
}

interface AssetProps {
  image?: HTMLImageElement | null;
}

interface HeadlineProps extends TextStyleProps {
  headline?: HTMLElement | null;
}

interface TextProps extends HeadlineProps {
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
}

interface HeroLogoProps extends AssetProps, TextProps {}

const createAsset = ({ image }: AssetProps) => {
  const assetContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-logo__asset',
    elementStyles: {
      element: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        marginBottom: Styles.token.spacing.xl,

        ['& img']: {
          maxWidth: '100%',
          maxHeight: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
  });

  let mediaElement;

  if (image) {
    mediaElement = assets.image.background({
      image,
      isScaled: false,
    });
  } else {
    return null;
  }

  assetContainer.element.appendChild(mediaElement.element);
  assetContainer.styles += mediaElement.styles;

  return assetContainer;
};

const createHeadline = (props: HeadlineProps) => {
  const { headline, isThemeDark } = props;

  if (!headline) return null;

  const headlineElement = ElementModel.headline.campaignLarge({
    element: headline,
    elementStyles: {
      element: {
        textTransform: 'uppercase',
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.sm,
      },
    },
    isThemeDark,
  });

  return headlineElement;
};

const createText = (props: TextProps) => {
  const { isThemeDark } = props;

  const textContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-logo__text',
    elementStyles: {
      element: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      },
    },
  });

  const textContent = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-hero-logo__text-content',
    elementStyles: {
      element: {
        [`& .${Styles.element.text.rich.simpleLargest.className}`]: {
          color: Styles.token.color.gray.dark,
        },
      },
    },
  });

  const textLockupElement = textLockup.large({
    ribbon: props.eyebrow,
    headline: createHeadline(props),
    text: props.text,
    actions: props.actions,
    isThemeDark: isThemeDark || false,
  });

  textContent.element.appendChild(textLockupElement.element);
  textContent.styles += textLockupElement.styles;

  textContainer.element.appendChild(textContent.element);
  textContainer.styles += textContent.styles;

  return textContainer;
};

const getBackgroundColor = (props: HeroLogoProps) => {
  const { isThemeDark, isThemeMaryland } = props;

  if (isThemeDark) return Styles.token.color.black;
  if (isThemeMaryland) return Styles.token.color.red;
  return Styles.token.color.gray.lightest;
};

export default (props: HeroLogoProps) =>
  (() => {
    const { isThemeDark } = props;
    const composite = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-hero-logo',
    });

    const container = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-hero-logo__container',
      elementStyles: {
        element: {
          padding: `${Styles.token.spacing['5xl']} 0 ${Styles.token.spacing.lg}`,
          backgroundColor: getBackgroundColor(props),

          // Dark them should have additonal padding at the bottom
          [`@container (${Styles.token.media.queries.desktop.min})`]: {
            ...(isThemeDark && {
              paddingBottom: `${Styles.token.spacing['5xl']}`,
            }),
          },
        },
      },
    });

    const lock = ElementModel.layout.spaceHorizontalSmall({
      element: document.createElement('div'),
    });

    const asset = createAsset(props);
    const text = createText(props);

    if (asset) {
      lock.element.appendChild(asset.element);
      lock.styles += asset.styles;
    }

    lock.element.appendChild(text.element);
    lock.styles += text.styles;

    container.element.appendChild(lock.element);
    container.styles += lock.styles;

    composite.element.appendChild(container.element);
    composite.styles += container.styles;

    return composite;
  })();
