import { Media, Spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-inline';

const columns = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: Spacing.sm,
  justifyContent: 'flex-start',
};

// umd-layout-grid-inline-tablet-rows
export const tabletRows = create.jssObject({
  ...columns,

  [`@media (${Media.queries.large.min})`]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  className: [
    `${classNamePrefix}-tablet-rows`,
    /** @deprecated Use 'umd-layout-grid-inline-tablet-rows' instead */
    'umd-grid-row-mobile-tablet',
  ],
});
