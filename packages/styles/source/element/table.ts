/**
 * @module element/table
 * Provides table styling components.
 */

import { color, spacing } from '../token';
import { sans } from '../typography';
import { create } from '../utilities';
import type { JssObject } from '../_types';

// Consistent naming
const classNamePrefix = 'umd-table';

/**
 * Inline table styling with responsive overflow.
 * @returns {JssObject} Inline table with responsive overflow and consistent styling.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.table.inline
 * ```
 * @example
 * ```css
 * class="umd-table-inline"
 * ```
 * @example
 * ```text
 * Use 'umd-table-inline' instead of 'umd-rich-text-inline-table'.
 * ```
 * @since 1.8.0
 */
export const inline: JssObject = create.jssObject({
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
