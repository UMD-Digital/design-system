import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type ElementModel } from '../../../_types';
import { assets, textLockup } from 'atomic';
import { type PersonBio } from '../_types';

export default (props: PersonBio): ElementModel<HTMLElement> => {
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
      }),
    );
  }

  if (name) {
    builder.withChild(
      new ElementBuilder(name)
        .styled(Styles.typography.sans.fonts.extraLarge)
        .withThemeDark(isThemeDark)
        .withStyles({
          element: {
            marginTop: token.spacing.lg,
            color: `${token.color.black}`,
            textTransform: 'uppercase',
            fontWeight: '800',
            display: 'block',
          },
          siblingAfter: {
            marginTop: token.spacing.min,
          },
        })
        .build(),
    );
  }

  builder.withChild(textLockup.person(textProps));
  builder.withChild(textLockup.contact(props));

  if (description) {
    builder.withChild(
      new ElementBuilder(description)
        .styled(Styles.element.text.rich.simpleLarge)
        .withThemeDark(isThemeDark)
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
