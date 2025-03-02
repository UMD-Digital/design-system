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

const elementStyles = {
  element: {
    [` *`]: {
      minHeight: '560px',
    },
  },
};

export default ({
  count = 2,
  isTypeGap = true,
}: {
  count?: number;
  isTypeGap?: boolean;
}) =>
  Model.ElementModel.layout.grid({
    element: document.createElement('div'),
    elementStyles,
    isGap: isTypeGap,
    isColumnsTwo: count === 2,
    isColumnsThree: count === 3,
    isColumnsFour: count === 4,
  });
