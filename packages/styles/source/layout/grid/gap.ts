/**
 * @module layout/grid/gap
 * Provides grid layouts with different gap sizes and configurations.
 */

import { media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
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
 * @example
 * ```css
 * class="umd-layout-grid-gap-two"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-two' instead of 'umd-grid-gap'.
 * ```
 * @since 1.1.0
 */
export const two: JssObject = create.jss.objectWithClassName({
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
 * @example
 * ```css
 * class="umd-layout-grid-gap-three"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-three' instead of 'umd-grid-gap-three'.
 * ```
 * @since 1.1.0
 */
export const three: JssObject = create.jss.objectWithClassName({
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
 * @example
 * ```css
 * class="umd-layout-grid-gap-three-large"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-three-large' instead of 'umd-grid-gap-three-large'.
 * ```
 * @since 1.1.0
 */
export const threeLarge: JssObject = create.jss.objectWithClassName({
  ...base.three,

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
    ...paragraphOverwrite,
  },

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
 * @example
 * ```css
 * class="umd-layout-grid-gap-four"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-four' instead of 'umd-grid-gap-four'.
 * ```
 * @since 1.1.0
 */
export const four: JssObject = create.jss.objectWithClassName({
  ...base.four,

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
    gridTemplateColumns: 'repeat(2, 1fr)',
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
 * @example
 * ```css
 * class="umd-layout-grid-gap-four-centered"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-four-centered' instead of 'umd-grid-gap-four-center'.
 * ```
 * @since 1.1.0
 */
export const fourCentered: JssObject = create.jss.objectWithClassName({
  ...base.four,

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
    gridTemplateColumns: 'repeat(2, 1fr)',
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
 * @example
 * ```css
 * class="umd-layout-grid-gap-four-large"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-four-large' instead of 'umd-grid-gap-four-large'.
 * ```
 * @since 1.1.0
 */
export const fourLarge: JssObject = create.jss.objectWithClassName({
  ...base.four,

  [`@media (${media.queries.large.min})`]: {
    gridGap: spacing.lg,
    gridTemplateColumns: 'repeat(2, 1fr)',
    ...paragraphOverwrite,
  },

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
 * @example
 * ```css
 * class="umd-layout-grid-gap-four-large-centered"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-four-large-centered' instead of 'umd-grid-gap-four-center'.
 * ```
 * @since 1.1.0
 */
export const fourLargeCentered: JssObject = create.jss.objectWithClassName({
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
 * @example
 * ```css
 * class="umd-layout-grid-gap-stacked"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-stacked' instead of 'umd-grid-gap-stacked'.
 * ```
 * @since 1.1.0
 */
export const stacked: JssObject = create.jss.objectWithClassName({
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
