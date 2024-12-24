import { Colors, Spacing } from '../tokens';
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
    padding: `${Spacing.md}`,
    verticalAlign: 'top',

    '&:first-child': {
      paddingLeft: Spacing.md,
    },

    '&:last-Child': {
      paddingRight: Spacing.md,
    },
  },

  '& thead th': {
    background: Colors.gray.lighter,
    color: Colors.black,
    textAlign: 'left',
  },

  '& tbody tr': {
    borderTop: `1px solid ${Colors.gray.light}`,
  },

  '& tr:nth-child(even)': {
    background: Colors.gray.lightest,
  },

  className: [
    `${classNamePrefix}-inline`,
    /** @deprecated Use 'umd-table-inline' instead */
    `umd-rich-text-inline-table`,
  ],
});
