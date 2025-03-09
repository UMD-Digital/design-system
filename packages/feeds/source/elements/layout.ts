import * as Styles from '@universityofmaryland/web-styles-library';
import { Model } from '@universityofmaryland/web-elements-library';

// @media (${token.media.queries.large.min}) {
//   .umd-grid-column-double {
//     grid-column: span 2;
//     min-height: 560px;
//   }
// }

// @media (${token.media.queries.highDef.min}) {
//   .${ID_GRID_LAYOUT_CONTAINER}[data-reversed] > *:first-child {
//     order: 2;
//   }
// }

export const stacked = Model.ElementModel.layout.gridStacked({
  element: document.createElement('div'),
  elementStyles: {
    element: {
      gridGap: `${Styles.token.spacing.md}`,
    },
  },
});

export const grid = ({ count = 2 }: { count?: number; isTypeGap?: boolean }) =>
  Model.ElementModel.layout.grid({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        [` > *`]: {
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
    isGap: true,
    isColumnsTwo: count === 2,
    isColumnsThree: count === 3,
    isColumnsFour: count === 4,
  });
