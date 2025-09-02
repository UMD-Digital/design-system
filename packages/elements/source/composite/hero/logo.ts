import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type HeroLogoProps } from './_types';
import { type ElementVisual } from '../../_types';

const getBackgroundColor = (props: HeroLogoProps) => {
  const { isThemeDark, isThemeMaryland, isThemeLight } = props;

  if (isThemeDark) return Styles.token.color.black;
  if (isThemeMaryland) return Styles.token.color.red;
  if (isThemeLight) return Styles.token.color.gray.lightest;
  return Styles.token.color.white;
};

const createAsset = ({ image }: Pick<HeroLogoProps, 'image'>) => {
  if (!image) return null;

  return ElementModel.createDiv({
    className: 'umd-hero-logo__asset',
    children: [
      assets.image.background({
        element: image,
        isScaled: false,
      }),
    ],
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
};

const createHeadline = (
  props: Pick<HeroLogoProps, 'headline' | 'isThemeDark' | 'isThemeMaryland'>,
) => {
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

const createText = (
  props: Omit<HeroLogoProps, 'image' | 'video' | 'includesAnimation' | 'logo'>,
) => {
  const { isThemeDark, isThemeMaryland } = props;

  const textLockupElement = textLockup.large({
    ribbon: props.eyebrow,
    headlineComposite: createHeadline(props),
    textLargest: props.text,
    actions: props.actions,
    isThemeDark: isThemeDark || isThemeMaryland || false,
  });

  const textContent = ElementModel.createDiv({
    className: 'umd-hero-logo__text-content',
    children: [textLockupElement],
    elementStyles: {
      element: {
        [`& .${Styles.element.text.rich.simpleLargest.className}`]: {
          color: Styles.token.color.gray.dark,
        },
      },
    },
  });

  return ElementModel.createDiv({
    className: 'umd-hero-logo__text',
    children: [textContent],
    elementStyles: {
      element: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      },
    },
  });
};

const makeLock = (props: HeroLogoProps) => {
  const asset = createAsset(props);
  const text = createText(props);
  const children: ElementVisual[] = [];

  if (asset) {
    children.push(asset);
  }

  children.push(text);

  return ElementModel.layout.spaceHorizontalSmall({
    element: document.createElement('div'),
    children,
  });
};

export default (props: HeroLogoProps) => {
  const { isThemeDark } = props;

  const container = ElementModel.createDiv({
    className: 'umd-hero-logo__container',
    children: [makeLock(props)],
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

  return ElementModel.createDiv({
    className: 'umd-hero-logo',
    children: [container],
    elementStyles: {
      element: {
        containerType: 'inline-size',
      },
    },
  });
};
