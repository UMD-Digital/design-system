import { media, spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-inline';

const columns = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  justifyContent: 'flex-start',
};

// umd-layout-grid-inline-tablet-rows
export const tabletRows = create.jssObject({
  ...columns,

  [`@media (${media.queries.large.min})`]: {
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

// umd-layout-grid-inline-stretch
export const stretch = create.jssObject({
  display: 'flex',
  flexWrap: 'wrap',
  gap: spacing.sm,
  justifyContent: 'space-between',
  position: 'relative',

  '& > *:first-child': {
    maxWidth: '100%',
    flex: '1 0 auto',
  },

  '& > *:first-child + *:last-child:not(:first-child)': {
    margin: 0,
    position: 'relative',
    zIndex: 999,
  },

  className: [
    `${classNamePrefix}-stretch`,
    /** @deprecated Use 'umd-layout-grid-inline-stretch' instead */
    'umd-forms-layout-headline-with-action',
  ],
});
