/**
 * @module layout/space/columns
 * Provides column layouts with fixed-width sidebars.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-space-columns';

/**
 * Left sidebar column layout.
 * @returns {JssObject} Layout with fixed-width left sidebar that hides on mobile.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.columns.left
 * ```
 * @since 1.8.0
 */
export const left: JssObject = create.jssObject({
  [`@media (${media.queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${media.queries.tablet.max})`]: {
      display: 'none',
    },

    [`@media (${media.queries.tablet.min})`]: {
      marginRight: spacing['max'],
      width: '242px',
    },
  },

  '& > *:last-child': {
    [`@media (${media.queries.tablet.min})`]: {
      width: 'calc(100% - 242px)',
    },
  },

  className: [
    `${classNamePrefix}-left`,
    /** @deprecated Use 'umd-layout-space-columns-left' instead */
    'umd-layout-interior-navigation',
  ],
});

/**
 * Right sidebar column layout.
 * @returns {JssObject} Layout with fixed-width right sidebar that stacks on mobile.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.columns.right
 * ```
 * @since 1.8.0
 */
export const right: JssObject = create.jssObject({
  ...left,

  [`@media (${media.queries.tablet.min})`]: {
    display: 'flex',
  },

  '& > *:first-child': {
    [`@media (${media.queries.tablet.min})`]: {
      width: `calc(100% - 322px)`,
    },
  },

  '& > *:last-child': {
    paddingTop: spacing.md,
    borderTop: `1px solid ${color.black}`,

    [`@media (${media.queries.large.max})`]: {
      marginTop: spacing['3xl'],
    },

    [`@media (${media.queries.tablet.min})`]: {
      marginLeft: spacing['7xl'],
      width: '322px',
    },
  },

  className: [
    `${classNamePrefix}-right`,
    /** @deprecated Use 'umd-layout-space-columns-right' instead */
    'umd-layout-interior-sidebar',
  ],
});
