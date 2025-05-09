/**
 * @module layout/grid/inline
 * Provides inline grid and flex layouts.
 */

import { media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-inline';

const columns = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  justifyContent: 'flex-start',
};

/**
 * Row flex layout for inline elements.
 * @returns {JssObject} Horizontal row with minimal gap between items.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.inline.row
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-inline-rows"
 * ```
 * @since 1.1.0
 */
export const row: JssObject = {
  className: `${classNamePrefix}-rows`,
  display: 'flex',
  gap: spacing.min,
  alignItems: 'center',
};

/**
 * Responsive tablet rows that stack on mobile.
 * @returns {JssObject} Column layout that changes to row on tablet and larger screens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.inline.tabletRows
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-inline-tablet-rows"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-inline-tablet-rows' instead of 'umd-grid-row-mobile-tablet'.
 * ```
 * @since 1.1.0
 */
export const tabletRows: JssObject = create.jss.objectWithClassName({
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

/**
 * Stretch layout with space between elements.
 * @returns {JssObject} Flex layout that stretches first child and positions others.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.inline.stretch
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-inline-stretch"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-inline-stretch' instead of 'umd-forms-layout-headline-with-action'.
 * ```
 * @since 1.1.0
 */
export const stretch: JssObject = create.jss.objectWithClassName({
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
