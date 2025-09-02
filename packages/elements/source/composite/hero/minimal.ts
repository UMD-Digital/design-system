import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';
import { type HeroMinimalProps } from './_types';

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
}: Pick<HeroMinimalProps, 'image'>): ElementVisual[] => {
  if (!image) return [];
  return [createImageAsset(image)];
};

const getBorderColor = (isThemeDark?: boolean, isThemeMaryland?: boolean) => {
  return isThemeDark || isThemeMaryland
    ? Styles.token.color.gold
    : Styles.token.color.red;
};

const getBackgroundColor = (props: HeroMinimalProps) => {
  const { isThemeDark, isThemeLight, isThemeMaryland } = props;

  if (isThemeDark) return Styles.token.color.black;
  if (isThemeMaryland) return Styles.token.color.red;
  if (isThemeLight) return Styles.token.color.gray.lightest;
  return 'transparent';
};

const createAsset = ({ image }: Pick<HeroMinimalProps, 'image'>) => {
  const children = buildAssetChildren({ image });

  if (children.length === 0) {
    return null;
  }

  return ElementModel.createDiv({
    className: 'umd-hero-minimal__asset',
    children,
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
};

const createHeadline = (
  props: Pick<
    HeroMinimalProps,
    'headline' | 'isThemeDark' | 'isThemeLight' | 'isThemeMaryland'
  >,
) => {
  const { headline, isThemeDark, isThemeMaryland } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 40;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${Styles.token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: '64px',
      }),
    },
  };

  return ElementModel.headline.campaignLarge({
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
};

const buildTextWrapperStyles = (
  isThemeDark?: boolean,
  isThemeMaryland?: boolean,
) => {
  return {
    element: {
      paddingLeft: Styles.token.spacing.md,
      borderLeft: `2px solid ${getBorderColor(isThemeDark, isThemeMaryland)}`,

      [`@container (${Styles.token.media.queries.desktop.min})`]: {
        paddingLeft: Styles.token.spacing.lg,
      },
    },
  };
};

const buildTextContainerStyles = (hasAsset: boolean) => {
  return {
    element: {
      padding: `${Styles.token.spacing.xl} 0`,

      [`@container (${Styles.token.media.queries.tablet.min})`]: {
        ...(hasAsset && {
          padding: `${Styles.token.spacing['4xl']} 0`,
          width: `calc(50% - ${Styles.token.spacing['4xl']})`,
        }),
      },
    },
  };
};

const createText = (props: HeroMinimalProps, hasAsset: boolean) => {
  const { isThemeDark, isThemeMaryland } = props;

  const textLockupElement = textLockup.large({
    eyebrow: props.eyebrow,
    headlineComposite: createHeadline(props),
    text: props.text,
    actions: props.actions,
    isThemeDark: isThemeDark || isThemeMaryland || false,
  });

  const textWrapper = ElementModel.createDiv({
    className: 'umd-hero-minimal__text-wrapper',
    children: [textLockupElement],
    elementStyles: buildTextWrapperStyles(isThemeDark, isThemeMaryland),
  });

  const textContainer = ElementModel.createDiv({
    className: 'umd-hero-minimal__text',
    children: [textWrapper],
    elementStyles: buildTextContainerStyles(hasAsset),
  });

  return ElementModel.layout.spaceHorizontalLarger({
    element: document.createElement('div'),
    children: [textContainer],
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
    },
  });
};

export default (props: HeroMinimalProps) => {
  const asset = createAsset(props);
  const text = createText(props, !!asset);

  const children: ElementVisual[] = [text];
  if (asset) {
    children.push(asset);
  }

  return ElementModel.createDiv({
    className: 'umd-hero-minimal',
    children,
    elementStyles: {
      element: {
        backgroundColor: getBackgroundColor(props),
        position: 'relative',
        display: 'flex',
        containerType: 'inline-size',

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
};
