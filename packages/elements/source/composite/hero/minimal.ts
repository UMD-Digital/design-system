import * as token from '@universityofmaryland/web-styles-library/token';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { type ElementVisual } from '../../_types';
import { assets, textLockup } from 'atomic';
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
  return isThemeDark || isThemeMaryland ? token.color.gold : token.color.red;
};

const getBackgroundColor = (props: HeroMinimalProps) => {
  const { isThemeDark, isThemeLight, isThemeMaryland } = props;

  if (isThemeDark) return token.color.black;
  if (isThemeMaryland) return token.color.red;
  if (isThemeLight) return token.color.gray.lightest;
  return 'transparent';
};

const createAsset = ({ image }: Pick<HeroMinimalProps, 'image'>) => {
  const children = buildAssetChildren({ image });

  if (children.length === 0) {
    return null;
  }

  return ElementBuilder.create.div({
    className: 'umd-hero-minimal__asset',
    children,
    elementStyles: {
      element: {
        [`@container (${token.media.queries.tablet.min})`]: {
          position: 'absolute',
          right: 0,
          top: 0,
          width: '50%',
          height: '100%',
        },

        ['& img']: {
          [`@container (${token.media.queries.tablet.min})`]: {
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
    [`@container (${token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: '64px',
      }),
    },
  };

  return ElementBuilder.styled.headline.campaignLarge({
    element: headline,
    elementStyles: {
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: token.spacing.sm,
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
      paddingLeft: token.spacing.md,
      borderLeft: `2px solid ${getBorderColor(isThemeDark, isThemeMaryland)}`,

      [`@container (${token.media.queries.desktop.min})`]: {
        paddingLeft: token.spacing.lg,
      },
    },
  };
};

const buildTextContainerStyles = (hasAsset: boolean) => {
  return {
    element: {
      padding: `${token.spacing.xl} 0`,

      [`@container (${token.media.queries.tablet.min})`]: {
        ...(hasAsset && {
          padding: `${token.spacing['4xl']} 0`,
          width: `calc(50% - ${token.spacing['4xl']})`,
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

  const textWrapper = ElementBuilder.create.div({
    className: 'umd-hero-minimal__text-wrapper',
    children: [textLockupElement],
    elementStyles: buildTextWrapperStyles(isThemeDark, isThemeMaryland),
  });

  const textContainer = ElementBuilder.create.div({
    className: 'umd-hero-minimal__text',
    children: [textWrapper],
    elementStyles: buildTextContainerStyles(hasAsset),
  });

  return ElementBuilder.styled.layout.spaceHorizontalLarger({
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

  return ElementBuilder.create.div({
    className: 'umd-hero-minimal',
    children,
    elementStyles: {
      element: {
        backgroundColor: getBackgroundColor(props),
        position: 'relative',
        display: 'flex',
        containerType: 'inline-size',

        [`@container (${token.media.queries.large.max})`]: {
          flexDirection: 'column-reverse',
        },

        [`@container (${token.media.queries.tablet.min})`]: {
          minHeight: '288px',
          alignItems: 'center',
        },
      },
    },
  });
};
