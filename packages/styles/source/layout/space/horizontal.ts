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
 * @deprecated Use {@link full} instead.
 */
export const lockFull: JssObject = create.jssObject({
  className: ['umd-lock-full'],
});

/**
 * Full-width horizontal spacing with responsive padding.
 * @returns {JssObject} Full-width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.full
 * ```
 * @example
 * ```css
 * class="umd-layout-space-horizontal-full"
 * ```
 *  @example
 * ```text
 * Use 'umd-layout-space-horizontal-full' instead of 'umd-lock-full'.
 * ```
 * {@link https://designsystem.umd.edu/foundation/horizontal-spacing }
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
 * @deprecated Use {@link max} instead.
 */
export const lock: JssObject = create.jssObject({
  className: ['umd-lock'],
});

/**
 * Maximum width horizontal spacing with responsive padding.
 * @returns {JssObject} Maximum width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.max
 * ```
 * @example
 * ```css
 * class="umd-layout-space-horizontal-larger"
 * ```
 * @example
 * ```text
 * Use `umd-layout-space-horizontal-larger` instead of `umd-lock`.
 * ```
 * {@link https://designsystem.umd.edu/foundation/horizontal-spacing}
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
 * @deprecated Use {@link large} instead.
 */
export const lockLarge: JssObject = create.jssObject({
  className: ['umd-lock-small'],
});

/**
 * Large width horizontal spacing with responsive padding.
 * @returns {JssObject} Large width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.large
 * ```
 * @example
 * ```css
 * class="umd-layout-space-horizontal-large"
 * ```
 *  @example
 * ```text
 * Use 'umd-layout-space-horizontal-large' instead of 'umd-lock-small'.
 * ```
 * {@link https://designsystem.umd.edu/foundation/horizontal-spacing}
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
 * @deprecated Use {@link normal} instead.
 */
export const lockNormal: JssObject = create.jssObject({
  className: ['umd-lock-normal'],
});

/**
 * Normal width horizontal spacing with responsive padding.
 * @returns {JssObject} Normal width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.normal
 * ```
 * @example
 * ```css
 * class="umd-layout-space-horizontal-normal"
 * ```
 *  @example
 * ```text
 * Use 'umd-layout-space-horizontal-normal' instead of 'umd-lock-smaller'.
 * ```
 * {@link https://designsystem.umd.edu/foundation/horizontal-spacing}
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
 * @deprecated Use {@link small} instead.
 */
export const lockSmall: JssObject = create.jssObject({
  className: ['umd-lock-extra-small'],
});

/**
 * Small width horizontal spacing with responsive padding.
 * @returns {JssObject} Small width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.small
 * ```
 * @example
 * ```css
 * class="umd-layout-space-horizontal-small"
 * ```
 *  @example
 * ```text
 * Use'umd-layout-space-horizontal-small' instead of 'umd-lock-extra-small'.
 * ```
 * {@link https://designsystem.umd.edu/foundation/horizontal-spacing}
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
 * @deprecated Use {@link smallest} instead.
 */
export const lockSmallest: JssObject = create.jssObject({
  className: ['umd-lock-smallest'],
});

/**
 * Smallest width horizontal spacing with responsive padding.
 * @returns {JssObject} Smallest width container with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.space.horizontal.smallest
 * ```
 * @example
 * ```css
 * class="umd-layout-space-horizontal-smallest"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-space-horizontal-smallest' instead of 'umd-lock-smallest'.
 * ```
 * {@link https://designsystem.umd.edu/foundation/horizontal-spacing}
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
