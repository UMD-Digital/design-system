/**
 * @module layout/space/horizontal
 * Provides horizontal spacing and container width controls.
 */

import { media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-space-horizontal';

/**
 * Base styles for horizontal spacing containers
 * @type {object}
 * @private
 */
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

  [`@media (${media.queries.highDef.min})`]: {
    paddingLeft: spacing['4xl'],
    paddingRight: spacing['4xl'],
  },
};

/**
 * Options for horizontal spacing style variants
 * @since 1.7.0
 */
export interface HorizontalSpaceOptions {
  width?: 'smallest' | 'small' | 'normal' | 'large' | 'larger' | 'full';
}

/**
 * Composable horizontal spacing style selector
 *
 * Creates horizontal container layouts with configurable max-width values.
 * All variants share responsive padding that adapts to screen size.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Normal width (default)
 * const styles = composeHorizontal();
 *
 * // Full width container
 * const styles = composeHorizontal({ width: 'full' });
 *
 * // Small width container
 * const styles = composeHorizontal({ width: 'small' });
 * ```
 *
 * @since 1.7.0
 */
export function composeHorizontal(options?: HorizontalSpaceOptions): JssObject {
  const { width = 'normal' } = options || {};

  let maxWidthValue: string;
  let className: string;
  let deprecatedAliases: string[] = [];

  if (width === 'full') {
    maxWidthValue = '100%';
    className = `${classNamePrefix}-full`;
    deprecatedAliases.push('umd-lock-full');
  } else if (width === 'larger') {
    maxWidthValue = spacing.maxWidth.larger;
    className = `${classNamePrefix}-larger`;
    deprecatedAliases.push('umd-lock');
  } else if (width === 'large') {
    maxWidthValue = spacing.maxWidth.large;
    className = `${classNamePrefix}-large`;
    deprecatedAliases.push('umd-lock-small');
  } else if (width === 'normal') {
    maxWidthValue = spacing.maxWidth.normal;
    className = `${classNamePrefix}-normal`;
    deprecatedAliases.push('umd-lock-smaller');
  } else if (width === 'small') {
    maxWidthValue = spacing.maxWidth.small;
    className = `${classNamePrefix}-small`;
    deprecatedAliases.push('umd-lock-extra-small');
  } else {
    // smallest
    maxWidthValue = spacing.maxWidth.smallest;
    className = `${classNamePrefix}-smallest`;
    deprecatedAliases.push('umd-lock-smallest');
  }

  return create.jss.objectWithClassName({
    ...lockBase,
    maxWidth: maxWidthValue,
    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

/**
 * @deprecated Use {@link full} instead.
 */
export const lockFull: JssObject = create.jss.objectWithClassName({
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
 * @since 1.1.0
 */
export const full: JssObject = composeHorizontal({ width: 'full' });

/**
 * @deprecated Use {@link larger} instead.
 */
export const lock: JssObject = create.jss.objectWithClassName({
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
 * @since 1.1.0
 */
export const larger: JssObject = composeHorizontal({ width: 'larger' });

/**
 * @deprecated Use {@link large} instead.
 */
export const lockLarge: JssObject = create.jss.objectWithClassName({
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
 * @since 1.1.0
 */
export const large: JssObject = composeHorizontal({ width: 'large' });

/**
 * @deprecated Use {@link normal} instead.
 */
export const lockNormal: JssObject = create.jss.objectWithClassName({
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
 * @since 1.1.0
 */
export const normal: JssObject = composeHorizontal();

/**
 * @deprecated Use {@link small} instead.
 */
export const lockSmall: JssObject = create.jss.objectWithClassName({
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
 * @since 1.1.0
 */
export const small: JssObject = composeHorizontal({ width: 'small' });

/**
 * @deprecated Use {@link smallest} instead.
 */
export const lockSmallest: JssObject = create.jss.objectWithClassName({
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
 * @since 1.1.0
 */
export const smallest: JssObject = composeHorizontal({ width: 'smallest' });
