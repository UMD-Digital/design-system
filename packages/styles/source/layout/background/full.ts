/**
 * @module layout/background/full
 * Provides full-width background styles with responsive padding.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-background-full';

/**
 * Responsive padding for full-width backgrounds.
 * @returns {object} Responsive padding for different screen sizes.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.full.padding
 * ```
 * @note This is a style object that doesn't generate a CSS class directly, but provides padding styles that can be applied to backgrounds programmatically.
 * @since 1.8.0
 */
export const padding = {
  padding: `${spacing['2xl']} 0`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: `${spacing['6xl']} 0`,
  },

  [`@media (${media.queries.highDef})`]: {
    padding: `${spacing['8xl']} 0`,
  },
};

/**
 * Light full-width background with responsive padding.
 * @returns {JssObject} Light gray full-width background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.full.light
 * ```
 * @example
 * ```css
 * class="umd-layout-background-full-light"
 * Use 'umd-layout-background-full-light' instead of 'umd-layout-background-color'.
 * ```
 * @since 1.8.0
 */
export const light: JssObject = create.jssObject({
  ...padding,
  backgroundColor: `${color.gray.lightest}`,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-full-light' instead */
    'umd-layout-background-color',
  ],
});

/**
 * Dark full-width background with responsive padding.
 * @returns {JssObject} Black full-width background with responsive padding.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.full.dark
 * ```
 * @example
 * ```css
 * class="umd-layout-background-full-dark"
 * Use 'umd-layout-background-full-dark' instead of 'umd-layout-background-color-dark'.
 * ```
 * @since 1.8.0
 */
export const dark: JssObject = create.jssObject({
  ...padding,
  backgroundColor: `${color.black}`,

  className: [
    `${classNamePrefix}-dark`,
    /** @deprecated Use 'umd-layout-background-full-dark' instead */
    'umd-layout-background-color-dark',
  ],
});
