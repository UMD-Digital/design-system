import { Media } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-child';

// umd-layout-grid-child-size-double
export const sizeDouble = create.jssObject({
  [`@media (${Media.queries.large.min})`]: {
    gridColumn: 'span 2',
  },

  className: [
    `${classNamePrefix}-size-double`,
    /** @deprecated Use 'umd-layout-grid-child-size-double' instead */
    'umd-grid-column-double',
  ],
});

// umd-layout-grid-child-start-second
export const startSecond = create.jssObject({
  [`@media (${Media.queries.highDef.min})`]: {
    gridColumnStart: '2',
  },

  className: `${classNamePrefix}-start-second`,
});
