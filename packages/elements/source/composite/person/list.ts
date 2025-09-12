import * as Styles from '@universityofmaryland/web-styles-library';
import { theme } from 'utilities';
import { layout } from 'atomic';
import { ElementModel } from 'model';
import { PersonCard } from './_types';
import { ElementVisual } from '../../_types';

const smallBreakpoint = Styles.token.media.breakpointValues.small.max;
const mediumBreakpointStart = Styles.token.media.breakpointValues.medium.min;
const mediumBreakpoint = Styles.token.media.breakpointValues.large.min;

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
          ...theme.media.createContainerQuery(
            'min-width',
            mediumBreakpointStart,
            {
              display: 'block',
              width: '160px',
              paddingRight: `${Styles.token.spacing.md}`,
              alignSelf: 'flex-start',
            },
          ),

          ...theme.media.createContainerQuery('min-width', mediumBreakpoint, {
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

        ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
          flexDirection: 'column',
        }),
      },
    },
  });
};
