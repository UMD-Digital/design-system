import * as token from '@universityofmaryland/web-styles-library/token';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { ElementModel } from 'model';
import { layout } from 'atomic';
import { PersonCard } from './_types';
import { ElementVisual } from '../../_types';

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
          fontWeight: `${token.font.weight.bold}`,
          color: `${token.color.black}`,

          [`& + *`]: {
            marginTop: token.spacing.min,
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
        overflow: 'hidden',
        display: 'flex',

        ...createMediaQuery('max-width', smallBreakpoint, {
          flexDirection: 'column',
        }),
      },
    },
  });
};
