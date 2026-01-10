import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { assets, textLockup } from 'atomic';
import { type ElementModel } from '../../_types';
import { type HeroMinimalProps } from './_types';

const createImageAsset = (image: HTMLImageElement) => {
  return assets.image.background({
    element: image,
    isScaled: true,
    isGifAllowed: true,
    isShowCaption: true,
    imageLoading: 'eager',
    imageFetchPriority: 'high',
  });
};

const buildAssetChildren = ({
  image,
}: Pick<HeroMinimalProps, 'image'>): ElementModel<HTMLElement>[] => {
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

  return new ElementBuilder()
    .withClassName('umd-hero-minimal__asset')
    .withChildren(...children)
    .withStyles({
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
    })
    .build();
};

const createHeadline = (
  props: Pick<
    HeroMinimalProps,
    'headline' | 'isThemeDark' | 'isThemeLight' | 'isThemeMaryland'
  >,
): ElementModel<HTMLElement> | null => {
  const { headline, isThemeDark, isThemeMaryland } = props;
  const finalIsThemeDark = isThemeDark || isThemeMaryland;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 40;

  if (!headline) return null;

  return new ElementBuilder(headline)
    .styled(
      Styles.typography.campaign.compose('large', {
        theme: theme.fontColor(finalIsThemeDark),
      }),
    )
    .withStyles({
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',

        [`@container (${token.media.queries.desktop.min})`]: {
          ...(isOverwriteHeadline && {
            fontSize: '64px',
          }),
        },
      },
      siblingAfter: {
        marginTop: token.spacing.sm,
      },
    })
    .build();
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

  const textWrapper = new ElementBuilder()
    .withClassName('umd-hero-minimal__text-wrapper')
    .withChild(textLockupElement)
    .withStyles(buildTextWrapperStyles(isThemeDark, isThemeMaryland))
    .build();

  const textContainer = new ElementBuilder()
    .withClassName('umd-hero-minimal__text')
    .withChild(textWrapper)
    .withStyles(buildTextContainerStyles(hasAsset))
    .build();

  return new ElementBuilder()
    .styled(Styles.layout.space.horizontal.larger)
    .withChild(textContainer)
    .withStyles({
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
    })
    .build();
};

export const createCompositeHeroMinimal = (props: HeroMinimalProps) => {
  const asset = createAsset(props);
  const text = createText(props, !!asset);

  const container = new ElementBuilder()
    .withClassName('umd-hero-minimal')
    .withChild(text)
    .withStyles({
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
    });

  if (asset) {
    container.withChild(asset);
  }

  return container.build();
};
