import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { type ElementModel } from '../../_types';
import { layout } from 'atomic';
import { PersonCard } from './_types';

const smallBreakpoint = token.media.breakpointValues.small.max;

export default ({
  actions,
  additionalContact,
  address,
  association,
  email,
  image,
  isThemeDark,
  job,
  linkendIn,
  name,
  phone,
  pronouns,
  subText,
}: PersonCard): ElementModel<HTMLElement> => {
  const builder = new ElementBuilder()
    .withClassName('person-tabular-container')
    .withStyles({
      element: {
        overflow: 'hidden',
        display: 'flex',

        ...createMediaQuery('max-width', smallBreakpoint, {
          flexDirection: 'column',
        }),
      },
    });

  if (image) {
    builder.withChild(
      layout.person.columns.image({
        image,
        isThemeDark,
      }),
    );
  }

  if (name) {
    const nameModel = new ElementBuilder(name)
      .styled(Styles.typography.sans.fonts.large)
      .withThemeDark(isThemeDark)
      .withStyles({
        element: {
          fontWeight: `${token.font.weight.bold}`,
          color: `${token.color.black}`,

          [`& + *`]: {
            marginTop: token.spacing.min,
          },
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .build();

    const nameComposite = {
      ...nameModel,
      className: 'person-tabular-name',
    };

    builder.withChild(
      layout.person.columns.details({
        actions,
        association,
        isThemeDark,
        customStyles: {},
        job,
        nameComposite,
        pronouns,
        subText,
      }),
    );
  }

  if (additionalContact || address || email || linkendIn || phone) {
    builder.withChild(
      layout.person.columns.contact({
        additionalContact,
        address,
        customStyles: {},
        email,
        isThemeDark,
        linkendIn,
        phone,
      }),
    );
  }

  return builder.build();
};
