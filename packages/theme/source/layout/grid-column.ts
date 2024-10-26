import { Tokens, Layout } from '@universityofmaryland/variables';

const { Queries } = Tokens;

const { GridAnimationTwo, GridAnimationThree, GridAnimationFour } = Layout;

export const GridColumn = {
  '.umd-grid-column-double': {
    [`@media (${Queries.large.min})`]: {
      gridColumn: 'span 2',
    },
  },
};

export default {
  ...GridColumn,
  '.umd-grid-animation-two': {
    ...GridAnimationTwo,
  },
  '.umd-grid-animation-three': {
    ...GridAnimationThree,
  },
  '.umd-grid-animation-four': {
    ...GridAnimationFour,
  },
};
