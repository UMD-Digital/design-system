/**
 * @module layout/background/full
 * Provides full-width background styles with responsive padding.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import { JssObject } from '../../utilities/transform';

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
