import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type ElementModel } from '../../_types';
import { assets, textLockup } from 'atomic';
import { type HeroLogoProps } from './_types';

const getBackgroundColor = (props: HeroLogoProps) => {
  const { isThemeDark, isThemeMaryland, isThemeLight } = props;

  if (isThemeDark) return token.color.black;
  if (isThemeMaryland) return token.color.red;
  if (isThemeLight) return token.color.gray.lightest;
  return token.color.white;
};

const createAsset = ({ image }: Pick<HeroLogoProps, 'image'>) => {
  if (!image) return null;

  return new ElementBuilder()
    .withClassName('umd-hero-logo__asset')
    .withChild(
      assets.image.background({
        element: image,
        isScaled: false,
      }),
    )
    .withStyles({
      element: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        marginBottom: token.spacing.xl,

        ['& img']: {
          maxWidth: '100%',
          maxHeight: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    })
    .build();
};

const createHeadline = (
  props: Pick<HeroLogoProps, 'headline' | 'isThemeDark' | 'isThemeMaryland'>,
): ElementModel<HTMLElement> | null => {
  const { headline, isThemeDark, isThemeMaryland } = props;

  if (!headline) return null;

  return new ElementBuilder(headline)
    .styled(Styles.typography.campaign.fonts.large)
    .withStyles({
      element: {
        textTransform: 'uppercase',
      },
      siblingAfter: {
        marginTop: token.spacing.sm,
      },
    })
    .withThemeDark(isThemeDark || isThemeMaryland || false)
    .build();
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

  const textContent = new ElementBuilder()
    .withClassName('umd-hero-logo__text-content')
    .withChild(textLockupElement)
    .withStyles({
      element: {
        [`& .${elementStyles.text.rich.simpleLargest.className}`]: {
          color: token.color.gray.dark,
        },
      },
    })
    .build();

  return new ElementBuilder()
    .withClassName('umd-hero-logo__text')
    .withChild(textContent)
    .withStyles({
      element: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      },
    })
    .build();
};

const makeLock = (props: HeroLogoProps) => {
  const asset = createAsset(props);
  const text = createText(props);

  const builder = new ElementBuilder().styled(
    Styles.layout.space.horizontal.small,
  );

  if (asset) {
    builder.withChild(asset);
  }

  builder.withChild(text);

  return builder.build();
};

export default (props: HeroLogoProps) => {
  const { isThemeDark } = props;

  const container = new ElementBuilder()
    .withClassName('umd-hero-logo__container')
    .withChild(makeLock(props))
    .withStyles({
      element: {
        padding: `${token.spacing['5xl']} 0 ${token.spacing.lg}`,
        backgroundColor: getBackgroundColor(props),

        // Dark them should have additonal padding at the bottom
        [`@container (${token.media.queries.desktop.min})`]: {
          ...(isThemeDark && {
            paddingBottom: `${token.spacing['5xl']}`,
          }),
        },
      },
    })
    .build();

  return new ElementBuilder()
    .withClassName('umd-hero-logo')
    .withChild(container)
    .withStyles({
      element: {
        containerType: 'inline-size',
      },
    })
    .build();
};
