import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';
import { type HeroMinimalProps } from './_types';

const CLASS_NAMES = {
  CONTAINER: 'umd-hero-minimal',
  ASSET: 'umd-hero-minimal__asset',
  TEXT: 'umd-hero-minimal__text',
  TEXT_WRAPPER: 'umd-hero-minimal__text-wrapper',
} as const;

const THEME_VALUES = {
  HEADLINE_CHAR_THRESHOLD: 40,
  HEADLINE_LARGE_SIZE: '64px',
  HEADLINE_FONT_WEIGHT: 800,
  MIN_HEIGHT: '288px',
  WIDTHS: {
    ASSET: '50%',
    TEXT_WITH_ASSET: `calc(50% - ${Styles.token.spacing['4xl']})`,
  },
  BORDER_WIDTH: '2px',
} as const;

const ASSET_STYLES = {
  CONTAINER: {
    [`@container (${Styles.token.media.queries.tablet.min})`]: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: THEME_VALUES.WIDTHS.ASSET,
      height: '100%',
    },
  },
  IMAGE: {
    [`@container (${Styles.token.media.queries.tablet.min})`]: {
      objectFit: 'cover',
      objectPosition: 'center',
      height: '100%',
      width: '100%',
    },
  },
} as const;

const createImageAsset = (image: HTMLImageElement) => {
  return assets.image.background({
    image,
    isScaled: true,
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
    className: CLASS_NAMES.ASSET,
    children,
    elementStyles: {
      element: {
        ...ASSET_STYLES.CONTAINER,
        ['& img']: ASSET_STYLES.IMAGE,
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
  const isOverwriteHeadline =
    characterCount > THEME_VALUES.HEADLINE_CHAR_THRESHOLD;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${Styles.token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: THEME_VALUES.HEADLINE_LARGE_SIZE,
      }),
    },
  };

  return ElementModel.headline.campaignLarge({
    element: headline,
    elementStyles: {
      element: {
        fontWeight: THEME_VALUES.HEADLINE_FONT_WEIGHT,
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
      borderLeft: `${THEME_VALUES.BORDER_WIDTH} solid ${getBorderColor(
        isThemeDark,
        isThemeMaryland,
      )}`,

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
          width: THEME_VALUES.WIDTHS.TEXT_WITH_ASSET,
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
    className: CLASS_NAMES.TEXT_WRAPPER,
    children: [textLockupElement],
    elementStyles: buildTextWrapperStyles(isThemeDark, isThemeMaryland),
  });

  const textContainer = ElementModel.createDiv({
    className: CLASS_NAMES.TEXT,
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

const buildCompositeStyles = (props: HeroMinimalProps) => {
  return {
    element: {
      backgroundColor: getBackgroundColor(props),
      position: 'relative',
      display: 'flex',

      [`@container (${Styles.token.media.queries.large.max})`]: {
        flexDirection: 'column-reverse',
      },

      [`@container (${Styles.token.media.queries.tablet.min})`]: {
        minHeight: THEME_VALUES.MIN_HEIGHT,
        alignItems: 'center',
      },
    },
  };
};

export default (props: HeroMinimalProps) => {
  const asset = createAsset(props);
  const text = createText(props, !!asset);

  const children: ElementVisual[] = [text];
  if (asset) {
    children.push(asset);
  }

  return ElementModel.createDiv({
    className: CLASS_NAMES.CONTAINER,
    children,
    elementStyles: buildCompositeStyles(props),
  });
};
