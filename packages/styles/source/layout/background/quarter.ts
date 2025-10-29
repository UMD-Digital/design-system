/**
 * @module layout/background/quarter
 * Provides background styles that cover a quarter of the container.
 */

import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { padding } from './full';

// Consistent naming
const classNamePrefix = 'umd-layout-background-quarter';

/**
 * Options for quarter background style variants
 * @since 1.7.0
 */
export interface QuarterBackgroundOptions {
  theme?: 'light' | 'dark';
}

/**
 * Base pseudo-element styles for quarter backgrounds.
 * @type {object}
 * @private
 */
const psuedo = {
  content: '""',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: -1,

  [`@media (${media.queries.tablet.max})`]: {
    display: 'none',
  },

  [`@media (${media.queries.desktop.min})`]: {
    width: `calc(75% + 80px)`,
  },
};

/**
 * Composable quarter background style selector
 *
 * Creates quarter-width background styles with configurable theme options.
 * Quarter backgrounds cover 75% of the container width on larger screens.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Light theme (default)
 * const styles = composeQuarter();
 *
 * // Dark theme
 * const styles = composeQuarter({ theme: 'dark' });
 * ```
 *
 * @since 1.7.0
 */
export function composeQuarter(options?: QuarterBackgroundOptions): JssObject {
  const { theme = 'light' } = options || {};

  let backgroundColor: string;

  if (theme === 'light') {
    backgroundColor = color.gray.lightest;
  } else {
    backgroundColor = color.gray.darker;
  }

  const className = `${classNamePrefix}-${theme}`;

  return create.jss.objectWithClassName({
    position: 'relative',
    ...padding,

    '&:before': {
      ...psuedo,
      backgroundColor,
    },

    className: [
      className,
      /** @deprecated Use 'umd-layout-background-quarter-{theme}' instead */
      'umd-layout-background-quater-color',
    ],
  });
}

/**
 * Light quarter background.
 * @returns {JssObject} Light gray responsive quarter background.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.quarter.light
 * ```
 * @example
 * ```css
 * class="umd-layout-background-quarter-light"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-quarter-light' instead of 'umd-layout-background-quater-color'.
 * ```
 * @since 1.1.0
 */
export const light: JssObject = composeQuarter({ theme: 'light' });

/**
 * Dark quarter background.
 * @returns {JssObject} Dark gray responsive quarter background.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.background.quarter.dark
 * ```
 * @example
 * ```css
 * class="umd-layout-background-quarter-dark"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-background-quarter-dark' instead of 'umd-layout-background-quater-color'.
 * ```
 * @since 1.1.0
 */
export const dark: JssObject = composeQuarter({ theme: 'dark' });
