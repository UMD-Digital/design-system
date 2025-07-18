import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from 'utilities';
import { layout } from 'atomic';
import { ElementModel } from 'model';
import { PersonCard } from './_types';
import { ElementVisual } from '../../_types';

const smallBreakpoint = Styles.token.media.breakpointValues.small.max;

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
}: PersonCard) => {
  let children: ElementVisual[] = [];

  if (image) {
    children.push(
      layout.person.columns.image({
        image,
        isThemeDark,
      }),
    );
  }

  if (name) {
    const nameComposite = ElementModel.headline.sansLarge({
      element: name,
      elementStyles: {
        element: {
          fontWeight: `${Styles.token.font.weight.bold}`,
          color: `${Styles.token.color.black}`,

          [`& + *`]: {
            marginTop: Styles.token.spacing.min,
          },
        },
        subElement: {
          color: 'currentColor',
        },
      },
      isThemeDark,
    });

    children.push(
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
    children.push(
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

  return ElementModel.createDiv({
    className: 'person-tabular-container',
    children,
    elementStyles: {
      element: {
        maxWidth: `${Styles.token.spacing.maxWidth.smallest}`,
        paddingBottom: `${Styles.token.spacing.md}`,
        borderBottom: `1px solid ${Styles.token.color.gray.light}`,
        overflow: 'hidden',
        display: 'flex',

        ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
          flexDirection: 'column',
        }),

        ...(isThemeDark && {
          borderBottom: `1px solid ${Styles.token.color.gray.dark}`,
        }),
      },
    },
  });
};
