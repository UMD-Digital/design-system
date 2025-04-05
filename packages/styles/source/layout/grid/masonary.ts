/**
 * @module layout/grid/masonary
 * Provides masonry grid layouts with staggered elements.
 */

import { spacing, media } from '../../token';
import { create } from '../../utilities';
import { JssObject } from '../../utilities/transform';

/**
 * Two-column masonry grid layout.
 * @returns {JssObject} Two-column masonry grid with staggered elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.masonary.twoColumn
 * ```
 * @since 1.8.0
 */
export const twoColumn: JssObject = create.jssObject({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: spacing.md,

  className: [
    `umd-layout-grid-masonry`,
    /** @deprecated Use 'umd-layout-grid-masonry' instead */
    'umd-grid-gap-masonry',
  ],

  [`@media (${media.queries.tablet.min})`]: {
    gridTemplateColumns: '1fr 1fr',
    gridGap: spacing.lg,
  },

  [`@media (${media.queries.desktop.min})`]: {
    gridGap: spacing.xl,
  },

  '& > *': {
    '& > *': {
      width: '100%',
      height: '100%',
    },
  },

  '& > *:nth-of-type(odd)': {
    [`@media (${media.queries.tablet.min})`]: {
      marginTop: `-${spacing.lg}`,
      marginBottom: `${spacing.lg}`,
    },

    [`@media (${media.queries.desktop.min})`]: {
      marginTop: `-${spacing.xl}`,
      marginBottom: `${spacing.xl}`,
    },
  },

  '& > *:nth-of-type(even)': {
    [`@media (${media.queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:first-child': {
    [`@media (${media.queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:nth-of-type(2)': {
    [`@media (${media.queries.tablet.min})`]: {
      marginTop: `${spacing.lg}`,
    },

    [`@media (${media.queries.desktop.min})`]: {
      marginTop: `${spacing.xl}`,
    },
  },
});
