import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { assets, textLockup } from 'atomic';
import { type PersonBio } from '../_types';
import { type ElementModel } from '../../../_types';

const CreatePersonBioFullElement = (
  props: PersonBio,
): ElementModel<HTMLElement> => {
  const { isThemeDark, image, actions, description } = props;
  const { name, ...textProps } = props;

  const builder = new ElementBuilder()
    .withClassName('person-bio-full-container')
    .withStyles({
      element: {
        [`& .${elementStyles.asset.image.wrapper.className}`]: {
          [`@container (max-width: ${token.media.breakpointValues.medium.max}px)`]:
            {
              display: 'flex',
            },
        },
      },
    });

  if (image) {
    builder.withChild(
      assets.image.background({
        element: image,
        isScaled: false,
        imageLoading: 'lazy',
      }),
    );
  }

  if (name) {
    builder.withChild(
      new ElementBuilder(name)
        .styled(
          Styles.typography.sans.compose('extralarge', {
            theme: theme.fontColor(isThemeDark),
          }),
        )
        .withStyles({
          element: {
            marginTop: token.spacing.lg,
            textTransform: 'uppercase',
            fontWeight: '800',
            display: 'block',

            ...(!isThemeDark && { color: `${token.color.black}` }),
          },
          siblingAfter: {
            marginTop: token.spacing.min,
          },
        })
        .build(),
    );
  }

  builder.withChild(
    textLockup.person({
      isThemeDark,
      slotOne: textProps.slotOne,
      slotTwo: textProps.slotTwo,
      slotThreeItalic: textProps.slotThreeItalic,
      slotFour: textProps.slotFour,
    }),
  );
  builder.withChild(textLockup.contact(props));

  if (description) {
    builder.withChild(
      new ElementBuilder(description)
        .styled(
          Styles.element.text.rich.composeSimple({
            size: 'large',
            theme: theme.fontColor(isThemeDark),
          }),
        )
        .withStyles({
          element: {
            marginTop: token.spacing.lg,
            maxWidth: token.spacing.maxWidth.smallest,
          },
        })
        .build(),
    );
  }

  if (actions) {
    builder.withChild(
      new ElementBuilder(actions)
        .styled(Styles.layout.grid.inline.tabletRows)
        .withStyles({
          element: {
            marginTop: token.spacing.sm,
          },
        })
        .build(),
    );
  }

  return builder.build();
};

export const createCompositePersonBioFull = CreatePersonBioFullElement;
