import * as Styles from '@universityofmaryland/web-styles-library';
import { Model } from '@universityofmaryland/web-elements-library';

export const stacked = () =>
  Model.ElementModel.layout.gridStacked({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        gridGap: `${Styles.token.spacing.md}`,
        [` > *`]: {
          containerType: 'inline-size',
        },
      },
    },
  });

export const grid = ({ count = 2 }: { count?: number; isTypeGap?: boolean }) =>
  Model.ElementModel.layout.grid({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        [` > *`]: {
          containerType: 'inline-size',
          [`@media (${Styles.token.media.queries.large.min})`]: {
            minHeight: '560px !important',
          },
        },
      },
    },
    isGap: false,
    isColumnsTwo: count === 2,
    isColumnsThree: count === 3,
    isColumnsFour: count === 4,
  });

export const gridGap = ({ count = 2 }: { count?: number }) =>
  Model.ElementModel.layout.grid({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        [` > *`]: {
          alignSelf: 'flex-start',
          containerType: 'inline-size',
        },
      },
    },
    isGap: true,
    isColumnsTwo: count === 2,
    isColumnsThree: count === 3,
    isColumnsFour: count === 4,
  });

export const gridOffsetGap = ({
  count = 2,
  isLayoutReversed,
  overwriteStickyPosition = 0,
}: {
  count?: number;
  isLayoutReversed?: boolean;
  overwriteStickyPosition?: number;
}) =>
  Model.ElementModel.layout.grid({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        [` > *`]: {
          alignSelf: 'flex-start',
          containerType: 'inline-size',
        },

        [` > *:first-child`]: {
          order: isLayoutReversed ? 2 : -1,
        },

        [`& .${Styles.element.composite.card.overlay.image.tint.className}`]: {
          [`@media (${Styles.token.media.queries.large.min})`]: {
            minHeight: '560px !important',
            height: 'inherit',
            position: 'sticky',
            top: `${overwriteStickyPosition}px`,
          },

          [`*`]: {
            color: `${Styles.token.color.white}`,
          },
        },
      },
    },
    isGap: true,
    isColumnsTwo: count === 2,
    isColumnsThree: count === 3,
    isColumnsFour: count === 4,
  });
