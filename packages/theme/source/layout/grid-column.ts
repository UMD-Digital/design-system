import { Tokens } from '@universityofmaryland/variables';

const { Queries } = Tokens;

export const GridColumn = {
  '.umd-grid-column-double': {
    [`@media (${Queries.large.min})`]: {
      gridColumn: 'span 2',
    },
  },
};

export default {
  ...GridColumn,
};
