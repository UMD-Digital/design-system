import { color, spacing } from '../token';
import { sans } from '../typography';
import { create } from '../utilities';

// Consistent naming
const classNamePrefix = 'umd-table';

// umd-table-inline
export const inline = create.jssObject({
  borderCollapse: 'collapse',
  display: 'block',
  overflowX: 'auto',
  tableLayout: 'fixed',
  maxWidth: '100%',

  '& th': sans.large,
  '& td': sans.small,

  '& th, & td': {
    padding: `${spacing.md}`,
    verticalAlign: 'top',

    '&:first-child': {
      paddingLeft: spacing.md,
    },

    '&:last-Child': {
      paddingRight: spacing.md,
    },
  },

  '& thead th': {
    background: color.gray.lighter,
    color: color.black,
    textAlign: 'left',
  },

  '& tbody tr': {
    borderTop: `1px solid ${color.gray.light}`,
  },

  '& tr:nth-child(even)': {
    background: color.gray.lightest,
  },

  className: [
    `${classNamePrefix}-inline`,
    /** @deprecated Use 'umd-table-inline' instead */
    `umd-rich-text-inline-table`,
  ],
});
