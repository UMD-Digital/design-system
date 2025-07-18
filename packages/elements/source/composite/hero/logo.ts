import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type HeroLogoProps } from './_types';

const createAsset = ({ image }: Pick<HeroLogoProps, 'image'>) => {
  const assetContainer = ElementModel.createDiv({
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

const createHeadline = (props: Pick<HeroLogoProps, 'headline' | 'isThemeDark' | 'isThemeMaryland'>) => {
  const { headline, isThemeDark, isThemeMaryland } = props;

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
    isThemeDark: isThemeDark || isThemeMaryland || false,
  });

  return headlineElement;
};

const createText = (props: Omit<HeroLogoProps, 'image' | 'video' | 'includesAnimation' | 'logo'>) => {
  const { isThemeDark, isThemeMaryland } = props;

  const textContainer = ElementModel.createDiv({
    className: 'umd-hero-logo__text',
    elementStyles: {
      element: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      },
    },
  });

  const textContent = ElementModel.createDiv({
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
    headlineComposite: createHeadline(props),
    textLargest: props.text,
    actions: props.actions,
    isThemeDark: isThemeDark || isThemeMaryland || false,
  });

  textContent.element.appendChild(textLockupElement.element);
  textContent.styles += textLockupElement.styles;

  textContainer.element.appendChild(textContent.element);
  textContainer.styles += textContent.styles;

  return textContainer;
};

const getBackgroundColor = (props: HeroLogoProps) => {
  const { isThemeDark, isThemeMaryland, isThemeLight } = props;

  if (isThemeDark) return Styles.token.color.black;
  if (isThemeMaryland) return Styles.token.color.red;
  if (isThemeLight) return Styles.token.color.gray.lightest;
  return Styles.token.color.white;
};

export default (props: HeroLogoProps) => {
  const { isThemeDark } = props;
  const composite = ElementModel.createDiv({
    className: 'umd-hero-logo',
  });

  const container = ElementModel.createDiv({
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
};
