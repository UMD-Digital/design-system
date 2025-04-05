/**
 * @module layout/grid/gap
 * Provides grid layouts with different gap sizes and configurations.
 */

import { media, spacing } from '../../token';
import { create } from '../../utilities';
import { JssObject } from '../../utilities/transform';
import { base } from './base';
import { startSecond } from './child';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-gap';

const fourColumnCenteredChild = {
  '& > *:first-child': {
    ...startSecond,
  },
};

const paragraphOverwrite = {
  '& > p:not(:last-child)': {
    marginBottom: 0,
  },
};

/**
 * Two-column grid layout with responsive gaps.
 * @returns {JssObject} Two-column grid with defined gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.two
 * ```
 * @since 1.8.0
 */
export const two: JssObject = create.jssObject({
  ...base.two,

  [`@media (${media.queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: spacing.lg,
    ...paragraphOverwrite,
  },

  [`@media (${media.queries.desktop.min})`]: {
    gridGap: spacing.xl,
  },

  className: [
    `${classNamePrefix}-two`,
    /** @deprecated Use 'umd-layout-grid-gap-two' instead */
    'umd-grid-gap',
  ],
});

/**
 * Three-column grid layout with responsive gaps.
 * @returns {JssObject} Three-column grid with defined gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.three
 * ```
 * @since 1.8.0
 */
export const three: JssObject = create.jssObject({
  ...base.three,

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
    ...paragraphOverwrite,
  },

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-gap-three' instead */
    'umd-grid-gap-three',
  ],
});

/**
 * Three-column grid layout with larger gaps.
 * @returns {JssObject} Three-column grid with larger gaps for desktop screens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.threeLarge
 * ```
 * @since 1.8.0
 */
export const threeLarge: JssObject = create.jssObject({
  ...base.three,

  [`@media (${media.queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: spacing.xl,
    ...paragraphOverwrite,
  },

  className: [
    `${classNamePrefix}-three-large`,
    /** @deprecated Use 'umd-layout-grid-gap-three-large' instead */
    'umd-grid-gap-three-large',
  ],
});

/**
 * Four-column grid layout with responsive gaps.
 * @returns {JssObject} Four-column grid with defined gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.four
 * ```
 * @since 1.8.0
 */
export const four: JssObject = create.jssObject({
  ...base.four,

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
    ...paragraphOverwrite,
  },

  className: [
    `${classNamePrefix}-four`,
    /** @deprecated Use 'umd-layout-grid-gap-four' instead */
    'umd-grid-gap-four',
  ],
});

/**
 * Four-column centered grid layout with responsive gaps.
 * @returns {JssObject} Four-column centered grid with defined gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.fourCentered
 * ```
 * @since 1.8.0
 */
export const fourCentered: JssObject = create.jssObject({
  ...base.four,

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
    ...paragraphOverwrite,
  },

  ...fourColumnCenteredChild,

  className: [
    `${classNamePrefix}-four-centered`,
    /** @deprecated Use 'umd-layout-grid-gap-four-centered' instead */
    'umd-grid-gap-four-center',
  ],
});

/**
 * Four-column grid layout with larger gaps.
 * @returns {JssObject} Four-column grid with larger gaps for high-definition screens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.fourLarge
 * ```
 * @since 1.8.0
 */
export const fourLarge: JssObject = create.jssObject({
  ...base.four,

  [`@media (${media.queries.highDef.min})`]: {
    gridGap: spacing.xl,
    ...paragraphOverwrite,
  },

  className: [
    `${classNamePrefix}-four-large`,
    /** @deprecated Use 'umd-layout-grid-gap-four-large' instead */
    'umd-grid-gap-four-large',
  ],
});

/**
 * Four-column centered grid layout with larger gaps.
 * @returns {JssObject} Four-column centered grid with larger gaps for high-definition screens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.fourLargeCentered
 * ```
 * @since 1.8.0
 */
export const fourLargeCentered: JssObject = create.jssObject({
  ...base.four,

  [`@media (${media.queries.highDef.min})`]: {
    gridGap: spacing.xl,
  },

  ...fourColumnCenteredChild,

  className: [
    `${classNamePrefix}-four-large-centered`,
    /** @deprecated Use 'umd-layout-grid-gap-four-large-centered' instead */
    'umd-grid-gap-four-center',
  ],
});

/**
 * Stacked vertical grid layout with responsive gaps.
 * @returns {JssObject} Stacked single-column grid with responsive gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.stacked
 * ```
 * @since 1.8.0
 */
export const stacked: JssObject = create.jssObject({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: `${spacing.md}`,

  [`@media (${media.queries.desktop.min})`]: {
    gridGap: `${spacing.xl}`,
  },

  className: [
    `${classNamePrefix}-stacked`,
    /** @deprecated Use 'umd-layout-grid-gap-stacked' instead */
    'umd-grid-gap-stacked',
  ],
});
