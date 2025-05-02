/**
 * @module layout/background/wrap
 * Provides background wrap styles with responsive padding.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-background-wrap';

const box = {
  padding: `${spacing.md}`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: `${spacing.lg}`,
  },

  [`@media (${media.queries.desktop.min})`]: {
    padding: `${spacing['3xl']}`,
  },
};

/**
 * White background wrap with responsive padding.
 * @returns {JssObject} White background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.wrap.white
 * ```
 * @example
 * ```css
 * class="umd-layout-background-wrap"
 * ```
 * @since 1.1.0
 */
export const white: JssObject = create.jss.objectWithClassName({
  ...box,

  className: `${classNamePrefix}`,
});

/**
 * Light gray background wrap with responsive padding.
 * @returns {JssObject} Light gray background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.wrap.light
 * ```
 * @example
 * ```css
 * class="umd-layout-background-wrap-light"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-wrap-light' instead of 'umd-forms-layout'.
 * ```
 * @since 1.1.0
 */
export const light: JssObject = create.jss.objectWithClassName({
  ...box,
  backgroundColor: `${color.gray.lighter}`,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-wrap-light' instead */
    'umd-forms-layout',
  ],
});

/**
 * Dark gray background wrap with responsive padding.
 * @returns {JssObject} Dark gray background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.wrap.dark
 * ```
 * @example
 * ```css
 * class="umd-layout-background-wrap-dark"
 * ```
 * @since 1.1.0
 */
export const dark: JssObject = create.jss.objectWithClassName({
  ...box,
  backgroundColor: `${color.gray.darker}`,

  className: `${classNamePrefix}-dark`,
});
