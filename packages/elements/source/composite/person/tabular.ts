import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as animationStyles from '@universityofmaryland/web-styles-library/animation';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { wrapTextNodeInSpan } from '@universityofmaryland/web-utilities-library/dom';
import { layout } from 'atomic';
import { PersonCard } from './_types';
import { type UMDElement } from '../../_types';

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
  linkedin,
  name,
  phone,
  pronouns,
  subText,
}: PersonCard): UMDElement => {
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
    const nameStyles = {
      ...typography.sans.compose('large', {
        theme: theme.fontColor(isThemeDark),
      }),
      ...animationStyles.line.composeSlideUnder({
        color: theme.foreground(isThemeDark),
      }),
    };

    const nameComposite = new ElementBuilder(name)
      .withClassName('person-tabular-name')
      .styled(nameStyles)
      .withStyles({
        element: {
          fontWeight: `${token.font.weight.bold}`,

          [`& + *`]: {
            marginTop: token.spacing.min,
          },
        },
        subElement: {
          color: 'currentColor',
        },
      })
      .withModifier((el) => wrapTextNodeInSpan(el))
      .build();

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

  if (additionalContact || address || email || linkedin || phone) {
    builder.withChild(
      layout.person.columns.contact({
        additionalContact,
        address,
        customStyles: {},
        email,
        isThemeDark,
        linkedin,
        phone,
      }),
    );
  }

  return builder.build();
};
