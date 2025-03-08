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

const elementStyles: Record<string, any> = {};

export default ({
  count = 2,
  isTypeGap = true,
}: {
  count?: number;
  isTypeGap?: boolean;
}) => {
  if (count === 1) {
    elementStyles.element = {
      gridGap: `${Styles.token.spacing.md}`,
    };

    return Model.ElementModel.layout.gridStacked({
      element: document.createElement('div'),
      elementStyles,
    });
  }

  // if (!isTypeGap) {
  //   elementStyles.element = {
  //     [` > *`]: {
  //       [`@media (${Styles.token.media.queries.large.min})`]: {
  //         minHeight: '560px',
  //       },
  //     },
  //   };
  // }

  return Model.ElementModel.layout.grid({
    element: document.createElement('div'),
    elementStyles,
    isGap: isTypeGap,
    isColumnsTwo: count === 2,
    isColumnsThree: count === 3,
    isColumnsFour: count === 4,
  });
};
