import * as token from '@universityofmaryland/web-styles-library/token';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { ElementModel } from 'model';
import { layout } from 'atomic';
import { PersonCard } from './_types';
import { ElementVisual } from '../../_types';

const smallBreakpoint = token.media.breakpointValues.small.max;
const mediumBreakpointStart = token.media.breakpointValues.medium.min;
const mediumBreakpoint = token.media.breakpointValues.large.min;

export default ({
  actions,
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
        customStyles: {
          ...createMediaQuery('min-width', mediumBreakpointStart, {
            display: 'block',
            width: '160px',
            paddingRight: `${token.spacing.md}`,
            alignSelf: 'flex-start',
          }),

          ...createMediaQuery('min-width', mediumBreakpoint, {
            width: '208px',
          }),
        },
        image,
        isThemeDark,
      }),
    );
  }

  if (name) {
    children.push(
      layout.person.columns.information({
        actions,
        address,
        association,
        customStyles: {},
        email,
        isThemeDark,
        job,
        linkendIn,
        name,
        phone,
        pronouns,
        subText,
      }),
    );
  }

  return ElementModel.createDiv({
    className: 'person-list-container',
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
