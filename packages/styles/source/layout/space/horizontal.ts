/**
 * @module layout/space/horizontal
 * Provides horizontal spacing and container width controls.
 */

import { media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-space-horizontal';

const lockBase = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: spacing['md'],
  paddingRight: spacing['md'],
  maxWidth: `${spacing.maxWidth.normal}`,

  [`@media (${media.queries.tablet.min})`]: {
    paddingLeft: spacing['2xl'],
    paddingRight: spacing['2xl'],
  },

  [`@media (${media.queries.desktop.min})`]: {
    paddingLeft: spacing['4xl'],
    paddingRight: spacing['4xl'],
  },

  [`@media (${media.queries.highDef.min})`]: {
    paddingLeft: spacing.max,
    paddingRight: spacing.max,
  },
};

/**
 * Full-width horizontal spacing with responsive padding.
 * @returns {JssObject} Full-width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.full
 * ```
 * @since 1.8.0
 */
export const full: JssObject = create.jssObject({
  ...lockBase,
  maxWidth: '100%',

  className: [
    `${classNamePrefix}-full`,
    /** @deprecated Use 'umd-layout-space-horizontal-full' instead */
    'umd-lock-full',
  ],
});

/**
 * Maximum width horizontal spacing with responsive padding.
 * @returns {JssObject} Maximum width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.max
 * ```
 * @since 1.8.0
 */
export const max: JssObject = create.jssObject({
  ...lockBase,
  maxWidth: `${spacing.maxWidth.max}`,

  className: [
    `${classNamePrefix}-larger`,
    /** @deprecated Use 'umd-layout-space-horizontal-larger' instead */
    'umd-lock',
  ],
});

/**
 * Large width horizontal spacing with responsive padding.
 * @returns {JssObject} Large width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.large
 * ```
 * @since 1.8.0
 */
export const large: JssObject = create.jssObject({
  ...lockBase,
  maxWidth: `${spacing.maxWidth.large}`,

  className: [
    `${classNamePrefix}-large`,
    /** @deprecated Use 'umd-layout-space-horizontal-large' instead */
    'umd-lock-small',
  ],
});

/**
 * Normal width horizontal spacing with responsive padding.
 * @returns {JssObject} Normal width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.normal
 * ```
 * @since 1.8.0
 */
export const normal: JssObject = create.jssObject({
  ...lockBase,
  maxWidth: `${spacing.maxWidth.normal}`,

  className: [
    `${classNamePrefix}-normal`,
    /** @deprecated Use 'umd-layout-space-horizontal-normal' instead */
    'umd-lock-smaller',
  ],
});

/**
 * Small width horizontal spacing with responsive padding.
 * @returns {JssObject} Small width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.small
 * ```
 * @since 1.8.0
 */
export const small: JssObject = create.jssObject({
  ...lockBase,
  maxWidth: `${spacing.maxWidth.small}`,

  className: [
    `${classNamePrefix}-small`,
    /** @deprecated Use 'umd-layout-space-horizontal-small' instead */
    'umd-lock-extra-small',
  ],
});

/**
 * Smallest width horizontal spacing with responsive padding.
 * @returns {JssObject} Smallest width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.smallest
 * ```
 * @since 1.8.0
 */
export const smallest: JssObject = create.jssObject({
  ...lockBase,
  maxWidth: `${spacing.maxWidth.smallest}`,

  className: [
    `${classNamePrefix}-smallest`,
    /** @deprecated Use 'umd-layout-space-horizontal-smallest' instead */
    'umd-lock-smallest',
  ],
});
